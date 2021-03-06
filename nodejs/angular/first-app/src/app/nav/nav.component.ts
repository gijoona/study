import { Component } from '@angular/core';
import { NavItem } from '../nav-item.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  navArr: NavItem[];

  constructor() {
    this.navArr = [
      new NavItem('M01', 'index.html', 'Dashboard', 'fa fa-fw fa-dashboard'),
      new NavItem('M02', 'charts.html', 'Charts', 'fa fa-fw fa-area-chart'),
      new NavItem('M03', 'tables.html', 'Tables', 'fa fa-fw fa-table'),
      new NavItem('M04', 'index.html', 'Components', 'fa fa-fw fa-wrench', true),
      new NavItem('M05', 'index.html', 'Example Pages', 'fa fa-fw fa-file', true),
      new NavItem('M06', 'index.html', 'Menu Levels', 'fa fa-fw fa-sitemap', true),
      new NavItem('M07', 'index.html', 'Link', 'fa fa-fw fa-link'),
      new NavItem('M08', 'index.html', 'Messages', 'fa fa-fw fa-envelope'),
      new NavItem('M09', 'index.html', 'Alerts', 'fa fa-fw fa-bell'),
      new NavItem('M10', 'index.html', 'Navbar', '', false, 'M04'),
      new NavItem('M11', 'index.html', 'Cards', '', false, 'M04'),
      new NavItem('M12', 'index.html', 'Login Page', '', false, 'M05'),
      new NavItem('M13', 'index.html', 'Registration Page', '', false, 'M05'),
      new NavItem('M14', 'index.html', 'Forgot Password Page', '', false, 'M05'),
      new NavItem('M15', 'index.html', 'Blank Page', '', false, 'M05'),
      new NavItem('M16', 'index.html', 'Second Level Item', '', false, 'M06'),
      new NavItem('M17', 'index.html', 'Second Level Item', '', false, 'M06'),
      new NavItem('M18', 'index.html', 'Second Level Item', '', false, 'M06'),
      new NavItem('M19', 'index.html', 'Second Level Item', '', true, 'M06'),
      new NavItem('M20', 'index.html', 'Thrid Level Item', '', false, 'M19'),
      new NavItem('M21', 'index.html', 'Thrid Level Item', '', false, 'M19')
    ];
  }

}
