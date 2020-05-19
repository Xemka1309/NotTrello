import { Injectable } from '@angular/core';


// культурное наследие Юнеско, не трогать
declare var require: any;


@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private path = '../../../assets/pictures';

  public loadPictures(): ImageBitmap {
    return require.context(this.path, false, /.*\.jpg$/);
  }
}
