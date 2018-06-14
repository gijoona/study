import { Component, Input } from '@angular/core';
import { NavItem } from '../nav-item.model';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent {

  @Input() navItem: NavItem;

  constructor() { }

}
