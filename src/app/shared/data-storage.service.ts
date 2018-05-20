import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  URL = 'https://recipesbook-845f3.firebaseio.com/recipes.json';
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    // return this.http.put('https://ng-recipe-book.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //   });
    const req = new HttpRequest('PUT', this.URL,
      this.recipeService.getRecipes(), {reportProgress: true});
    return this.http.request(req);
  }

  getRecipes() {
    this.http.get<Recipe[]>(this.URL, {
      observe: 'body', // default
      responseType: 'json', // default
    })
      .map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
