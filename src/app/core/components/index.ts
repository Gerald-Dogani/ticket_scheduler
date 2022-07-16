import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {FooterComponent} from "@core/components/navigation/footer/footer.component";
import {HeaderComponent} from "@core/components/navigation/header/header.component";
import {SidebarComponent} from "@core/components/navigation/sidebar/sidebar.component";


export const components: any[] = [
  DashboardComponent, NavigationComponent, FooterComponent, HeaderComponent, SidebarComponent
];

export * from './dashboard/dashboard.component';
export * from './navigation/navigation.component';
export * from './navigation/footer/footer.component';
export * from './navigation/header/header.component';
export * from './navigation/sidebar/sidebar.component';
