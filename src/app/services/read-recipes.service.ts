

import {throwError as observableThrowError,  throwError as _throw ,  Observable, observable } from 'rxjs';
import { AppError } from './../shared/app-error';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { debounceTime, map ,  catchError } from 'rxjs/operators';
import { NotFoundError } from '../shared/not-found-error';
import { BadInput } from '../shared/bad-input';
import { Ingredient } from '../shared/ingredient';
import { Recipe } from '../shared/recipe';



@Injectable({
  providedIn: 'root'
})
export class ReadRecipesService  {
  private urlGetRecipeName='http://localhost:3000/autocomplete-recipe-name/'
private url:string="http://localhost:3000/recipes";
private urlRecipe:string="http://localhost:3000/recipe/";
private urlDleteRecipe:string='';
private urlCreateRecipe:string='http://localhost:3000/saverecipe';
private urlRecipesNames='http://localhost:3000/recipes/names';
private urlRecipesCatrgories='http://localhost:3000/recipes/categories';
recipes:any[];
recipesNames:any[];


constructor(private http2: HttpClient,private http:Http) {  }  
    ///######## get recipe ############
   public getRecipe(term){
    return this.http.get(this.urlRecipe+term).pipe(catchError((error:Response)=>{

      if(error.status===404)
        return observableThrowError(new NotFoundError());
      return observableThrowError(new AppError(error));
    }));
   }
  




   //##### get all recipes ###########
   public getRecipes() {
    return this.http.get(this.url).pipe(map((res:any)=>{
     return res ;
    }),catchError((error:Response)=>{

      if(error.status===404)
      return observableThrowError(new NotFoundError());
      return observableThrowError(new AppError(error));
    }));
}
search(term) {
  let listOfRecipe = this.http.get('http://localhost:3000/recipe/' + term)
  .pipe(
      debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
      map(
          (data: any) => {
              return (
                  data.length != 0 ? data as any[] : [{"RecipeName": "No Recipe Found"} as any]
              );
          }
  ))
return listOfRecipe;
}
///####### Delete Recipe#########
deleteRecipe(name){
return this.http.delete(this.urlDleteRecipe+'/'+name).pipe(catchError((error:Response)=>{

  if(error.status===404)
  return observableThrowError(new NotFoundError());
  
  return observableThrowError(new AppError(error));
}))
}
////########### post recipe ##############
private extractData(res: Response) {
	let body = res.json();
        return body || {};
    }
    private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
        }

        createRecipe(recipe) {	        
        return this.http.post(this.urlCreateRecipe, recipe )
                   .map(this.extractData)
                   
    }
updateRecipe(recipe){
  
}
///######get recipe names ############
public getRecipesNames() {
  return this.http.get(this.urlRecipesNames).pipe(map((res:any)=>{
   return res ;
  }),catchError((error:Response)=>{

    if(error.status===404)
    return observableThrowError(new NotFoundError());
    return observableThrowError(new AppError(error));
  }))
  
}
//########### get a recipe name autocomplete ##########
public getRecipeName(recipeTerm) {
  return this.http.get(this.urlGetRecipeName+recipeTerm).pipe(map((res:any)=>{
   return res ;
  }),catchError((error:Response)=>{

    if(error.status===404)
    return observableThrowError(new NotFoundError());
    return observableThrowError(new AppError(error));
  }))
  
}  
////#################################################333
public getRecipesCategories() {
  return this.http.get(this.urlRecipesCatrgories).pipe(map((res:any)=>{
   return res ;
  }),catchError((error:Response)=>{

    if(error.status===404)
    return observableThrowError(new NotFoundError());
    return observableThrowError(new AppError(error));
  }));
}

///############################################3
sharedRecipe(){
  
}








}
