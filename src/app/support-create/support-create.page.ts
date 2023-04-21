import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import * as EXIF from 'exif-js';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-support-create',
  templateUrl: './support-create.page.html',
  styleUrls: ['./support-create.page.scss'],
})
export class SupportCreatePage implements OnInit {

  ticket = [] as any;
  user = [] as any;
  photo = [] as any;
  lang = 'en';
  language = {
    'Question detail': {
      zh: '问题详情',
      en: 'Question detail',
    }, 'Title': {
      zh: '题目',
      en: 'Title',
    }, 'Description': {
      zh: '描述',
      en: 'Description',
    }, 'ADD PHOTO': {
      zh: '添加照片',
      en: 'ADD PHOTO',
    }, 'Personal detail': {
      zh: '个人资料',
      en: 'Personal detail',
    }, 'Name': {
      zh: '姓名',
      en: 'Name',
    }, 'Email': {
      zh: '电子邮件',
      en: 'Email',
    }, 'Contact': {
      zh: '联系',
      en: 'Contact',
    }, 'Create Ticket': {
      zh: '创建辅助卷',
      en: 'Create Ticket',
    }
  }

  constructor(private nav: NavController, private platform: Platform, private http: HttpClient, public storage: Storage,) { }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });
    // this.bento.getVendor().subscribe(c => {
    //   this.user = c || {};
    // })

    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.http.post('https://hockwon.vsnap.my:3002/dataVendorlogin', { userid: a.uid }).subscribe(a => {
          // this.user = (a['data'][1]);
          this.user = a['data'][0] || {};
          console.log(a);
        })
      }
    })
  }

  back() {
    this.nav.back();
  }

  widtherget() {
    return this.platform.width();
  }

  lengthof(x) {
    return x ? Object.keys(x || {}).length : 0
  }

  imagec
  imagectype
  base64img

  fileChange(event, maxsize) {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
      this.imagectype = event.target.files[0].type;
      EXIF.getData(event.target.files[0], () => {
        console.log(event.target.files[0]);
        console.log(event.target.files[0].exifdata.Orientation);
        const orientation = EXIF.getTag(this, 'Orientation');
        const can = document.createElement('canvas');
        const ctx = can.getContext('2d');
        const thisImage = new Image;

        const maxW = maxsize;
        const maxH = maxsize;
        thisImage.onload = (a) => {

          // console.log(a);
          const iw = thisImage.width;
          const ih = thisImage.height;
          const scale = Math.min((maxW / iw), (maxH / ih));
          const iwScaled = iw * scale;
          const ihScaled = ih * scale;
          can.width = iwScaled;
          can.height = ihScaled;
          ctx.save();
          const width = can.width; const styleWidth = can.style.width;
          const height = can.height; const styleHeight = can.style.height;
          console.log(event.target.files[0]);
          if (event.target.files[0] && event.target.files[0].exifdata.Orientation) {
            // console.log(event.target.files[0].exifdata.Orientation);
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
          const imgggg = this.imagec.replace(';base64,', 'thisisathingtoreplace;');
          const imgarr = imgggg.split('thisisathingtoreplace;');
          this.base64img = imgarr[1];
          event.target.value = '';
          this.photo.push(
            // this.imagec
            "https://media3.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif",
          );
          let currenter = this.lengthof(JSON.parse(JSON.stringify(this.photo))) - 1

          this.http.post('https://img.vsnap.my/upload', { image: this.imagec, folder: 'hockwong', userid: 'hockwongvendor' }).subscribe((link) => {
            this.photo[currenter] = link['imageURL'];
          })

        };
        thisImage.src = URL.createObjectURL(event.target.files[0]);
        // eval('this.'+el+'.nativeElement.value = null;')
      });
    } else {
      alert('Your Current Image Too Large, ' + event.target.files[0].size / (10241024) + 'MB! (Please choose file lesser than 8MB)');
    }
  }

  deleteimage(code, i) {
    eval(code + '.splice(' + i + ',1);');
  }

  rounder(x) {
    return Math.floor(x);
  }

  create() {
    if (this.ticket.title && this.ticket.description && this.user.name && this.user.contact && this.user.email) {
      console.log('1');
      swal({
        title: 'Create in Progress',
        text: '请稍等.',
        closeOnEsc: false,
        closeOnClickOutside: false,
        buttons: [false],
      });

      let body = {
        title: this.ticket.title,
        description: this.ticket.description,
        date: new Date().getTime(),
        userid: this.user.id,
        photo: JSON.stringify(this.photo || []),
        name: this.user.name,
        contact: this.user.contact,
        email: this.user.email,
        // id: keyer,
        status: false,
      }

      this.http.post('https://hockwon.vsnap.my:3002/insertsupports', body).subscribe((s) => {
        swal.close();

        swal({
          title: '发送成功',
          text: '我们已收到你的问题，我们会尽快回复你',
          buttons: [false],
          timer: 2000
        })

        this.nav.pop();

      }, e => {
        swal({
          icon: 'error',
          title: '发生了错误',
          text: 'Please contact our administrator via Global Chat and we will check it out, sorry for the inconvenience caused.',
          buttons: [false],
          timer: 2000
        })
        console.log(e);
      })

    } else {
      swal({
        icon: 'error',
        title: '发生了错误',
        text: 'Please fill in all the information',
        buttons: [false],
        timer: 2000
      })
    }

  }

}
