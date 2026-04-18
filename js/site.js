'use strict';
const isTouch = window.DocumentTouch && document instanceof window.DocumentTouch;

function scrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.scrollY > 75) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function parallaxBackground() {
    document.querySelectorAll('.parallax').forEach(el => {
        el.style.backgroundPositionY = (window.scrollY * 0.3) + 'px';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Hero background image (data-hero-bg remplace style="" inline — CSP nonce compatible)
    document.querySelectorAll('[data-hero-bg]').forEach(el => {
        el.style.backgroundImage = "url('" + el.dataset.heroBg + "')";
    });
    scrollHeader();
    if (!isTouch) {
        document.addEventListener('scroll', () => {
            scrollHeader();
            parallaxBackground();
        });
    }
    document.addEventListener('touchmove', () => {
        scrollHeader();
    });

    // Smooth scroll to start
    const toStart = document.getElementById('to-start');
    if (toStart) {
        toStart.addEventListener('click', e => {
            e.preventDefault();
            const start = document.getElementById('start');
            if (start) {
                window.scroll({ top: start.getBoundingClientRect().top + window.scrollY - 45, left: 0, behavior: 'smooth' });
            }
        });
    }

    // Smooth scroll to top
    const toTop = document.getElementById('to-top');
    if (toTop) {
        toTop.addEventListener('click', e => {
            e.preventDefault();
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        });
    }

    // Responsive Menu (hamburger mobile overlay existant)
    const toggle = document.getElementById('toggle');
    const overlay = document.getElementById('overlay');
    if (toggle && overlay) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            overlay.classList.toggle('open');
            document.body.classList.toggle('mobile-nav-open');
        });
    }

    // Tree Menu desktop (mobile overlay existant)
    document.querySelectorAll('.tree li').forEach(item => {
        const children = item.querySelector('ul');
        if (children) {
            item.classList.add('tree-closed');
            const toggler = document.createElement('span');
            toggler.className = 'toggler';
            item.insertBefore(toggler, item.firstChild);
            toggler.addEventListener('click', () => {
                setTimeout(() => {
                    item.classList.toggle('tree-closed');
                    item.classList.toggle('tree-opened');
                }, 300);
            });
        } else {
            item.classList.add('tree-empty');
            const toggler = document.createElement('span');
            toggler.className = 'toggler';
            item.insertBefore(toggler, item.firstChild);
        }
    });

    // ── Sidebar nav ──────────────────────────────────────────────

    // Toggle expand/collapse des sous-menus
    document.querySelectorAll('#sidebar-nav li.has-children > .tree-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('li').classList.toggle('open');
        });
    });

    // Ouvrir automatiquement le nœud actif
    document.querySelectorAll('#sidebar-nav li.has-children').forEach(li => {
        if (li.querySelector('a.active')) {
            li.classList.add('open');
        }
    });

    // Sidebar mobile : bouton toggle
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (sidebarToggleBtn && sidebarNav && sidebarOverlay) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebarNav.classList.toggle('open');
            sidebarOverlay.classList.toggle('open');
        });
        sidebarOverlay.addEventListener('click', () => {
            sidebarNav.classList.remove('open');
            sidebarOverlay.classList.remove('open');
        });
    }

    // ── Search live client-side ──────────────────────────────────
    const searchInput = document.getElementById('sidebar-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();
            const allItems = document.querySelectorAll('#sidebar-tree li');

            if (!query) {
                // Tout afficher
                allItems.forEach(li => {
                    li.classList.remove('search-hidden');
                });
                return;
            }

            allItems.forEach(li => {
                const link = li.querySelector('a');
                if (!link) return;
                const text = link.textContent.toLowerCase();
                if (text.includes(query)) {
                    li.classList.remove('search-hidden');
                    // Afficher aussi le parent si c'est un enfant qui matche
                    const parent = li.closest('li.has-children');
                    if (parent) {
                        parent.classList.remove('search-hidden');
                        parent.classList.add('open');
                    }
                } else {
                    // Masquer seulement si pas d'enfant visible
                    const hasVisibleChild = Array.from(li.querySelectorAll('li')).some(child => {
                        const childLink = child.querySelector('a');
                        return childLink && childLink.textContent.toLowerCase().includes(query);
                    });
                    if (!hasVisibleChild) {
                        li.classList.add('search-hidden');
                    }
                }
            });
        });
    }
});
