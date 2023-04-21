import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import swal from 'sweetalert';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  selected = 'All' as any;
  category = [] as any;
  products = [] as any;
  keyword;

  constructor(private nav: NavController, private modalController: ModalController, private actRoute: ActivatedRoute, private storage: Storage,
    private http: HttpClient, public router: IonRouterOutlet, public alertController: AlertController) { }

    language = {
      'Product list': {
        cn: '产品列表',
        en: 'Product list',
      }, 'Product Image': {
        cn: '产品照片',
        en: 'Product Image',
      }, 'Product Information': {
        cn: '产品详情',
        en: 'Product Information',
      }, 'New Category': {
        cn: '新种类',
        en: 'New Category',
      }, 'All': {
        cn: '全部',
        en: 'All',
      }, 'Car Plate': {
        cn: '车牌号码',
        en: 'Car Plate',
      }, 'Service Selection': {
        cn: '选择服务',
        en: 'Service Selection',
      }, 'Edit Category': {
        cn: '修改种类',
        en: 'Edit Category',
      }, 'Remarks': {
        cn: '备注',
        en: 'Remarks',
      }, 'Feedback': {
        cn: '反馈',
        en: 'Feedback',
      }, 'Quantity': {
        cn: '数量',
        en: 'Quantity',
      }, 'Quotation Preview': {
        cn: '报价单预览',
        en: 'Quotation Preview',
      }, 'Quotation': {
        cn: '报价单',
        en: 'Quotation',
      }, 'Address': {
        cn: '地址',
        en: 'Address',
      }, 'Date': {
        cn: '日期',
        en: 'Date',
      }, 'New': {
        cn: '新',
        en: 'New',
      }, 'Invoice': {
        cn: '发票',
        en: 'Invoice',
      }, 'Status': {
        cn: '状况',
        en: 'Status',
      }, 'Due Date': {
        cn: '截止日期',
        en: 'Due Date',
      }, 'New User': {
        cn: '新用户',
        en: 'New User',
      }, 'Select Car': {
        cn: '选择用户',
        en: 'Select Car',
      }, 'Optional': {
        cn: '可选的',
        en: 'Optional',
      }, 'NEW CAR': {
        cn: '新车辆',
        en: 'NEW CAR',
      }, 'Create': {
        cn: '添加',
        en: 'Create',
      }, 'Cancel': {
        cn: '取消',
        en: 'Cancel',
      }, 'Services': {
        cn: '服务',
        en: 'Services',
      }, 'Products': {
        cn: '产品',
        en: 'Products',
      }, 'Name': {
        cn: '名字',
        en: 'Name',
      }, 'Qty': {
        cn: '数量',
        en: 'Qty',
      }, 'Price': {
        cn: '价钱',
        en: 'Price',
      }, 'Create New Product': {
        cn: '添加新产品',
        en: 'Create New Product',
      }, 'Others': {
        cn: '其他',
        en: 'Others',
      }, 'Sub-total': {
        cn: '小计',
        en: 'Sub-total',
      }, 'Discount': {
        cn: '折扣',
        en: 'Discount',
      }, 'Total': {
        cn: '总数',
        en: 'Total',
      }, 'Preview': {
        cn: '预览',
        en: 'Preview',
      }, 'Payment': {
        cn: '付款',
        en: 'Payment',
      }, 'Total Paid': {
        cn: '已付总额',
        en: 'Total Paid',
      }, 'Paid Type': {
        cn: '付款方式',
        en: 'Paid Type',
      }, 'Cash': {
        cn: '现金',
        en: 'Cash',
      }, 'Transfer': {
        cn: '转账',
        en: 'Transfer',
      }, 'Card': {
        cn: '信用卡',
        en: 'Card',
      }, 'Paid ID': {
        cn: '付款ID',
        en: 'Paid ID',
      }, 'Paid Remark': {
        cn: '付款备注',
        en: 'Paid Remark',
      }, 'Total Due': {
        cn: '欠数总额',
        en: 'Total Due',
      }, 'Send Quotation': {
        cn: '发送报价单',
        en: 'Send Quotation',
      }, 'Create Invoice': {
        cn: '添加发票',
        en: 'Create Invoice',
      }, 'Company Name': {
        cn: '公司名称',
        en: 'Company Name',
      }, 'Customer Information': {
        cn: '客户详情',
        en: 'Customer Information',
      }, 'Car Information': {
        cn: '车辆详情',
        en: 'Car Information',
      }, 'No': {
        cn: '数号',
        en: 'No',
      }, 'Service': {
        cn: '服务',
        en: 'Service',
      }, 'Product': {
        cn: '产品',
        en: 'Product',
      }, 'Unit': {
        cn: '单位',
        en: 'Unit',
      }, 'Edit': {
        cn: '修改',
        en: 'Edit',
      }, 'Contact Customer': {
        cn: '联系客户',
        en: 'Contact Customer',
      }, 'Selected Car': {
        cn: '已选择车辆',
        en: 'Selected Car',
      }, 'Create New': {
        cn: '添加新',
        en: 'Create New',
      }, 'Payment History': {
        cn: '付款历史',
        en: 'Payment History',
      }, 'Update': {
        cn: '更新',
        en: 'Update',
      }, 'Cancelled': {
        cn: '已取消',
        en: 'Cancelled',
      }, 'Car': {
        cn: '车',
        en: 'Car',
      }, 'Service Select': {
        cn: '选择服务',
        en: 'Service Select',
      }, 'Invoice list': {
        cn: '发票列表',
        en: 'Invoice list',
      }, 'Quotations': {
        cn: '报价单',
        en: 'Quotations',
      }, 'Unpaid': {
        cn: '未付款',
        en: 'Unpaid',
      }, 'Complete': {
        cn: '完成',
        en: 'Complete',
      }, 'Tel': {
        cn: '手机号',
        en: 'Tel',
      }, 'Services at': {
        cn: '服务在',
        en: 'Services at',
      }, 'By': {
        cn: '由',
        en: 'By',
      }, 'AMOUNT DUE': {
        cn: '欠款',
        en: 'AMOUNT DUE',
      }, 'Clear Bill': {
        cn: '清账',
        en: 'Clear Bill',
      }, 'Fully Paid': {
        cn: '已付全额',
        en: 'Fully Paid',
      }, 'Quotation request on': {
        cn: '报价单申请于',
        en: 'Quotation request on',
      }, 'Order Details': {
        cn: '订单详情',
        en: 'Order Details',
      }, 'Payment Details': {
        cn: '付款详情',
        en: 'Payment Details',
      }, 'Payment Type': {
        cn: '付款方式',
        en: 'Payment Type',
      }, 'Pay Total': {
        cn: '付款总额',
        en: 'Pay Total',
      }, 'Order Total': {
        cn: '订单总额',
        en: 'Order Total',
      }, 'Total Payment': {
        cn: '付款总额',
        en: 'Total Payment',
      }, 'Pay Now': {
        cn: '现在支付',
        en: 'Pay Now',
      }, 'Parts Creat': {
        cn: '添加零件',
        en: 'Parts Creat',
      }, 'Parts Image': {
        cn: '零件图片',
        en: 'Parts Image',
      }, 'Maximum 10 images to upload': {
        cn: '最多可上载10张',
        en: 'Maximum 10 images to upload',
      }, 'Parts Information': {
        cn: '零件详情',
        en: 'Parts Information',
      }, 'Category': {
        cn: '种类',
        en: 'Category',
      }, 'Description': {
        cn: '描述',
        en: 'Description',
      }, 'Create Parts': {
        cn: '添加零件',
        en: 'Create Parts',
      }
    }
    lang = 'en';
  vendor = {} as any;
  id = "";
  total = [] as any;

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        if (data == 'cn' || data == 'en') {
          this.lang = data;
        }
      })
    });
    this.actRoute.queryParams.subscribe(a => {
      this.position = a['position'];
      this.id = a['id'];
      this.http.post('https://forcar.vsnap.my/getvendorproduct', { id: a['id'] }).subscribe(f => {
        this.products = f['data'].filter(a => a['status']);
      })

      this.http.post('https://forcar.vsnap.my/getvendorproducttotal', { id: a['id'] }).subscribe(f => {
        this.total = (f['data'] || []);
        console.log(this.total);
      })

      this.http.post('https://forcar.vsnap.my/accgetvendor', { id: a['id'] }).subscribe(v => {
        this.vendor = v['data']
        this.category = (this.vendor.categories) || [];
      })

    })

  }


  async newcat() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New Category',
      inputs: [
        {
          name: 'cat',
          type: 'text',
          placeholder: 'Category Name'
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
            console.log(data.cat)
            console.log(this.category.every(a => a.toLowerCase() != (data.cat || "").toLowerCase()))
            if (this.category.every(a => a.toLowerCase() != (data.cat || "").toLowerCase()) && data.cat.length > 2) {
              this.category.push(data.cat)
              this.http.post('https://forcar.vsnap.my/updatevendor', {
                id: this.id,
                categories: JSON.stringify(this.category || []),
              }).subscribe(f => {
                swal({
                  title: 'Category Created',
                  text: 'You will see the new category immediately',
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
    return x.filter(a => (((a['name'] || "") + (a['sku'] || "")).toLowerCase()).includes((this.keyword || '').toLowerCase()) &&
      (this.selected == 'All' ? true : a['category'].some(a => a.name == this.selected)));
  }

  detail(x) {
    // console.log(x.product_id)
    this.nav.navigateForward('product-edit?id=' + x.product_id + '&position=' + this.position + '&vid=' + this.id)
  }

  // dl_user() {

  //   this.nav.navigateForward('product-report?id=' + this.id)

  // }

  async dl_user() {
    let typer = []
    let holder = [];
    let holder2 = [];
    let holder3 = [];

    // if (this.now == 0) {
    typer = this.products
    // } else if (this.now == 1) {
    //   typer = this.filterorder(this.conpletearr)
    // }
    console.log(typer);

    holder.push([
      'No', // 1
      'SKU No', // 2
      'Product Name', // 2
      'Category', // 2
      'Selling Price', // 3
      'Unit Left', // 4
      'Unit Sold', // 5
      'Product Description', // 6
      'Total Sold(RM)',
    ])

    let j = 0

    for (let i = 0; i < typer.length; i++) {
      let element = typer[i];

      // console.log(element);,
      holder2.push([
        (j + 1), // 1
        element.sku,// 2
        element.name,// 2
        (element.category).map(a => a['name']).join('/'),// 2
        element.price,// 3
        element.qty,// 4
        element.sold,// 5
        element.description,// 6
        this.total.findIndex(a => a['productid'] == element.product_id) > -1 ? this.total[this.total.findIndex(a => a['productid'] == element.product_id)].total_sales : 0
      ])
      j++
    }

    holder3 = await holder.concat(holder2);
    console.log(holder3);
    await this.downloadCSV(holder3, 'Product list Report' + '.csv');
  }

  downloadCSV(Arrayinput, namecsv) {

    // console.log(this.file.dataDirectory);
    var blob = new Blob(["\uFEFF" + this.createCSV(Arrayinput)],
      {
        type: "text/csv;charset=utf-18"

      });

    console.log(blob)

    let csvContent = "";

    Arrayinput.forEach((rowArray) => {

      let row = rowArray;

      csvContent += row + "\r\n";

    });

    var link = document.createElement("a");

    link.setAttribute("href", "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csvContent));


    // link.href = 'data:text/csv,' + encodeURIComponent(csvContent);

    link.download = namecsv;

    link.click();

    // } 

  }

  createCSV(Arr) {

    let csvContent = "";

    Arr.forEach((rowArray) => {

      let row = rowArray;

      csvContent += row + "\r\n";

    });

    return csvContent

  }

  bulkupload() {
    this.nav.navigateForward('bulk-upload?type=Products&position=' + this.position + '&vendor=' + this.vendor.id)
  }

}
