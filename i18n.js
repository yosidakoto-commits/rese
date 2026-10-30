// RESE language handling: stored preference > browser language (first visit, Japanese pages only)
(function () {
  var path = window.location.pathname;
  var file = path.split('/').pop() || 'index.html';
  if (file.indexOf('.html') === -1) file = 'index.html';
  var cur = 'ja';
  if (/\/en\//.test(path) || /\/en$/.test(path)) cur = 'en';
  else if (/\/zh\//.test(path) || /\/zh$/.test(path)) cur = 'zh';

  function urlFor(lang) {
    if (lang === cur) return null;
    if (cur === 'ja') return lang + '/' + file + window.location.search;
    if (lang === 'ja') return '../' + file + window.location.search;
    return '../' + lang + '/' + file + window.location.search;
  }

  var stored = null;
  try { stored = localStorage.getItem('rese-lang'); } catch (e) {}
  var target = null;
  if (stored && stored !== cur && ['ja', 'en', 'zh'].indexOf(stored) !== -1) {
    target = stored;
  } else if (!stored && cur === 'ja') {
    var nav = (navigator.language || '').toLowerCase();
    if (nav.indexOf('en') === 0) target = 'en';
    else if (nav.indexOf('zh') === 0) target = 'zh';
  }
  if (target && target !== cur) {
    var u = urlFor(target);
    if (u) { window.location.replace(u); return; }
  }

  // Remember switcher choices
  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('.lang-switch a[data-lang]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        try { localStorage.setItem('rese-lang', this.getAttribute('data-lang')); } catch (e) {}
      });
    }
  });
})();
