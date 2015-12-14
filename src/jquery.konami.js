;(function ($) {

    'use strict';

    var pluginName = 'konami',
        defaults = {
            pattern: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65].join(''), // up, up, down, down, left, right, left, right, b, a
            onInit: null,
            onPatternMatch: function () {
                console.log('[konami] good match');
            },
            once: true,
            hasFiredMatch: false,
            methodList: ['onInit', 'onPatternMatch']
        };

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

            if (this.fnExists('onInit')) {
                this.settings.onInit(this);
            }
        },

        isPatternMatch: function () {
            return this.settings.pattern === this.input;
        },

        resetInvalidInput: function () {
            if (this.settings.pattern.search(this.input) === -1) {
                this.input = '';
            }
        },

        isMatchAllowed: function () {
            return !this.settings.once || (this.settings.once && !this.settings.hasFiredMatch);
        },

        fnExists: function (fn) {
            return this.settings.hasOwnProperty(fn) && typeof this.settings[fn] === 'function';
        },

        listen: function (e) {
            this.input += e.keyCode;

            if (this.isPatternMatch() && this.isMatchAllowed()) {
                if (this.fnExists('onPatternMatch')) {
                    this.settings.onPatternMatch(this);
                    this.hasFiredMatch = true;
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

})(jQuery);
