import { RouteCacheService } from './../do-service/route-cache.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoFrameService } from '../do-service/do-frame.service';
import { NgZone } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'do-frame',
  templateUrl: 'do-frame.component.html',
  styleUrls: ['do-frame.component.scss'],
})
export class DoFrameComponent implements OnInit {

  @Input() leftTitle: string;
  @Input() menubarNone = true;
  @Input() menubarNoneTwo = true;
  @Input() menubarNoneNw = true;
  headerController: Array<boolean> = new Array<boolean>(2);
  footController: Array<boolean> = new Array<boolean>(3);
  menubar: MenuItem[];
  menubarTwo: MenuItem[];
  menubarNw: MenuItem[];

  constructor(private router: Router,
    private service: DoFrameService,
    private activeRoute: ActivatedRoute,
    private zone: NgZone,
    private routeCacheService: RouteCacheService) {
    this.headerController.fill(false);
    this.footController.fill(false);
  }

  public ngOnInit() {
    this.headerController = this.service.headerController;
    this.footController = this.service.footController;
    this.menubar = [
      {
        label: '五大工程',
        items: [
          {
            label: '智能制造工程', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf24']));
            },
          },
          {
            label: '制造业创新中心建设工程',
          },
          {
            label: '工业强基工程',
          },
          {
            label: '绿色制造工程',
          },
          {
            label: '高端装备创新工程',
          },
        ],
      },
      {
        label: '十大领域',
        items: [
          {
            label: '新一代信息技术产业(手机)', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf21']));
            },
          },
          {
            label: '新一代信息技术产业(集成电路)', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf22']));
            },
          },
          {
            label: '节能与新能源汽车', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf5']));
            },
          },
          {
            label: '高档数控机床和机器人',
          },
          {
            label: '航空航天装备',
          },
          {
            label: '海洋工程装备及高级技术船舶',
          },
          {
            label: '先进轨道交通装备',
          },
          {
            label: '电力装备',
          },
          {
            label: '农机装备',
          },
          {
            label: '新材料',
          },
          {
            label: '生物医疗及高性能医疗器械',
          },
        ],
      },
    ];

    this.menubarTwo = [
      {
        label: '总体监测', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/mf1']));
        },
      },
      {
        label: '区域监测', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/mf6']));
        },
      },
    ];

    this.menubarNw = [
      {
        label: '网络设施', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/nw2']));
        },
      },
      {
        label: '信息服务', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/nw6']));
        },
      },
      {
        label: '数字经济', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/nw3']));
        },
      },
      {
        label: '技术产业', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/nw5']));
        },
      },
      {
        label: '网络安全', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/nw4']));
        },
      },
    ];
  }
  quitClicked() {
    const url = this.activeRoute.snapshot.url[0].path;
    let target: string = '';
    let parameter = {};
    switch (url) {
      case 'mf1':
        target = 'pages/homepage';
        break;
      case 'mf8':
      case 'mf9':
      case 'mf10':
      case 'mf15':
        target = 'pages/country';
        this.service.selectIndex(0, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf11':
      case 'mf12':
      case 'mf13':
      case 'mf14':
        target = 'pages/mf10';
        this.service.selectIndex(1, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf2':
      case 'mf5':
        target = 'pages/country';
        this.service.selectIndex(0, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf16':
      case 'mf17':
      case 'mf18':
      case 'mf21':
        target = 'pages/country';
        this.service.selectIndex(0, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf22':
        target = 'pages/country';
        this.service.selectIndex(0, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf19':
      case 'mf20':
        target = 'pages/mf18';
        this.service.selectIndex(1, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf24':
        target = 'pages/country';
        this.service.selectIndex(0, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf3':
        target = 'pages/mf2';
        this.service.selectIndex(1, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf4':
        target = 'pages/mf3';
        this.service.selectIndex(1, this.headerController);
        this.service.selectIndex(1, this.footController);
        parameter = {
          name: this.routeCacheService.mf3UrlName, lon: this.routeCacheService.mf3UrlLon,
          lat: this.routeCacheService.mf3UrlLat,
        };
        break;
      case 'country':
      case 'nw1':
        target = 'pages/homepage';
        break;
      case 'nw2':
        target = 'pages/nw1';
        this.service.selectIndex(2, this.service.footController);
        break;
      case 'nw3':
        target = 'pages/nw1';
        this.service.selectIndex(2, this.service.footController);
        break;
      case 'nw4':
        target = 'pages/nw1';
        this.service.selectIndex(2, this.service.footController);
        break;
      case 'nw5':
        target = 'pages/nw1';
        this.service.selectIndex(2, this.service.footController);
        break;
      case 'nw6':
        target = 'pages/nw1';
        this.service.selectIndex(2, this.service.footController);
        break;
      case 'nw2s1':
        target = 'pages/nw2';
        break;
      default:
        target = 'pages/homepage';
        break;
    }
    this.zone.run(() => this.router.navigate([target, parameter]));
  }
  pushClicked() {
    this.zone.run(() => this.router.navigate(['pages/country']));
    this.service.selectIndex(0, this.service.headerController);
    this.headerController = this.service.headerController;
  }
  rushClicked() {
    this.zone.run(() => this.router.navigate(['pages/mf1']));
    this.service.selectIndex(1, this.service.headerController);
    this.headerController = this.service.headerController;
  }
  dataClicked() {
    this.zone.run(() => this.router.navigate(['pages/dataroam']));
    this.service.selectIndex(0, this.service.footController);
    this.footController = this.service.footController;
  }
  makeClicked() {
    this.zone.run(() => this.router.navigate(['pages/country']));
    this.service.selectIndex(1, this.service.footController);
    this.footController = this.service.footController;
  }
  netClicked() {
    this.zone.run(() => this.router.navigate(['pages/nw1']));
    this.service.selectIndex(2, this.service.footController);
    this.footController = this.service.footController;
  }
}
