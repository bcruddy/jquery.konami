(function () {

    'use strict';

    var konami = null;
    $('body').konami({
        onInit: function (plugin) {
            konami = plugin;
        }
    });

    function setupModule() {
        $('body').on('keydown', function (e) {
            konami.input += e.keyCode;
        });
    }

    QUnit.module('konami', { setup: setupModule });

    QUnit.test('keydown listener', function (assert) {
        assert.expect(1);

        konami.input = '';

        var event = jQuery.Event('keydown');
        event.keyCode = 50;
        $('body').trigger(event);

        ok(konami.input.length === 2, 'capturing keyboard input');
    });

    QUnit.test('pattern match', function (assert) {
        assert.expect(3);

        var mock = {
            input: konami.settings.pattern,
            settings: { pattern: konami.settings.pattern }
        };

        ok(konami.isPatternMatch.call(mock), 'accepts valid pattern');

        mock.input = '1234';
        ok(!konami.isPatternMatch.call(mock), 'rejects invalid pattern');

        konami.resetInvalidInput.call(mock);
        ok(mock.input === '', 'invalid pattern resets input');
    });

    QUnit.test('pattern match allowed', function (assert) {
        assert.expect(3);

        var mock = {
            hasFiredMatch: false,
            settings: { once: true }
        };

        ok(konami.isMatchAllowed.call(mock), 'accepts valid condition 1');

        mock.hasFiredMatch = true;
        ok(!konami.isMatchAllowed.call(mock), 'rejects invalid condition');

        mock.settings.once = false;
        ok(konami.isMatchAllowed.call(mock), 'accepts valid condition 2');
    });
})();