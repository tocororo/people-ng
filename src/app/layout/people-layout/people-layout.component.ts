import { Component, OnInit } from '@angular/core';
import {Person} from '../../people/person.entity';

@Component({
  selector: 'app-people-layout',
  templateUrl: './people-layout.component.html',
  styleUrls: ['./people-layout.component.scss']
})
export class PeopleLayoutComponent implements OnInit {

  public people: any;

  constructor() { }

  ngOnInit() {
    this.people = {
      name: 'Alejandro',
      lastName: 'Cabrera Mena',
      country: 'Cuba',
      email: 'alejandro97.acm@gmail.com',
      active: true,
      publicProfile: false
    };
  }

}
