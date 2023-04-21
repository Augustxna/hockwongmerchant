import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})

export class ChatDetailsPage implements OnInit {
  @ViewChild('area') area;

  constructor(private nav: NavController, private actionSheetController: ActionSheetController) { }

  nowdate = new Date().getTime();

  imgselect = '';
  imgview = false;
  list = [] as any;
  input = '';

  selectimage(x) {
    this.imgselect = x;
    this.imgview = !this.imgview;
  }

  clearimage(x) {
    setTimeout(() => {
      this.imgselect = x;
    }, 100);
    this.imgview = !this.imgview;
  }

  over2day(x) {
    let day = ""
    let month = ''
    let hour = '';
    let minute = ''
    if ((new Date(x).getMonth() + 1) < 10) {
      month = '0' + (new Date(x).getMonth() + 1)
    } else {
      month = (new Date(x).getMonth() + 1).toString()
    }
    if ((new Date(x).getDate()) < 10) {
      day = '0' + (new Date(x).getDate())
    } else {
      day = (new Date(x).getDate()).toString()
    }
    if (new Date(x).getHours() < 10) {
      hour = '0' + new Date(x).getHours()

    } else {
      hour = new Date(x).getHours().toString()
    }
    if (new Date(x).getMinutes() < 10) {
      minute = '0' + new Date(x).getMinutes()
    } else {
      minute = new Date(x).getMinutes().toString()
    }
    return day + '/' + month + '/' + (new Date(x).getFullYear()) + ' ' +
      (parseInt(hour) > 12 ? parseInt(hour) - 12 : parseInt(hour))
      + ':' + minute + (parseInt(hour) < 12 ? ' AM' : ' PM');
  }

  yesterday(x) {
    let day = ""
    let month = ''
    let hour = '';
    let minute = ''
    if ((new Date(x).getMonth() + 1) < 10) {
      month = '0' + (new Date(x).getMonth() + 1)
    } else {
      month = (new Date(x).getMonth() + 1).toString()
    }
    if ((new Date(x).getDate()) < 10) {
      day = '0' + (new Date(x).getDate())
    } else {
      day = (new Date(x).getDate()).toString()
    }
    if (new Date(x).getHours() < 10) {
      hour = '0' + new Date(x).getHours()

    } else {
      hour = new Date(x).getHours().toString()
    }
    if (new Date(x).getMinutes() < 10) {
      minute = '0' + new Date(x).getMinutes()
    } else {
      minute = new Date(x).getMinutes().toString()
    }
    return 'Yesterday ' + (parseInt(hour) > 12 ? parseInt(hour) - 12 : parseInt(hour))
      + ':' + minute + (parseInt(hour) < 12 ? ' AM' : ' PM');
  }

  today(x) {
    let hour = '';
    let minute = ''

    if (new Date(x).getHours() < 10) {
      hour = '0' + new Date(x).getHours()
    } else {
      hour = new Date(x).getHours().toString()
    }
    if (new Date(x).getMinutes() < 10) {
      minute = '0' + new Date(x).getMinutes()
    } else {
      minute = new Date(x).getMinutes().toString()
    }
    return (parseInt(hour) > 12 ? parseInt(hour) - 12 : parseInt(hour)) +
      ':' + minute + (parseInt(hour) < 12 ? ' AM' : ' PM');
  }

  eightdater(x) {
    return parseInt((new Date(x).getFullYear().toString()) + ((new Date(x).getMonth() + 1 >= 10 ? (new Date(x).getMonth() + 1).toString() : "0" +
      (new Date(x).getMonth() + 1).toString())) + ((new Date(x).getDate() >= 10 ? (new Date(x).getDate()).toString() : "0" + (new Date(x).getDate()).toString())))
  }

  datechecker(x) {
    return this.eightdater(this.nowdate) - this.eightdater(x) > 1 ? this.over2day(x) :
      this.eightdater(this.nowdate) - this.eightdater(x) > 0 ? this.yesterday(x) : this.today(x);
  }

  showdate(x, i) {
    return i > 0 ?
      (this.eightdater(this.list[i - 1].date) == this.eightdater(x) ?
        false :
        (Math.floor(this.list[i - 1].date / 60000) > 2 || this.eightdater(x) > this.eightdater(this.list[i - 1].date)))
      : true;
  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0;
  }

  async menu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  back() {
    this.nav.pop();
  }

  ngOnInit() {
    setTimeout(() => {
      document.getElementById('bottom').scrollIntoView();
    }, 150);
  }

  photo() {
    let i = this.lengthof(this.list)
    this.list.push({
      id: 'me',
      content: '',
      photo: 'https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif',
      date: new Date().getTime(),
      type: 'photo',
    })

    setTimeout(() => {
      this.list[i].photo = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cutest-dog-breeds-lead-1587053686.jpg?crop=0.668xw:1.00xh;0.152xw,0&resize=640:*';
    }, 2000);
  }

  send() {
    this.list.push({
      id: 'me',
      content: this.input,
      date: new Date().getTime(),
      type: 'text',
    })
    this.input = '';
    this.area.setFocus();
  }

}
