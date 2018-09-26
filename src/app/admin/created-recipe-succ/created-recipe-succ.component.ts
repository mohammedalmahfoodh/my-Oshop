import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';

@Component({
  selector: 'created-recipe-succ',
  templateUrl: './created-recipe-succ.component.html',
  styleUrls: ['./created-recipe-succ.component.css']
})
export class CreatedRecipeSuccComponent implements OnInit {
  recipe2;
  constructor(private dataService:DataserviceService) { }

  ngOnInit() {
    this.dataService.currentRecipe.subscribe(recipe=>this.recipe2=recipe)
  }
  //########## send recipe to display page #########
  sendToDisplay(){
    this.dataService.changeRecipe(this.recipe2)    
   }

}
