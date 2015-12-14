/**
 * Created by bruddy on 12/13/15.
 */

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

module('konami', { setup: setupModule });

QUnit.test('keydown listener', function (assert) {
    assert.expect(1);

    konami.input = '';

    var event = jQuery.Event('keydown');
    event.keyCode = 50;
    $('body').trigger(event);

    ok(konami.input.length === 2, 'capturing keydown events');
});

QUnit.test('good pattern match', function (assert) {
    assert.expect(1);

    konami.input = konami.settings.pattern;
    ok(konami.isPatternMatch(), 'valid pattern accepted');
});

QUnit.test('bad pattern match', function (assert) {
    assert.expect(2);

    konami.input = '1234';
    ok(!konami.isPatternMatch(), 'invalid pattern rejected');

    konami.resetInvalidInput();
    ok(konami.input === '', 'invalid pattern resets konami.input');
});

QUnit.test('onPatternMatch invoked', function (assert) {
    assert.expect(1);

    konami.input = konami.settings.pattern;
    konami.settings.onPatternMatch = function () {
        return 'invoked successfully';
    };
    konami.listen({ keyCode: '' });

    ok(konami.hasFiredMatch, 'callback invoked');
});

QUnit.test('fnExists recognizes available functions', function (assert) {

    assert.expect(konami.settings.methods.length);

    konami.settings.methods.forEach(function (fn) {
        ok(konami.fnExists(fn), fn + ' available');
    });
});
