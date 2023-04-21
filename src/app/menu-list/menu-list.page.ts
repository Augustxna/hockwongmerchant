import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, IonReorderGroup, IonRouterOutlet, ModalController, NavController, Platform } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import firebase from 'firebase';
import swal from 'sweetalert';
import { MenuCreatePage } from '../menu-create/menu-create.page';
import { Storage } from '@ionic/storage';

// import { BentoService } from '../bento.service';
// import { MenuproductPage } from '../menuproduct/menuproduct.page';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.page.html',
  styleUrls: ['./menu-list.page.scss'],
})
export class MenuListPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(public http: HttpClient, public platform: Platform, public storage: Storage, private alertController: AlertController,
    public modal: ModalController, public routerOutlet: IonRouterOutlet, public nav: NavController) { }

  categories = [] as any;
  products = [] as any;
  vendor_acc = {} as any;
  lang = 'en';
  language = {
    'E-Menu': {
      zh: '电子目录',
      en: 'E-Menu',
    }, 'Save': {
      zh: '储存',
      en: 'Save',
    }, 'New Category': {
      zh: '新类别',
      en: 'New Category',
    }, 'Delete': {
      zh: '删除',
      en: 'Delete',
    }, 'Change': {
      zh: '修改',
      en: 'Change',
    }, 'SKU': {
      zh: '产品',
      en: 'SKU',
    }, 'No Content': {
      zh: '没有东西',
      en: 'No Content',
    }, 'Nothing in the list': {
      zh: '列表里面没有任何东西',
      en: 'Nothing in the list',
    }
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.categories = ev.detail.complete(this.categories);
  }

  doReorder2(i, ev: CustomEvent<ItemReorderEventDetail>) {
    this.categories[i].products = ev.detail.complete(this.categories[i].products);
  }

  delcat(i) {
    let buttons = {
      取消: {
        name: "取消",
        value: "取消",
      },

      确定: {
        name: "确定",
        value: "确定",
      },
    }

    swal({
      title: "删除【" + this.categories[i].name + "】?",
      text: "所有产品也将被删除，是否继续？",
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == "确定") {

            swal({
              title: '处理中',
              text: '请稍等',
              closeOnEsc: false,
              closeOnClickOutside: false,
              buttons: [false],
            });


            if (this.categories[i].emenu) {


              this.http.post('https://hockwon.vsnap.my:3002/deleteemenu', { emenu: this.categories[i].emenu }).subscribe(a => {
                swal.close();

                this.categories.splice(i, 1);

                swal({
                  icon: 'success',
                  title: '更新成功',
                  text: '成功删除',
                  // closeOnEsc: false,
                  // closeOnClickOutside: false,
                  buttons: [false],
                  timer: 1500
                });
              }, e => {
                swal.close();
                swal({
                  icon: 'error',
                  title: '发生了错误',
                  text: '请重试',
                  // closeOnEsc: false,
                  // closeOnClickOutside: false,
                  buttons: [false],
                  timer: 1500
                });
              })

            } else {



              console.log(123)
              setTimeout(() => {
                swal.close();
              }, 1500
              );

              this.categories.splice(i, 1);
            }



          }
        }

      });

  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.http.post('https://hockwon.vsnap.my:3002/dataVendorlogin', { userid: a.uid }).subscribe(a => {
          this.vendor = a['data'][0];
          this.vendor_acc = a['data'][1] || {};
          this.http.post('https://hockwon.vsnap.my:3002/getemenu', { id: this.vendor.id }).subscribe(a => {
            console.log(a['data'])
            this.categories = a['data'] || []
          })
        })
      }
    })

    // this.bento.getVendoracc().subscribe(y => {
    //   this.vendor_acc = y || {};
    // })

    // this.bento.getVendor().subscribe(z => {
    //   this.vendor = z || {};
    //   this.http.post('https://hockwon.vsnap.my:3002/getemenu', { id: this.vendor.id }).subscribe(a => {
    //     console.log(a['data'])
    //     this.categories = a['data'] || []
    //   }, e => {

    //   })

    // })



  }

  sorter(x) {
    return (x || []).sort((a, b) => a.orders > b.orders ? -1 : 1)
  }

  // async goprod(j, k, x, nu) {
  //   this.routerOutlet.swipeGesture = false;
  //   const loginmodal = await this.modal.create({
  //     component: MenuCreatePage,
  //     componentProps: {
  //       'product': x || {},
  //       'category': j || "",
  //     }
  //   });
  //   await loginmodal.present();

  //   const { data } = await loginmodal.onDidDismiss()
  //   this.routerOutlet.swipeGesture = true;
  //   if (data) {
  //     if (data == 'delete') {
  //       console.log('delete');
  //       this.categories[k].products.splice(nu, 1);
  //     } else {
  //       if (nu >= 0) {
  //         this.categories[k].products[nu] = (data.product)
  //       } else {
  //         this.categories[k].products.push(data.product)
  //       }
  //     }
  //   }
  // }

  async goprod(j, k, x) {
    this.routerOutlet.swipeGesture = false;
    const loginmodal = await this.modal.create({
      component: MenuCreatePage,
      componentProps: {
        'product': x || {},
        'category': j || "",
      }
    });
    await loginmodal.present();

    const { data } = await loginmodal.onDidDismiss()
    this.routerOutlet.swipeGesture = true;
    if (data) {
      if (data == 'delete') {
        console.log('delete');
        this.categories[k].products.splice(k, 1);
      } else {
        if (k >= 0) {
          this.categories[k].products[k] = (data.product)
        } else {
          this.categories[k].products.push(data.product)
        }
      }
    }
  }

  clickgo(i) {
    (<any>document.getElementById('content')).scrollToPoint(0, document.getElementById("lap" + (i)).offsetTop + 5, 100)
  }

  async logScrolling(eve) {
    for (let i = 0; i < this.lengthof(this.categories); i++) {
      if (document.getElementById("lap" + ((this.lengthof(this.categories) - 1) - i)).offsetTop + document.getElementById("lap" + ((this.lengthof(this.categories) - 1) - i)).offsetHeight >= eve.detail.scrollTop) {
        this.highlighter = ((this.lengthof(this.categories) - 1) - i)
      } else {
        console.log('stopped at ' + ((this.lengthof(this.categories) - 1) - i))
      }
    }

  }

  back() {
    // this.modal.dismiss();
    this.nav.pop();
  }


  saveall() {
    let buttons = {
      取消: {
        name: "取消",
        value: "取消",
      },

      确定: {
        name: "确定",
        value: "确定",
      },
    }

    swal({
      title: "Update Menu",
      text: "Are you sure?",
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == '确定') {
            swal({
              title: '请稍等',
              text: '处理中',
              buttons: [false],
              closeOnEsc: false,
              closeOnClickOutside: false,
            })
            console.log(this.categories)
            this.http.post('https://hockwon.vsnap.my:3002/insertemenu', this.categories).subscribe(a => {
              console.log(a)
              swal.close()

              swal({
                icon: 'success',
                title: 'Menu 更新成功',
                text: '谢谢！',
                buttons: [false],
                timer: 1500
              });
            }, e => {
              swal.close()
              swal({
                icon: 'error',
                title: 'Update Failed',
                text: 'Please try again',
                buttons: [false],
                timer: 1500
              });
            })

          }
        }
      })

  }

  getcat(prod, cat) {
    return (prod || []).filter(a => a.category == cat);
  }

  lengthof(x) {
    return (x ? Object.keys(x).length : 0)
  }

  vendor = {} as any;

  // editcat(i) {

  //   swal({
  //     title: "Edit Category",
  //     text: "Enter Category Name",
  //     content: {
  //       element: "input",
  //       attributes: {
  //         placeholder: "eg. Breakfast",
  //         type: 'text',
  //         value: this.categories[i].name,
  //       },
  //     },
  //     buttons: ['取消', '确定'],
  //   })

  //     .then((val) => {
  //       if (val) {

  //         if (this.categories.some(a => a.name == val)) {
  //           swal.close();
  //           swal({
  //             icon: 'error',
  //             title: 'Category name already exist',
  //             text: 'Please try another name.',
  //             buttons: [false],
  //             timer: 1500
  //           });
  //         } else {


  //           console.log(this.categories[i])

  //           // updatemenucat

  //           console.log({ menu: this.categories[i].emenu, name: val });


  //           this.http.post('https://hockwon.vsnap.my:3002/updatemenucat', { menu: this.categories[i].emenu, name: val }).subscribe(a => {
  //             console.log(a);

  //             if (a['success'] == 1) {

  //               this.categories[i].name = val;

  //             } else {

  //               swal({
  //                 icon: 'error',
  //                 title: 'Something wrong',
  //                 text: 'Please try again later',
  //                 buttons: [false],
  //                 timer: 1500
  //               });

  //             }

  //           })


  //         }


  //       } else {

  //       }

  //     }).catch(() => {
  //       swal.close();
  //       swal({
  //         icon: 'error',
  //         title: 'Input Error',
  //         text: '请重试',
  //         buttons: [false],
  //         timer: 1500
  //       });
  //     })


  // }

  async editcat(i) {
    const alert = await this.alertController.create({
      header: 'Edit Category',
      subHeader: "Enter Category Name",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Category Name',
          value: this.categories[i].name,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: (val) => {
            if (val.name) {
              if (this.categories.some(a => a.name == val.name)) {
                swal.close();
                swal({
                  icon: 'error',
                  title: 'Category name already exist',
                  text: 'Please try another name.',
                  buttons: [false],
                  timer: 1500
                });
              } else {
                this.http.post('https://hockwon.vsnap.my:3002/updatemenucat', { menu: this.categories[i].emenu, name: val.name }).subscribe(a => {
                  console.log(a);
                  if (a['success'] == 1) {
                    this.categories[i].name = val.name;
                  } else {
                    swal({
                      icon: 'error',
                      title: 'Something wrong',
                      text: 'Please try again later',
                      buttons: [false],
                      timer: 1500
                    });
                  }
                })
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  createcat() {

    swal({
      title: "Create Category",
      text: "Enter Category Name",
      content: {
        element: "input",
        attributes: {
          placeholder: "eg. Breakfast",
          type: 'text',
        },
      },
      buttons: ['取消', '确定'],
    })

      .then((val) => {
        if (val) {

          if (this.categories.some(a => a.name == val)) {
            swal.close();
            swal({
              icon: 'error',
              title: 'Category name already exist',
              text: 'Please try another name.',
              buttons: [false],
              timer: 1500
            });
          } else {
            this.categories.push({
              name: val,
              status: true,
              orders: (this.categories || []).length,
              vendor_id: this.vendor.id,
              products: [],
            });
          }


        } else {
          swal.close();
          swal({
            icon: 'error',
            title: 'Input Error',
            text: '请重试',
            buttons: [false],
            timer: 1500
          });

        }

      }).catch(() => {
        swal.close();
        swal({
          icon: 'error',
          title: 'Input Error',
          text: '请重试',
          buttons: [false],
          timer: 1500
        });
      })



  }

  highlighter = 0;

}