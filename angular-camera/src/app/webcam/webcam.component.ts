import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WebCamComponent } from 'ack-angular-webcam';
import { Http, Request } from '@angular/http';
@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent  {

  options: any;
  @Input() IsOpen: boolean;
  webcam: WebCamComponent;
  request: Request;
  config: any;
  @Output() generatedBase64: EventEmitter<string> = new EventEmitter<string>();;
  //flashPlayer: FallbackDispatcher;
  constructor(public http: Http) {
  }

  ngOnInit() {
  }

  openWebcam() {
    this.IsOpen = true;

    this.options = {
      audio: false,
      video: true,
      //width: 150,
      //height: 180,
      //fallbackMode: 'callback',
      //fallbackSrc: 'jscam_canvas_only.swf',
      fallbackQuality: 85,
      cameraType: 'front' //|| 'back'
    }
  }

  // close modal
  closeWebcam() {
    this.IsOpen = false;
    this.options.video = false;
  }

  // click take photo button
  takePhoto() {
    this.webcam.getBase64()
      .then(base => {
        this.generatedBase64.emit(base);
      })
      .catch(e => console.error(e));
  }

  //get HTML5 FormData object and pretend to post to server
  genPostData() {
    this.webcam.captureAsFormData({ fileName: 'file.jpg' })
      .then(formData => this.postFormData(formData))
      .catch(e => console.error(e))
  }

  //a pretend process that would post the webcam photo taken
  postFormData(formData) {
    const config = {
      method: "post",
      url: "http://www.aviorsciences.com/",
      body: formData
    }

    const request = new Request(config)
    return this.http.request(request)
  }

  onCamError(err) { }

  onCamSuccess() { }

}
