import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { switchMap, tap, mergeMap, map  } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';

import * as AuthAction from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
    .ofType(AuthAction.TRY_SIGNUP)
    .pipe(
    map((action: AuthAction.TrySignup) => {
     return action.payload;
    }),
    switchMap((authData: {username: string, password: string}) => {
      return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getToken());
    }),
    mergeMap((token: string) => {
      return [
        {
          type: AuthAction.SIGNUP
        },
        {
          type: AuthAction.SET_TOKEN,
          payload: token
        }
      ];
    })
    );

  @Effect()
  authSignIn = this.actions$
    .ofType(AuthAction.TRY_SIGNIN)
    .pipe(
    map((action: AuthAction.TrySignup) => {
      return action.payload;
    }),
    switchMap((authData: {username: string, password: string}) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getToken());
    }),
    mergeMap((token: string) => {
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
    })
    );

  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthAction.LOGOUT)
    .pipe(
    tap(() => {
      this.router.navigate(['/']);
    })
    );


    constructor(private actions$: Actions, private router: Router) {}
}
