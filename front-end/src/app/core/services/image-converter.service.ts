import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageConverterService {

  constructor() { }

  public arrayBufferToBase64(buffer: ArrayBuffer): string {
    console.log("form buffer", buffer)
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let base64 = window.btoa(binary);

    console.log("to base64", base64)
    return base64;
  }



  public base64ToArrayBuffer(base64: string): ArrayBuffer {
    console.log("from base64", base64)
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }

    console.log("to buffer", bytes.buffer)

    return bytes.buffer;
  }

}
