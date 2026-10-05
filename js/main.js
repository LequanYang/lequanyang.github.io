/* ============================================================================
 *  main.js — 页面交互
 *
 *  负责四件事：
 *   1. 中英文切换（文案来自 js/i18n.js）
 *   2. 顶部导航：移动端菜单、滚动高亮当前栏目
 *   3. 滚动进入视口时的淡入动效
 *   4. 回到顶部按钮
 *  一般不需要改这个文件；改文字请去 js/i18n.js。
 * ========================================================================== */

(function () {
  'use strict';

  var DICT = window.SITE_I18N || {};
  var STORAGE_KEY = 'ly-lang';
  var THEME_KEY = 'ly-theme';
  var DEFAULT_LANG = 'en';
  var supported = ['en', 'zh'];

  function prefersReducedMotion() {
    return !!(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* ------------------------------------------------------------ 小工具 */
  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  /* 取文案；当前语言缺失时回退到英文 */
  function lookup(lang, key) {
    var table = DICT[lang] || {};
    if (typeof table[key] === 'string') return table[key];
    var fallback = DICT[DEFAULT_LANG] || {};
    return typeof fallback[key] === 'string' ? fallback[key] : null;
  }

  function currentLang() {
    return document.documentElement.classList.contains('lang-zh') ? 'zh' : 'en';
  }

  /* --------------------------------------------------------- 语言切换 */
  function applyLanguage(lang) {
    if (supported.indexOf(lang) === -1) lang = DEFAULT_LANG;

    var html = document.documentElement;
    html.classList.remove('lang-en', 'lang-zh');
    html.classList.add('lang-' + lang);
    html.lang = lang === 'zh' ? 'zh-CN' : 'en';

    /* 标签页标题 + 搜索引擎摘要 */
    var title = lookup(lang, 'meta.title');
    var desc = lookup(lang, 'meta.description');
    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', 'content', title);
    }
    if (desc) {
      setMeta('meta[name="description"]', 'content', desc);
      setMeta('meta[property="og:description"]', 'content', desc);
    }

    /* 纯文本节点 */
    each('[data-i18n]', function (el) {
      var value = lookup(lang, el.getAttribute('data-i18n'));
      if (value !== null) el.textContent = value;
    });

    /* 需要保留标签的节点（论文作者里的加粗姓名） */
    each('[data-i18n-html]', function (el) {
      var value = lookup(lang, el.getAttribute('data-i18n-html'));
      if (value !== null) el.innerHTML = value;
    });

    /* 属性文案，写法：data-i18n-attr="aria-label:nav.menu; title:foo.bar" */
    each('[data-i18n-attr]', function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var sep = pair.indexOf(':');
        if (sep < 0) return;
        var attr = pair.slice(0, sep).trim();
        var value = lookup(lang, pair.slice(sep + 1).trim());
        if (attr && value !== null) el.setAttribute(attr, value);
      });
    });

    /* 逗号分隔的字符串 → 拆成一个个标签气泡 */
    each('[data-i18n-list]', function (el) {
      var value = lookup(lang, el.getAttribute('data-i18n-list'));
      if (value === null) return;
      el.textContent = '';
      value.split(/[,、]/).forEach(function (piece) {
        var text = piece.trim();
        if (!text) return;
        var tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = text;
        el.appendChild(tag);
      });
    });

    /* 副标题里的另一种语言名称，标注 lang 便于字体回退与朗读 */
    each('[data-alt-lang]', function (el) {
      el.lang = lang === 'zh' ? 'en' : 'zh-CN';
    });

    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.setAttribute('aria-pressed', lang === 'zh' ? 'true' : 'false');

    /* 主题按钮的提示文字也要跟着换语言 */
    updateThemeLabel();

    /* 语言变化后页面高度会变，重新量一次滚动位置 */
    onScroll();
  }

  function setMeta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function storeLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* 忽略隐私模式 */ }
  }

  /* ---------------------------------------------------------- 主题切换
     初始主题已由 <head> 里的内联脚本定好（按时间自动判断），
     这里只负责手动切换、记忆选择、同步浏览器地址栏颜色。 */
  function currentTheme() {
    return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
  }

  function applyTheme(theme, animate, persist) {
    if (theme !== 'light' && theme !== 'dark') return;
    var html = document.documentElement;

    /* 切换时临时挂一个 class，让颜色平滑过渡而不是硬跳 */
    if (animate && !prefersReducedMotion()) {
      html.classList.add('theme-transition');
      window.setTimeout(function () { html.classList.remove('theme-transition'); }, 320);
    }

    html.classList.remove('theme-light', 'theme-dark');
    html.classList.add('theme-' + theme);

    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* 忽略 */ }
    }

    setMeta('meta[name="theme-color"]', 'content', theme === 'dark' ? '#0d1017' : '#ffffff');
    updateThemeLabel();
  }

  /* 按钮提示的是「点击后会变成什么」，所以文字随当前主题反过来 */
  function updateThemeLabel() {
    var button = document.getElementById('themeToggle');
    if (!button) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    var label = lookup(currentLang(), next === 'dark' ? 'theme.toDark' : 'theme.toLight');
    if (label) button.setAttribute('aria-label', label);
  }

  /* ----------------------------------------------------- 顶栏 & 导航 */
  function setupHeader() {
    var header = document.querySelector('.site-header');
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('nav');
    if (!header) return;

    /* 移动端菜单 */
    function closeMenu() {
      if (!nav || !toggle) return;
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      /* 点导航项后自动收起菜单 */
      each('#nav a', function (link) {
        link.addEventListener('click', closeMenu);
      });

      /* 点空白处 / 按 Esc 收起 */
      document.addEventListener('click', function (event) {
        if (!nav.classList.contains('is-open')) return;
        if (nav.contains(event.target) || toggle.contains(event.target)) return;
        closeMenu();
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMenu();
      });
    }

    /* 滚到桌面宽度时清掉移动端状态 */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeMenu();
    }, { passive: true });

    /* 滚动位置：顶栏描边 + 回到顶部按钮 */
    window.addEventListener('scroll', onScroll, { passive: true });

    window.__lyOnScroll = onScroll;
    header.dataset.ready = 'true';
  }

  function onScroll() {
    var header = document.querySelector('.site-header');
    var toTop = document.getElementById('toTop');
    var y = window.pageYOffset || document.documentElement.scrollTop;

    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
  }

  /* -------------------------------------------------------- 滚动高亮 */
  function setupScrollSpy() {
    var links = {};
    each('.nav-list a[href^="#"]', function (link) {
      links[link.getAttribute('href').slice(1)] = link;
    });
    var ids = Object.keys(links);
    if (!ids.length) return;

    var sections = [];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sections.push(el);
    });
    if (!sections.length) return;

    function setActive(id) {
      ids.forEach(function (key) {
        var link = links[key];
        var active = key === id;
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    if (!('IntersectionObserver' in window)) return;

    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      /* 取当前可见比例最高的栏目 */
      var bestId = null;
      var bestRatio = 0;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > bestRatio) {
          bestRatio = visible[id];
          bestId = id;
        }
      });

      /* 滚到最底部时强制高亮最后一个栏目 */
      var atBottom = window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) bestId = ids[ids.length - 1];

      setActive(bestId);
    }, {
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ------------------------------------------------------ 入场动效 */
  function setupReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    /* 同级元素依次错开，产生"逐个浮现"的节奏 */
    Array.prototype.forEach.call(items, function (el) {
      var index = 0;
      var prev = el.previousElementSibling;
      while (prev) {
        if (prev.hasAttribute && prev.hasAttribute('data-reveal')) index++;
        prev = prev.previousElementSibling;
      }
      el.style.setProperty('--reveal-delay', Math.min(index, 5) * 70 + 'ms');
    });

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(items, function (el) { observer.observe(el); });
  }

  /* -------------------------------------------------------- 启动 */
  function init() {
    /* 语言由 <head> 里的内联脚本先行决定，这里读取结果并渲染文案 */
    applyLanguage(currentLang());

    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = currentLang() === 'zh' ? 'en' : 'zh';
        storeLang(next);
        applyLanguage(next);
      });
    }

    /* 主题：初始值已由内联脚本设好，这里补上地址栏配色并接上按钮 */
    applyTheme(currentTheme(), false, false);
    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true, true);
      });
    }

    setupHeader();
    setupScrollSpy();
    setupReveal();

    var toTop = document.getElementById('toTop');
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      });
    }

    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
