import {Page, NavController, NavParams, Component, Http, Alert } from 'ionic/ionic';
import {RecordingModal} from './RecordingModal';

@Page({
   templateUrl: 'build/pages/page2/artistModal.html',
})

export class ArtistModal {
		constructor( nav: NavController, navParams: NavParams ) {
		
		this.nav = nav; 
		this.params = navParams;
		this.name = navParams.get('name');
		this.nid  = navParams.get( 'nid');
		this.bio = 'Loading artist details...';
		this.recordings = [];
		console.log( "Loaded detail page for artist nid " + this.nid +  " - " + this.name );
		
		if( this.nid != undefined ) {
		
			var artistDetailURL = 'http://radiofreepeterborough.ca/ionic_artist_details.php?artist_nid=' + this.nid;		
			document.http.get( artistDetailURL ).map(res => res.json()).subscribe(
			data => {

				this.bio = data.biography;		
				this.recordings 	= data.recordings;
				this.recording_nids = data.recording_nids;
			},
			err => {
			        console.log("Oops!");
					let alert = Alert.create({  
							title: 'Error:  Offline',
						      subTitle: 'I cannot seem to get to the Internet - are you offline?',
						      buttons: ['Ok']
						} );
					this.nav.present( alert );
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
				
				console.log( "Compairing *" + recording + "* with *" + this.recordings[x] + '*' );
						
				if( recording.localeCompare( this.recordings[x].trim()) == 0) { 
					index = x; 
				}
			}
			
			console.log( "RECORDING IS IN POSITION " + index );
			console.log( "NID SHOULD BE " + this.recording_nids[index]);
			
			this.nav.push( RecordingModal, { 
				name:  recording, 
				nid: this.recording_nids[ index ] });
		}
	}
		



}



