import { Component, ViewChild } from '@angular/core';
import { Http, Request } from '@angular/http';
import { WebcamComponent } from './webcam/webcam.component';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { toUnicode } from 'punycode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //flag to track camera is opened or closed
  IsOpenCam: boolean = false;
  //flag to track photo is get from camera or from disk
  IsTakePhoto: boolean = false;

  base64: string;

  dataCropper: any;

  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 250;

    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 250;

    this.cropperSettings.canvasWidth = 200;
    this.cropperSettings.canvasHeight = 250;

    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;

    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;
    this.dataCropper = {};
  }

  //open camera modal
  openCam() {
    this.IsOpenCam = true;
    this.IsTakePhoto = true;
  }

  // close camera modal
  closeCam() {
    this.IsOpenCam = false;
  }

  // event when after click take photo
  onGetBase64(imageBase64: string): void {
    this.closeCam();
    document.getElementById("btn-dismiss").click();
    var image: any = new Image();
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = imageBase64;
      that.cropper.setImage(image);
      document.getElementById("btn-open-cropper").click();
    };
    let blob = this.base64toBlob(imageBase64, 'image/png');
    myReader.readAsDataURL(blob);
  }

  // click validate and print button
  Print(): void {
    let printContents = //document.getElementById('div-print').outerHTML;//'<div>Print content</div>';
      '<div style="border:0.5px solid black;padding: 5px; border-radius:1px" id="div-print" >' +
      '<table cellspacing="8" style="width:100%">' +
      '<tr>' +
      '<td style="vertical-align: top;padding-right: 10px;" rowspan="8">' +
      '<img style="width:200px;height:250px" src="' + `${this.base64}` + '">' +
      '</td>' +
      '<td>Title</td>' +
      '<td style="font-weight: bold">Mr.</td>' +
      '<td>Badge status</td>' +
      '<td style="font-weight: bold">Active</td>' +
      '</tr>' +
      '<tr>' +
      '<td>First name</td>' +
      '<td style="font-weight: bold">Joakim</td>' +
      '<td>Badge number</td>' +
      '<td style="font-weight: bold">1862951235</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Last name</td>' +
      '<td style="font-weight: bold">Brown</td>' +
      '<td>Badge type</td>' +
      '<td style="font-weight: bold">HQ The Centre Brun</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Phone number</td>' +
      '<td style="font-weight: bold">087 774 53 19</td>' +
      '<td>Validity start date</td>' +
      '<td style="font-weight: bold">12.12.2017</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Email  </td>' +
      '<td style="font-weight: bold">jbrown@genergie.ch</td>' +
      '<td>Validity start time</td>' +
      '<td style="font-weight: bold">08:00</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Function</td>' +
      '<td style="font-weight: bold">Electrician</td>' +
      '<td>Validity end date</td>' +
      '<td style="font-weight: bold">12.12.2017</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Site</td>' +
      '<td style="font-weight: bold">Vevey</td>' +
      '<td>Validity end time</td>' +
      '<td style="font-weight: bold">18:00</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Extenal company</td>' +
      '<td style="font-weight: bold">Romande Energie</td>' +
      '<td></td>' +
      '<td style="font-weight: bold"></td>' +
      '</tr>' +
      '</table>' +
      '</div>'
    let popupWin;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
            <html>
                <head>
                <title>Print tab</title>
                </head>
            <body onload="window.print();window.close()">${printContents}</body>
            </html>`
    );
    popupWin.document.close()
  }

  //event after cropped completed
  cropped(bounds: Bounds) {

  }

  //convert base64 to blob
  base64toBlob(base64Data, contentType): Blob {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data.split(',')[1]);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  // click validate photo button
  validatePhoto(): void {
    if (this.dataCropper.image)
      this.base64 = this.dataCropper.image;
  }

  //click take photo again button/ or upload photo again
  takePhotoAgain(): void {
    this.closeCropper();
    if (this.IsTakePhoto)
      document.getElementById('btn-open-cam').click();
    else
      document.getElementById('btn-upload-phoo').click();

  }

  //close cropper modal  
  closeCropper(): void {
    document.getElementById("btn-dismiss-cropper").click();
  }

  //click upload photo button
  uploadPhoto(): void {
    this.IsTakePhoto = false;
    document.getElementById("file-hidden").click();
  }

  //change file upload
  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
      document.getElementById("btn-open-cropper").click();
    };
    myReader.readAsDataURL(file);
  }

}
