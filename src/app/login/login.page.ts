import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { NavController, Platform } from '@ionic/angular';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public nav: NavController, private platform: Platform,
    private http: HttpClient, public fcm: FCM, private safariViewController: SafariViewController,
    public barcodeScanner: BarcodeScanner,
    private androidPermissions: AndroidPermissions
  ) { }

  email = "";
  password = "";
  show = false;

  widther(x) {
    return this.platform.width() >= x
  }

  ngOnInit() {
    console.log('hello')
    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.http.post('https://hockwon.vsnap.my:3002/dataVendorlogin', { userid: a.uid }).subscribe(a => {
          if (a['data'][0]) {
            swal({
              title: "Login",
              text: "Login Successfully",
              icon: "success",
              buttons: [false],
              timer: 2000,
            });
            this.nav.navigateRoot('tabs/tab5', { animated: true, animationDirection: 'back' });
          } else {
            swal({
              icon: 'error',
              title: 'Wrong Password',
              text: 'The account you are trying to login is not a vendor account. 请重试',
              buttons: [false],
              timer: 1500
            });
            firebase.auth().signOut();
          }
        })
      }
    })
  }

  join() {
    let link = "https://hockwongregister.web.app/vendor"
    if (this.platform.is('ios')) {
      this.safariViewController.isAvailable()
        .then((available: boolean) => {
          if (available) {

            this.safariViewController.show({
              url: link,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: '#ff0000'
            })
              .subscribe((result: any) => {
                if (result.event === 'opened') console.log('Opened');
                else if (result.event === 'loaded') console.log('Loaded');
                else if (result.event === 'closed') console.log('Closed');
              },
                (error: any) => window.open(link)
              );

          } else {
            window.open(link);
          }
        }
        ).catch(a => {
          window.open(link);
        });
    } else {
      window.open(link)
    }
  }

  login() {
    swal({
      // icon: 'success',
      title: '处理中',
      text: '请稍等',
      closeOnEsc: false,
      closeOnClickOutside: false,
      buttons: [false],
      timer: 5000
    });

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(ok => {
    }).catch(e => {
      this.http.post('https://hockwon.vsnap.my:3002/checkpendingvendoremail', { email: this.email }).subscribe(a => {
        swal.close();
        if (a['data'][0].count) {
          swal({
            title: '账号处理中',
            // Pending for Approval 
            icon: 'success',
            text: '感谢您申请成为我们的商家，我们会尽快联系您。',
            // Thanks for registering as our merchant. We will contact you soon. 
          })
        } else {
          swal({
            icon: 'error',
            title: 'Wrong Password',
            text: e['message'],
            buttons: [false],
            timer: 1500
          });
        }

      });
    })

  }

  forgot() {
    swal({
      title: "重置密码",
      text: "请输入您的电子邮箱",
      content: {
        element: "input",
        attributes: {
          placeholder: "eg. johndoe@mail.com",
        },
      },
    }).then((value) => {
      if (value) {
        swal({
          title: "请稍等",
          text: "处理中",
          buttons: [false],
          closeOnEsc: false,
          closeOnClickOutside: false,
        })
        if (value != "") {
          firebase.auth().sendPasswordResetEmail(value).then(a => {
            swal.close();
            swal({
              text: "密码重置邮件已发送!",
              icon: "success",
              timer: 2000,
            });
          }).catch(e => {
            swal.close();
            swal({
              text: e.message,
              icon: "error",
              timer: 2000,
            });
          })
        }
      }
    });
  }

  signup() {

    this.nav.navigateForward('register')

  }
}
