import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { DetailEventComponent } from './pages/detail-event/detail-event.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { DetailTattooComponent } from './pages/detail-tattoo/detail-tattoo.component';
import { EventsComponent } from './pages/events/events.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { OptionsComponent } from './pages/options/options.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { TattooComponent } from './pages/tattoo/tattoo.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { UserPersonalExternoComponent } from './pages/user-personal-externo/user-personal-externo.component';
import { UserPersonalComponent } from './pages/user-personal/user-personal.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'tattoos', component: TattooComponent },
  { path: 'product', component: ProductComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'events/detail/:id', component: DetailEventComponent },
  { path: 'product/detail/:id', component: DetailProductComponent },
  { path: 'tattoos/detail/:id', component: DetailTattooComponent },
  { path: 'events', component: EventsComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserPersonalComponent },
  { path: 'user/external', component: UserPersonalExternoComponent },
  { path: 'upload', component: UploadPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
