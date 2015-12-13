

;(function ($, window, document, undefined) {

    'use strict';

    var pluginName = 'konami',
        defaults = {
            pattern: '38384040373937396665',
            onInit: null,
            onPatternMatch: function () {
                console.log('default konami callback');
            },
            once: true,
            hasFired: false
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.input = '';

        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            this.$element.on('keydown', this.listen.bind(this));
            if (this.settings.onInit &&
                typeof this.settings.onInit === 'function') {
                this.settings.onInit(this);
            }
        },

        patternMatch: function () {
            return this.settings.pattern === this.input;
        },

        resetInvalidInput: function () {
            if (this.settings.pattern.search(this.input) === -1) {
                this.input = '';
            }
        },

        listen: function (e) {
            this.input += e.keyCode;
            var matchAllowed = !this.settings.once ||
                (this.settings.once && !this.settings.hasFired);
            var onMatchIsFunc = this.settings.onPatternMatch &&
                typeof this.settings.onPatternMatch === 'function';

            if (this.patternMatch() && matchAllowed) {
                if (onMatchIsFunc) {
                    this.settings.onPatternMatch(this);
                    this.hasFired = true;
                }
            }

            this.resetInvalidInput();
        }

    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);