import { Component, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'do-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" style="width:790px;height:750px;">
      <do-echarts [options]="optionType" [theme]="theme"
      [nameMap]="nameMap" (chartClick)="onClicked($event)"></do-echarts>
      <div class="special">
        <p>{{ ModelContent1 }}</p>
        <p>{{ ModelContent2 }}</p>
        <p>{{ ModelContent3 }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  optionType: any;
  onClicked: any;
  nameMap: any;
  modalHeader: string;
  ModelContent1: any;
  ModelContent2: any;
  ModelContent3: any;
  theme = 'echart-theme';

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
