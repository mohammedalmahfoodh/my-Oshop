import { Recipe } from './../shared/recipe';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
recipe=new Subject<any>();
  constructor() {  }
private recipeSource=new BehaviorSubject(this.recipe)
currentRecipe=this.recipeSource.asObservable()
changeRecipe(recipe){
this.recipeSource.next(recipe)
}

}
