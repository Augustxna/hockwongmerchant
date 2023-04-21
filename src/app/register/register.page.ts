import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import swal from 'sweetalert';
import firebase from 'firebase';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modaL: ModalController, private service: ServiceService,
    private http: HttpClient, private nav: NavController) { }

  user = {} as any;

  onClick() {

    console.log(this.user)

  }

  ngOnInit() {
  }

  back() {

    this.nav.pop()

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

  register() {

    if (!this.user['name']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'Name Missing',
        timer: 3000,
      })

    } else if (!this.user['contact']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'Contact Missing',
        timer: 3000,
      })

    } else if (!this.user['brand_name']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'Brand Name Missing',
        timer: 3000,
      })

    } else if (!this.user['pic_name']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'PIC Name Missing',
        timer: 3000,
      })

    } else if (!this.user['email']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'Email Missing',
        timer: 3000,
      })

    } else if (!this.emailValidator(this.user['email'])) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'Email Badly Format',
        timer: 3000,
      })

    } else {

      swal({
        title: 'Checking User Data',
        text: 'Please Wait...',
        closeOnEsc: false,
        closeOnClickOutside: false,
        buttons: [false]
      })

      // let body = {

      //   contact

      // }

      this.user['contact'] = this.condis(this.user['contact'])
      this.user.date = new Date().getTime();
      this.user.status = true;
      this.user.photo = "https://i.imgur.com/ur6PPRg.png";

      this.http.post('https://hockwon.vsnap.my:3002/insertpending_vendor', this.user).subscribe(a => {

        if (a['success'] == 1) {

          swal.close()

          swal({
            title: 'Account Register Successfully',
            icon: 'success',
            text: 'Your account is pending for approve. We will notify you once the approve had been done. ',
          })

          this.nav.pop()

        } else {
          swal.close()
          swal({
            title: 'Something Wrong',
            icon: 'error',
            text: 'Please try again later',
            timer: 3000,
          })

        }

      }, e => {
        swal.close()
        swal({
          title: 'Something Wrong',
          icon: 'error',
          text: 'Please try again later',
          timer: 3000,
        })

      })

    }

  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  emailValidator(email) {
    if (email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    } else {
      return false;
    }
  }

  gowa() {

    window.open("https://wa.me/60172550789?text=Hello%20Mr%20CP,%20tell%20me%20more%20about%20Hock%20Wong%20Online")

  }

  active() {

    if (!this.user['name']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'Name Missing',
        timer: 3000,
      })

    } else if (!this.user['brand_name']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'Brand Name Missing',
        timer: 3000,
      })

    } else if (!this.user['email']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'Email Missing',
        timer: 3000,
      })

    } else if (!this.emailValidator(this.user['email'])) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'Email bad format',
        timer: 3000,
      })

    } else if (!this.user['pic_name']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'PIC Name Missing',
        timer: 3000,
      })

    } else if (!this.user['contact']) {

      swal({
        title: 'Error',
        icon: 'error',
        text: 'PIC Contact Missing',
        timer: 3000,
      })

    } else {


      // swal({
      //   title: "Active Merchant",
      //   text: "Are you sure want to active this merchant?",
      //   icon: 'warning',
      //   buttons: { Cancel: true, Confirm: true },
      //   // dangerMode: true,
      // }).then((value) => {
      //   if (value == "Confirm") {

      swal({
        title: 'Processing',
        text: 'Please Wait...',
        closeOnEsc: false,
        closeOnClickOutside: false,
        buttons: [false]
      })

      let body = {
        id: '',
        link: JSON.stringify([]),
        tiering: JSON.stringify([]),
        date: new Date().getTime(),
        expire: new Date().getTime(),
        contact: this.condis(this.user['contact']),
        name: this.user['name'],
        email: this.user['email'],
        brand_name: this.user['brand_name'],
        pic_name: this.user['pic_name'],
        physical: this.user['physical'] || false,
        physical_rate: this.user['physical_rate'] || 0,
        comm_rate: this.user['comm_rate'] || 0,
        promote_text: this.user['promote_text'] || '',
        tnc_text: this.user['tnc_text'] || '',
        ssm: this.user['ssm'] || '',
        bank_name: this.user['bank_name'] || '',
        bank_account: this.user['bank_account'] || '',
        bank_type: this.user['bank_type'] || '',
        status: true,
        description: this.user['description'] || '',
        address: this.user['address'] || '',
        password: 'HWonline123',
        // pending_vendors_id: this.user['pending_vendors_id'],
        earn: 0,
        credit: 0,
        // edit_by: firebase.auth().currentUser.uid,
      }

      console.log(body)

      this.http.post('https://hockwon.vsnap.my:3002/emailchecker', { email: this.user['email'].toLowerCase() }).subscribe((s) => {

        console.log(s)

        if (s['users'].length > 0) {

          body.id = s['users'][0].id

          this.http.post('https://hockwon.vsnap.my:3002/merchantcreateacc', body).subscribe((b) => {
            console.log(s)

            if (s['success'] == 1) {

              swal.close()
              swal({
                icon: 'success',
                title: 'Success',
                text: 'Account Created Successfully',
                buttons: [false],
                timer: 1500
              });

              firebase.auth().signInWithEmailAndPassword(this.user['email'].toLowerCase(), body.password).then(ok => {
                this.nav.navigateRoot('/tabs/tab1', { animationDirection: 'forward' })
                this.service.publishPop(true);
              })

            } else {

              swal.close()
              swal({
                icon: 'error',
                title: 'Something Wrong',
                text: 'Please try again later.',
                buttons: [false],
                timer: 1500
              });

            }

          }, e => {

            console.log(e)
            swal.close()
            swal({
              icon: 'error',
              title: 'Something Wrong',
              text: 'Please try again later.',
              buttons: [false],
              timer: 1500
            });

          })


        } else if (s['vendor'].length > 0) {

          swal.close()
          swal({
            icon: 'error',
            title: 'Your email/phone number already in use',
            text: 'Please try another one.',
            buttons: [false],
            timer: 1500
          });

        } else {

          this.http.post('https://hockwon.vsnap.my:3002/createnewuser', { email: this.user['email'], password: 'HWonline123' }).subscribe((create) => {

            console.log(create)
            if (create['success'] == 1) {

              body.id = create['data']

              this.http.post('https://hockwon.vsnap.my:3002/merchantcreateacc', body).subscribe((s) => {
                console.log(s)

                if (s['success'] == 1) {


                  swal.close()
                  swal({
                    icon: 'success',
                    title: 'Success',
                    text: 'Account Created Successfully',
                    buttons: [false],
                    timer: 1500
                  });

                  firebase.auth().signInWithEmailAndPassword(this.user['email'].toLowerCase(), body.password).then(ok => {
                    this.nav.navigateRoot('/tabs/tab1', { animationDirection: 'forward' })
                    this.service.publishPop(true);
                  })

                } else {

                  swal.close()
                  swal({
                    icon: 'error',
                    title: 'Something Wrong',
                    text: 'Please try again later.',
                    buttons: [false],
                    timer: 1500
                  });

                }

              }, e => {

                console.log(e)
                swal.close()
                swal({
                  icon: 'error',
                  title: 'Something Wrong',
                  text: 'Please try again later.',
                  buttons: [false],
                  timer: 1500
                });

              })
            } else {

              swal.close()
              swal({
                icon: 'error',
                title: 'Something Wrong',
                text: 'Please try again later.',
                buttons: [false],
                timer: 1500
              });

            }


          }, e => {

            swal.close()
            swal({
              icon: 'error',
              title: 'Something Wrong',
              text: 'Please try again later.',
              buttons: [false],
              timer: 1500
            });

          })


        }



      })

      //   }
      // })


    }

  }


}
