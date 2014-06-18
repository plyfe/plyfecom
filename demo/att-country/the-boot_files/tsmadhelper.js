(function(){
	var TSMAdHelper,
		TSMAdSettings = {
			activeSlots:[],
			adSlotSettings:{
				'top-728x90':{
					adunit:'top-728x90',
					sizes:[[728,90],[970,90],[970,250]],
					pos:['atf', '728a']
				}
				,'bottom-728x90':{
					adunit:'bottom-728x90',
					sizes:[728,90],
					pos:['btf', '728b']
				}
				,'top-right-300x250':{
					adunit:'top-right-300x250',
					sizes:[[300,250],[300,600]],
					pos:['atf', '300a'],
					right:'top'
				}
				,'bottom-right-300x250':{
					adunit:'bottom-right-300x250',
					sizes:[300,250],
					pos:['btf', '300b'],
					right:'bottom'
				}
				,'mid-top-300x250':{
					adunit:'mid-top-300x250',
					sizes:[300,250],
					pos:['btf', '300c'],
					mid:'top'
				}
				,'mid-bottom-300x250':{
					adunit:'mid-bottom-300x250',
					sizes:[300,250],
					pos:['btf', '300d'],
					mid:'bottom'
				}
				,'dynamic-ad-custom':{
					adunit:'dynamic-ad-custom',
					sizes:[1,1],
					pixel:'1'
				}
				,'dynamic-ad-header':{
					adunit:'dynamic-ad-header',
					sizes:[1,1],
					pixel:'2'
				}
				,'dynamic-ad-push':{
					adunit:'dynamic-ad-push',
					sizes:[1,1],
					pixel:'3'
				}
				,'tsm-out-of-page':{
					adunit:'tsm-out-of-page'
				}
			},
			adPageSettings:{
				pageSettings:{
					sitetype:'',
					market:'',
					callletters:'',
					pagetype:''
				},
				attrs:{
					catid:'',
					id:'',
					//kv:'',
					kw:'',
					author:'',
					device:'web'
				}
			}
		},
		version = 'dfp6';
	window.initializedAdSlots = [];

	TSMAdHelper = {
		vars:{
			'dfp6':{
				googleJs:'//www.googletagservices.com/tag/js/gpt.js',
				pubId:'8328825',
				async:1
			}
		},

		initializedAdSlots:{},

		init:function(){
			var customHelperSettings = typeof TSMAdHelperSettings === 'undefined'?{}:TSMAdHelperSettings;

			this.vars = jQuery.extend( true, {}, this.vars, customHelperSettings );

			TSMAdSettings = jQuery.extend( true, {}, TSMAdSettings, window.TSMAdSettings );
			if( this.vars[ version ].async ){
				jQuery( document).ready(function(){
					TSMAdHelper.getGoogleScript();
					TSMAdHelper.initAllslots();
					TSMAdHelper.initPageAttrs( TSMAdSettings.adPageSettings.attrs );
					TSMAdHelper.showAllAds();
				});
			}else{
				this.initAllslots();
				this.initPageAttrs( TSMAdSettings.adPageSettings.attrs );
			}
		},

		getGoogleScript:function(){
			this.igniteGetScript( this.vars[ version ].googleJs );
		},

		initSlotAttrs:function( args ){		//add attributes to the slot
			var self = this;

			this.sendCodeToGoogle(function(){
				var ad = self.initializedAdSlots[ args.adunit ];
				if( args.pos !== undefined ){
					ad.setTargeting("pos", args.pos );
				}
				if( args.mid !== undefined ){
					ad.setTargeting( "mid", args.mid );
				}
				if( args.requestsize !== undefined ){
					ad.setTargeting( "requestsize", args.requestsize );
				}
				if( args.right !== undefined ){
					ad.setTargeting( "right", args.right );
				}
				if( args.pixel !== undefined ){
					ad.setTargeting( "pixel", args.pixel );
				}
			});
		},

		getBodyCss:function(){
			var self = this,
				$body = jQuery('body');
			self.css = {
				'body':{
					'background': [ $body.css( 'background-image' ), $body.css( 'background-repeat' ), $body.css( 'background-attachment' ), $body.css( 'background-position' ), $body.css( 'background-color' ) ].join( ' ' )
				}
			};
		},

		initPageAttrs:function( args ){
			var self = this;
			this.sendCodeToGoogle(function(){
				for( var key in args ){
					googletag.pubads().setTargeting( key, args[ key ] );
				}
				if( self.vars[ version ].async ){
					googletag.pubads().enableAsyncRendering();
					//googletag.pubads().enableSingleRequest();
				}else{
					googletag.pubads().enableSyncRendering();
				}
				googletag.pubads().collapseEmptyDivs();
				googletag.enableServices();
			});
		},

		initAllslots:function(){
			//for( var slot in TSMAdSettings.adSlotSettings ){
			for( var i in TSMAdSettings.activeSlots ){
				if( !this.initSlot( TSMAdSettings.adPageSettings.pageSettings, TSMAdSettings.adSlotSettings[ TSMAdSettings.activeSlots[ i ] ] ) ){
					return;
				}else{
					this.initSlotAttrs( TSMAdSettings.adSlotSettings[ TSMAdSettings.activeSlots[ i ] ] );
				}
			}
		},

		initSlot:function( pageSettings, args, doInitAttributes ){
			var isError = 0, self = this;

			if( pageSettings === undefined ){
				pageSettings = TSMAdSettings.adPageSettings.pageSettings;
			}
			for( var setting in pageSettings ){
				if( jQuery.trim( pageSettings[ setting ] ) == '' ){
					isError = 1;
					try{console.log( 'Missing PageSetting: ' + setting );}catch(e){}
				}
			}
			if( isError ){
				return 0;
			}
			//init the slot
			this.sendCodeToGoogle(function(){
				var slotid = '';
				if( pageSettings.sitetype.toLowerCase() === 'national' ){
					slotid = [
						"",
						self.vars[ version ].pubId,
						pageSettings.sitetype,
						pageSettings.callletters,
						pageSettings.pagetype
					].join( '/' );		//produces something like: '/8328825/National/popcrush/type'
				}else{
					slotid = [
						"",
						self.vars[ version ].pubId,
						pageSettings.sitetype,
						pageSettings.market,
						pageSettings.callletters,
						pageSettings.pagetype
					].join( '/' );		//produces something like: '/8328825/Local/Augusta/WEBB/type'
				}
				if( args.sizes === undefined ){
					self.initializedAdSlots[ args.adunit ] = googletag
						.defineOutOfPageSlot(
							slotid,
							args.adunit
						)
						.addService( googletag.pubads() );
				}else{
					self.initializedAdSlots[ args.adunit ] = googletag
						.defineSlot(
							slotid,
							args.sizes,
							args.adunit
						)
						.addService( googletag.pubads() );
				}

				if( doInitAttributes ){
					self.initSlotAttrs( args );
				}
			});
			return 1;
		},

		showAllAds:function(){
			for( var i in TSMAdSettings.activeSlots ){
				this.showAdSlot( TSMAdSettings.activeSlots[i] );
			}
		},

		showAdSlot:function( adunit ){
			TSMAdHelper.sendCodeToGoogle(function(){
				googletag.display( adunit );
			});
		},

		refreshSlot:function( slots ){
			googletag.pubads().refresh( slots );
		},

		addActiveSlot:function( zone, args ){
			var self = this,
				pageArgs = TSMAdSettings.adPageSettings.pageSettings;
			pageArgs.pagetype = zone || pageArgs.pagetype;
			TSMAdHelper.initSlot( pageArgs, args, true );
		},

		sendCodeToGoogle:function( fn ){
			//when in async, google can accept code passed in as function to googletag.cmd - it is like a queue.
			//when in sync, this queuing works on all browsers except for IE8.
			//make queuing happen only when async mode is on. replace all calls to googletag.cmd.push with sendCodeToGoogle
			if( this.vars[ version ].async ){
				googletag.cmd.push( fn );
			}else{
				fn();
			}
		},

		igniteGetScript:function(n,t,a){var a=(a===undefined)?false:true,i=document.createElement("script"),r=document.getElementsByTagName("head")[0],done;i.src=n,done=!1,i.onload=i.onreadystatechange=function(){done||this.readyState&&this.readyState!="loaded"&&this.readyState!="complete"||(done=!0,i.onload=i.onreadystatechange=null,r.appendChild(i),t!==undefined&&t())},r.appendChild(i)}
	};

	if( typeof jQuery === 'undefined' ){
		TSMAdHelper.igniteGetScript( 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(){
			//jQuery(document).ready(function(){
				TSMAdHelper.init();
			//});
		});
	}else{
		//jQuery(document).ready(function(){
			TSMAdHelper.init();
		//});
	}
	window.TSMAdHelperObj = {
		initializedAdSlots:TSMAdHelper.initializedAdSlots,
		refreshSlot:TSMAdHelper.refreshSlot,
		addActiveSlot:TSMAdHelper.addActiveSlot,
		showAdSlot:TSMAdHelper.showAdSlot
	};

	/*window.TSMAdHelperObj = function(){
	 return {
	 fn:{
	 initSlot:TSMAdHelper.initSlot,
	 showAdSlot:TSMAdHelper.showAdSlot
	 }
	 };
	 }*/
})();