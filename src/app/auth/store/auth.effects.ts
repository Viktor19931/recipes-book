import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import * as AuthAction from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
    .ofType(AuthAction.TRY_SIGNUP)
    .map((action: AuthAction.TrySignup) => {
     return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getToken());
    })
    .mergeMap((token: string) => {
      return [
        {
          type: AuthAction.SIGNUP
        },
        {
          type: AuthAction.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect()
  authSignIn = this.actions$
    .ofType(AuthAction.TRY_SIGNIN)
    .map((action: AuthAction.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthAction.SIGNIN
        },
        {
          type: AuthAction.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthAction.LOGOUT)
    .do(() => {
      this.router.navigate(['/']);
    });

    constructor(private actions$: Actions, private router: Router) {}
}
