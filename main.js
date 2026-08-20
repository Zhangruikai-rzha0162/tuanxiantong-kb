// 侧栏 scrollspy + 规则表筛选
(function () {
  // scrollspy
  var links = document.querySelectorAll('.doc-side a[href^="#"]');
  if (links.length) {
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) map[id] = a;
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          var a = map[e.target.id];
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-70px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { obs.observe(document.getElementById(id)); });
  }

  // 规则筛选
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var targetId = group.getAttribute('data-filter-group');
    var table = document.getElementById(targetId);
    if (!table) return;
    group.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('button').forEach(function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
        var mode = btn.getAttribute('data-mode');
        table.querySelectorAll('tbody tr').forEach(function (tr) {
          var core = tr.getAttribute('data-core');
          var tqt = tr.getAttribute('data-tqt');
          var show = true;
          if (mode === 'both') show = core === '是' && tqt === '是';
          else if (mode === 'core') show = core === '是' && tqt !== '是';
          else if (mode === 'tqt') show = tqt === '是';
          else if (mode === 'none') show = core !== '是' && tqt !== '是';
          tr.classList.toggle('hidden-row', !show);
        });
      });
    });
  });

  // 当前导航高亮
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-header nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();
