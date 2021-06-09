import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  dropzone: any;

  constructor() {
    this.dropzone = document.getElementById("dropZone");
  }

  highlight(){
    this.dropzone.style('background-color','#ccc');
    console.log("OnDragOver");
  }
  unhighlight(){
    this.dropzone.style('background-color','#fff');
    console.log("OnDragLeave");
  }

  fileReader(file){
    this.unhighlight();
    console.log(file);
  }

  ngOnInit(): void {
  }



}
