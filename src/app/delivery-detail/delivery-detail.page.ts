import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { ModalController, AlertController, ToastController, NavParams } from '@ionic/angular';
import swal from 'sweetalert'
import firebase from 'firebase';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.page.html',
  styleUrls: ['./delivery-detail.page.scss'],
})
export class DeliveryDetailPage implements OnInit {

  regions = ['Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Perak',
    'Perlis',
    'Pulau Pinang',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu',
    'Kuala Lumpur',
    'Labuan',
    'Putrajaya',
    'Singapore',]
  // exist_state
  exist_state = []

  data = {
    state: [],
    ranges: [{ limit_lower: 0, limit_upper: null, total: null }],
    free_price: 0,
    free_delivery: 0,
    increment_base: 0,   // base price beyond range
    increment_limit: 0,  // base weight beyond range
    increment_unit: 0,
    increment_price: 0,
    vendor_id: '',
    name: '',
  }
  other = '';
  keyword = ''
  show_search = false
  lang = 'en';
  language = {
    'Edit Delivery': {
      zh: '改变邮递',
      en: 'Edit Delivery',
    }, 'Module Name': {
      zh: '模块名字',
      en: 'Module Name',
    }, 'Select States': {
      zh: '选择区域',
      en: 'Select States',
    }, 'Price Range': {
      zh: '价格范围',
      en: 'Price Range',
    }, 'Weight (kg)': {
      zh: '重量 (公克)',
      en: 'Weight (kg)',
    }, 'Total (RM)': {
      zh: '总共 (RM)',
      en: 'Total (RM)',
    }, 'Exceed Weight Price (KG)': {
      zh: '超过重量价格 (公克)',
      en: 'Exceed Weight Price (KG)',
    }, 'The amount that is charged for each increment in weight outside of the range': {
      zh: '超过了指定重量范围的价格',
      en: 'The amount that is charged for each increment in weight outside of the range',
    }, 'Add New Row': {
      zh: '添加新的行列',
      en: 'Add New Row',
    }, 'Additional Settings': {
      zh: '附加设定',
      en: 'Additional Settings',
    }, 'If order total exceed this price (RM)': {
      zh: '如果订单超过这个价格',
      en: 'If order total exceed this price (RM)',
    }, 'Trigger custom delivery above this price': {
      zh: '超过这个价格发动客化邮递',
      en: 'Trigger custom delivery above this price',
    }, 'Delivery fee will be': {
      zh: '邮递费用会是',
      en: 'Delivery fee will be',
    }, 'Custom delivery fee charges': {
      zh: '客化邮递价格',
      en: 'Custom delivery fee charges',
    }, 'Save': {
      zh: '保存',
      en: 'Save',
    }
  }



  constructor(private modalController: ModalController, public alertController: AlertController, private http: HttpClient,
    public storage: Storage,
    public toastController: ToastController, private navParams: NavParams) { }



  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    // updatedelivery
    this.data = this.navParams.get('data')

    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.http.post('https://hockwon.vsnap.my:3002/getvendordeliverystate', { uid: a.uid }).subscribe(a => {
          // console.log(a['data'][0].changes);
          // console.log(this.regions);
          // this.data.state = a['data'][0].changes
          let temp = a['data'][0].changes
          console.log(temp);

          this.regions = this.regions.filter(a => !this.lengthof(temp.filter(b => a == b)))
          this.regions = this.regions.concat(this.navParams.get('data').state)

          console.log(this.regions);
          // console.log(this.navParams.get('data').state);

          this.exist_state = this.navParams.get('data').state
          // console.log(this.exist_state);

        })
      }
    })

    this.lengthof(this.data['ranges']) ?
      this.data['ranges'].filter(a => {
        a['limit_lower'] = a['limit_lower'] / 1000,
          a['limit_upper'] = a['limit_upper'] / 1000
      })
      : [];

    this.data['increment_unit'] = this.data['increment_unit'] / 1000;
  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0
  }

  getBaseWeight() {
    let copy = JSON.parse(JSON.stringify(this.data['ranges']))
    return this.lengthof(this.data['ranges']) > 1 ? copy.sort((a, b) => ((a['limit_upper'] || 0) > (b['limit_upper'] || 0) ? -1 : 1))[0]['limit_upper'] : (copy[0]['limit_upper'] == null || copy[0]['limit_upper'] == 0 ? 'N/A' : copy[0]['limit_upper'])
  }

  close() {
    this.modalController.dismiss('back')
  }

  filterRegion() {
    return this.regions.filter(a => (
      (this.keyword != '' ? (a.toLowerCase()).includes((this.keyword || '').toLowerCase()) : a) && (this.data['state'] || ['No States Pushed Yet']).every(b => (b != a))

    )).sort((a, b) => (a > b ? 1 : -1))
  }

  filterRegion2() {
    return this.regions.filter(a => ((this.data['state'] || ['No States Pushed Yet']).every(b => (b != a))
    )).sort((a, b) => (a > b ? 1 : -1))
  }

  findExist(x) {
    return (this.exist_state || ['No States']).some(a => (a == x))
  }

  selects(x) {
    this.exist_state.findIndex(a => a == x) > -1 ? this.exist_state.splice(this.exist_state.findIndex(a => a == x), 1) : this.exist_state.push(x);
  }

  setState(x) {
    !this.findExist(x) && (this.data['state'] || ['No States Pushed Yet']).every(a => (a != x)) ? this.data['state'].push(x) : null
  }

  offSearch() {
    this.show_search = false
    this.keyword = ''
    console.log(this.show_search)
  }

  delete() {
    swal({
      title: "Confirmation",
      text: "Delete this setting?",
      icon: 'warning',
      buttons: { Cancel: true, Confirm: true },
      // dangerMode: true,
    }).then(a => {
      if (a == 'Confirm') {
        this.http.post('https://hockwon.vsnap.my:3002/deletedelivery', { delivery_id: this.data['delivery_id'] }).subscribe((a) => {

          this.modalController.dismiss()

          swal({
            title: 'Success',
            text: "You've successfully delete this setting",
            icon: 'success',
            timer: 2000,
          });

        });
      }
    })
  }

  confirm() {

    // console.log( {
    //   delivery_id: this.data['delivery_id'],
    //   state: JSON.stringify(this.data['state']),
    //   ranges: JSON.stringify(this.data['ranges']),
    //   free_price: this.data['free_price'] || 0,
    //   free_delivery: this.data['free_delivery'] || 0,
    //   additional: this.data['additional'] || false,
    //   increment_base: this.data['ranges'][this.lengthof(this.data['ranges']) - 1].total || 0,
    //   increment_limit: (this.data['ranges'][this.lengthof(this.data['ranges']) - 1].limit_upper),
    //   increment_unit: 1 * 1000,
    //   increment_price: this.data['increment_price'] || 0,
    //   vendor_id: firebase.auth().currentUser.uid || '',
    //   name: this.data['name'] || ''
    // })

    swal({
      title: 'Processing',
      text: 'Please Wait...',
      closeOnEsc: false,
      closeOnClickOutside: false,
      buttons: [false]
    })

    if (this.lengthof(this.exist_state) && this.data['name']) {

      this.lengthof(this.data['ranges']) ?
        this.data['ranges'].filter(a => {
          a['limit_lower'] = a['limit_lower'] * 1000,
            a['limit_upper'] = a['limit_upper'] * 1000
        })
        : [];

      let body = {
        delivery_id: this.data['delivery_id'],
        state: JSON.stringify(this.exist_state),
        ranges: JSON.stringify(this.data['ranges']),
        free_price: this.data['free_price'] || 0,
        free_delivery: this.data['free_delivery'] || 0,
        additional: this.data['additional'] || false,
        increment_base: this.data['ranges'][this.lengthof(this.data['ranges']) - 1].total || 0,
        increment_limit: (this.data['ranges'][this.lengthof(this.data['ranges']) - 1].limit_upper),
        // increment_unit: 1 * 1000,
        increment_price: this.data['increment_price'] || 0,
        // vendor_id: '2dMGUXkDlFbJFX2fRM5Urzxw4Ts2' || '',
        name: this.data['name'] || ''
      }

      console.log(body);

      this.http.post('https://hockwon.vsnap.my:3002/updatedelivery', body).subscribe((a) => {
        console.log(a);
        swal.close();

        swal({
          title: 'Success',
          text: "You've successfully updated this delivery",
          icon: 'success',
          timer: 2000,
        });

      });

      this.data.increment_unit = this.data.increment_unit * 1000
      this.modalController.dismiss(this.data)

    }
    else {
      swal.close();

      swal({
        title: 'Error',
        text: 'Please check select a region',
        icon: 'error',
        timer: 2000,
      });
    }

  }

  addRow() {

    if (this.canaddrow()) {
      let x = JSON.parse(JSON.stringify(this.data['ranges'][this.lengthof(this.data['ranges']) - 1]['limit_upper']))
      this.data['ranges'].push({ limit_lower: x, limit_upper: null, total: null })
    }
    else {
      this.presentToast('Please check the values before adding more rows')
    }

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  canaddrow() {
    return this.data['ranges'][this.lengthof(this.data['ranges']) - 1]['limit_upper'] > this.data['ranges'][this.lengthof(this.data['ranges']) - 1]['limit_lower'] ? true : false
  }

  remove() {
    this.lengthof(this.data['ranges']) == 1 ? this.data['ranges'][0] = { limit_lower: 0, limit_upper: null, total: null } : this.data['ranges'].splice(-1)
  }

  sorter(x) {
    return x.sort((a, b) => (a['limit_lower'] > b['limit_lower'] ? -1 : 1))
  }


}