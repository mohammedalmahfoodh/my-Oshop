
import { environment } from './../environments/environment';
import {SlideshowModule} from 'ng-simple-slideshow';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import {MatButtonModule} from '@angular/material/button';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ReadRecipesService } from './services/read-recipes.service';
import{ Http, HttpModule} from '@angular/http';
import { HomeSearchComponent } from './home/home-search/home-search.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomeRecipesComponent } from './home/home-recipes/home-recipes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RecipeMiddagComponent } from './recipe-middag/recipe-middag.component';
import { EfterretComponent } from './efterret/efterret.component';
import { MellanmalComponent } from './mellanmal/mellanmal.component';
import { AdminRecipeComponent } from './admin/admin-recipe/admin-recipe.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { CreatedRecipeSuccComponent } from './admin/created-recipe-succ/created-recipe-succ.component';
import { DisplayRecipeComponent } from './home/display-recipe/display-recipe.component';
import { AdminLogInComponent } from './admin/admin-log-in/admin-log-in.component';
import { AdminIngredientComponent } from './admin/admin-ingredient/admin-ingredient.component';
@NgModule({
  declarations: [    
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,      
    LoginComponent,
    HomeSearchComponent,       
    HomeRecipesComponent,       
    RecipeMiddagComponent,       
    EfterretComponent,       
    MellanmalComponent, AdminRecipeComponent, CreatedRecipeSuccComponent, DisplayRecipeComponent, AdminLogInComponent, AdminIngredientComponent,

  ],
  imports: [  
    MatTooltipModule,MatRadioModule,
    MatCheckboxModule,MatAutocompleteModule,MatInputModule,MatFormFieldModule,
    ReactiveFormsModule,MatSelectModule,
    SlideshowModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule,    
    BrowserAnimationsModule,
    
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },{path:'Mellanmal',component:MellanmalComponent},
      { path: 'displayRecipy', component: DisplayRecipeComponent },
      { path:'recipeEfterret',component:EfterretComponent},
      { path:'recipeMiddag',component:RecipeMiddagComponent},
     
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent,canActivate:[AuthGuardService] },
      { path: 'order-success', component: OrderSuccessComponent,canActivate:[AuthGuardService] },
      { path: 'recipeAddedSuccess', component: CreatedRecipeSuccComponent },
      { path: 'admin-recipe', component: AdminRecipeComponent ,canActivate:[AuthGuardService] },
      { path: 'admin-ingredient', component: AdminIngredientComponent ,canActivate:[AuthGuardService] },
      { path: 'admin-login', component: AdminLogInComponent },
      { path: 'login', component: LoginComponent },     
      { path: 'my-orders', component: MyOrdersComponent,canActivate:[AuthGuardService] }
      
    ]),
    BrowserAnimationsModule

  ],
  providers: [AuthService,
    AuthGuardService,ReadRecipesService,  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
