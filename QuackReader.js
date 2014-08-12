if (Meteor.isClient) {

    Template.hello.quackText = function() {
        Log(quackData);
        var lastQuack = Quacks.findOne({}, {
            sort: {
                ts: -1
            }
        }).quack;

        // reactive session variable
        Session.set("quackText", lastQuack);
        Log(lastQuack);
        readme(Session.get("quackText"));

        return Session.get("quackText") || "Welcome to QuackReader. Quacks will appear here when you tap.";
    };

    // audio utils
    html5_audio = function() {
        var a = document.createElement('audio');
        return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
    };

    var play_html5_audio = false;
    if (html5_audio()) play_html5_audio = true;

    play_sound = function(url) {
        if (play_html5_audio) {
            var snd = new Audio(url);
            snd.load();
            snd.play();
        } else {
            $("#sound").remove();
            var sound = $("<embed id='sound' type='audio/mpeg' />");
            sound.attr('src', url);
            sound.attr('loop', false);
            sound.attr('hidden', true);
            sound.attr('autostart', true);
            $('body').append(sound);
        }
    };

    readme = function(txt) {
        play_sound("http://translate.google.com/translate_tts?ie=UTF-8&q=" + Session.get("quackText") + "&tl=en&total=1&idx=0prev=input");
    };

}

Meteor.startup(function() {
    if (Meteor.isServer) {

        //    
    } else {
        // client
        quackData = Meteor.subscribe("lastQuack");
    }
});
