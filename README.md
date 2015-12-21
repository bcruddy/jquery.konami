#jquery.konami

Embed keyboard-accessible easter eggs in your website. Using it? Let me know, I'll add you to the list!

##The List
- [Photofy](http://photofy.com)

##Usage

Available via `npm install jquery.konami` [package on npm](https://www.npmjs.com/package/jquery.konami)

Konami accepts an options object with the follow properties:

- onInit - function to be called when plugin initializes
- onPatternMatch - function to be called when keyboard input matches pattern
- once (boolean) - when true, only call `onPatternMatch()` once. Default: `true`
- pattern (string) - pattern to be matched. Default: up, up, down, down, left, right, left, right, b, a

And emits the following events:

- 'konami.init' - emitted when plugin is initialized
- 'konami.match' - emitted when user input matches pattern. Does not respect `options.once`

Code:

    <script src="path/to/jquery"></script>
    <script src="path/to/konami.min.js"></script> // or konami.js
    
    // Callback based
    <script>
        var options = { 
             pattern: [71, 79, 80, 65, 84, 82, 73, 79, 84, 83].join(''), // gopatriots
             onPatternMatch: function (e, data) {
                $('#pats-banner').animate({ left: -20% }, 4000).fadeOut();
             }
        };
        $('body').konami(options);
    </script>
    
    // Event Based
    <script>
        $('body')
            .on('konami.init', function (e, data) {
                console.log('konami.init');
            })
            .on('konami.match', function (e, data) {
                console.log('konami.match!');
            })
            .konami(); 
    </script>
    
