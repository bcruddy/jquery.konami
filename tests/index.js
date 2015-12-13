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

    equal(konami.input.length, 2);
});

QUnit.test('good pattern match', function (assert) {
    assert.expect(1);

    konami.input = '38384040373937396665';
    ok(konami.patternMatch(), 'valid pattern accepted');
});

QUnit.test('bad pattern match', function (assert) {
    assert.expect(2);

    konami.input = '1234';
    ok(!konami.patternMatch(), 'invalid pattern rejected');

    konami.resetInvalidInput();
    ok(konami.input === '', 'invalid pattern resets input');
});

QUnit.test('onPatternMatch invoked', function (assert) {
    assert.expect(1);

    konami.input = '38384040373937396665';
    konami.settings.onPatternMatch = function () {
        return 'invoked successfully';
    };
    konami.listen({ keyCode: '' });

    ok(konami.hasFired, 'callback invoked');
});
