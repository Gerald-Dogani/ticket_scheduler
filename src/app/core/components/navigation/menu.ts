export class MenuItem {
  constructor(public order: number = 0, public name: string = '', public path: string = '/', public icon: string = '',
              public active: boolean = true, public permissions: string[] = [], public children: MenuItem[] = []) {
  }
}

const DASHBOARD_ICON = './assets/menu-icons/dashboard.svg/';
const TICKET_LIST_ICON = './assets/menu-icons/ticket-list.svg/';
const CREATE_TICKET_ICON = './assets/menu-icons/create-ticket.svg/';



export const MENU = [
  new MenuItem(1, `Dashboard`, 'dashboard', DASHBOARD_ICON, false, [], []),
  new MenuItem(2, `My ticket`, 'list', TICKET_LIST_ICON, true, [], []),
  new MenuItem(3, `Create a ticket`, 'form', CREATE_TICKET_ICON, true, [], []),
];
