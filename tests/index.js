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

        equal(konami.input.length, 2, 'capturing keyboard input');
    });

    QUnit.test('isPatternMatch', function (assert) {
        assert.expect(3);

        var mock = {
            input: konami.settings.pattern,
            settings: { pattern: konami.settings.pattern }
        };

        ok(konami.isPatternMatch.call(mock), 'accepts valid pattern');

        mock.input = 'not the expected pattern';
        ok(!konami.isPatternMatch.call(mock), 'rejects invalid pattern');

        konami.resetInvalidInput.call(mock);
        equal(mock.input.length, 0, 'invalid pattern resets input');
    });

    QUnit.test('isMatchAllowed', function (assert) {
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