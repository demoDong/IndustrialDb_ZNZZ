import { MenubarModule } from 'primeng/components/menubar/menubar';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../shared/do-service/http-api.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { DoDatatransService } from 'app/shared/do-service/do-datatrans.service';
import * as _ from 'lodash';
interface User {
  name: any;
  passWord: any;
}
@Component({
  selector: 'do-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  user = new UserCode({
    name: '',
    passWord: '',
  });
  display: boolean = false;
  constructor(private http: HttpApi, private transService: DoDatatransService,
    private router: Router, private zone: NgZone, private translationData: DoDatatransService) {
  }

  ngOnInit() {

  }
  submitThis() {
    this.http.get<ResponseType>('/api/1/query?params=name:E:' + this.user.type.name)
      .subscribe(
        data => {
          console.log(data);
          if (data.result.length <= 0) {
            this.display = true;
          } else {
            if (this.user.type.passWord === data.result[0].pass) {
              sessionStorage.setItem('use_id', 'true');
              this.router.navigate(['pages/page1']);
            } else {
              this.display = true;
            }
          }
        },
    );
  }
}
class UserCode {
  constructor(public type: User) {
  }
}

