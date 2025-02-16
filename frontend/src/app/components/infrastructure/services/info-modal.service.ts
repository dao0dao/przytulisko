import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InfoModalService {
  private isModalOpen: boolean = false;
  private modalMessage: string = '';

  getIsOpen() {
    return this.isModalOpen;
  }

  getMessage() {
    return this.modalMessage;
  }

  showModal(message: string) {
    this.modalMessage = message;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalMessage = '';
  }
}
