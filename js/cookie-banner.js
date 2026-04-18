(function () {
    'use strict';

    var COOKIE_NAME = 'arleo_cookie_consent';
    var COOKIE_DURATION = 365; // jours

    function getCookie(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    function setCookie(name, value, days) {
        var expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value
            + '; expires=' + expires.toUTCString()
            + '; path=/'
            + '; SameSite=Strict'
            + '; Secure';
    }

    function createBanner() {
        var banner = document.createElement('div');
        banner.id = 'arleo-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Consentement cookies');
        banner.innerHTML =
            '<div class="arleo-cookie-inner">' +
                '<p class="arleo-cookie-text">' +
                    'Ce site utilise des cookies de session nécessaires à son fonctionnement. ' +
                    '<a href="https://www.arleo.eu/privacy-policies" rel="noopener noreferrer">En savoir plus</a>' +
                '</p>' +
                '<button id="arleo-cookie-accept" aria-label="Accepter les cookies">OK</button>' +
            '</div>';

        document.body.appendChild(banner);

        document.getElementById('arleo-cookie-accept').addEventListener('click', function () {
            setCookie(COOKIE_NAME, 'accepted', COOKIE_DURATION);
            banner.style.transition = 'opacity 0.3s';
            banner.style.opacity = '0';
            setTimeout(function () {
                if (banner.parentNode) {
                    banner.parentNode.removeChild(banner);
                }
            }, 300);
        });
    }

    function init() {
        if (getCookie(COOKIE_NAME) === 'accepted') {
            return;
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createBanner);
        } else {
            createBanner();
        }
    }

    init();
})();
