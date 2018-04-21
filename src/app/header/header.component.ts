import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../services/data-storage/data-storage.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  constructor(private storeService: DataStorageService,
              public auth: AuthService) {

  }

  ngOnInit() {
  }

  onSaveData() {
    this.storeService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onLogout() {
    this.auth.logOut();
  }

  onFetchData() {
    this.storeService.getRecipes();
  }
}
