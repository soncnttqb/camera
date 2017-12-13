import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebCamModule } from 'ack-angular-webcam';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ng2-img-cropper/index';

import { AppComponent } from './app.component';
import { WebcamComponent } from './webcam/webcam.component';


@NgModule({
  declarations: [
    AppComponent,
    WebcamComponent
  ],
  imports: [
    BrowserModule,
    WebCamModule,
    HttpModule,
    ImageCropperModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
