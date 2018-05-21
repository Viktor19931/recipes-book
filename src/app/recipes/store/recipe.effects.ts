import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {
  URL = 'https://recipesbook-845f3.firebaseio.com/recipes.json';

  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES).pipe(
      switchMap((action: RecipeActions.FetchRecipes) => {
      return this.http.get<Recipe[]>(this.URL,
        {
          observe: 'body', // default
          responseType: 'json', // default
        });
    }), map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      })
    );


  @Effect({dispatch: false})
  resipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', this.URL,
        state.recipes, {reportProgress: true});
      return this.http.request(req);
    })
    );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
