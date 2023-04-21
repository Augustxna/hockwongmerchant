import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, IonRouterOutlet, NavController } from '@ionic/angular';
import * as EXIF from 'exif-js';
import firebase from 'firebase';
import swal from 'sweetalert';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private http: HttpClient, private router: IonRouterOutlet,public storage: Storage, private nav: NavController, private alertController: AlertController) { }


  
  lang = 'en';
  language = {
    'Profile': {
      zh: '商家资料',
      en: 'PROFILE',
    }, 'Branch Name': {
      zh: '品牌名称',
      en: 'Branch Name',
    }, 'PIC name': {
      zh: '负责人姓名',
      en: 'Person in charge',
    }, 'Store Number': {
      zh: '商店号码',
      en: 'Contact Number',
    }, 'Store SSM' : {
      zh: '商店 SSM/负责人身份证号码',
      en: 'SSM/IC Number',
    }, 'Store Address' : {
      zh: '商店地址',
      en: 'Address',
    }, 'Consumer Rebate' : {
      zh: '商家分利',
      en: 'Consumer Rebate',
    }, 'Store Description' : {
      zh:'商店简介',
      en: 'Store Description',
    }, 
    'Marketing Introduction (food and travel)' : {
      zh:'营销说词（吃喝玩乐）',
      en: 'Merchant Introduction',
    }, 
    'TNC (food and travel)' : {
      zh:'条规（吃喝玩乐）',
      en: 'Term & Conditions',
    },  'Featured URL' : {
      zh: '精选网址',
      en: 'Website Link',
    }, 'Bank Name' : {
      zh: '银行名字',
      en: 'Bank Name',
    }, 'Account Name' : {
      zh: '户口姓名',
      en: 'Account Name',
    }, 'Account Number' : {
      zh: '户口号码',
      en: 'Account Number',
    }, 'Merchant' : {
      zh: '商家',
      en: 'Merchant'
    },'Reset Password' : {
      zh: '重设密码',
      en: 'Reset Password',
    } , 'Open' : {
      zh: '开启',
      en: 'Open',
    }, 'Close' : {
      zh: '关闭',
      en: 'Close',
    }, 'Enter Account Number' : {
      zh: '输入户口号码',
      en: 'Enter Account Number',
    }, 'Enter Account Name' : {
      zh: '输入户口姓名',
      en: 'Enter Account Name',
    }, 'Enter Bank Name' : {
      zh: '输入银行名字',
      en: 'Enter Bank Name',
    }, 'Enter Terms and Conditions' : {
      zh: '输入线下条规',
      en: 'Enter Terms and Conditions',
    }, 'Enter Marketing Introduction' : {
      zh: '输入营销说词',
      en: 'Enter Merchant Introduction',
    }, 'Enter Consumer Rebate' : {
      zh: '输入商家分利',
      en: 'Enter Consumer Rebate',
    }, 'Enter Store Description' : {
      zh: '输入商店简介',
      en: 'Enter Store Description',
    },'Enter Store Address' : {
      zh: '输入商店地址',
      en: 'Enter Address',
    },'Enter Store SSM' : {
      zh: '输入商店 SSM',
      en: 'Enter SSM',
    },'Enter Store Number' : {
      zh: '输入商店号码',
      en: 'Enter Contact Number',
    },'Enter PIC name' : {
      zh: '输入负责人姓名',
      en: 'Enter Person in charge',
    },'Enter Branch name' : {
      zh: '输入品牌名称',
      en: 'Enter Branch Name',
    },'UPDATE CHANGES': {
      zh: '保存',
      en: 'UPDATE CHANGES',
    }

  }

  vendor_acc = {} as any;
  vendor = [] as any;
  original = [] as any;
  edit = true;
  fnbcat = [] as any;

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

  // https://hockwon.vsnap.my:3002
  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });


    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.http.post('https://hockwon.vsnap.my:3002/dataVendorlogin', { userid: a.uid }).subscribe(a => {
          this.vendor = JSON.parse(JSON.stringify(a['data'][1]));
          this.vendor.physical_rate = this.vendor.physical_rate * 100;
          this.original = a['data'][1];
          this.vendor_acc = a['data'][0] || {};
          console.log(a);
        })
      }
    })

    this.http.get('https://hockwon.vsnap.my:3002/admingetfnbcat').subscribe((s) => {
      console.log(s['data'])
      this.fnbcat = s['data'];
    })



  }

  cancel() {
    this.edit = !this.edit;
    this.vendor = this.original;
    this.vendor.physical_rate = this.vendor.physical_rate * 100;
  }


  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  proper2(x) {
    return Math.round((parseFloat(x || 0) + Number.EPSILON) * 100) / 100
  }


  update() {

    console.log('testing')
    // if (!this.vendor.photo) {
    //   swal({
    //     icon: 'error',
    //     title: '资料不齐全',
    //     text: 'Please upload at least one (1) photo.',
    //     // closeOnEsc: false,
    //     // closeOnClickOutside: false,
    //     buttons: [false],
    //     timer: 1500
    //   });
    // } else 
    if (this.vendor.photo == ('https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif')) {
      swal({
        icon: 'error',
        title: '请稍等.',
        text: 'Please the for the photo to be uploaded.',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else if (!this.vendor['name']) {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: 'Please enter product name',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else if (!this.vendor['contact']) {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: 'Please enter Person in Charge contact number',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    } else if (this.vendor['physical_rate'] > 100) {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: '商家分利无法大于100',
        // closeOnEsc: false,
        // closeOnClickOutside: false,
        buttons: [false],
        timer: 1500
      });
    }
    // else if (this.vendor['physical_rate'] > 100 || this.vendor['physical_rate'] < 0) {
    //   swal({
    //     icon: 'error',
    //     title: '资料不齐全',
    //     text: 'Please enter physical rate between 0 - 100',
    //     // closeOnEsc: false,
    //     // closeOnClickOutside: false,
    //     buttons: [false],
    //     timer: 1500
    //   });
    // } 
    else if (!this.vendor['pic_name']) {
      swal({
        icon: 'error',
        title: '资料不齐全',
        text: 'Please enter Person In Charge name',
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
        title: "更新主页",
        text: "这将更新您的主页. 确定?",
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


              this.http.post('https://hockwon.vsnap.my:3002/updatevendors', {
                photo: this.vendor.photo || "https://i.imgur.com/ur6PPRg.png",
                name: this.vendor.name || "",
                brand_name: this.vendor.brand_name || "",
                pic_name: this.vendor.pic_name || "",
                contact: this.vendor.contact || "",
                description: this.vendor.description || "",
                address: this.vendor.address || "",
                link: JSON.stringify(this.vendor.link || []),
                category: this.vendor.category || "",
                id: this.vendor.id || "",
                physical_rate: this.proper2(this.vendor.physical_rate / 100) || 0,
                promote_text: this.vendor.promote_text || '',
                tnc_text: this.vendor.tnc_text || '',
                bank_account: this.vendor.bank_account,
                bank_name: this.vendor.bank_name,
                bank_type: this.vendor.bank_type,
                ssm : this.vendor.ssm
              }).subscribe((s) => {
                this.edit = !this.edit;
                this.original = this.vendor;
                swal.close();

                swal({
                  icon: 'success',
                  title: '更新成功',
                  text: '所有资料已更新',
                  buttons: [false],
                  timer: 1500
                });

                this.back()

              }, e => {
                swal.close();
                swal({
                  icon: 'error',
                  title: '错误',
                  text: '请重试.',
                  buttons: [false],
                  timer: 1500
                });
              })

            }
          }
        });
    }
  }


  lengthof(x) {
    return (x ? Object.keys(x).length : 0)
  }

  back() {
    this.router.canGoBack() ? this.nav.pop() : this.nav.navigateRoot('tabs/tab5', { animationDirection: 'back' });
  }

  gofeature() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        voucher: this.vendor,
        selected: this.vendor['link'] || [],
        vendor: this.vendor,
        vendor_acc: this.vendor_acc,
      }
    };
    this.nav.navigateForward('profile-featuredlink', navigationExtras);
  }

  async change() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      inputs: [{
        name: 'new',
        type: 'password',
        placeholder: 'New Password'
      }, {
        name: 'confirm',
        type: 'password',
        placeholder: '确定 Password'
      },
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('确定 取消');
          }
        }, {
          text: '确定',
          handler: (ans) => {
            if (ans.new == ans.confirm) {
              this.http.post('https://hockwon.vsnap.my:3002/changepassword', {
                type: 'users',
                id: this.vendor_acc['id'],
                password: ans.new,
              }).subscribe((s) => {
                console.log(s);
                swal({
                  icon: 'success',
                  title: 'Success',
                  text: 'Password changed successfully :)',
                  buttons: [false],
                  closeOnEsc: false,
                  closeOnClickOutside: false,
                  timer: 1500
                })
              }, e => {
                console.log(e);
                swal({
                  icon: 'error',
                  title: '错误',
                  text: '请重试.',
                  buttons: [false],
                  timer: 1500
                });
              })
            } else {
              swal({
                icon: 'error',
                title: 'error',
                text: 'Password not matched.',
                buttons: [false],
                timer: 1500
              });
              this.change();
            }
            console.log('确定 Ok');
          }
        }
      ]
    });

    await alert.present();
  }


}
