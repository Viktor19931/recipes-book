import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signUpUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  signInUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        () => {
          this.router.navigate(['/recipes']);
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  logOut() {
    this.router.navigate(['/signin']);
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          console.log(token);
        }
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

}
