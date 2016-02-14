import {Page} from 'ionic/ionic';
import {Component, Template} from 'angular2/core';
import {Http} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/page1/page1.html'
})

export class Page1 {
	
  constructor() {

		this.name 			= 'RFP Player';
		document.playStatus = false;
		this.interval 		= null;
		this.currentTrack 	= null;
		document.streamSource = 'http://trentradio.ca:8800/rfp';
		document.trackDataURL = 'http://radiofreepeterborough.ca/ionic_rfp_current_song.php';
		
		
		this.interval 		= setInterval( function() { 
			
			var xmlHttp = new XMLHttpRequest();
			
			xmlHttp.onreadystatechange = function( ) { 
				
				
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		       
					var track = xmlHttp.responseText;
					if( this.currentTrack != track ) {
						
						var track_chunks = track.split( ' - ');
						var artist = track_chunks[0];
						var track  = track_chunks[1];
						
						//console.log("play status: " + document.playStatus );
						
						if( ! document.playStatus ) { return null; }
						
						document.getElementById('artist').innerHTML = artist;
						document.getElementById('track').innerHTML = track;
						
							
						this.currentTrack = track; 
					}
		    }
		    xmlHttp.open("GET", document.trackDataURL , true); 
		    xmlHttp.send(null);
			
		}, 5000 );	
  }

  playerclick() {
	
	var player = document.getElementById("rfp-hidden-player");
	var button   = document.getElementById("playbutton");
	var click_to_play = '<img src="play.png" width="150px;" height="150px;">';
	var click_to_stop = '<img src="stop.png" width="150px;" height="150px;">';
		
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
		document.getElementById( 'track' ).innerHTML = 'Click play to start stream';
		document.getElementById( 'artist' ).innerHTML = '';
		
	}
  }
}
}
