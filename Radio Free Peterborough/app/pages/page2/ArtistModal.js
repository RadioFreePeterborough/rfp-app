import {Page, NavController, NavParams, Component, Http } from 'ionic/ionic';
import {Inject} from 'angular2/core';

@Page({
   templateUrl: 'build/pages/page2/artistModal.html',

})

export class ArtistModal {
		constructor( navParams: NavParams ) {
		
		this.params = navParams;
		this.name = navParams.get('name');
		this.nid  = navParams.get( 'nid');
		this.bio = 'Loading artist details...';
		this.recordings = [];
		
		if( this.nid != undefined ) {
		
			var artistDetailURL = 'http://radiofreepeterborough.ca/ionic_artist_details.php?artist_nid=' + this.nid;
			
			console.log( 'loading ' + artistDetailURL );
			
			document.http.get( artistDetailURL ).map(res => res.json()).subscribe(data => {

				this.bio = data.biography;		
				this.recordings 	= data.recordings;
				this.recording_nids = data.recording_nids;
			}			
	  });
	}
	
	
	onRecordingClick( $event ) {
		
		var recording;
		if( $event.target.innerHTML.indexOf( 'ion-label') > 0  ) {
			
			var chunks = $event.target.innerHTML.split( '>');
			chunks = chunks[2].split( '<');
			recording = chunks[0].trim();
		}
		else {
			recording = $event.target.innerHTML.trim();
		}
				
		if( recording != '' && recording != undefined ) {
			
			var index = null;
			
			// find the index of this recording - we don't have many per artist so iteration is fine here
			for(  var x =0;  x < this.recordings.length; ++x ) {
								
				if( recording.match( this.recordings[x])) { index = x; }
			}
			
			console.log( "Show Modal for *" + recording + "  -- nid is:  " + this.recording_nids[index] );
		}
	}
		



}



