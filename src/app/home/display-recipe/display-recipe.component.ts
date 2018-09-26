import { Router } from '@angular/router';
import { DataserviceService } from './../../services/dataservice.service';
import { Recipe } from './../../shared/recipe';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'display-recipe',
  templateUrl: './display-recipe.component.html',
  styleUrls: ['./display-recipe.component.css']
})
export class DisplayRecipeComponent implements OnInit {
  person = 1;
  recipe2;
  recipeTitle;
  imageLink;
  description;
  instructions;
  ingredients;

  tempNaringsvard = [{ Namn: "Summa enkelomättade fettsyror", Varde: 0 }, { Namn: "Summa fleromättade fettsyror", Varde: 0 },
  { Namn: "Summa mättade fettsyror", Varde: 0 }, { Namn: "Protein", Varde: 0 }, { Namn: "Kolhydrater", Varde: 0 },
  { Namn: "Salt", Varde: 0 }, { Namn: "Energi (kcal)", Varde: 0 }];

  constructor(private dataService: DataserviceService) { }

  ngOnInit() {
    this.dataService.currentRecipe.subscribe(recipe => this.recipe2 = recipe)
    this.calculateRecipeNutritions()
    this.recipeTitle = this.recipe2._name;
    this.imageLink = this.recipe2._urlToImg;
    this.description = this.recipe2._desicription;
    this.instructions = this.recipe2._instructions;
    this.ingredients = this.recipe2._ingredients;
  }

  calculateRecipeNutritions() {
    for (let i = 0; i < this.tempNaringsvard.length; i++) {
      for (let ingredient of this.recipe2._ingredients) {
        for (let item of ingredient.Naringsvarden.Naringsvarde) {
          if (this.tempNaringsvard[i].Namn == item.Namn) {
            this.tempNaringsvard[i].Varde += item.Varde
          }
        }
      }
    }
  }
  logRecipe2() {
    this.calculateRecipeNutritions()
    console.log(this.tempNaringsvard)
  }

}
