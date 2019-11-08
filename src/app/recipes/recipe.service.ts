import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Test Recipe1', 'Test',
      'https://thumbs.dreamstime.com/z/fresh-italian-pizza-food-photography-design-' +
      'top-view-photo-mexican-pizza-chips-onion-hot-jalapeno-pepper-fresh-italian-119192317.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
        new Ingredient('Breadcrumbs', 10)
      ]),
    new Recipe('Test Recipe2', 'Test two',
      'https://simple-nourished-living.com/wp-content/uploads/2008/10/hamburger-goulash-american-chop-suey.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // return a copy of the array
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
