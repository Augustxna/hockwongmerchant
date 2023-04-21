import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import * as EXIF from 'exif-js';
// import * as promiseAny from 'promise-any';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.page.html',
  styleUrls: ['./menu-create.page.scss'],
})
export class MenuCreatePage implements OnInit {

  constructor(public http: HttpClient, private service: ServiceService, private modal: ModalController, private navparam: NavParams,
    public nav: NavController, public storage: Storage,
    public alertController: AlertController, public safariViewController: SafariViewController) { }

  product = {} as any;
  category = [] as any;
  lang = 'en';
  language = {
    'Create Product': {
      zh: '创建商品',
      en: 'Create Product',
    }, 'Product Photo': {
      zh: '产品照片',
      en: 'Product Photo',
    }, 'Add Photo': {
      zh: '添加照片',
      en: 'Add Photo',
    }, 'Product Name': {
      zh: '商品名字',
      en: 'Product Name',
    }, 'Product Price': {
      zh: '商品价格',
      en: 'Product Price',
    }, 'Product Category': {
      zh: '商品类别',
      en: 'Product Category',
    }, 'Add Product': {
      zh: '添加商品',
      en: 'Add Product',
    }, 'Description': {
      zh: '注解',
      en: 'Description',
    }
  }

  lengthof(x) {
    return (x ? Object.keys(x).length : 0)
  }

  // imagectype;
  // imagec;
  // base64img;

  // fileChange2(event, maxsize) {
  //   if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
  //     this.imagectype = event.target.files[0].type;
  //     EXIF.getData(event.target.files[0], () => {
  //       console.log(event.target.files[0]);
  //       console.log(event.target.files[0].exifdata.Orientation);
  //       const orientation = EXIF.getTag(this, 'Orientation');
  //       const can = document.createElement('canvas');
  //       const ctx = can.getContext('2d');
  //       const thisImage = new Image;
  //       const maxW = maxsize;
  //       const maxH = maxsize;
  //       thisImage.onload = (a) => {

  //         console.log(a);
  //         const iw = thisImage.width;
  //         const ih = thisImage.height;
  //         const scale = Math.min((maxW / iw), (maxH / ih));
  //         const iwScaled = iw * scale;
  //         const ihScaled = ih * scale;
  //         can.width = iwScaled;
  //         can.height = ihScaled;
  //         ctx.save();
  //         const width = can.width; const styleWidth = can.style.width;
  //         const height = can.height; const styleHeight = can.style.height;
  //         console.log(event.target.files[0]);
  //         if (event.target.files[0] && event.target.files[0].exifdata.Orientation) {
  //           console.log(event.target.files[0].exifdata.Orientation);
  //           if (event.target.files[0].exifdata.Orientation > 4) {
  //             can.width = height; can.style.width = styleHeight;
  //             can.height = width; can.style.height = styleWidth;
  //           }
  //           switch (event.target.files[0].exifdata.Orientation) {
  //             case 2: ctx.translate(width, 0); ctx.scale(-1, 1); break;
  //             case 3: ctx.translate(width, height); ctx.rotate(Math.PI); break;
  //             case 4: ctx.translate(0, height); ctx.scale(1, -1); break;
  //             case 5: ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break;
  //             case 6: ctx.rotate(0.5 * Math.PI); ctx.translate(0, -height); break;
  //             case 7: ctx.rotate(0.5 * Math.PI); ctx.translate(width, -height); ctx.scale(-1, 1); break;
  //             case 8: ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, 0); break;
  //           }
  //         }

  //         ctx.drawImage(thisImage, 0, 0, iwScaled, ihScaled);
  //         ctx.restore();

  //         this.imagec = can.toDataURL();

  //         const imgggg = this.imagec.replace(';base64,', 'thisisathingtoreplace;');
  //         const imgarr = imgggg.split('thisisathingtoreplace;');
  //         this.base64img = imgarr[1];
  //         event.target.value = '';

  //         this.product.photo = 'https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif';

  //         const promises = [this.service.uploadToImgur(this.base64img), this.service.uploadToImgbb(this.base64img)];

  //         promiseAny(promises).then((value) => {
  //           console.log(value);
  //           this.product.photo = value;
  //         });

  //       };
  //       thisImage.src = URL.createObjectURL(event.target.files[0]);
  //     });
  //   } else {

  //     alert('Your Current Image Too Large, ' + event.target.files[0].size / (10241024) + 'MB! (Please choose file lesser than 8MB)');
  //   }
  // }

  imagectype;
  imagec;
  base64img;
  fileChange(event,  maxsize) {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
      this.imagectype = event.target.files[0].type;
      EXIF.getData(event.target.files[0], () => {
        console.log(event.target.files[0])
        console.log(event.target.files[0].exifdata.Orientation);
        var orientation = EXIF.getTag(this, "Orientation");
        var can = document.createElement('canvas');
        var ctx = can.getContext('2d');
        var thisImage = new Image;

        var maxW = maxsize;
        var maxH = maxsize;
        thisImage.onload = (a) => {

          console.log(a)
          var iw = thisImage.width;
          var ih = thisImage.height;
          var scale = Math.min((maxW / iw), (maxH / ih));
          var iwScaled = iw * scale;
          var ihScaled = ih * scale;
          can.width = iwScaled;
          can.height = ihScaled;
          ctx.save();
          var width = can.width; var styleWidth = can.style.width;
          var height = can.height; var styleHeight = can.style.height;
          console.log(event.target.files[0])
          if (event.target.files[0] && event.target.files[0].exifdata.Orientation) {
            console.log(event.target.files[0].exifdata.Orientation)
            if (event.target.files[0].exifdata.Orientation > 4) {
              can.width = height; can.style.width = styleHeight;
              can.height = width; can.style.height = styleWidth;
            }
            switch (event.target.files[0].exifdata.Orientation) {
              case 2: ctx.translate(width, 0); ctx.scale(-1, 1); break;
              case 3: ctx.translate(width, height); ctx.rotate(Math.PI); break;
              case 4: ctx.translate(0, height); ctx.scale(1, -1); break;
              case 5: ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break;
              case 6: ctx.rotate(0.5 * Math.PI); ctx.translate(0, -height); break;
              case 7: ctx.rotate(0.5 * Math.PI); ctx.translate(width, -height); ctx.scale(-1, 1); break;
              case 8: ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, 0); break;
            }
          }

          ctx.drawImage(thisImage, 0, 0, iwScaled, ihScaled);
          ctx.restore();

          this.imagec = can.toDataURL();
          this.product.photo = 'https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif';
          let imgggg = this.imagec.replace(';base64,', "thisisathingtoreplace;")
          let imgarr = imgggg.split("thisisathingtoreplace;")
          this.base64img = imgarr[1]
          event.target.value = ''
          this.http.post('https://img.vsnap.my/upload', { image: this.imagec, folder: 'hockwong', userid: 'hockwongvendor' }).subscribe((link) => {
            this.product.photo = link['imageURL'];
          })
          // this.uploadToImgur(this.base64img, name);
          //console.log(this.imagec)

        }
        thisImage.src = URL.createObjectURL(event.target.files[0]);
        // eval('this.'+el+'.nativeElement.value = null;')
      });
    } else {
      alert("Your Current Image Too Large, " + event.target.files[0].size / (10241024) + "MB! (Please choose file lesser than 8MB)")
    }

  }

  delphoto() {
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
      title: "Delete Photo",
      text: "Are you sure?",
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == "确定") {
            this.product['photo'] = "";
          } else {
          }
        } else {
        }
      });
  }

  back() {
    this.modal.dismiss();
  }

  delete() {
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
      title: "Delete Product",
      text: "Are you sure?",
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == "确定") {
            this.modal.dismiss('delete');
          } else {
          }
        } else {
        }
      });
  }

  proper2(x) {
    return Math.round((parseFloat(x || 0) + Number.EPSILON) * 100) / 100
  }

  submit() {
    console.log(this.product)
    if ((!this.product['name'] || this.product['name'] == "") && (this.category.products || []).every(c => c.name != this.product['name'])) {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: 'Please enter product name OR name is duplicated',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else if (!(this.proper2(this.product['price']) >= 0)) {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: 'Please enter product price',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else if (this.product['photo'] == "") {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: 'Please Insert Product Photo',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else {

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
        title: "Update Product",
        text: "Are you sure?",
        icon: 'warning',
        buttons: buttons,
        // dangerMode: true,
      })
        .then((value) => {
          if (value != "") {
            if (value == "确定") {

              this.modal.dismiss({
                product: this.product,
              })

            } else {

            }
          } else {

          }

        });
    }


  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    this.product = JSON.parse(JSON.stringify(this.navparam.get('product')));
    this.category = (this.navparam.get('category') || {});
    console.log(this.product, this.category);
  }

}