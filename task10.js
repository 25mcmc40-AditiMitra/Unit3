(function ($) {

    $.fn.simpleTabs = function (options) {

        // Default settings
        let settings = $.extend({
            activeClass: "active-tab",
            animationSpeed: 400,
            defaultTab: 0
        }, options);

        return this.each(function () {

            let container = $(this);
            let links = container.find(".tab-links a");
            let panels = container.find(".tab-panel");

            // Function to activate tab
            function activateTab(index) {

                links.removeClass(settings.activeClass);
                panels.hide();

                $(links[index]).addClass(settings.activeClass);

                let target = $(links[index]).attr("href");
                $(target).fadeIn(settings.animationSpeed);

                // Update URL hash
                window.location.hash = target;
            }

            // Click event
            links.click(function (e) {
                e.preventDefault();
                let index = links.index(this);
                activateTab(index);
            });

            // Keyboard navigation (Arrow keys)
            links.keydown(function (e) {

                let index = links.index(this);

                if (e.key === "ArrowRight") {
                    index = (index + 1) % links.length;
                    links.eq(index).focus();
                    activateTab(index);
                }

                if (e.key === "ArrowLeft") {
                    index = (index - 1 + links.length) % links.length;
                    links.eq(index).focus();
                    activateTab(index);
                }
            });

            // Hash navigation (bookmark support)
            if (window.location.hash) {
                let hash = window.location.hash;
                let hashIndex = links.index(links.filter("[href='" + hash + "']"));

                if (hashIndex >= 0) {
                    activateTab(hashIndex);
                }
            } else {
                activateTab(settings.defaultTab);
            }

        });
    };

})(jQuery);


// Initialize Plugin
$(document).ready(function () {

    $("#myTabs").simpleTabs({
        activeClass: "active-tab",
        animationSpeed: 500,
        defaultTab: 0
    });

});