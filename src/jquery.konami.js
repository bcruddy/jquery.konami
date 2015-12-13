'use strict';

(function ($) {

    var konami = {
        pattern: '38384040373937396665',
        input: '',
        hasFired: false,

        isValid: function () {
            return this.pattern === this.input;
        },

        resetInvalidInput: function () {
            if (this.pattern.search(this.input) < -1) {
                this.input = '';
            }
        }

    };

    $.fn.konami = function (callback) {
        var $this = this;

        $this.on('keydown', function (e) {
            konami.input += e.keyCode;

            if (konami.isValid() && !konami.hasFired) {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }

            konami.resetInvalidInput();
        });


        return this;
    };

})(jQuery);