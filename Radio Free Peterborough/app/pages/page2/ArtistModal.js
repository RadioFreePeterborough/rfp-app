import {Page, NavController, NavParams, Component } from 'ionic/ionic';
import {Inject} from 'angular2/core';

@Page({
   templateUrl: 'build/pages/page2/artistModal.html',

})

export class ArtistModal {
		
	constructor( @Inject(NavController) nav: NavContoller ) {
		
		this.nav = nav;
		
		console.log("Artist Popup created now..");	
	}
}


