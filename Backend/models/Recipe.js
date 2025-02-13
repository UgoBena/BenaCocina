const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  main_image:{
    type:Object
  },
  name:{
    type: String,
    required: true,
    unique:true,
  },
  overview:String,
  prep_time:String,
  cook_time:String,
  nb_persons:String,
  dish_type:{
    type: String,
    required: true
  },
  categories:[String],
  ingredients:{
    type:[{
      quantity:{
        type: Number,
        required: true
      },
      unit:{
        type: String,
        required: true
      },
      name:{
        type: String,
        required: true
      },
    }],
    validate: {
      validator: function(v) {
        return this.ingredients.length>0;
      },
      message: props => "You must enter at least one ingredient"
    }
  },
  steps:{
    type:[{
      description:{
        type: String,
        required: true
      },
      image:Object
    }],
    validate: {
      validator: function(v) {
        return this.steps.length>0;
      },
      message: props => "You must enter at least one step"
    },
  },
  comments:[String]
})

const Recipe = mongoose.model("Recipe",RecipeSchema);
module.exports = Recipe;