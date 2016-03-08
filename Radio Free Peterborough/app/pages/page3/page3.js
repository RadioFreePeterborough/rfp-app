import {Page} from 'ionic/ionic';
import {Http} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  constructor(  http: Http ) {
	
	this.artists = this.tracks = this.recordings = this.hours = 'Loading stats...';
	this.http = http;
	var statsURL = 'http://radiofreepeterborough.ca/ionic_stats.php';
	
	this.http.get( statsURL ).map(res => res.json()).subscribe(data => {
	
		this.artists 	= data.artists;
		this.tracks 	= data.tracks;
		this.recordings = data.recordings;
		this.hours 		= data.hours;  
	});
  }
}
