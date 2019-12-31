import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipesService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.httpClient.put('https://ng8-recipe-book-6c470.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log('PUT response: ', response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>('https://ng8-recipe-book-6c470.firebaseio.com/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        }));
  }
}
