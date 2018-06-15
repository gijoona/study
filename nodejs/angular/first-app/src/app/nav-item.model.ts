export class NavItem {
  constructor(
    public id: string,
    public link: string,
    public text: string,
    public icon: string,
    public isParent: boolean = false,
    public parent?: string,
    public sub?: Array<NavItem>
  ) {}
}
