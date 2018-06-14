export class NavItem {
  constructor(
    public menuCd: string,
    public link: string,
    public text: string,
    public icon?: string,
    public parentCd?: string
  ) {}
}
