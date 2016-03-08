import {Page, Alert} from 'ionic/ionic';
import {Http} from 'angular2/http';
import {Modal, NavController, NavParams} from 'ionic/ionic';
import {NgFor} from 'angular2/common';
import {Component} from 'angular2/core';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {ArtistModal} from './ArtistModal';
import 'rxjs/add/operator/map';


@Page({
  templateUrl: 'build/pages/page2/page2.html',
 
})

export class Page2 {
  constructor( http: Http, nav: NavController ) {
		
	this.searchQuery = '';
	this.searchInput = '';
   
	document.searchURL = 'http://radiofreepeterborough.ca/ionic_search.php?mode=artist_list';
	document.http = http;
	document.nav  = nav;
	this.nav = nav;
	document.items_raw = null;
	this.firstInit = false;
	this.items = [ 'Loading artist data....' ]; 
	this.initializeItems();
  }

	openModal( thisArtist ) {
		
		// A bit of a hack to get the html entites decoded so they don't break lookup
		var txt = document.createElement('textarea');
		txt.innerHTML = thisArtist;
		thisArtist = txt.value;
		this.nav.push( ArtistModal, { name:  thisArtist, nid: document.nid_list[ thisArtist ] } );		
	}

	initializeItems() {
	
	   // Uncomment to blast local storage...			
	   //	window.localStorage['artists' ] = window.localStorage[ 'artist_nids'] = [];
							
		var stored_artists = JSON.parse( window.localStorage['artists' ] || '{}');
		var artist_nids    = JSON.parse( window.localStorage[ 'artist_nids'] || '{}' );	
		var load_count     = window.localStorage['artists_load_count'] || 0;

		// We force a re-load of artists if we've already loaded the artist list 40 times
		if( stored_artists.length > 0 && load_count < 40  ) { // we have stored artists - no need to pull from the web. 
			
			document.items_raw = stored_artists;
			document.nid_list = artist_nids;
			this.items= document.items_raw;
			this.firstInit = true;
			
			++load_count;
			window.localStorage['artists_load_count'] = load_count;
			return; 
		}
		
		document.http.get( document.searchURL ).map(res => res.json()).subscribe(
			
			data => {
	    
				document.items_raw = data[0];
				document.nid_list  = data[1];
							
				if( this.firstInit == false ) {
				
					window.localStorage['artists_load_count']  = 0;
					this.items = data[0];
					window.localStorage['artists'] 		= JSON.stringify( this.items );
					window.localStorage['artist_nids'] 	= JSON.stringify( data[1] );
						
					this.firstInit = true; 	
				}
	   		},
			err => {
			        
					let alert = Alert.create({  
							title: 'Error:  Offline',
						      subTitle: 'I cannot seem to get to the Internet - are you offline?',
						      buttons: ['Ok']
						} );
					this.nav.present( alert );
			    }
			);		
	}
	
	onSearchCancel($event) { // reset the list
		this.items = document.items_raw;
	}

	onArtistClick($event) {
		
		var artist = '';
		if( $event.target.innerHTML.indexOf( 'ion-item') > 0  ) {
				
			artist = $event.target.firstChild.innerHTML.trim();
		}
		else {
			artist = $event.target.innerHTML.trim();
		}
	
		// ignore clicks on the dividers..
		if( !artist.match( /template/)) {	this.openModal( artist );	}	
	}

  getItems(searchbar) {
   
    this.initializeItems();
    var q = searchbar.value;

    if (q.trim() == '') { return; }

	var items_raw = document.items_raw;

	if( isNaN( q )) {  // searching for text
		
	    this.items = items_raw.filter((v) => {
	      if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) { return true; }
	      return false;
	    })
	}
	else { // searching for a number 
		
		this.items = items_raw.filter((v) => {
	      if (v.indexOf(q) > -1) { return true; }
	      return false;
	    })	
	}
}

onRandomArtistClick( $event ) {
	
	var random = document.items_raw[Math.floor(Math.random()* document.items_raw.length)];
	this.openModal( random );
}





