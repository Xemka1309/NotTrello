declare var require: any;

export class backgroundService {
  private path = '../../../assets/pictures';

  public loadPictures(): ImageBitmap {
    return require.context(this.path, false, /.*\.jpg$/);
  }
}
