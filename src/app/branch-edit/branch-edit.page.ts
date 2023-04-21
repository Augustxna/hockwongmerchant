import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { ActionSheetController, ModalController, NavController, NavParams } from '@ionic/angular';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as EXIF from 'exif-js';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.page.html',
  styleUrls: ['./branch-edit.page.scss'],
})
export class BranchEditPage implements OnInit {

  constructor(private route: ActivatedRoute, public activatedRoute: ActivatedRoute, public storage: Storage, private navparam: NavParams, private modalController: ModalController,
    public nav: NavController, public actionSheetController: ActionSheetController, public http: HttpClient) { }


  vendor = {} as any;
  vendor_acc = {} as any;
  vendor_accs = {} as any;
  voucher = { password: 'Hockwong123' } as any;
  lang = 'en';
  language = {
    'Edit Branch': {
      zh: '调整分店',
      en: 'Edit Branch',
    }, 'Branch Name': {
      zh: '分店名字',
      en: 'Branch Name',
    }, 'Branch Email': {
      zh: '分店电邮',
      en: 'Branch Email',
    }, 'Enter Email': {
      zh: '填写电邮',
      en: 'Enter Email',
    }, 'Enter Branch name': {
      zh: '填写分店名字',
      en: 'Enter Branch name',
    }, 'Branch Contact': {
      zh: '分店号码',
      en: 'Branch Contact',
    }, 'Enter Branch Contact': {
      zh: '填写分店号码',
      en: 'Branch Contact',
    }, 'Branch Address': {
      zh: '分店地址',
      en: 'Branch Address',
    }, 'Enter Branch Address': {
      zh: '填写分店地址',
      en: 'Enter Branch Address',
    }, 'Branch Status': {
      zh: '分店状况',
      en: 'Branch Status',
    }, 'Open': {
      zh: '开启',
      en: 'Open',
    }, 'Close': {
      zh: '删除',
      en: 'Close',
    }, 'Update Outlet': {
      zh: '保存设置分店',
      en: 'Update Outlet',
    }
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    this.voucher = JSON.parse(JSON.stringify(this.navparam.get('value')))

    // this.bento.getVendor().subscribe(a=>{
    //   if(a){
    //     this.vendor = a || {}
    //     this.vendor_ori = a || {}
    //   }else{
    //     this.nav.navigateRoot('home')
    //   }
    // })

    // this.bento.getVendoracc().subscribe(a=>{
    //   this.vendor_acc = a || {}
    // })



    // this.activatedRoute.queryParams.subscribe(a => {
    //   this.id = a['id']

    //   this.bento.getVendoraccs().subscribe(c=>{
    //     console.log(c, this.id)
    //     this.voucher = Object.values(c || []).filter(x=>x['id'] == this.id)[0]
    //   })

    // })

  }

  ngOnDestroy() {
    console.log('Destroying 16 BranchDetail')
  }


  imagectype;
  imagec;
  base64img;
  fileChange(event, name, maxsize) {
    if (this.vendor_acc["vendor_id"] == this.vendor_acc["id"]) {
      if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
        eval(name + '="https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif"');
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
            let imgggg = this.imagec.replace(';base64,', "thisisathingtoreplace;")
            let imgarr = imgggg.split("thisisathingtoreplace;")
            this.base64img = imgarr[1]
            event.target.value = ''
            this.http.post('https://img.vsnap.my/upload', { image: this.imagec, folder: 'hockwong', userid: 'hockwongvendor' }).subscribe((link) => {
              eval(name + '="' + link['imageURL'] + '"');
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
    } else {
      swal({
        icon: 'error',
        title: 'No Authority',
        text: 'Your account has no authority to edit photo',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    }
  }

  submit() {

    if (!this.voucher['name'] || this.voucher['name'] == "") {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: '请填写分店名字',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else if (!this.voucher['email'] || this.voucher['email'] <= 0) {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: '请填写分店电子邮件',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else if (!this.voucher['password'] || this.voucher['password'] == "") {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: '请填写正确格式的密码',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else if (!this.voucher['contact'] || this.voucher['contact'].length == "") {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: '请填写联系人号码',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else {

      // this.voucher.vendor_id=this.vendor['id'];

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
        title: "更新分店",
        text: "这会更新有关资料. 确定?",
        icon: 'warning',
        buttons: buttons,
        // dangerMode: true,
      })
        .then((value) => {
          if (value != "") {
            if (value == "确定") {

              swal({
                // icon: 'success',
                title: '处理中',
                text: '请稍等',
                closeOnEsc: false,
                closeOnClickOutside: false,
                buttons: [false],
                // timer: 1500
              });

              this.voucher.photo = this.voucher.photo ? this.voucher.photo : 'https://i.imgur.com/ur6PPRg.png';

              this.http.post('https://hockwon.vsnap.my:3002/updatevendor_acc', this.voucher).subscribe((s) => {
                // this.bento.trigger(this.vendor.id)
                swal.close();
                swal({
                  icon: 'success',
                  title: '更新成功',
                  text: '成功更新有关资料',
                  // closeOnEsc: false,
                  // closeOnClickOutside: false,
                  buttons: [false],
                  timer: 1500
                });
                this.modalController.dismiss(1);
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

            }
          } else {

          }

        });
    }


  }

  back() {
    // this.vendor_accs[this.id] = this.vendor_ori;
    // this.nav.pop();
    this.modalController.dismiss();
  }


  async openstatus() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Outlet Status',
      mode: "ios",
      buttons: [
        {
          text: 'Active',
          icon: 'heart',
          handler: () => {
            this.voucher['status'] = true;
          }
        }, {
          text: 'Inactive',
          icon: 'heart-dislike',
          handler: () => {
            this.voucher['status'] = false;
          }
        }, {
          text: '取消',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('取消 clicked');
          }
        }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
