import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import swal from 'sweetalert';
@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.page.html',
  styleUrls: ['./login-password.page.scss'],
})
export class LoginPasswordPage implements OnInit {

  constructor(private nav: NavController, private http: HttpClient, private actRoute: ActivatedRoute) { }

  step = 0;
  timer = 30;
  terms = false;
  key = [] as any;
  user = [] as any;

  OTPer(x, y) {
    let format = /\d+/;
    let temp = <HTMLDataElement>document.getElementById(y);
    console.log(temp.value.match(format));
    if (temp.value.match(format) ? temp.value.match(format).input != '' : false) {
      if (x != 'finish') {
        console.log(x);
        document.getElementById(x).focus();
      } else {
        console.log('verified');
      }
    } else {
      temp.value = null;
    }
  }

  condis(x) {
    if (((x || '').toString()).substring(0, 1) == '+') {
      return x.substring(1, x.length)
    } else if (((x || '').toString()).substring(0, 1) == '6') {
      return x
    } else if (((x || '').toString()).substring(0, 1) == '0') {
      return '6' + x
    } else {
      return '60' + x
    }
  }

  ngOnInit() {

  }

  back() {
    clearInterval(this.timers);
    this.step == 1 ? this.step = 0 : this.nav.navigateRoot('login', { animationDirection: 'forward' });
  }

  code = '';

  callsms(x) {
    this.code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(x, this.code);
    this.http.post('https://forcar.vsnap.my/smsprovide', {
      phone: x,
      code: this.code,
    }).subscribe(a => {
      console.log(a);
    })
  }

  resend() {
    console.log('resend');
    this.callsms(this.condis(this.user.contact));

    this.timer = 30;
    this.timers = setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(this.timers);
      } else {
        this.timer -= 1;
      }
    }, 1000);
  }

  termers() {
    this.nav.navigateForward('terms');
  }

  timers;

  lengthof(x) {
    return x ? Object.values(x).length : 0
  }

  id;

  nexter() {
    // CHECKER PHONE VALID
    if (this.user.contact) {

      this.http.post('https://forcar.vsnap.my/checkphone', { phone: this.condis(this.user.contact) }).subscribe((s) => {
        console.log(s);
        if (this.lengthof(s['data']) > 0) {
          this.id = s['data'][0].id;
          this.step = 1;
          this.timer = 30;
          this.callsms(this.condis(this.user.contact));
          this.timers = setInterval(() => {
            if (this.timer <= 0) {
              clearInterval(this.timers);
            } else {
              this.timer -= 1;
            }
          }, 1000);
        } else {
          swal({
            icon: 'error',
            title: 'Error',
            text: 'This contact number does not exist!',
            timer: 2000,
            buttons: [false]
          })
        }
      });


    } else {
      swal({
        icon: 'error',
        title: 'Error',
        text: 'Fill up all the information!',
        timer: 2000,
        buttons: [false]
      })
    }
    // call sms 
  }

  verified() {
    if (this.code == this.key.reduce((a, b) => a += b, '')) {
      this.step = 2;
    } else {
      swal({
        icon: "error",
        title: "Fail",
        text: "Code doesn't not match please try again.",
        buttons: [false],
        timer: 2000,
      })
    }
  }

  complete() {
    if (this.user.password.length > 5) {

      swal({
        title: 'Confirmation',
        text: 'Confirm reset password?',
        icon: 'info',
        buttons: { Cancel: true, Confirm: true },
      }).then(a => {
        if (a == 'Confirm') {
          swal({
            title: "Processing",
            text: "Please wait...",
            buttons: [false],
            closeOnEsc: false,
            closeOnClickOutside: false,
          });

          this.http.post('https://forcar.vsnap.my/changepassword', {
            uid: this.id,
            password: this.user.password,
            type: 'workshop',
          }).subscribe(f => {
            swal({
              icon: "success",
              title: "Success",
              text: "Change Successfully!",
              buttons: [false],
              timer: 2000,
            });
            this.back();
          })
        }
      });
    } else {
      swal({
        icon: "error",
        title: "Fail",
        text: "Password must be 6 character above.",
        buttons: [false],
        timer: 2000,
      })
    }
  }

}

