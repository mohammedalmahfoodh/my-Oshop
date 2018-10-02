// Require the express module
const express = require('express');
// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));
// Start the web server on port 3000
app.listen(3000, () => console.log('Listening on port 3000'));
const Ingredient = require('./classes/ingredient.js')
const bodyParser=require('body-parser')


// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json())
let ingredients = [];
let ingredient;
const Recipe = require('./classes/recipe.js')
let recipes = []

let recipesNames = []
let recipesCategoriesEfterrret = []
let recipeNmaseObjects = [{ name: 'Omelett' }]
var cors = require('cors');

let nutritionalValues = [
  "Summa enkelomättade fettsyror",
  "Summa fleromättade fettsyror",
  "Summa mättade fettsyror",
  "Protein",
  "Kolhydrater",
  "Salt",
  "Energi (kcal)"
];
//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));






//###### config body parser#########
//app.use(express.json({ extended: false }));


//////###### Mongo connection /////
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test';
const dbOshop = 'oshop'




//########## post an ingredient ########################33
app.post('/saveingredient', (req, res) => {

  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    const db = client.db(dbOshop);
    assert.equal(null, err);
    db.collection('ingredients').insertOne(req.body, (err, result) => {
      assert.equal(null, err);
      res.send(req.body)
    })
    console.log(req.body)
  });
})



//########## get all ingredients #####################33
app.get('/ingredients', (req, res) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {

    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbOshop);

    db.collection("ingredients").find({}).toArray(function (err, result) {
      if (err) throw err;     
      ingredients = result.map(obj => new Ingredient(obj))
      res.json(ingredients)
    });

  });

})

//########## get an ingredient name autocomplete #####################33
app.get('/autocomplete-ingredient-name/:startOfName', (req, res) => {
  let twoChars = req.params.startOfName.toLowerCase();
  // require at least two characters
  if (twoChars.length < 2) {
    res.json({ error: 'minimum two letters required' });
    return;
  }
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {

    assert.equal(null, err);
    const db = client.db(dbOshop);
    db.collection("ingredients").find({}).toArray(function (err, result) {
      if (err) throw err;
      // let re=result.filter(per=>per.name=='Niklas').map(per=>per.name)
      ingredients = result.map(obj => new Ingredient(obj))
      let ingredientName = ingredients.filter(ing => ing.Namn.toLowerCase().
        indexOf(twoChars) == 0).map(ing => ing.Namn)
      res.json(ingredientName)
    });

  });

})
//########## get a recipe name autocomplete #####################33
app.get('/autocomplete-recipe-name/:startOfName', (req, res) => {
  let twoChars = req.params.startOfName.toLowerCase();
  // require at least two characters
  if (twoChars.length < 2) {
    res.json({ error: 'minimum two letters required' });
    return;
  }
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {

    assert.equal(null, err);
    const db = client.db(dbOshop);
    db.collection("recipe").find({}).toArray(function (err, result) {
      if (err) throw err;
      // let re=result.filter(per=>per.name=='Niklas').map(per=>per.name)
      recipes = result.map(obj => new Recipe(obj))
      let recipeName = recipes.filter(ing => ing._name.toLowerCase().
        indexOf(twoChars) == 0).map(ing => ing._name)
      res.json(recipeName)
    });

  });

})


///######## calculate nutritional values ##############
function getNaringsvarden(ob, arr) {
  let tempNaringsvarde = ["Summa enkelomättade fettsyror", "Summa fleromättade fettsyror", "Summa mättade fettsyror",
    "Protein", "Kolhydrater", "Salt", "Energi (kcal)"]
  let ingrNutritinValue = arr
  for (let naringsName of tempNaringsvarde) {
    let nutritianamValues = {}
    nutritianamValues.Namn = naringsName
    nutritianamValues.Varde = 0
    for (let naringsvarde of ingrNutritinValue) {
     // if(naringsvarde["Varde"] instanceof string){
       //  naringsvarde["Varde"]=naringsvarde["Varde"].replace(/,/g, ".") * 1
    //  }
      nutritianamValues["Varde"] += (nutritianamValues.Namn == naringsvarde.Namn) ? naringsvarde["Varde"].replace(/,/g, ".") * 1 : 0

    }
    ob.Naringsvarden.Naringsvarde.push(nutritianamValues);
  }
  return ob
}
///##### clear aingredients naringsverden#######
function clearNringsverden(ob) {
  ob.Naringsvarden.Naringsvarde = []
  return ob;
}
//########## get an ingredient ########################33
app.get('/ingredient/:startOfName', (req, res) => {
  let twoChars = req.params.startOfName.toLowerCase();
  if (twoChars.length < 2) {
    res.json({ error: 'minimum two letters required' });
    return;
  }
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbOshop);
    db.collection("ingredients").find({Namn:req.params.startOfName}).toArray(function (err, result) {
      if (err) throw err;
      ingredients = result.map(obj => new Ingredient(obj))
     // ingredients = ingredients.filter(ing => ing.Namn.toLowerCase().
     //   indexOf(twoChars) == 0)
     ingredient = new Ingredient(ingredients[0])
      ingredient = ingredients[0]           
           
     let tempArray = ingredient.Naringsvarden.Naringsvarde
      ingredient = clearNringsverden(ingredient)
     ingredient = getNaringsvarden(ingredient, tempArray);
      res.json(ingredient)
    });
  });
})
//####### get ingredients names ######### 
app.get('/ingredients/names', (req, res) => {
  // Use connect method to connect to the server  
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbOshop);
    db.collection("ingredients").find({}).toArray(function (err, result) {
      if (err) throw err;
      ingredients = result.map(obj => new Ingredient(obj))
      ingredients = ingredients.map(rec => rec.Namn)
      res.json(ingredients)
    });
  });
});


//########## get a recipe ########################33
app.get('/recipe/:startOfName', (req, res) => {
  let twoChars = req.params.startOfName.toLowerCase();
  // require at least two characters
  if (twoChars.length < 2) {
    res.json({ error: 'minimum two letters required' });
    return;
  }
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {

    assert.equal(null, err);
    const db = client.db(dbOshop);
    db.collection("recipe").find({_name:req.params.startOfName}).toArray(function (err, result) {
      if (err) throw err;     
      recipes = result.map(obj => new Recipe(obj))
      let recipe = recipes.filter(ing => ing._name.toLowerCase().
        indexOf(twoChars) == 0)
      res.json(recipe)
    });

  });

})


//########## post a recipe ########################33
app.post('/saverecipe', (req, res) => {

  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    const db = client.db(dbOshop);
    assert.equal(null, err);
    db.collection('recipe').insertOne(req.body, (err, result) => {
      assert.equal(null, err);
      res.send('recipe added successfully')
    })
    console.log(req.body)

  });

})




//########## get all recipes #####################33
app.get('/recipes', (req, res) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbOshop);

    db.collection("recipe").find({}).toArray(function (err, result) {
      if (err) throw err;
      recipes = result.map(obj => new Recipe(obj))
      res.json(recipes)
    });

  });

})

//####### get recipes names ######### 
app.get('/recipes/names', (req, res) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbOshop);
    db.collection("recipe").find({}).toArray(function (err, result) {
      if (err) throw err;
      recipes = result.map(obj => new Recipe(obj))
      recipesNames = recipes.map(rec => rec._name)
      res.json(recipesNames)
    });
  });
});


//####### get recipes categories ######### 
app.get('/recipes/categories', (req, res) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbOshop);
    db.collection("recipe").find({}).toArray(function (err, result) {
      if (err) throw err;
      recipes = result.map(obj => new Recipe(obj))
      recipesCategories = recipes.map(rec => rec._category)
      res.json(recipesCategories)
    });

  });

})

//########## get categori Efterrätt ########################33
app.get('/category/efterret', (req, res) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbOshop);
    db.collection("recipe").find({}).toArray(function (err, result) {
      if (err) throw err;
      recipes = result.map(obj => new Recipe(obj))
      //let CategoriesEfterrret=recipes.filter(rec=>{rec.category=='Efterrätt'})
      let CategoriesEfterrret = recipes.filter(rec => rec._category == 'Efterrätt')
      res.json(CategoriesEfterrret)
    });
  });
});
//########## get categori Middag ########################33
app.get('/category/Middag', (req, res) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbOshop);
    db.collection("recipe").find({}).toArray(function (err, result) {
      if (err) throw err;
      recipes = result.map(obj => new Recipe(obj))
      //let CategoriesEfterrret=recipes.filter(rec=>{rec.category=='Efterrätt'})
      let CategoriesEfterrret = recipes.filter(rec => rec._category == 'Middag')
      res.json(CategoriesEfterrret)
    });
  });
});