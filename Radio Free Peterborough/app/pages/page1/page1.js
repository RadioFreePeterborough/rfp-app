import {Page} from 'ionic/ionic';
import {Component, Template} from 'angular2/core';
import {Http} from 'angular2/http';


@Page({
  templateUrl: 'build/pages/page1/page1.html'
})

export class Page1 {
  constructor() {

		this.name = 'RFP Player';
		this.playStatus = false;
		this.interval = null;
		this.interval = setInterval( function() { 
			
			var xmlHttp = new XMLHttpRequest();

			xmlHttp.onreadystatechange = function() { 
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		            console.log(xmlHttp.responseText);
		    }
		    xmlHttp.open("GET", 'http://radiofreepeterborough.ca/ionic_rfp_current_song.php' , true); // true for asynchronous 
		    xmlHttp.send(null);
			
		}, 5000 );	
  }

  playerclick() {
	
	var player = document.getElementById("rfp-hidden-player");
	var link = document.getElementById("playbutton");
	
	if( this.playStatus == false ) {
		
		player.play();
		link.text = 'Click to stop';
		this.playStatus = true;	
		
	}
	else {
		
		player.pause();
		link.text = 'Click to stream';
		this.playStatus = false;
	}
  }
	
}
}
