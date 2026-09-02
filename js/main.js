(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Complete the demo template navigation. The original template contains
    // many empty links; give each repeated control a useful destination from
    // one shared place so every page behaves consistently.
    $('a').each(function () {
        var $link = $(this);
        var href = ($link.attr('href') || '').trim();
        var text = $link.text().trim().toLowerCase();
        var iconClass = $link.find('i').attr('class') || '';

        // Keep Bootstrap dropdown toggles and in-page carousel controls intact.
        if ($link.hasClass('dropdown-toggle') || $link.hasClass('back-to-top')) {
            return;
        }

        if (href !== '' && href !== '#') {
            return;
        }

        var destination = '';

        if (iconClass.indexOf('facebook') !== -1) destination = 'https://www.facebook.com/';
        else if (iconClass.indexOf('twitter') !== -1) destination = 'https://twitter.com/';
        else if (iconClass.indexOf('instagram') !== -1) destination = 'https://www.instagram.com/';
        else if (iconClass.indexOf('linkedin') !== -1) destination = 'https://www.linkedin.com/';
        else if (iconClass.indexOf('phone') !== -1 || text.indexOf('(405) 223-1941') !== -1) destination = 'tel:+14052231941';
        else if (iconClass.indexOf('envelope') !== -1 || text.indexOf('@') !== -1) destination = 'mailto:jivan200202@gmail.com';
        else if (iconClass.indexOf('map-marker') !== -1 || text.indexOf('street') !== -1) destination = 'https://maps.google.com/?q=123+Street+New+York';
        else if (iconClass.indexOf('search') !== -1) destination = 'blog.html';
        else if (text.indexOf('go back to home') !== -1 || text === 'home' || text.indexOf('site name') !== -1) destination = 'index.html';
        else if (text.indexOf('about') !== -1 || text.indexOf('more detail') !== -1) destination = 'about.html';
        else if (text.indexOf('service') !== -1) destination = 'service.html';
        else if (text.indexOf('project') !== -1) destination = 'project.html';
        else if (text.indexOf('blog') !== -1 || text.indexOf('latest') !== -1) destination = 'blog.html';
        else if (text.indexOf('team') !== -1) destination = 'team.html';
        else if (text.indexOf('testimonial') !== -1) destination = 'testimonial.html';
        else if (text.indexOf('contact') !== -1 || text.indexOf('help') !== -1 ||
                 text.indexOf('fqa') !== -1 || text.indexOf('privacy') !== -1 ||
                 text.indexOf('terms') !== -1) destination = 'contact.html';
        else if (text.indexOf('read more') !== -1) {
            destination = $link.closest('.blog-item').length ? 'blog.html' : 'service.html';
        }
        else if ($link.closest('.project-item').length) {
            destination = $link.closest('.project-item').find('img').attr('src') || 'project.html';
        }

        // Non-action headings are not controls. All remaining clickable links
        // fall back to the contact page instead of reloading the current page.
        if (!destination && (text === 'pages' || text === 'short link' || text === 'help link' || text === 'contact us')) {
            $link.removeAttr('href').attr('aria-disabled', 'true');
            return;
        }

        $link.attr('href', destination || 'contact.html');

        if (/^https?:/.test(destination)) {
            $link.attr({ target: '_blank', rel: 'noopener noreferrer' });
        }
    });

    // Validate the enquiry and prepare a complete email without requiring a backend.
    $('#contactForm').on('submit', function (event) {
        event.preventDefault();

        var form = this;
        var $form = $(form);
        var $status = $form.find('.contact-status');
        var $button = $form.find('[type="submit"]');

        $form.addClass('was-validated');

        if (!form.checkValidity()) {
            $status.removeClass('text-success').addClass('text-danger')
                .text('Please complete all required fields.');
            form.querySelector(':invalid').focus();
            return;
        }

        // Hidden honeypot: silently ignore automated submissions.
        if ($form.find('[name="website"]').val()) {
            return;
        }

        var name = $form.find('[name="name"]').val().trim();
        var email = $form.find('[name="email"]').val().trim();
        var company = $form.find('[name="company"]').val().trim();
        var service = $form.find('[name="service"]').val();
        var message = $form.find('[name="message"]').val().trim();
        var subject = service + ' enquiry from ' + name;
        var body = [
            'Name: ' + name,
            'Email: ' + email,
            'Company: ' + (company || 'Not provided'),
            'Service: ' + service,
            '',
            'Project details:',
            message
        ].join('\n');

        $button.prop('disabled', true).text('Opening Email…');
        $status.removeClass('text-danger').addClass('text-success')
            .text('Your message is ready. Please send it from your email app.');

        window.location.href = 'mailto:jivan200202@gmail.com?subject=' +
            encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

        setTimeout(function () {
            $button.prop('disabled', false).text('Send Message');
        }, 1500);
    });

    // Preserve the contact action on older template pages until their markup is migrated.
    $('.contact-form:not(form) button').on('click', function () {
        var values = $(this).closest('.contact-form').find('input, textarea').map(function () {
            return $(this).val().trim();
        }).get();
        var subject = values[2] || 'Website enquiry';
        var body = 'Name: ' + (values[0] || '') + '\nEmail: ' + (values[1] || '') +
            '\n\nProject details:\n' + (values[3] || '');

        window.location.href = 'mailto:jivan200202@gmail.com?subject=' +
            encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


     // Fact Counter

     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });



})(jQuery);

