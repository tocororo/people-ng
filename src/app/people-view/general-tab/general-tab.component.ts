import { Component, OnInit } from '@angular/core';
import {Person} from '../../people/person.entity';

@Component({
  selector: 'app-general-tab',
  templateUrl: './general-tab.component.html',
  styleUrls: ['./general-tab.component.scss']
})
export class GeneralTabComponent implements OnInit {

  public people: Person;
  public text = ['name', 'lastName', 'gender', 'country', 'email', 'url'];
  public chips = ['researchInterests', 'keyWords', 'aliases'];
  public accordion = ['affiliations', 'subaffiliations', 'boardMember'];

  constructor() { }

  ngOnInit() {
    this.people = {
      name: 'Alejandro',
      lastName: 'Cabrera Mena',
      gender: 'M',
      country: 'Cuba',
      email: 'alejandro97.acm@gmail.com',
      url: 'http://localhost:4200/1/view',
      identifiers: [{idtype: 'ark', value: 'value'}],
      researchInterests: ['interest1', 'interest2', 'interest3', 'interest4'],
      keyWords: ['keyWords1', 'keyWords2', 'keyWords3', 'keyWords4'],
      aliases: ['aliases1', 'aliases2'],
      academicTitles: ['master'],
      affiliations: ['affiliations1'],
      subaffiliations: ['subAffiliations1, subAffiliations2'],
      boardMember: ['boardMember'],
      rolesSceiba: [{id: '1', name: 'editor', description: ''}],
      respPublications: [{revista: 'Mendive', roles: ['revisor']}],
    };
  }

}
