import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from '../../recipes/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {DataStorageService} from '../data-storage/data-storage.service';

@Injectable()
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Big shnizel',
      'Super tasty',
      'http://www.ernasgourmet.com/thumbnail.asp?file=assets/images/wienerschnitzel.jpg&maxx=450&maxy=0',
      [
        new Ingredient('meat', 3),
        new Ingredient('Fries', 21)
      ]),
    new Recipe(
      'Ham burger',
      'What else you need to say ?',
      'http://bk-emea-prd.s3.amazonaws.com/sites/burgerking.co.uk/files/Whopper_thumb.jpg',
    [
      new Ingredient('bun', 2),
      new Ingredient('meat', 7)
    ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getReceipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
