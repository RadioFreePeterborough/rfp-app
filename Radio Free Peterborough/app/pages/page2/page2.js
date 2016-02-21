import {Page, Alert} from 'ionic/ionic';
import {Http} from 'angular2/http';
import {Modal, NavController, NavParams} from 'ionic/ionic';
import {NgFor} from 'angular2/common';
import {Component} from 'angular2/core';

import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {ArtistModal} from './ArtistModal';

import 'rxjs/add/operator/map';
//import * as helpers from 'directives/helpers';


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
	
		this.nav.push( ArtistModal, { name:  thisArtist, nid: document.nid_list[ thisArtist ] } );		
	}

	initializeItems() {

		document.http.get( document.searchURL ).map(res => res.json()).subscribe(
			data => {
	    
			document.items_raw = data[0];
			document.nid_list  = data[1];
			
			if( this.firstInit == false ) {
				
				this.items = data[0];
				this.firstInit = true; 
			}
					console.log("list initialized with " + this.items.length + " artists ");
			
			// wait for the two lists to synch up 
			while( document.items_raw.count != document.nid_list.count ) { 1; } 
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
	      if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
		
	        return true;
	      }
	      return false;
	    })
	}
	else { // searching for a number 
		
		this.items = items_raw.filter((v) => {
	      if (v.indexOf(q) > -1) {

	        return true;
	      }
	      return false;
	    })	
	}
}





