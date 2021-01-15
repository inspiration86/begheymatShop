import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  public showOverlay = false;
  constructor() { }
}
