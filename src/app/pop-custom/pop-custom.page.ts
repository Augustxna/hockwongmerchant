import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-pop-custom',
  templateUrl: './pop-custom.page.html',
  styleUrls: ['./pop-custom.page.scss'],
})
export class PopCustomPage implements OnInit {

  constructor(private navparam: NavParams, private modalController: ModalController) { }

  date = new Date().getTime();
  title = 'Roji Monster 免费饮料';
  language = 'en'
  input;
  enteredcode;

  lang = {
    ["message"] : {
      'zh' : '错误点击“确定使用”的代理，',
      'en' : 'After clicking "Confirm", the benefit will be marked as "Redeemed". This action cannot be undone.'
    },
    ["message2"] : {
      'zh' : '代理福利将自动列为“已经使用”，无法返还。',
      'en' : ''
    },
    

  }

  ngOnInit() {
    
    this.title = this.navparam.get('title')
    this.language = this.navparam.get('language')
    this.input = this.navparam.get('input')

  }

  done(x) {
    this.modalController.dismiss(x ? (this.input ? this.enteredcode : 'Confirm') : null)
  }

}