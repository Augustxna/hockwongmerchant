import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import firebase from 'firebase';
import swal from 'sweetalert';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.page.html',
  styleUrls: ['./product-report.page.scss'],
})
export class ProductReportPage implements OnInit {

  selected = 'All' as any;
  category = [] as any;
  products = [] as any;
  keyword;

  constructor(private nav: NavController, private modalController: ModalController, private actRoute: ActivatedRoute,
    private http: HttpClient, public router: IonRouterOutlet, public alertController: AlertController) { }


  vendor = {} as any;
  id = "";
  ngOnInit() {
   
    this.actRoute.queryParams.subscribe(a => {
      this.position = a['position'];
      this.id = a['id'];
      this.http.post('https://forcar.vsnap.my/getvendorproduct', { id: a['id'] }).subscribe(f => {
        this.products = f['data'].filter(a => a['status']);
        console.log(this.products);

      })

      this.http.post('https://forcar.vsnap.my/accgetvendor', { id: a['id'] }).subscribe(v => {

        this.vendor = v['data']
        console.log(this.vendor)
        this.category = (this.vendor.categories) || [];

        console.log(this.category)

      })
    })

  }

  async updcat(x) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Category',
      inputs: [
        {
          name: 'cat',
          type: 'text',
          placeholder: 'Category Name',
          value: x,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {

            if (this.category.every(a => a.toLowerCase() != (data.cat || "").toLowerCase()) && data.cat.length > 3) {
              this.category[this.selectedno] = (data.cat)
              this.http.post('https://forcar.vsnap.my/updatevendor', {
                id: this.id,
                categories: JSON.stringify(this.category || []),
              }).subscribe(f => {
                console.log(f);
                swal({
                  title: 'Category Updated',
                  text: 'You will see the change(s) immediately',
                  icon: 'success',
                  timer: 2000,
                });
              })
            } else {
              swal({
                title: 'Something is Wrong',
                text: 'Please make sure category name does not repeat and must be at least 3 characters long',
                icon: 'error',
                timer: 2000,
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }


  selectedno = 0;

  lengthof(x) {
    return x ? Object.keys(x).length : 0;
  }

  back() {
    // public router:IonRouterOutlet
    this.router.canGoBack() ? this.nav.pop() : this.nav.navigateBack('tabs/tab1')
  }

  create() {
    // const modal = await this.modalController.create({
    //   component: ProductCreatePage,
    // });

    // await modal.present();
    this.nav.navigateForward('product-create?position=' + this.position + '&vid=' + this.id);
  }

  position = "";

  search(x) {
    return x.filter(a => ((a['name'] || []).toLowerCase()).includes((this.keyword || '').toLowerCase()) &&
      (this.selected == 'All' ? true : a['category'].some(a => a.name == this.selected)));
  }

  detail(x) {
    // console.log(x.product_id)
    this.nav.navigateForward('product-edit?id=' + x.product_id + '&position=' + this.position + '&vid=' + this.id)
  }

  dl_user(){

    this.nav.navigateForward('product-report?id=' +  this.id)

  }

}
