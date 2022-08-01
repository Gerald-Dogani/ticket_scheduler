import {NavigationComponent} from "./navigation/navigation.component";
import {FooterComponent} from "@core/components/navigation/footer/footer.component";
import {HeaderComponent} from "@core/components/navigation/header/header.component";
import {SidebarComponent} from "@core/components/navigation/sidebar/sidebar.component";
import {SpinLoaderComponent} from "@core/components/loader/components/spin-loader/spin-loader.component";
import {LoaderComponent} from "@core/components/loader/components/loader.component";


export const components: any[] = [NavigationComponent, FooterComponent, SpinLoaderComponent,
  LoaderComponent, HeaderComponent, SidebarComponent
];

export * from './navigation/navigation.component';
export * from './navigation/footer/footer.component';
export * from './navigation/header/header.component';
export * from './navigation/sidebar/sidebar.component';
export * from './loader/components/loader.component';
