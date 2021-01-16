import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private  http: HttpClient) {
  }

  login(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/loginAdmin', data);
  }

  uploadFile(image: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/image', image);
  }

  uploadMultipleFiles(image: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/multipleimage', image);
  }

  deleteFile(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/deleteImage/', data);

  }

  //#region Sellers-Apis
  getAllSellers(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/allseller');
  }

  getSellerById(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/showSeller/' + id);
  }

  addSeller(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/registerSeller', data);
  }

  editSeller(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/updateSeller/' + id, data);
  }

  deleteSeller(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteSeller/' + id);
  }

  activeSeller(id: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/activeSeller/' + id, null);
  }

  deactiveSeller(id: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/deactiveSeller/' + id, null);
  }

  showSeller(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/showSeller/' + id);
  }

  //#endregion

  //#region Advices-Apis
  getAllComments(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/allComment');
  }

  activeComment(id: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/activeComment/' + id, null);
  }

  deleteComment(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteComment/' + id);
  }

  //#endregion

  //#region Advices-Apis
  getAllAdvices(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/allProductAdvice');
  }

  activeAdvice(id: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/activeProductAdvice/' + id, null);
  }

  answerAdvice(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/seller/answerProductAdvice/' + id, data);
  }

  deleteAdvice(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteProductAdvice/' + id);
  }

  //#endregion

  //#region Sliders-Apis
  getSliders(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/slider');
  }

  addSlider(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/slider', data);
  }

  editSlider(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/slider/' + id, data);
  }

  deleteSlider(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/slider/' + id);
  }

  //#endregion

  //#region Product Features-Apis
  addProductFeature(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/productFeature', data);
  }

  deleteProductFeature(id: any) {
    return this.http.delete('http://194.5.175.25:3005/api/v1/seller/deleteProductFeature/' + id);
  }

  //#endregion

  //#region Products-Apis
  getAllProducts(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/product');
  }

  getProductById(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/singleProduct/' + id);
  }

  addProduct(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/product', data);
  }

  editProduct(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/updateProduct/' + id, data);
  }

  deleteProduct(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteProduct/' + id);
  }

  //#endregion

  //#region Features-Apis
  getAllFeatures(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/indexFeature');
  }

  addFeature(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/feature', data);
  }

  getAllFeatureValues(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/indexFeatureValue', data);
  }

  addFeatureValue(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/featureValue', data);
  }

  //#endregion

  //#region Categories-Apis
  getCategories(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/category');
  }

  addCategory(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/registerCategory', data);
  }

  addSubCategory(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/registerSubCategory', data);
  }

  addSubSubCategory(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/registerSubSubCategory', data);
  }

  editCategory(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/updateCategory/' + id, data);
  }

  editSubCategory(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/updateSubCategory/' + id, data);
  }

  editSubSubCategory(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/updateSubSubCategory/' + id, data);
  }

  deleteCategory(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteCategory/' + id);
  }

  deleteSubCategory(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteSubCategory/' + id);
  }

  deleteSubSubCategory(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteSubSubCategory/' + id);
  }

  //#endregion

  //#region Users
  getAllUsers(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/allUser');
  }

  getUserById(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/showUser/' + id);
  }

  addUser(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/registerUser', data);
  }

  editUser(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/updateUser/' + id, data);
  }

  deleteUser(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteUser/' + id);
  }

  //#endregion

  //#region Notifications-Apis
  getAllNotifications(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/allNotification');
  }
  getNotificationById(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/singleNotification/' + id);
  }
  addNotification(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/registerNotification', data);
  }
  editNotification(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/updateNotification/' + id, data);
  }
  deleteNotification(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteNotification/' + id);
  }

  //#endregion

  //# region ContractSeller-Apis
  getAllSellerContracts(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/allContractSellerbe');
  }
  getSellerContractById(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/singleContractSellerbe/' + id);
  }
  editSellerContract(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/updateContractSellerbe/' + id, data);
  }
  deleteSellerContract(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/admin/deleteContractSellerbe/' + id);
  }
  activeSellerContract(id: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/activeContractSellerbe/' + id, null);
  }
  deactiveSellerContract(id: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/admin/deactiveContractSellerbe/' + id, null);
  }
  //#endregion
}
