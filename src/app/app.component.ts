import {Component, OnInit} from '@angular/core';
import {RorService} from './ror.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RorService]
})
export class AppComponent implements OnInit {
  title = 'my-s3-proj';
  selectedFiles: any;
  list = [];

  constructor(public  rorService: RorService) {
  }

  ngOnInit(): void {
    this.rorService.getFile().then((response: any) => {
      for (const index in response.Contents) {
        if (response.Contents[index].Size > 0) {
          const url = 's3 base url';
          this.list.push({k: response.Contents[index].Key, v: url + response.Contents[index].Key});
        }
      }
    });
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.rorService.uploadFile(file).then((response: any) => {
      this.list.push({k: response.key, v: response.Location});
    });
  }

  delete(item) {
    this.rorService.deleteFile(item).then((response: any) => {
      const index: number = this.list.indexOf(item);
      this.list.splice(index, 1);
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
