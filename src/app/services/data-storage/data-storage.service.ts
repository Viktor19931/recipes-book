import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipesService} from '../recipes/recipes.service';
import { Recipe } from '../../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private recipesService: RecipesService,
              private auth: AuthService) { }

  storeRecipes() {
    const token = this.auth.getToken();

    return this.http.put('https://recipesbook-845f3.firebaseio.com/recipes.json?auth=' + token,
      this.recipesService.getRecipes()
    );
  }

  getRecipes() {
    const token = this.auth.getToken();

    this.http.get('https://recipesbook-845f3.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          const recipes = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          console.log(recipes);
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipesService.setRecipes(recipes);
        }
      );
  }
}
