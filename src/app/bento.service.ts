import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { IonContent, ToastController, NavController, Platform } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/auth';
// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { BehaviorSubject } from 'rxjs';
import swal from 'sweetalert'; 

@Injectable({
  providedIn: 'root'
})
export class BentoService {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('uploadEl', { static: false }) uploadEl: ElementRef;
  constructor(
    // private nativeGeocoder: NativeGeocoder, 
    // private socialSharing: SocialSharing, 
    // private storage: Storage,
    public activatedRoute: ActivatedRoute,
    // public safariViewController: SafariViewController,  
    public httper: HttpClient,
    public http: HTTP,
    public toastController: ToastController,
    public nav: NavController,
    private platform: Platform,
    // private fcm: FCM
  ) { }


  //   <div class="changeButton">
  //   <label for="filessquare" class="btn"> <div style='padding:6px 12px;background-color: #FF1960;color:white;border-radius: 5px;cursor: pointer;font-size:14px;'>Change</div>
  //   </label>
  //   <input style="display: none" id="filessquare" class="inputclass" accept="image/*" type="file"
  //     (change)="fileChange($event,'this.user.photo',300)">
  // </div>
  // <canvas style="display: none;" id="canvassquare"></canvas>


  imgurheaders = new HttpHeaders({
    'Authorization': 'Client-ID 63843b5874add45'
    // f425e102d31b175576a219bc7d3ba8ad82d85364
    // CHANGE TO YOUR OWN ID
  });

  uploadToImgbb(base64) {
    return new Promise((resolve, reject) => {

      let body = {
        image: base64
      }

      this.http.post('https://api.imgbb.com/1/upload?expiration=0&key=74f90935ffeb6e255e69b6738d0910dd', body, {}).then(res => {

        resolve(JSON.parse(res.data).data.url)
      }, awe => {
        reject(awe)
      })
    })
  }

  uploadToImgur(base64) {
    return new Promise((resolve, reject) => {

      let body = {
        image: base64 // this is the base64img from upper part
      }
      this.http.post(' https://api.imgur.com/5/image ', body, { 'Authorization': 'Client-ID 632a8f69c4e5817' }).then(res => {

        resolve(JSON.parse(res.data).data.link)
      }, awe => {
        reject(awe)
      })
    })
  }

  trigger(uniquecode) {
    firebase.database().ref('TriggerFingerGlobal/' + uniquecode).transaction(a => {
      return a ? a + 1 : a = 1;
    }).then(ss => {
      if (ss.snapshot.exists() && ss.committed) {
      }
    })
  }

  genkey() {
    return new Promise((resolve) => {
      resolve(firebase.database().ref('pushKey').push(firebase.database.ServerValue.TIMESTAMP).key)
    })
  }

  genChat(type1, id1, name1, type2, id2, name2, chatname) {

    return new Promise((resolve) => {

      firebase.database().ref('chatrooms/').orderByChild('users/' + id1).equalTo(type1).once('value', data => {

        if (this.lengthof(Object.values(data.val() || {}).filter(a => a['users'] ? a['users'][id2] == type2 : false)) > 0) {

          resolve((Object.entries(data.val() || {}).filter(a => a[1]['users'] ? a[1]['users'][id2] == type2 : false))[0][0])

        } else {

          let keyer = firebase.database().ref('pushKey').push(firebase.database.ServerValue.TIMESTAMP).key
          firebase.database().ref('chatrooms/' + keyer).update({
            id: keyer,
            date: firebase.database.ServerValue.TIMESTAMP,
            last_chat: "You've started a conversation with " + name2 + ".",
            last_date: firebase.database.ServerValue.TIMESTAMP,
            last_seen: { [id1]: firebase.database.ServerValue.TIMESTAMP },
            last_by: name1,
            last_by_id: id1,
            name: chatname,
            users: {
              [id1]: type1,
              [id2]: type2,
            },
          });

          resolve(keyer);

        }

      })
    })

  }

  serve = true;

  urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text ? text.replace(urlRegex, function (url) {
      return '<a target="_system" href="' + url + ' ">' + url + '</a>';
    }) : '';
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }

  checker(x) {
    return Object.keys(x || {}).length > 0;
  }

  // fcmsub(x) {
  //   if (this.serve == false) {
  //     this.fcm.subscribeToTopic(x);
  //   }
  // }

  // fcmunsub(x) {
  //   if (this.serve == false) {
  //     this.fcm.unsubscribeFromTopic(x);
  //   }
  // }

  pushChat(id, body, content) {
    return new Promise((resolve) => {
      firebase.database().ref('chat_contents/' + id).push(content)
      // firebase.database().ref('chatrooms/' + id + '/contents/').push(content)
      firebase.database().ref('chatrooms/' + id).update(body).then(() => {
        resolve("success")
      })
    })

  }

  private triggerer = new BehaviorSubject<any>(0);
  publishTriggerer(data: any) {
    this.triggerer.next(data);
  }
  getTriggerer() {
    return this.triggerer;
  }

  private scroller = new BehaviorSubject<any>(0);
  publishScroll(data: any) {
    this.scroller.next(data);
  }
  getScroll() {
    return this.scroller;
  }

  private VendorAcc = new BehaviorSubject<any>(0);
  publishVendorAcc(data: any) {
    this.VendorAcc.next(data);
  }
  getVendorAcc() {
    return this.VendorAcc;
  }

  private tabber = new BehaviorSubject<any>(0);
  publishTab(data: any) {
    this.tabber.next(data);
  }

  getTab() {
    return this.tabber;
  }

  private announcement = new BehaviorSubject<any>(0);
  publishannouncement(data: any) {
    this.announcement.next(data);
  }
  getannouncement() {
    return this.announcement;
  }

  private payouts = new BehaviorSubject<any>(0);
  publishpayouts(data: any) {
    this.payouts.next(data);
  }
  getpayouts() {
    return this.payouts;
  }

  private supports = new BehaviorSubject<any>(0);
  publishsupports(data: any) {
    this.supports.next(data);
  }
  getsupports() {
    return this.supports;
  }

  private vouchers = new BehaviorSubject<any>(0);
  publishVouchers(data: any) {
    this.vouchers.next(data);
  }
  getVouchers() {
    return this.vouchers;
  }

  private self = new BehaviorSubject<any>(0);
  publishself(data: any) {
    this.self.next(data);
  }
  getself() {
    return this.self;
  }

  private draw = new BehaviorSubject<any>(0);
  publishdraw(data: any) {
    this.draw.next(data);
  }
  getdraw() {
    return this.draw;
  }

  private guild = new BehaviorSubject<any>(0);
  publishguild(data: any) {
    this.guild.next(data);
  }

  getguild() {
    return this.guild;
  }

  private guilds = new BehaviorSubject<any>(0);
  publishallguild(data: any) {
    this.guilds.next(data);
  }

  getallguild() {
    return this.guilds;
  }

  private news = new BehaviorSubject<any>(0);
  publishNews(data: any) {
    this.news.next(data);
  }
  getNews() {
    return this.news;
  }

  private everyuser = new BehaviorSubject<any>(0);
  c(data: any) {
    this.everyuser.next(data);
  }

  private everyusers = new BehaviorSubject<any>(0);
  publisheveryusers(data: any) {
    this.everyusers.next(data);
  }

  geteveryusers() {
    return this.everyusers;
  }

  private everyvendor = new BehaviorSubject<any>(0);
  publisheveryvendor(data: any) {
    this.everyvendor.next(data);
  }
  geteveryvendor() {
    return this.everyvendor;
  }

  private tokenpkg = new BehaviorSubject<any>(0);
  publishtokenpkg(data: any) {
    this.tokenpkg.next(data);
  }
  gettokenpkg() {
    return this.tokenpkg;
  }

  private vippkg = new BehaviorSubject<any>(0);
  publishvippkg(data: any) {
    this.vippkg.next(data);
  }
  getvippkg() {
    return this.vippkg;
  }

  private level = new BehaviorSubject<any>(0);
  publishLevel(data: any) {
    this.level.next(data);
  }
  getLevel() {
    return this.level;
  }

  private vendors = new BehaviorSubject<any>(0);
  publishVendors(data: any) {
    this.vendors.next(data);
  }
  getVendors() {
    return this.vendors;
  }

  private experiences = new BehaviorSubject<any>(0);
  publishExperiences(data: any) {
    this.experiences.next(data);
  }
  getExperiences() {
    return this.experiences;
  }

  private category_voucher = new BehaviorSubject<any>(0);
  publishCategory(data: any) {
    this.category_voucher.next(data);
  }
  getCategory() {
    return this.category_voucher;
  }

  private locations = new BehaviorSubject<any>(0);
  publishLocations(data: any) {
    this.locations.next(data);
  }
  getLocations() {
    return this.locations;
  }

  private events = new BehaviorSubject<any>(0);
  publishEvents(data: any) {
    this.events.next(data);
  }
  getEvents() {
    return this.events;
  }

  private event_parti = new BehaviorSubject<any>(0);
  publishEventparti(data: any) {
    this.event_parti.next(data);
  }
  getEventparti() {
    return this.event_parti;
  }

  private orders = new BehaviorSubject<any>(0);
  publishVoucherorder(data: any) {
    this.orders.next(data);
  }
  getVoucherorder() {
    return this.orders;
  }

  private campaigns = new BehaviorSubject<any>(0);
  publishCampaignorder(data: any) {
    this.campaigns.next(data);
  }
  getCampaignorder() {
    return this.campaigns;
  }

  private chats = new BehaviorSubject<any>(0);
  publishChats(data: any) {
    this.chats.next(data);
  }
  getChats() {
    return this.chats;
  }



  private allorders = new BehaviorSubject<any>(0);
  publishallorders(data: any) {
    this.allorders.next(data);
  }
  getallorders() {
    return this.allorders;
  }


  private referral = new BehaviorSubject<any>(0);
  publishReferral(data: any) {
    this.referral.next(data);
  }
  getReferral() {
    return this.referral;
  }

  private logsget = new BehaviorSubject<any>(0);
  publishlogsget(data: any) {
    this.logsget.next(data);
  }
  getlogsget() {
    return this.logsget;
  }

  private logsgive = new BehaviorSubject<any>(0);
  publishlogsgive(data: any) {
    this.logsgive.next(data);
  }
  getlogsgive() {
    return this.logsgive;
  }

  private tokenget = new BehaviorSubject<any>(0);
  publishtokenget(data: any) {
    this.tokenget.next(data);
  }
  gettokenget() {
    return this.tokenget;
  }

  private tokenspend = new BehaviorSubject<any>(0);
  publishtokenspend(data: any) {
    this.tokenspend.next(data);
  }
  gettokenspend() {
    return this.tokenspend;
  }
  // geocoder_reverse(x,y,res){


  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: res

  // };

  //   return new Promise((res,rej)=>{



  //   this.nativeGeocoder.reverseGeocode(x, y, options)
  //   .then((result: NativeGeocoderResult[]) => {
  //     console.log(JSON.stringify(result[0]))
  //     res(result)
  //   })
  //   .catch((error: any) => {
  //     console.log(error)
  //     rej(error);
  //   });

  //   })


  // }

  // share(x){
  //   return new Promise((res,rej)=>{

  //     this.socialSharing.share(x).then(e=>{
  //       res(e)
  //     }).catch(a=>{
  //       rej(a)
  //     })

  //   })
  // }

  copy(x) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = x;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.swal_alert("复制到剪贴板", "成功复制到剪贴板！", "success", "3000");
  }

  scrollBottom(x) {
    this.content.scrollToBottom(x);
  }

  todatetimeformat(x) {
    return (new Date(x).toJSON()).substring(0, 16);
  }

  // setstorage(name,val){
  //   return new Promise((resolve,reject)=>{
  //     this.storage.set(name, val).then((a)=>{
  //       console.log(name)
  //       console.log(val)
  //       console.log(a)
  //       resolve(a);
  //     }).catch((e)=>{
  //       console.log(e)
  //       reject(e);
  //     })
  //   })

  // }

  // getstorage(name){
  //   return new Promise((resolve,reject)=>{
  //     this.storage.get(name).then((a)=>{
  //       console.log(name)
  //       console.log(a)
  //       resolve(a);
  //     }).catch((e)=>{
  //       reject(e);
  //     })
  //   })
  // }

  // removestorage(name){
  //   return new Promise((resolve,reject)=>{
  //     this.storage.remove(name).then((a)=>{
  //       resolve(a);
  //     }).catch((e)=>{
  //       reject(e);
  //     })
  //   })
  // }

  callapi(extension, body, key = "httpers://asd.com/") {

    return new Promise((resolve, reject) => {

      this.httper.post(key + extension, body).subscribe(a => {

        resolve(a);

      }, e => {
        reject(e);
      })

    })


  }

  async toast(header, msg, duration, position, color, link, rout_text, rout) {
    const toast = await this.toastController.create({
      position: position,
      header: header,
      message: msg,
      duration: duration,
      mode: 'ios',
      color: color,
      buttons: [
        (link ? {
          text: rout_text,
          handler: () => {
            if (rout == "Internal") {
              this.nav.navigateForward(link);
            } else if (rout == "External") {
              this.windowopen(link, '_system');
            } else {
              console.log("do nothing")
            }
          }
        } : null)
      ]
    });
    toast.present();
  }

  imgur(event, maxsize) {

    return new Promise((resolve, reject) => {
      if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
        let imagectype = event.target.files[0].type;
        // EXIF.getData(event.target.files[0], () => {
        // console.log(event.target.files[0])
        //  console.log(event.target.files[0].exifdata.Orientation);
        // var orientation = EXIF.getTag(this, "Orientation");
        var can = document.createElement('canvas');
        var ctx = can.getContext('2d');
        var thisImage = new Image;

        var maxW = maxsize;
        var maxH = maxsize;
        thisImage.onload = (a) => {

          // console.log(a)
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
          // console.log(event.target.files[0])
          // if (event.target.files[0] && event.target.files[0].exifdata.Orientation) {
          //   // console.log(event.target.files[0].exifdata.Orientation)
          //   if (event.target.files[0].exifdata.Orientation > 4) {
          //     can.width = height; can.style.width = styleHeight;
          //     can.height = width; can.style.height = styleWidth;
          //   }
          //   switch (event.target.files[0].exifdata.Orientation) {
          //     case 2: ctx.translate(width, 0); ctx.scale(-1, 1); break;
          //     case 3: ctx.translate(width, height); ctx.rotate(Math.PI); break;
          //     case 4: ctx.translate(0, height); ctx.scale(1, -1); break;
          //     case 5: ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break;
          //     case 6: ctx.rotate(0.5 * Math.PI); ctx.translate(0, -height); break;
          //     case 7: ctx.rotate(0.5 * Math.PI); ctx.translate(width, -height); ctx.scale(-1, 1); break;
          //     case 8: ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, 0); break;
          //   }
          // }

          ctx.drawImage(thisImage, 0, 0, iwScaled, ihScaled);
          ctx.restore();

          let imagec = can.toDataURL();

          let imgggg = imagec.replace(';base64,', "thisisathingtoreplace;")
          let imgarr = imgggg.split("thisisathingtoreplace;")
          let base64img = imgarr[1]
          event.target.value = ''

          // console.log(base64img)

          let body = {
            image: base64img // this is the base64img from upper part
          }
          this.httper.post(' httpers://api.imgur.com/3/image ', body, { headers: this.imgurheaders }).subscribe(res => {
            resolve(res['data'].link)
          }, awe => {
            // console.log(awe)
            reject(awe)
          })

        }
        thisImage.src = URL.createObjectURL(event.target.files[0]);
        // eval('this.'+el+'.nativeElement.value = null;')
        // });
      } else {
        reject("Your Current Image Too Large, " + event.target.files[0].size / (10241024) + "MB! (Please choose file lesser than 8MB)")
      }
    })


  }

  img2base64(event, maxsize) {


    return new Promise((resolve, reject) => {
      if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
        let imagectype = event.target.files[0].type;
        // EXIF.getData(event.target.files[0], () => {
        // console.log(event.target.files[0])
        //  console.log(event.target.files[0].exifdata.Orientation);
        // var orientation = EXIF.getTag(this, "Orientation");
        var can = document.createElement('canvas');
        var ctx = can.getContext('2d');
        var thisImage = new Image;

        var maxW = maxsize;
        var maxH = maxsize;
        thisImage.onload = (a) => {

          // console.log(a)
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
          // console.log(event.target.files[0])
          // if (event.target.files[0] && event.target.files[0].exifdata.Orientation) {
          //  console.log(event.target.files[0].exifdata.Orientation)
          // if (event.target.files[0].exifdata.Orientation > 4) {
          //   can.width = height; can.style.width = styleHeight;
          //   can.height = width; can.style.height = styleWidth;
          // }
          // switch (event.target.files[0].exifdata.Orientation) {
          //   case 2: ctx.translate(width, 0); ctx.scale(-1, 1); break;
          //   case 3: ctx.translate(width, height); ctx.rotate(Math.PI); break;
          //   case 4: ctx.translate(0, height); ctx.scale(1, -1); break;
          //   case 5: ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break;
          //   case 6: ctx.rotate(0.5 * Math.PI); ctx.translate(0, -height); break;
          //   case 7: ctx.rotate(0.5 * Math.PI); ctx.translate(width, -height); ctx.scale(-1, 1); break;
          //   case 8: ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, 0); break;
          // }
          // }

          ctx.drawImage(thisImage, 0, 0, iwScaled, ihScaled);
          ctx.restore();

          let imagec = can.toDataURL();

          resolve(imagec);

        }
        thisImage.src = URL.createObjectURL(event.target.files[0]);
        // eval('this.'+el+'.nativeElement.value = null;')
        // });
      } else {
        reject("Your Current Image Too Large, " + event.target.files[0].size / (10241024) + "MB! (Please choose file lesser than 8MB)")
      }
    })
  }

  base642url(base64) {
    new Promise((resolve, reject) => {
      let imgggg = base64.replace(';base64,', "thisisathingtoreplace;")
      let imgarr = imgggg.split("thisisathingtoreplace;")
      let base64img = imgarr[1]



      let body = {
        image: base64img // this is the base64img from upper part
      }

      this.httper.post(' httpers://api.imgur.com/3/image ', body, { headers: this.imgurheaders }).subscribe(res => {
        resolve(res['data'].link)
      }, awe => {
        reject(awe)
      })
    })
  }

  windowopen(link, where) {
    window.open(link, where);
  }

  lengthof(x) {
    return (x ? x.length : 0);
  }

  sum(arr, param, init) {
    if (arr) {
      return (arr.map(a => a[param])).reduce((a, b) => a + b, init)
    }

  }

  sumentries(arr, param, init) {
    if (arr) {
      return (arr.map(a => a[1][param])).reduce((a, b) => a + b, init)
    }

  }

  sumentries2(arr, init) {
    if (arr) {
      return arr.reduce((a, b) => a + (b[1].benefit_currency == "wallet_debit" ? b[1].benefit_amount : b[1].benefit_amount / 100), init)
    }

  }



  lengthof_obj(x) {
    return (x ? Object.keys(x).length : 0);
  }

  filterer(arr, keyword, d_start, d_start_param, d_end, d_end_param, params) {
    return (arr ? arr.filter(a => {
      let holder = false
      params.forEach(element => {
        if (a[element]) {
          // console.log(d_start)

          holder = (keyword != "" ? (a[element].toString().toLowerCase()).includes(keyword.toString().toLowerCase()) : true) && (d_start != d_start_param ? new Date(a[d_start_param]).getTime() >= d_start : true) && (d_end != d_end_param ? new Date(a[d_end_param]).getTime() <= d_end : true);
        }

      });
      return holder
    }

    ) : []);
  }

  dater(date, style) {

    let dd = (new Date(date).getDate() < 10 ? "0" + new Date(date).getDate().toString() : new Date(date).getDate().toString());
    let mm = ((new Date(date).getMonth() + 1) < 10 ? "0" + (new Date(date).getMonth() + 1).toString() : (new Date(date).getMonth() + 1).toString());
    let yy = new Date(date).getFullYear().toString();

    return style.replace("DD", dd).replace("MM", mm).replace("YYYY", yy)
  }

  timer(date, style) {
    let ho = "";
    let ap = "";
    let mi = "";
    if (new Date(date).getHours() == 0) {
      ho = "12";
      ap = "AM";
      mi = new Date(date).getMinutes().toString();
    } else {
      ho = (new Date(date).getHours() < 13 ? (new Date(date).getHours()).toString() : (new Date(date).getHours() - 12).toString());
      ap = (new Date(date).getHours() < 12 ? "AM" : "PM");
    }


    return style.replace("HO", ho).replace("MI", mi).replace("AP", ap)
  }

  datetimer(date, style) {
    let dd = (new Date(date).getDate() < 10 ? "0" + new Date(date).getDate().toString() : new Date(date).getDate().toString());
    let mm = ((new Date(date).getMonth() + 1) < 10 ? "0" + (new Date(date).getMonth() + 1).toString() : (new Date(date).getMonth() + 1).toString());
    let yy = new Date(date).getFullYear().toString();
    let ho = "";
    let ap = "";
    let mi = "";
    if (new Date(date).getHours() == 0) {
      ho = "12";
      ap = "AM";
      mi = new Date(date).getMinutes().toString();
    } else {
      ho = (new Date(date).getHours() < 13 ? (new Date(date).getHours()).toString() : (new Date(date).getHours() - 12).toString());
      ap = (new Date(date).getHours() < 12 ? "AM" : "PM");
    }

    return style.replace("DD", dd).replace("MM", mm).replace("YYYY", yy).replace("HO", ho).replace("MI", mi).replace("AP", ap)
  }

  emailValidator(email) {
    if (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    } else {
      return false;
    }
  }

  pleasewait(title, text) {

    swal({
      buttons: [false],
      title: title,
      text: text,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });

  }



  // <input #uploadEl style="display: none" id="files" class="inputclass" type="file" accept="image/*,application/pdf"(change)="fileChange($event)">
  // <canvas style="display: none;" id="canvas"></canvas>

  uploadfile(ev) {

    return new Promise((resolve, reject) => {

      var reader = new FileReader();
      var fileByteArray = [];
      if (ev) {
        this.pleasewait("Loading", "Pease Wait")
      }
      // console.log(ev.target.files)
      reader.readAsArrayBuffer(ev.target.files[0]);
      reader.onloadend = (evt) => {
        if (evt.target.readyState == FileReader.DONE) {
          var arrayBuffer: any = evt.target.result,

            array = new Uint8Array(arrayBuffer);

          // this.upload(arrayBuffer, ev.target.files[0].type)

          let blob = new Blob([arrayBuffer], { type: ev.target.files[0].type });



          let storage = firebase.storage().ref('Documents/' + new Date().getTime)
          storage.put(blob).then(d => {
            storage.getDownloadURL().then(snapshot => {
              swal.close()
              resolve(snapshot);
            })
            // console.log(d)
            // console.log(   Object.values(storage.getDownloadURL())[2]['D']['i']   )

          }).catch(e => {
            alert('60' + JSON.stringify(e));
          })

        }
        else {
          swal.close()
          reject("SOMETHING WONG")
        }
      }
    })

  }



  uploadFileToArray(ev) {
    return new Promise((resolve, reject) => {

      var reader = new FileReader();
      var fileByteArray = [];
      if (ev) {
        this.pleasewait("Loading", "Pease Wait")
      }
      // console.log(ev.target.files)
      reader.readAsArrayBuffer(ev.target.files[0]);
      reader.onloadend = (evt) => {
        if (evt.target.readyState == FileReader.DONE) {
          var arrayBuffer: any = evt.target.result,

            array = new Uint8Array(arrayBuffer);

          // this.upload(arrayBuffer, ev.target.files[0].type)
          let obj = {
            arrayBuffer: arrayBuffer,
            type: ev.target.files[0].type
          }
          resolve(arrayBuffer);

        }
        else {
          swal.close()
          reject("SOMETHING WONG")
        }
      }
    })
  }

  uploadToCloudtoUrl(arrayBuffer, type) {
    return new Promise((resolve, reject) => {
      let blob = new Blob([arrayBuffer], { type: type });



      let storage = firebase.storage().ref('Documents/' + new Date().getTime)
      storage.put(blob).then(d => {
        storage.getDownloadURL().then(snapshot => {
          swal.close()
          resolve(snapshot);
        })
        // console.log(d)
        // console.log(   Object.values(storage.getDownloadURL())[2]['D']['i']   )

      }).catch(e => {
        alert('60' + JSON.stringify(e));
        reject(e)
      })

    })


  }

  swal_button(title, text, icon, buttons) {
    // buttons={
    //   namer:{
    //     name:"",
    //     value:"",
    //   },
    // }

    return new Promise((resolve, reject) => {

      // buttons={
      //   namer:{
      //     name:"",
      //     value:"",
      //   },
      // }

      swal({
        title: title,
        text: text,
        icon: icon,
        buttons: buttons,
        // dangerMode: true,
      })
        .then((value) => {
          if (value) {
            resolve(value);
          } else {
            reject("NO INPUT")
          }
        });
    })


  }

  swal_alert(title, text, icon, duration) {
    swal({
      title: title,
      text: text,
      icon: icon,
      timer: duration,
    });
  }

  swal_input(title, text, placeholder, type) {

    return new Promise((resolve, reject) => {


      swal({
        title: title,
        text: text,
        content: {
          element: "input",
          attributes: {
            placeholder: placeholder,
            type: type,
          },
        },
        buttons: ['Cancel', 'Confirm'],
      })

        .then((val) => {
          if (val == true) {
            resolve(val);
          } else {
            reject();
            // resolve(val);

          }

        }).catch(() => {
          reject();
        })
    })


  }



  swal_dismiss() {
    swal.close()
  }

  countpage(arr, step) {
    if (arr) {
      return Math.ceil(arr.length / step);
    } else {
      return 1;
    }
  }

  pager(arr, step, infinite, page) {

    // return new Promise((resolve, reject)=>{


    //   resolve('')
    // })

    if (arr) {

      if (arr.length > step * page) {

        return (infinite == true ? arr.filter((a, index) => index >= 0 && index < step * page) : arr.filter((a, index) => index >= step * (page - 1) && index < step * page));

      } else {
        return (infinite == true ? arr : arr.filter((a, index) => ((arr.length % step) == 0 ? index >= arr.length - step : index >= arr.length - (arr.length % step))));
      }

    }

  }

  obj2arr(x) {
    return (x ? Object.values(x) : []);
  }

  eightdater(x) {
    return (x ? (new Date(x).getFullYear()).toString() + (new Date(x).getMonth() + 1).toString() + (new Date(x).getDate()).toString() : (new Date().getFullYear()).toString() + (new Date().getMonth() + 1).toString() + (new Date().getDate()).toString())
  }

  numbertodigit(num, digit) {
    return Math.floor(num) + Math.floor((num - Math.floor(num)) * ((10 ^ digit))) / (10 ^ digit)
  }

  convertNumberToWords(s) {

    var th = ['', 'thousand', 'million', 'billion', 'trillion'];
    var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1)
      x = s.length;
    if (x > 15)
      return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
      if ((x - i) % 3 == 2) {
        if (n[i] == '1') {
          str += tn[Number(n[i + 1])] + ' ';
          i++;
          sk = 1;
        } else if (n[i] != 0) {
          str += tw[n[i] - 2] + ' ';
          sk = 1;
        }
      } else if (n[i] != 0) { // 0235
        str += dg[n[i]] + ' ';
        if ((x - i) % 3 == 0) str += 'hundred ';
        sk = 1;
      }
      if ((x - i) % 3 == 1) {
        if (sk)
          str += th[(x - i - 1) / 3] + ' ';
        sk = 0;
      }
    }

    if (x != s.length) {
      var y = s.length;
      str += 'point ';
      for (let i = x + 1; i < y; i++)
        str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ');
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  loginSucces() {
    swal({
      icon: "success",
      title: "Login Success",
      text: "Welcome back..."
    })
  }



}



