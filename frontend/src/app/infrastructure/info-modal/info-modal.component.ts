import { Component, OnInit } from '@angular/core';
import { InfoModalService } from '../services/info-modal.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  constructor(public infoModal: InfoModalService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.infoModal.closeModal();
    }, 5000);
  }
}
