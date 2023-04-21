import { Component, OnInit } from '@angular/core';
// import { Market } from '@ionic-native/market/ngx';
import firebase from 'firebase'; 
import swal from 'sweetalert';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  package = [] as any;
  
  constructor(
    // private market: Market,
  ) { }

  ngOnInit() {
    firebase.database().ref('package').once('value', data => {
      this.package = data.val()
    });
  }

  open(x) {
    if (x != 'huawei') {
      // this.market.open(this.package.vendor[x]);
    } else {
      swal({
        title: '系统提示',
        text: '请更新系统',
        timer: 2000,
        closeOnEsc: false,
        closeOnClickOutside: false,
        buttons: [false],
      })
    }
  }

}
