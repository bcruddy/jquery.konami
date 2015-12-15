;(function ($) {

    'use strict';

    var pluginName = 'konami',
        defaults = {
            pattern: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65].join(''), // up, up, down, down, left, right, left, right, b, a
            once: true,
            onInit: null,
            onPatternMatch: null
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.hasFiredMatch = false;
        this.input = '';

        this.init();
    }

    $.extend(Plugin.prototype, {

        init: function () {
            this.$element.on('keydown', this.listen.bind(this));

            this.emitEvent('init');

            if (this.fnExists('onInit')) {
                this.settings.onInit(this);
            }
        },

        isPatternMatch: function () {
            return this.settings.pattern === this.input;
        },

        resetInvalidInput: function () {
            if (this.settings.pattern.search(this.input) === -1 || this.input === this.settings.pattern) {
                this.input = '';
            }
        },

        isMatchAllowed: function () {
            return !this.settings.once || (this.settings.once && !this.hasFiredMatch);
        },

        fnExists: function (fnName) {
            return this.settings.hasOwnProperty(fnName) && typeof this.settings[fnName] === 'function';
        },

        emitEvent: function (eventName) {
            this.$element.trigger('konami.' + eventName, [this]);
        },

        listen: function (e) {
            this.input += e.keyCode;

            if (this.isPatternMatch() && this.isMatchAllowed()) {
                this.emitEvent('match');

                if (this.fnExists('onPatternMatch')) {
                    this.settings.onPatternMatch(this);
                }

                this.hasFiredMatch = true;
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
