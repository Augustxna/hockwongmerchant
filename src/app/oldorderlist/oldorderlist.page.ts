import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as lodash from 'lodash';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-oldorderlist',
  templateUrl: './oldorderlist.page.html',
  styleUrls: ['./oldorderlist.page.scss'],
})
export class OldorderlistPage implements OnInit {

  constructor(private route: ActivatedRoute, 
    public nav: NavController, 
    private http : HttpClient,public storage: Storage,) { }

    pager

tab = 'processing'

orders

vendor = {}

keyword = ''

com = 0
tra = 0
pro = 0

lang = 'en';
language = {
  "Sales": {
    zh: "銷售",
    en: "Sales",
  },"To Ship": {
    zh: "待发货",
    en: "To Ship",
  },"To Receive": {
    zh: "已出货",
    en: "To Receive",
  },"Completed": {
    zh: "已完成",
    en: "Completed",
  },"Search": {
    zh: "搜索",
    en: "Search Order",
  },
}

ngOnInit() {

  this.storage.create().then(() => {
    this.storage.get('lang').then(data => {
      this.lang = data || 'en';
    })
  });

  firebase.auth().onAuthStateChanged(a => {

    if(a){

      this.http.post('https://hockwon.vsnap.my/dataVendorlogin', { userid: a.uid }).subscribe(a => {
  
        this.vendor = a['data'][1] || {};
        console.log(this.vendor)
    })

    this.http.post('https://hockwon.vsnap.my/datavendorafforders', { id: a.uid }).subscribe(c => {

    this.orders = lodash.chain(c['data']).groupBy('cart_id').map((value, key) => ({ module: key, lists: value , date : value[0].date , name : value[0].buyer_name, inv: this.returnnumber(value[0].inv), collect_type : value[0].collect_type, used : value[0].used,  tracking_number : value[0].tracking_number, contact : value[0].buyer_contact, total : value.reduce((a , b) => (a + b['price_actual']) , 0) })).value() || [];

      console.log(this.orders)

      this.pro = this.lengthof(this.orders.filter( a => this.lengthof(a['used']) == 0 && !a['tracking_number'] ))

      this.tra = this.lengthof(this.orders.filter( a => this.lengthof(a['used']) == 0 && a['tracking_number'] ))

      this.com = this.lengthof(this.orders.filter( a => this.lengthof(a['used']) > 0  ))

    })

    }else{

      this.nav.navigateRoot('tabs/tab1');

    }

  })

// this.bento.getVendor().subscribe(a => {
// if (a) {
// this.vendor = a || {};
// } else {
// this.nav.navigateRoot('home');
// }
// })



// this.bento.getorder().subscribe(a => {

// this.orders = lodash.chain(a).groupBy('cart_id').map((value, key) => ({ module: key, lists: value , date : value[0].date , name : value[0].buyer_name, inv: this.returnnumber(value[0].inv), collect_type : value[0].collect_type, used : value[0].used,  tracking_number : value[0].tracking_number, contact : value[0].buyer_contact, total : value.reduce((a , b) => (a + b['price_actual']) , 0) })).value() || [];

// console.log(this.orders)

// this.pro = this.lengthof(this.orders.filter( a => this.lengthof(a['used']) == 0 && !a['tracking_number'] ))

// this.tra = this.lengthof(this.orders.filter( a => this.lengthof(a['used']) == 0 && a['tracking_number'] ))

// this.com = this.lengthof(this.orders.filter( a => this.lengthof(a['used']) > 0  ))

// })

// this.http.post('https://hockwon.vsnap.my/datavendorafforders', { id: this.vendor.id }).subscribe(c => {


// })


}

back(){

this.nav.pop()

}

filterorder(x){

if(this.tab == 'processing' ){

// return x ? x.filter(a => ( (a['buyer_name'] || '') + (a['inv'] || '') ).toLowerCase()).includes(this.keyword.toLowerCase()) )

return x ? x.filter(a => (( (a['buyer_name'] || '') + (a['inv'] || '') ).toLowerCase()).includes(this.keyword.toLowerCase()) && this.lengthof(a['used']) == 0 && !a['tracking_number'] ) : []

}else if(this.tab == 'track'){

return x ? x.filter(a => (( (a['buyer_name'] || '') + (a['inv'] || '') ).toLowerCase()).includes(this.keyword.toLowerCase()) && this.lengthof(a['used']) == 0 && a['tracking_number'] ) : []

}else{

return x ? x.filter(a => (( (a['buyer_name'] || '') + (a['inv'] || '') ).toLowerCase()).includes(this.keyword.toLowerCase()) && this.lengthof(a['used']) > 0 ) : []

}

// return x 

}

returnnumber(x){

let y = x ? x.toString() : 'no'

if(y.length == 4){

return "INVW-0000"+y

}else if(y.length == 5){

return "INVW-000" + y

}else if(y.length == 6){

return "INVW-00" + y

}else if(y.length == 7){

return "INVW-0" + y

}else if(y.length == 8){

return  "INVW-"+y

}else if(y.length == 3){

return "INVW-00000"+y

}else if(y.length == 2){

return "INVW-000000"+y

}
else if(y.length == 1){

return "INVW-0000000"+y

} 

}

returnt(x){

return x ? x.reduce( (a,b) => ( a + ( ((b['price_now'] - b['price_comm_ori'] - b['price_vsnap'] ) * ( b['qty']) )  + b['price_delivery']) ) ,0 ) : 0 

}

lengthof(x){
return Object.keys(x || []).length
}


godetail(x){

this.nav.navigateForward('oldorderdetail?id=' + x.module)

}

}
