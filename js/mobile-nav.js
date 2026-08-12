(function () {
    'use strict';

    document.querySelectorAll('.navbar-toggler[data-bs-target]').forEach(function (originalButton) {
        var target = document.querySelector(originalButton.getAttribute('data-bs-target'));

        if (!target) return;

        // Replace the button after Bootstrap initializes so only one toggle
        // handler controls the menu, regardless of CDN availability.
        var button = originalButton.cloneNode(true);
        originalButton.parentNode.replaceChild(button, originalButton);
        button.removeAttribute('data-bs-toggle');
        button.setAttribute('aria-expanded', target.classList.contains('show') ? 'true' : 'false');
        button.setAttribute('aria-label', 'Toggle navigation');

        button.addEventListener('click', function (event) {
            // Keep mobile navigation independent from external CDN scripts.
            event.preventDefault();
            event.stopImmediatePropagation();

            var isOpen = target.classList.toggle('show');
            button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }, true);

        target.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth >= 992) return;
                target.classList.remove('show');
                button.setAttribute('aria-expanded', 'false');
            });
        });
    });
}());
