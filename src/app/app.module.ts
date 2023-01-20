import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OutercontainerComponent } from './outercontainer/outercontainer.component';
import { LoginComponent } from './login/login.component';
import { PinlistComponent } from './pinlist/pinlist.component';
import { AddpostComponent } from './addpost/addpost.component';
import { ProfileComponent } from './profile/profile.component';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { CommentsComponent } from './comments/comments.component';
import { AddcommentComponent } from './addcomment/addcomment.component';
import { RegistrationComponent } from './registration/registration.component';
import { SavedComponent } from './saved/saved.component';
import { HttpClientModule } from "@angular/common/http";
import { AddreplyComponent } from './addreply/addreply.component';
import { AllreplysComponent } from './allreplys/allreplys.component';
import { MycreatedpostsComponent } from './mycreatedposts/mycreatedposts.component';
import { SavedpostdetailComponent } from './savedpostdetail/savedpostdetail.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ChangeprofilepicComponent } from './changeprofilepic/changeprofilepic.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { TodayspinsComponent } from './todayspins/todayspins.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AboutComponent } from './about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OutercontainerComponent,
    LoginComponent,
    PinlistComponent,
    AddpostComponent,
    ProfileComponent,
    PostdetailComponent,
    CommentsComponent,
    AddcommentComponent,
    RegistrationComponent,
    SavedComponent,
    AddreplyComponent,
    AllreplysComponent,
    MycreatedpostsComponent,
    SavedpostdetailComponent,
    EditprofileComponent,
    ChangeprofilepicComponent,
    ChangepasswordComponent,
    TodayspinsComponent,
    UserprofileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
