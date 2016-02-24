import {Page, NavController, Alert} from 'ionic/ionic';
import {Component, Template} from 'angular2/core';
import {Http} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/page1/page1.html'
})

export class Page1 {
	
  constructor( nav: NavController ) {

		this.name 				= 'RFP Player';
		document.playStatus 	= false;
		this.interval 			= null;
		this.currentTrack 		= null;
		document.streamSource 	= 'http://trentradio.ca:8800/rfp';
		document.trackDataURL 	= 'http://radiofreepeterborough.ca/ionic_rfp_current_song.php';
		document.nav 			= nav;
	
		this.interval = setInterval( function() { 
			
			var xmlHttp = new XMLHttpRequest();
			
			xmlHttp.onreadystatechange = function( ) { 
							
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		       
					var track = xmlHttp.responseText;
					if( this.currentTrack != track ) {
						
						var track_chunks = track.split( ' - ');
						var artist = track_chunks[0];
						var track  = track_chunks[1];
						
						if( ! document.playStatus ) { return null; }
						
						document.getElementById('artist').innerHTML = artist;
						document.getElementById('track').innerHTML  = track;
							
						this.currentTrack = track; 
					}
		    	}
			}
			
			if( document.playStatus ) {
		    	xmlHttp.open("GET", document.trackDataURL , true);    
		    	xmlHttp.send(null);	
			}
		}, 5000 );	
		
		var player = document.getElementById("rfp-hidden-player");
		if( player != null) {

			player.pause();
			var button   = document.getElementById("playbutton");
			button.innerHTML = '<img src="play.png" width="70px;" height="70px;">';
			this.playStatus = false;
			player.onended = function() { null; } // clear the onended handler
		}	
  }

  playerclick() {
	
	var player = document.getElementById("rfp-hidden-player");
	
	// Set up an error handler for offline
	player.addEventListener('error', function failed(e) {
				   
			let alert = Alert.create({  
					title: 'Error:  Offline',
				      subTitle: 'I cannot seem to get to the Internet - are you offline?',
				      buttons: ['Ok']
				} );
			document.nav.present( alert );
		});		
	
	var button   = document.getElementById("playbutton");
	var click_to_play = '<img src="play.png" width="70px;" height="70px;">';
	var click_to_stop = '<img src="stop.png" width="70px;" height="70px;">';
		
	if( document.playStatus == false ) {
		
		player.setAttribute( 'src', document.streamSource );
		player.play();
		button.innerHTML = click_to_stop;
		document.playStatus = true;		
		document.getElementById( 'artist' ).innerHTML = 'Loading track info..';
		document.getElementById( 'track' ).innerHTML = 'One moment please..';
	}
	else {
	
		player.pause();	
		player.setAttribute( 'src', document.streamSource  );	
		button.innerHTML = click_to_play;
		document.playStatus = false;
		document.getElementById( 'track' ).innerHTML = 'Click play to start random stream';
		document.getElementById( 'artist' ).innerHTML = '';
		
	}
   }
   
    onPageWillEnter( $event ) {
	  
	  var button   = document.getElementById("playbutton");
	  var click_to_play = '<img src="play.png" width="70px;" height="70px;">';
	  var click_to_stop = '<img src="stop.png" width="70px;" height="70px;">';
	  var player = document.getElementById("rfp-hidden-player");
	  
	  player.pause();
	  player.setAttribute( 'src', document.streamSource  );	
	  button.innerHTML = click_to_play;
	  document.getElementById( 'track' ).innerHTML = 'Click play to start random stream';
	  document.getElementById( 'artist' ).innerHTML = '';
	  document.playStatus = false;
	  
	  
	  //console.log( "HERE COMES PAGE 1");
  }
   
   
  }
  
 
}
