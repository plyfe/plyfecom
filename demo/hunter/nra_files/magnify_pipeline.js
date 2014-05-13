var MagnifyPipeline = { 
	states: {		
		'-1': "unstarted",
		'0': "ended",
		'1': "playing",
		'2': "paused",
		'3': "buffering",
		'5': "cued"
	}
};

MagnifyPipeline.Control = Class.create({
	initialize: function( config ) {
		this.id = config.id;
	},
	
	skip: function() {
		try {
			if ( ( typeof(loadNext) == 'function' ) ) {
				setTimeout(loadNext, 1000);
			} else if ( ( typeof(magnifyEmbeddablePlayer.loadNext) == 'function' ) ) {
				setTimeout( function() { magnifyEmbeddablePlayer.loadNext() }, 1000);			
			}
		} catch(e) { }
	},
	
	loadNext: function() {
		try {
			if ( ( typeof(loadNext) == 'function' ) ) {
				loadNext();
			} else if ( ( typeof(magnifyEmbeddablePlayer.loadNext) == 'function' ) ) {
				magnifyEmbeddablePlayer.loadNext();
			}
		} catch(e) { }
	},
	
	pause: function() {
		if ( this.player )
			this.player.pauseVideo();
	},
	
	play: function() {
		if ( this.player )
			this.player.playVideo();
	}
});


MagnifyPipeline.Track = Class.create(MagnifyPipeline, {
	initialize: function(config) {
		this.pipeline = config.pipeline;
		this.id = config.id;
		this.duration = config.duration;
		var stats = new MagnifyStats.Video( config );
		stats.registerTracker( this );
		this.stats = stats;
		this.lastState = -1;
		this.currentState = -1;
		this.currentOffset = 0;
		this.continuousPlay = config.continuousPlay;
		this.lastOffset = 0;
		this.controller = new MagnifyPipeline.Control(config);
		
		if ( config.omniture ) {
			this.stats.debug( config.omniture );
			var omnitureConfig = config.omniture;
			this.omniture = true;
			this.mediaTitle = omnitureConfig.mediaTitle;
			this.trackSeconds = omnitureConfig.trackSeconds;
			this.trackMilestones = omnitureConfig.trackMilestones;	
			this.contextDataMapping = omnitureConfig.contextDataMapping;	
			try {
				this.initOmnitureTracking();
			} catch(e) {  }
		}
	},
								
	trackPlayer: function( player ) {
		this.stats.debug("tracking player");
		this.stats.registerPlayer( player );
		this.player = player;
		
		if ( typeof magnifyEmbeddablePlayer !== 'undefined' ) {
			this.controller.player = player;
			magnifyEmbeddablePlayer.registerController(this.controller);
		}
	},
	
	videoError: function(error) {
		if ( this.controller ) {
			this.controller.skip();
		}
	},
	
	monitorStateChange: function( state ) {
		var tracking = this;
		var evt = MagnifyPipeline.states[state];
		this.stats.debug("monitoring state change");
		
		this.lastState = this.currentState;
		this.currentState = state;
		
		var offset = Math.round( this.player.getCurrentTime() );
		this.lastOffset = this.currentOffset;
		this.currentOffset = offset;
		
		if ( this.lastState < 0 ) {
			this.stats.debug("state is " + this.lastState + " starting tracking");
			tracking.startTracking( this.player, evt, offset );
			if ( this.omniture ) {
				this.stats.debug("starting omniture tracking");
				tracking.startOmnitureTracking( this.player, evt, offset );
			}
		}
		
		switch(state) {
			case 0:
			
				if ( tracking.controller )
					tracking.controller.loadNext();
					
				if ( this.lastOffset != this.currentOffset ) {
					tracking.stopTracking(this.player, evt);
					if ( tracking.omniture ) {
						tracking.stopOmnitureTracking(this.player, evt);
					}
				}
			
			case 1:
				if ( this.lastState != this.currentState ) {
					this.stats.debug("I'm resuming at " + offset);
					tracking.resumeTracking(evt, offset);
					if ( tracking.omniture ) {
						tracking.resumeOmnitureTracking(this.player, evt);
					}
				}
				
			case 2:
				if ( this.lastOffset != this.currentOffset ) {
					this.stats.debug("I'm pausing at " + offset);
					tracking.pauseTracking(evt, offset);
					if ( tracking.omniture ) {
						tracking.pauseOmnitureTracking(this.player, evt);
					}
				}			
		}
	},
	
	startTracking: function(player, evtType, offset) {	
		var clipId = this.id;
		this.stats.startLogging({ cid: clipId, p: this.pipeline, d: this.duration }, Math.round( offset ));
	},
	
	pauseTracking: function(evtType, offset) {
		//this.stats.debug("something told me to pause.");
		this.stats.log("e", evtType, Math.round( offset ));
	},
	
	resumeTracking: function(evtType, offset) {
		this.stats.log("s", evtType, Math.round( offset ));
	},
	
	stopTracking: function(player, evtType, offset) {
		var offset = player.getCurrentTime();
		this.stats.stopLogging(Math.round( offset ));
	},
		
	initOmnitureTracking: function() {
		try {
			s.loadModule("Media");
			s.Media.autoTrack = false;
			s.Media.trackWhilePlaying = true;
			
			if ( this.trackSeconds ) {
				s.Media.trackSeconds = this.trackSeconds;
			} else if ( this.trackMilestones ) {
				s.Media.trackMilestones = this.trackMilestones;
				s.Media.segmentByMilestones = true;
			}
			
			s.Media.playerName = this.pipeline + " Player";
			s.Media.trackUsingContextData = true;
			s.Media.contextDataMapping = this.contextDataMapping;
			this.stats.debug("omniture tracking initialized");
		} catch(e) {
			this.stats.debug("omniture init error " + e);
		}
	},	
		
	startOmnitureTracking: function(player, evtType, offset) {
		try {
			s.Media.open(this.mediaTitle, player.getDuration(), this.pipeline + " Player"); 
			s.Media.play(this.mediaTitle, offset); 
		} catch(e) {
			this.stats.debug("omniture start error: " + e);
		}
	},
	
	pauseOmnitureTracking: function(evtType, offset) {
		var offset = this.player.getCurrentTime();
		s.Media.stop(this.mediaTitle, offset); 
	},
	
	resumeOmnitureTracking: function(evtType, offset) {
		var offset = this.player.getCurrentTime();
		s.Media.play(this.mediaTitle, offset); 
	},
	
	stopOmnitureTracking: function(player, evtType, offset) {
		var offset = player.getCurrentTime();
		s.Media.stop(this.mediaTitle, offset); 
		s.Media.close(this.mediaTitle); 
	},	
	
	getPlayerOffset: function() {
		if ( this.player ) 
			return this.player.getCurrentTime();
	}
});