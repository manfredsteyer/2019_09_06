import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  expertMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private oauthService: OAuthService,
    ) {

      const claims = oauthService.getIdentityClaims();
      if (!claims) {
        return;
      }
      console.debug('id', claims['sub']);
  }

  changed($event): void {
    console.debug('$event.detail ', $event.target.detail);

    this.expertMode = $event.detail
  }

  needsLogin: boolean;
  _userName: string = '';

  ngOnInit() {
    this.needsLogin = !!this.route.snapshot.params['needsLogin'];
  }

  get userName(): string {
    return this._userName;
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!'
  }

  logout(): void {
    this._userName = '';
  }


}
