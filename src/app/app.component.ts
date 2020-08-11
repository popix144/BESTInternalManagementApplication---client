import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from './services/login.service';
import { JwtResponse } from './models/jwtResponse.interface';
import { Role } from './models/role.enum';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SwPush } from '@angular/service-worker';
import { SubscriptionService } from './services/subscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'BEST Cluj-Napoca';
  offline: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private loginService: LoginService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private swPush: SwPush,
              private subscriptionService: SubscriptionService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.currentUser.subscribe(
        (currentUser: JwtResponse)  => {
          this.isLoggedIn = currentUser !== null
          if (currentUser !== null) {
            this.isAdmin = false;
            currentUser.user.roles.forEach(role => { 
              if (role.name === Role.Management) {
                this.isAdmin = true;
            }});
          }
    }));
    this.offline = !navigator.onLine;
    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }

  onNetworkStatusChange() {
    this.offline = !navigator.onLine;
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['register']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  sendNotification() {
    this.router.navigate(['sendNotification'])
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
    .then(sub => this.subscriptionService.addSubscriber(sub).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
  }
}