import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCgXH7ZJr4X7gKCo1dsX9gOVIjpMvpHtfg",
      authDomain: "recipesbook-845f3.firebaseapp.com",
      databaseURL: "https://recipesbook-845f3.firebaseio.com",
      projectId: "recipesbook-845f3",
      storageBucket: "recipesbook-845f3.appspot.com",
      messagingSenderId: "426449704619"
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
