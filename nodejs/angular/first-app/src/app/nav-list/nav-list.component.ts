import { Component, Input } from '@angular/core';
import { NavItem } from '../nav-item.model';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css']
})
export class NavListComponent {
  @Input() navList: Array<NavItem>;
  menuList: Array<NavItem>;

  constructor() {
    this.generateNavMenu();
  }

  generateNavMenu(): Array<NavItem> {
    this.menuList = new Array<NavItem>();
    for(let idx in this.navList){
      let navItem: NavItem = this.generateNavItem(this.navList, this.navList[idx]);
      this.menuList.push(navItem);
    }
    console.log(this.menuList);
    return this.menuList;
  }

  // 메뉴리스트에서 isParent, parent를 체크하여 navigation을 생성
  generateNavItem(pNavList: Array<NavItem>, pNavItem: NavItem): NavItem {
    // sub메뉴를 담는 변수
    let sub: Array<NavItem> = new Array<NavItem>();
    // 부모메뉴일 경우(sub메뉴가 존재하는 메뉴일 경우)
    if(pNavItem.isParent){
      // 현재 메뉴의 메뉴ID를 get
      let id: string = pNavItem.id;
      // 전체 메뉴리스트를 검색해서 parent의 값이 ID와 같은 데이터를 sub에 담아 sub Navigation을 생성
      // 만일 sub메뉴의 isParent가 true(하위메뉴가 있을 경우)일 경우 재귀호출을 수행한다.
      for(let idx in pNavList){
        let subNav: NavItem = pNavList[idx];
        if(subNav.parent == id){
          if(subNav.isParent){
            subNav = this.generateNavItem(pNavList, subNav);
          }
          sub.push(subNav);
          delete pNavList[idx];
        }
      }
      pNavItem.sub = sub;
    }
    this.navList = pNavList;
    return pNavItem;
  }

}
