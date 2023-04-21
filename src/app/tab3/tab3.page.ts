import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  products = [] as any;
  categories = [] as any;
  allcategories = [] as any;
  categoriesname = [] as any;
  selcate = 0;
  keyword = '';
  tab = 0;

  pager

  lang = 'en';
  language = {
    'MY PRODUCTS': {
      zh: '我的产品',
      en: 'MY PRODUCTS',
    }, 'Online': {
      zh: '已上架',
      en: 'Online',
    }, 'Pending': {
      zh: '待批准',
      en: 'Pending',
    }, 'No rating yet': {
      zh: '尚未评价',
      en: 'No rating yet',
    }, 'collect': {
      zh: '自取',
      en: 'Self Collect',
    }, 'delivery': {
      zh: '邮寄',
      en: 'Delivery',
    }, 'Search your product': {
      zh: '查询您的产品',
      en: 'Search your product',
    }, 'Sold': {
      zh: '已售',
      en: 'Sold',
    }, 'No Content': {
      zh: '什么都没有',
      en: 'No Content',
    }, 'Nothing in the list': {
      zh: '列表什么都没有',
      en: 'Nothing in the list',
    },
  }

  constructor(private http: HttpClient, private nav: NavController, public storage: Storage, private actRoute: ActivatedRoute) { }

  ngOnInit() {


    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.actRoute.queryParams.subscribe(params => {

          if (params.tab != null) {
            this.tab = params.tab
          }

          // this.tab = (this.tab ? this.tab : params.tab)

          this.http.post('https://hockwon.vsnap.my:3002/getvendorproductlist', { vendor_id: a.uid }).subscribe(a => {
            this.products = a['data'];
            console.log(this.products)
            let temp = (this.products || []).map(a => a['category']);
            console.log(temp)
            this.categories = [...new Set(temp)];
            this.categories.unshift('All');
            console.log(this.products);
            console.log(this.categories);

            this.http.get('https://hockwon.vsnap.my:3002/getcategoriesforvendorproductlist').subscribe(a => {
              this.allcategories = a['data']
              console.log(this.allcategories)
              console.log(this.allcategories.length)
              this.categoriesname = []
              if (this.lang == 'en') {
                let temp
                for (let j = 0; j < this.categories.length; j++) {
                  temp = this.categories[j]


                  for (let i = 0; i < this.allcategories.length; i++) {

                    if (temp == this.allcategories[i].name_zh) {
                      this.categoriesname.push(this.allcategories[i].name_en)
                    }

                  }
                }
                this.categoriesname.unshift('All');
                console.log(this.categoriesname)
              }
              else if (this.lang == 'zh') {
                this.categoriesname = this.categories
                console.log(this.categoriesname)
              }
            })
          })


        })
      } else {
        this.nav.navigateRoot('login', { animationDirection: 'back' });
      }
    })


  }

  create() {
    this.nav.navigateForward('product-create');
  }

  edit(x) {
    this.nav.navigateForward('product-edit?id=' + x);
  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0;
  }

  filterer(x) {
    return this.lengthof(x) ? x.filter(a =>
      ((a['name_zh'] + a['name_en'] + a['description_zh'] + a['description_en'] + a['eldercode'] + a['sku'] + a['id']
      ).toLowerCase()).includes(this.keyword.toLowerCase())
      && (this.selcate == 0 ? true : (a['category'] == this.categories[this.selcate]))
      && (this.tab == 0 ? (a.edit_status == 'admin') : (a.edit_status != 'admin'))
    ) : []
  }

  back(){
    this.nav.pop()
  }

}
