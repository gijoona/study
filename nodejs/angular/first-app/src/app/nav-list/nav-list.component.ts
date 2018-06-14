import { Component, Input } from '@angular/core';
import { NavItem } from '../nav-item.model';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css']
})
export class NavListComponent {
  @Input() navList: NavItem[];

  constructor() { }

  generateNavMenu(): NavItem[] {
    var depthArr1: NavItem[];
    for(var idx in this.navList) {
      var nav: NavItem = this.navList[idx];
      if(nav.parentCd){
        depthArr1.push(nav);
      }
    }
    return depthArr1;
  }

}
