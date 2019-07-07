import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Test Recipe1', 'Test',
      'https://thumbs.dreamstime.com/z/fresh-italian-pizza-food-photography-design-' +
      'top-view-photo-mexican-pizza-chips-onion-hot-jalapeno-pepper-fresh-italian-119192317.jpg'),
    new Recipe('Test Recipe2', 'Test two',
      'https://simple-nourished-living.com/wp-content/uploads/2008/10/hamburger-goulash-american-chop-suey.jpg')
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
