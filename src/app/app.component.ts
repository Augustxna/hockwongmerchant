import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import firebase from "firebase/app";
import "firebase/database"
import { FIREBASE_CONFIG } from './app.firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  version_appstore = '060910';

  constructor(private platform: Platform, private nav: NavController) {
    firebase.initializeApp(FIREBASE_CONFIG);

    firebase.database().ref('versions3').on('value', data => {
      if (data.val()['Appstore']['Vendor'][this.platform.is('ios') ? "ios" : "md"][this.version_appstore]) {
        console.log('good App version')
      } else {
        console.log('bad App version')
        this.nav.navigateRoot('update', { animationDirection: 'forward' });
      }
    })

  }
}
