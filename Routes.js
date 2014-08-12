Router.map(function() {
    this.route('getquacks', {
        // server-side route
        where: 'server',
        path: '/getquacks',
        action: function() {
            Log("asked for a quack");
            Log("Location: " + this.params.lat + "," + this.params.lon);
            var _this = this;
            HTTP.get('http://api.getquacks.com/v1/quack?lat=' + this.params.lat + '&lon=' + this.params.lon + '&version=1', function(err, res) {
            	if (err) {
                	_this.response.end("ERR.:" + err);  
                	return;              
            	} else {
          			var result = JSON.parse(res.content);
          			Log(result);

                    var quackString = result.quackText || "No recent quack in this area";
                    var id = Quacks.insert({
                        quack: quackString,
                        ts: new Date()
                    });
                    _this.response.end("DONE.");
                } 
            });

        }
    });


    this.route('hello', {
        path: '/',
        onBeforeAction: function(pause) {
            if (!quackData.ready()) {
                pause();
                return;
            }
        }
    });
});
