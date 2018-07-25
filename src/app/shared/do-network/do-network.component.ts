import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modals/modal/modal.component';
import { Router } from '@angular/router';

@Component({
    selector: 'do-network',
    templateUrl: './do-network.component.html',
    styleUrls: ['./do-network.component.scss'],
})
export class DoNetworkComponent implements OnInit {
    @Input() smallTitle: string = '';
    @Input() dataComing: string = '';
    @Input() optionType: any;
    @Input() optionTypeModel: any;
    @Input() special1: any;
    @Input() special2: any;
    @Input() special3: any;
    @Input() showEcharts = true;
    @Input() showTitle = true;
    @Input() showChangeNorm_type = false;
    @Input() nameMap: string;
    @Input() theme = 'echart-theme';
    @Input() tabItems: Array<string>;
    @Input() OnJump: boolean = false;
    @Input() shut: boolean = false;
    @Input() show: boolean;
    // @Input() path: any;
    @Input() display: boolean = false;
    @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() btnClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() jumpClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() JumpAClicked: EventEmitter<any> = new EventEmitter<any>();
    isClick: Array<boolean>;
    constructor(private router: Router, private zone: NgZone, private modalService: NgbModal) {
    }

    ngOnInit() {
        if (this.tabItems) {
            this.isClick = new Array<boolean>(this.tabItems.length);
            this.isClick.fill(false);
            this.isClick[0] = true;
        }
    }

    onClicked(e) {
        this.clicked.emit(e);
    }

    onBtnClick(i) {
        this.isClick.fill(false);
        this.isClick[i] = true;
        this.btnClicked.emit(i);
    }
    OnJumpClick(j) {
        this.JumpAClicked.emit(j);
    }
    showLargeModal() {
        const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.optionType = this.optionTypeModel;
        activeModal.componentInstance.ModelContent1 = this.special1;
        activeModal.componentInstance.ModelContent2 = this.special2;
        activeModal.componentInstance.ModelContent3 = this.special3;
        console.log(activeModal.componentInstance.modalContent3);
    }
    anotherClicked() {
        this.jumpClicked.emit();
    }

}
