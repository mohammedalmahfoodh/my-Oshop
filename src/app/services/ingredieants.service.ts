import { throwError as observableThrowError, throwError as _throw, Observable, observable } from 'rxjs';
import { AppError } from './../shared/app-error';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http,Response } from '@angular/http';
import { debounceTime, map, catchError } from 'rxjs/operators';
import { NotFoundError } from '../shared/not-found-error';
import { BadInput } from '../shared/bad-input';
import { Ingredient } from '../shared/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredieantsService {
  ingredient: Ingredient;
  
  //Api address where to fetch ingredient fron mongodb
  private urlIngredient: string = "http://localhost:3000/ingredient/";
  private  urlIngredientsNames:string="http://localhost:3000/ingredients/names";
  private  urlIngredientNameAuto:string="http://localhost:3000/ingredient/";
  private urlCreateIngredient:string="http://localhost:3000/saveingredient"
  private ingName;
  constructor(private http: Http,private http2:HttpClient) { }




  ///######## get ingredient observable ############
  public getINgredientObservable(ing) {
    return this.http2.get<Ingredient>(this.urlIngredient + ing).pipe(map((res:any)=>{
      return res ;
     }),catchError((error: Response) => {
      if (error.status === 404)
        return observableThrowError(new NotFoundError());
      return observableThrowError(new AppError(error));
    }));
  }

   ///######get ingredients names ############
public getIngredientsNames() {
  return this.http.get(this.urlIngredientsNames).pipe(map((res:any)=>{
   return res ;
  }),catchError((error:Response)=>{
    if(error.status===404)
    return observableThrowError(new NotFoundError());
    return observableThrowError(new AppError(error));
  }))
  
}
//####3 get igredientName ###########3
getIngName(term){
  this.ingName=term
}

  ///######get ingredient name autocomplete ############
  public getIngredientNameAuto() {
    
      return this.http.get(this.urlIngredientNameAuto).pipe(map((res:any)=>{
        return res ;
       }),catchError((error:Response)=>{
         if(error.status===404)
         return observableThrowError(new NotFoundError());
         return observableThrowError(new AppError(error));
       }))      
    
    }

  ////########### post ingredient ##############
private extractData(res: Response) {
	let body = res.json();
        return body || {};
    }
    private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
        }
        createIngredient(ingredient) {	        
        return this.http.post(this.urlCreateIngredient, ingredient )
                   .map(this.extractData)                   
    }






}
