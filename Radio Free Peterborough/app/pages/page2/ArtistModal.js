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
		
		var artistDetailURL = 'http://radiofreepeterborough.ca/ionic_artist_details.php?artist_nid=' + this.nid;
		
		console.log("Loading " +  artistDetailURL );
		
		document.http.get( artistDetailURL ).map(res => res.json()).subscribe(data => {

			this.bio = data.biography;		
			this.recordings 	= [];
			this.recording_nids = [];
			 
			for( index in data.recordings ) {
				
				var recording_title = data.recordings[index];
				this.recordings.push( recording_title );
				this.recording_nids.push( index );
				//console.log( " see index " + index  );
			}
			
			
			



		//	console.log("RECORDINGS FROM DATA: " + this.recordings[ 123 ] );
			
				
	   });
	
	
	
		
		
		
		
		//document.getElementById( '#biography' ).innerHTML( 'here is the bio - TODO load this from server');
		
	}
	
	
	onRecordingClick( $event ) {
		
		var recording = $event.target.innerHTML.trim();
		
		console.log("NEEDS TO CHECK FOR HTML AND PARSE IT OUT FOR THIS...");
		console.log( "clicked recording " + $event + " target is " + recording );
	}
		



}



