import {Injectable} from '@angular/core';
// import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class RorService {

  FOLDER = 'folder path';
  bucket: any;

  constructor() {
    this.bucket = new S3(
      {
        accessKeyId: 'access key',
        secretAccessKey: 'secret access key',
        region: 'region'
      }
    );
  }

  getFile() {
    const promise = new Promise((resolve, reject) => {
      const params = {
        Bucket: 'bucket-name',
        Prefix: this.FOLDER
      };
      this.bucket.listObjects(params, (err, data) => {
        if (err) {
          console.log('There was an error get your file: ', err);
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    });
    return promise;
  }

  uploadFile(file) {
    const promise = new Promise((resolve, reject) => {
      const contentType = file.type;
      const params = {
        Bucket: 'bucket-name',
        Key: this.FOLDER + file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
      };
      this.bucket.upload(params, (err, data) => {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return reject(err);
        }
        console.log('Successfully uploaded file.', data);
        return resolve(data);
      });
    });
    return promise;
  }

  deleteFile(item) {
    const promise = new Promise((resolve, reject) => {
      const params = {
        Bucket: 'bucket-name',
        Key: item.k
      };
      this.bucket.deleteObject(params, (err, data) => {
        if (err) {
          console.log('There was an error deleting your file: ', err);
          return reject(err);
        }
        console.log('Successfully deleted file.', data);
        return resolve(data);
      });
    });
    return promise;
  }
}
