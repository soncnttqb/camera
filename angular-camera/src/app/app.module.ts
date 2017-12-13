import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebCamModule } from 'ack-angular-webcam';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { WebcamComponent } from './webcam/webcam.component';
import { ImageCropperComponent } from 'ng2-img-cropper';


@NgModule({
  declarations: [
    AppComponent,
    WebcamComponent,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule,
    WebCamModule,
    HttpModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
