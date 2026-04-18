'use strict';

/* ── Sidebar collapse state (desktop) */
(function () {
    if (localStorage.getItem('arleov2-sidebar') === 'closed') {
        var nav = document.getElementById('sidebar-nav');
        if (nav) nav.classList.add('collapsed');
        var hdr = document.querySelector('header.site-header');
        if (hdr) hdr.classList.add('sidebar-collapsed');
    }
})();

document.addEventListener('DOMContentLoaded', function () {

    /* ── Theme toggle ────────────────────────────────────── */
    var themeBtn = document.getElementById('theme-toggle');
    function updateHljsTheme(theme) {
        var darkLink = document.getElementById('hljs-dark-css');
        var lightLink = document.getElementById('hljs-light-css');
        if (!darkLink || !lightLink) return;
        if (theme === 'dark') {
            darkLink.removeAttribute('disabled');
            lightLink.setAttribute('disabled', 'disabled');
        } else {
            lightLink.removeAttribute('disabled');
            darkLink.setAttribute('disabled', 'disabled');
        }
    }
    if (themeBtn) {
        function currentTheme() {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('arleo-theme', theme);
            themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
            updateHljsTheme(theme);
        }
        themeBtn.textContent = currentTheme() === 'dark' ? '☀️' : '🌙';
        themeBtn.addEventListener('click', function () {
            applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
        });
    }

    /* ── highlight.js ────────────────────────────────────── */
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
        updateHljsTheme(localStorage.getItem('arleo-theme') || 'dark');
    }

    /* ── Sidebar toggle (desktop collapse + mobile open) ─── */
    var sidebarNav = document.getElementById('sidebar-nav');
    var sidebarOverlay = document.getElementById('sidebar-overlay');
    var burgers = document.querySelectorAll('.burger, .sidebar-toggle');

    function isMobile() { return window.innerWidth <= 768; }

    function toggleSidebar() {
        if (isMobile()) {
            if (sidebarNav) sidebarNav.classList.toggle('mobile-open');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('open');
        } else {
            if (!sidebarNav) return;
            var closing = !sidebarNav.classList.contains('collapsed');
            sidebarNav.classList.toggle('collapsed', closing);
            var hdr = document.querySelector('header.site-header');
            if (hdr) hdr.classList.toggle('sidebar-collapsed', closing);
            localStorage.setItem('arleov2-sidebar', closing ? 'closed' : 'open');
        }
    }

    burgers.forEach(function (btn) {
        btn.addEventListener('click', toggleSidebar);
    });

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function () {
            if (sidebarNav) sidebarNav.classList.remove('mobile-open');
            sidebarOverlay.classList.remove('open');
        });
    }

    /* ── Sidebar tree toggle ─────────────────────────────── */
    document.querySelectorAll('#sidebar-nav li.has-children > .tree-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            btn.closest('li').classList.toggle('open');
        });
    });
    document.querySelectorAll('#sidebar-nav li.has-children').forEach(function (li) {
        if (li.querySelector('a.active')) li.classList.add('open');
    });

    /* ── Sidebar live search ─────────────────────────────── */
    var searchInput = document.getElementById('header-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            var query = searchInput.value.trim().toLowerCase();
            var allItems = document.querySelectorAll('#sidebar-tree li');
            allItems.forEach(function (li) { li.classList.remove('search-hidden'); });
            if (!query) return;
            allItems.forEach(function (li) {
                var link = li.querySelector('a');
                if (!link) return;
                var hasVisibleChild = Array.from(li.querySelectorAll('li')).some(function (child) {
                    var childLink = child.querySelector('a');
                    return childLink && childLink.textContent.toLowerCase().includes(query);
                });
                if (!link.textContent.toLowerCase().includes(query) && !hasVisibleChild) {
                    li.classList.add('search-hidden');
                } else {
                    var parent = li.closest('li.has-children');
                    if (parent) { parent.classList.remove('search-hidden'); parent.classList.add('open'); }
                }
            });
        });
    }

    /* ── Cookie banner ───────────────────────────────────── */
    var COOKIE_KEY = 'arleo_cookie_ok';
    var banner = document.getElementById('arleo-cookie-banner');
    if (banner) {
        if (document.cookie.indexOf(COOKIE_KEY + '=1') === -1) {
            banner.classList.add('visible');
            var acceptBtn = document.getElementById('arleo-cookie-accept');
            if (acceptBtn) {
                acceptBtn.addEventListener('click', function () {
                    var expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
                    document.cookie = COOKIE_KEY + '=1; expires=' + expires + '; path=/; SameSite=Strict; Secure';
                    banner.classList.remove('visible');
                });
            }
        }
    }
});
