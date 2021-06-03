import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TattooComponent } from './pages/tattoo/tattoo.component';
import { ProductComponent } from './pages/product/product.component';
import { EventsComponent } from './pages/events/events.component';
import { UserPersonalComponent } from './pages/user-personal/user-personal.component';
import { UserPersonalExternoComponent } from './pages/user-personal-externo/user-personal-externo.component';
import { ChatComponent } from './pages/chat/chat.component';
import { RegisterComponent } from './pages/register/register.component';
import { OptionsComponent } from './pages/options/options.component';
import { DetailTattooComponent } from './pages/detail-tattoo/detail-tattoo.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { DetailEventComponent } from './pages/detail-event/detail-event.component';

//credential
import {FB_CONFIG} from '../../credentials';

//firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearcherComponent,
    HomepageComponent,
    TattooComponent,
    ProductComponent,
    EventsComponent,
    UserPersonalComponent,
    UserPersonalExternoComponent,
    ChatComponent,
    RegisterComponent,
    OptionsComponent,
    DetailTattooComponent,
    DetailProductComponent,
    DetailEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FB_CONFIG),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
