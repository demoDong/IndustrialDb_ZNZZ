import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoFrameService } from '../../shared/do-service/do-frame.service';

@Component({
    selector: 'do-example-homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.scss'],
})

export class HomePageComponent implements OnInit {

    constructor(private router: Router, private frameService: DoFrameService) { }

    ngOnInit() {
    }

    btn1Clicked() {
        this.frameService.selectIndex(0, this.frameService.headerController);
        this.frameService.selectIndex(1, this.frameService.footController);
        this.router.navigate(['pages/country']);
    }
    btn2Clicked() {
        this.frameService.selectIndex(2, this.frameService.footController);
        this.router.navigate(['pages/nw1']);
    }
    btn3Clicked() {
        this.frameService.selectIndex(0, this.frameService.footController);
        this.router.navigate(['pages/bigdatabase']);
    }
}
