import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) {
  }

  updateSeller(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/seller/updateSeller/' + id, data);
  }

  getSeller(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/showSeller/' + id);
  }

  getCategories(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/category');

  }

  getSubCategories(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/subCategory/' + id);
  }

  getSubSubCategories(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/subsubCategory/' + id);
  }

  getProducts(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/products/' + id);
  }

  getProductById(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/singleProduct/' + id);
  }

  addProduct(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/registerProduct', data);
  }

  deleteProduct(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/seller/deleteProduct/' + id);
  }

  editProduct(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/seller/updateProduct/' + id, data);
  }

  answerProductAdvice(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/seller/answerProductAdvice/' + id, data);
  }

  getProductAdvices(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/allProductAdvice/' + id);
  }

  addProductFeature(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/productFeature', data);
  }

  addProductGift(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/registerProductGift', data);
  }

  getFeatures(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/indexFeature');
  }

  addFeature(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/feature', data);
  }

  getFeatureValues(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/indexFeatureValue');
  }

  addFeatureValue(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/featureValue', data);
  }

  getGifts(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/showGift');
  }

  uploadFile(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/image', data);
  }

  uploadFiles(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/multipleimage', data);
  }
  deleteGallery(id:any,data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/deleteGallery/'+id, data);
  }
  deleteImage(data: any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/deleteImage/', data);

  }
  onDisplayBasket(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/basketList',data);
  }
  deleteProductFeature(id:any){
    return this.http.delete('http://194.5.175.25:3005/api/v1/seller/deleteProductFeature/'+id);
  }
  registerProductFeatureSingle(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/storeProductFeatureSingle',data);
  }

  getNotifications(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/allNotification');
  }

}
