import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  constructor(private nav: NavController,) { }

  search = false;

  keyword

  list = [
    {
      name: 'GROUP NAME',
      last_replies: '[photo]',
      photo: 'https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png',
      user: 'TW LAI',
      date: 16000000000
    },    {
      name: 'GROUP NAME',
      last_replies: '[photo]',
      photo: 'https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png',
      user: 'TW LAI',
      date: 16000000000
    },    {
      name: 'GROUP NAME',
      last_replies: '[photo]',
      user: 'TW LAI',
      photo: 'https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png',
      date: 16000000000
    },    {
      name: 'GROUP NAME',
      last_replies: '[photo]',
      user: 'TW LAI',
      photo: 'https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png',
      date: 16000000000
    },   
  ]

  back() {
    this.nav.pop();
  }

  ngOnInit() {
    
  }

  details(x){
    this.nav.navigateForward('chat-details');
  }


}
