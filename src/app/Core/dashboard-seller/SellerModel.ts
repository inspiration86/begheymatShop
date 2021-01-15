export class SellerModel {
  constructor(
    public id: string,
    public sellerID?: string,
    public mobile?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public phone?: string,
    public birthDay?: string,
    public gender?: string,
    public nationalCode?: string,
    public idNumber?: string,
    public state?: string,
    public city?: string,
    public address?: string,
    public shopName?: string,
    public category?: string,
    public companyName?: string,
    public regNumCompany?: string,
    public economicCompany?: string,
    public shabaNumber?: string,
    public typeCompany?: string,
    public signCompany?: string,
    public imageSeller?: string,
    public imageNationalcard?: string,
    public imageCertificate?: string,
    public imageCompany?: string,
    public resume?: string,
    public logo?: string,
    public active?: boolean
  ) {
  }

}
