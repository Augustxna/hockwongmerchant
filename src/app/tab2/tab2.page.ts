import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import * as lodash from 'lodash'
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private route: ActivatedRoute,
    public nav: NavController,
    private http: HttpClient,
    public storage: Storage,
  ) { }

  selected_last
  pager

  type = 0;
  tab = 'processing'
  orders
  vendor = {} as any;
  keyword = ''
  select = [] as any;
  com = 0
  tra = 0
  pro = 0

  selected = -1;

  date_user_create = new Date().toISOString(); // user signup date
  date_today = new Date().toISOString(); // today

  date_start_temp = new Date().toISOString();
  date_end_temp = new Date().toISOString();

  date_start = new Date().toISOString();
  date_end = new Date().toISOString();
  lang = 'en';
  language = {
    'Online Sales': {
      zh: '线上订单',
      en: 'Online Sales',
    }, 'MY SALES': {
      zh: '我的销售',
      en: 'MY SALES',
    }, 'Eat & Travel': {
      zh: '吃喝玩乐',
      en: 'Eat & Travel',
    }, 'In-App Order': {
      zh: '平台订单',
      en: 'In-App Order',
    }, 'Search': {
      zh: '查询',
      en: 'Search',
    }, 'Reset': {
      zh: '重置',
      en: 'Reset',
    }, 'Done': {
      zh: '完成',
      en: 'Done',
    }, 'Complete': {
      zh: '已完成',
      en: 'Complete',
    }, 'Pending': {
      zh: '待发货',
      en: 'Pending',
    }, 'Delivering': {
      zh: '已出货',
      en: 'Delivering',
    }, 'Delivery': {
      zh: '配送模式',
      en: 'Delivery',
    }, 'Self Collect': {
      zh: '自取模式',
      en: 'Self Collect',
    }, 'No Tracking Information': {
      zh: '暂无邮寄信息',
      en: 'No Tracking Information',
    }, 'Collected': {
      zh: '已取货',
      en: 'Collected',
    }, 'Welcome to the selected shop to collect your order': {
      zh: '欢迎到已选择的商店领取您的订单',
      en: 'Welcome to the selected shop to collect your order',
    }, 'Products': {
      zh: '商品',
      en: 'Products',
    }, 'Total': {
      zh: '总计',
      en: 'Total',
    }, 'No Content': {
      zh: '什么都没有',
      en: 'No Content',
    }, 'Nothing in the list': {
      zh: '列表什么都没有',
      en: 'Nothing in the list',
    }, 'Include Delivery': {
      zh: '包括邮费',
      en: 'Include Delivery',
    },
  }

  reseter(selected) {
    if (selected == 0) {
      this.date_start_temp = this.date_user_create;
    } else {
      this.date_end_temp = this.date_today;
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.dataer();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  choose(selected) {
    if (selected == 0) {
      this.selected = -1;
      this.date_start = this.date_start_temp;
    } else {
      this.selected = -1;
      this.date_end = this.date_end_temp;
    }
  }

  fnb = [] as any;
  id;

  dataer() {
    this.http.post('https://hockwon.vsnap.my:3002/dataVendorlogin', { userid: this.id }).subscribe(a => {
      this.vendor = a['data'][0];
      this.date_start_temp = new Date(this.vendor.date).toISOString();
      this.date_user_create = new Date(this.vendor.date).toISOString();
      this.date_start = new Date(this.vendor.date).toISOString();
    })

    this.http.post('https://hockwon.vsnap.my:3002/getvendorfnb', { vendor_id: this.id }).subscribe(a => {
      console.log(a);
      this.fnb = a['data'];
    })

    this.http.post('https://hockwon.vsnap.my:3002/datavendororders', { id: this.id }).subscribe(a => {
      console.log(a);

      this.orders = lodash.chain(a['data']).groupBy('cart_id').map((value, key) =>
      ({
        module: key, lists: value, date: value[0].date, name: value[0].buyer_name,
        inv: this.returnnumber(value[0].inv), collect_type: value[0].collect_type,
        buyer_name: value[0].buyer_name,
        used: value[0].used,
        tracking_account: value[0].tracking_account,
        price_delivery : value[0].price_delivery,
        contact: value[0].buyer_contact,
        total: value.reduce((a, b) => (a + (b['price_buy'] * a['qty']) + a['price_delivery']), 0),
        origin: value.origin || 'out',
        type: value.type,
      })).value() || [];
      this.pro = this.lengthof(this.orders.filter(a => this.lengthof(a['used']) == 0 && !a['tracking_account']))
      this.tra = this.lengthof(this.orders.filter(a => this.lengthof(a['used']) == 0 && a['tracking_account']))
      this.com = this.lengthof(this.orders.filter(a => this.lengthof(a['used']) > 0))

      console.log(this.orders);

    })
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    this.route.queryParams.subscribe(params => {

      console.log(params)
      if(params.tab != undefined)
      {
        this.tab = params.tab
      }
      // this.tab = (this.tab ? this.tab : params.tab)

      

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.id = user.uid
          this.dataer();
        }
      })
    })

  }

  back() {
    this.nav.pop()
  }

  filterorder(x, y) {
    if (y == 'processing') {
      return x ? x.filter(a => (((a['buyer_name'] || '') + (a['inv'] || '')).toLowerCase()).includes(this.keyword.toLowerCase())
        // && this.type == 1 ? a.type == 'foods' : (this.type == 2 ? a.origin == 'in' : a.origin == 'out')
        && this.type == 1 ? a.type == 'foods' : true
        && this.lengthof(a['used']) == 0
        && !a['tracking_account']
        && new Date(a.date).toISOString() >= this.date_start
        && new Date(a.date).toISOString() <= this.date_end
      ) : []
    } else if (y == 'track') {
      return x ? x.filter(a => (((a['buyer_name'] || '') + (a['inv'] || '')).toLowerCase()).includes(this.keyword.toLowerCase())
        // && this.type == 1 ? a.type == 'foods' : (this.type == 2 ? a.origin == 'in' : a.origin == 'out')
        && this.type == 1 ? a.type == 'foods' : true
        && this.lengthof(a['used']) == 0
        && a['tracking_account']
        && new Date(a.date).toISOString() > this.date_start
      && new Date(a.date).toISOString() < this.date_end
      ) : []
    } else {
      return x ? x.filter(a => (((a['buyer_name'] || '') + (a['inv'] || '')).toLowerCase()).includes(this.keyword.toLowerCase())
        // && this.type == 1 ? a.type == 'foods' : (this.type == 2 ? a.origin == 'in' : a.origin == 'out')
        && this.type == 1 ? a.type == 'foods' : true
        && this.lengthof(a['used']) > 0
        && new Date(a.date).toISOString() > this.date_start
      && new Date(a.date).toISOString() < this.date_end
      ) : []
    }
  }

  filtereat(x) {
    return x ? x.filter(a => (((a['buyer_name'] || '') + (a['inv'] || '')).toLowerCase()).includes(this.keyword.toLowerCase())
      && new Date(a.date).toISOString() >= this.date_start
      && new Date(a.date).toISOString() <= this.date_end
    ) : []
  }

  returnnumber(x) {
    let y = x ? x.toString() : 'no'
    if (y.length == 4) {
      return "INVW-0000" + y
    } else if (y.length == 5) {
      return "INVW-000" + y
    } else if (y.length == 6) {
      return "INVW-00" + y
    } else if (y.length == 7) {
      return "INVW-0" + y
    } else if (y.length == 8) {
      return "INVW-" + y
    } else if (y.length == 3) {
      return "INVW-00000" + y
    } else if (y.length == 2) {
      return "INVW-000000" + y
    } else if (y.length == 1) {
      return "INVW-0000000" + y
    }
  }

  // returnt(x) {
  //   return x ? x.reduce((a, b) => (a + ((b['price_now'] * b['qty']) - ((b['price_comm'] + b['price_vsnap']) * b['qty']))), 0) : 0
  // }

  returnt(x) {
    return x ? x.reduce((a, b) => (a + ((b['price_retail'] * b['qty']))), 0) : 0

  }

  lengthof(x) {
    return Object.keys(x || []).length
  }

  godetail(x) {
    this.nav.navigateForward('order-detail?id=' + x.module)
  }

}
