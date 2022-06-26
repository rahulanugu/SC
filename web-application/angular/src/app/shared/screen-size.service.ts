import { ReturnStatement } from '@angular/compiler';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService{
  size:string
  constructor() {}

  setSize(data){
    this.size=data
  }
  getSize(){
    return this.size
  }

}
