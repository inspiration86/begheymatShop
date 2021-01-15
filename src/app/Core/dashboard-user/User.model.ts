export class UserModel {

  constructor(
    public userID?: string,
    public categoryID?: string,
    public productID?: string,
    public count?: string,
    public price?: string,
    public offerPercent?: string,
    public date?: string,
    public time?: string,
    public product?: object,
    public user?: object,

  ) {
  }

}
