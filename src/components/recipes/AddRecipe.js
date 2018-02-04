import React, {Component} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import Footer from '../Footer';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import '../../css/styles.css';
import '../../css/recipes.css';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = {
      newIngredientName: PropTypes.string,
      newStepText: PropTypes.string,
      currentTimeValue: PropTypes.string,
      ingredients: [
      ],
      steps: [
      ]
    }
  }

  componentWillMount() {
    this.setInitialNewText();
    this.setInitialIngredientList();
    this.currentTime();
  }

  setInitialNewText() {
    this.setState({newIngredientName: ""});
    this.setState({newStepText: ""});
  }

  setInitialIngredientList() {
    this.setState({ingredientList: ["Cabbage","Caerphilly","Cake","Calasparra rice","Calvados","Camembert","Campagne loaf","Candied peel","Cannellini beans","Cape gooseberries","Capers","Capsicum","Caramel","Caraway seeds","Cardamom","Carob","Carrageen moss","Carrageen_moss","Carrot","Carrot cake","Cashew","Cassava","Caster sugar","Habanero chillies","Haddock","Haggis","Hake","Halibut","Halloumi","Ham","Hare","Haricot beans","Harissa","Hazelnut","Hazelnut oil","Edam","Eel","Egg","Egg wash","Egg white","Egg yolk","Elderberries","Elderflower","Emmental","English muffin","English mustard","Acidulated water","Ackee","Acorn squash","Aduki beans","Advocaat","Agar-agar","Catfish","Caul fat","Cauliflower","Cava","Caviar","Cavolo nero","Cayenne pepper","Celeriac","Celery","Celery seeds","Champ","Champagne","Chanterelle mushrooms","Chantilly cream","Chapati flour","Chapatis","Charcuterie","Chard","Charlotte potato","Chayote","Cheddar","Heart","Herbal liqueur","Herbal tea","Herbes de provence","Herbs","Herring","Hogget","Hoisin sauce","Hoki","Hollandaise sauce","Hominy","Honey","Honeycomb","Horseradish","Horseradish sauce","Hot cross buns","Hummus","Hunza apricots","Hyssop","Escalope","Evaporated milk","Exotic fruit","Ale","Aleppo pepper","Alfalfa sprouts","Allspice","Almond","Almond essence","Almond extract","Almond milk","Amaranth","Amaretti","Anchovies","Anchovy essence","Angelica","Angostura bitters","Anise","Apple","Apple chutney","Apple juice","Apple sauce","Apricot","Cheese","Cheese sauce","Cherry","Cherry brandy","Cherry tomatoes","Chervil","Cheshire","Chestnut","Chestnut mushrooms","Chicken","Chicken breast","Chicken leg","Chicken liver","Chicken soup","Chicken stock","Chicken thigh","Chicken wing","Chickpea","Apricot jam","Arborio rice","Arbroath smokie","Argan oil","Arrowroot","Artichoke","Asafoetida","Asparagus","Aubergine","Avocado","Chickpea flour","Chicory","Chilli","Chilli con carne","Chilli oil","Chilli paste","Chilli powder","Chilli sauce","Chinese cabbage","Chinese mushrooms","Chinese pancake","Chipotle","Chips","Chives","Chocolate","Chocolate biscuit","Chocolate brownies","Chocolate cake","Chocolate mousse","Chocolate truffle","Chopped tomatoes","Chorizo","Choux pastry","Christmas cake","Christmas pudding","Chuck and blade","Chump","Chutney","Ciabatta","Cider","Cinnamon","Citrus fruit","Clams","Clarified butter","Clementine","Clotted cream","Cloves","Cobnut","Cockles","Cocktail","Cocoa butter","Cocoa powder","Coconut","Coconut cream","Coconut flour","Coconut milk","Coconut oil","Cod","Cod roe","Coffee","Coffee beans","Coffee essence","Coffee granules","Coffee liqueur","Cognac","Cola","Coleslaw","Coley","Collar","Condensed milk","Coriander","Coriander cress","Coriander seeds","Corn oil","Corn syrup","Corned beef","Cornflour","Cos lettuce","Cottage cheese","Coulis","Courgette","Court bouillon","Couscous","Crab","Crab apple","Crackers","Cranberry","Cranberry juice","Cranberry sauce","Crayfish","Cream","Cream cheese","Cream liqueur","Cream of tartar","Cream soda","Creamed coconut","Creme fraiche","Falafel","Farfalle","Fat","Fennel","Fennel seeds","Fenugreek","Feta","Cr\u00eape","Cress","Crispbread","Crisps","Croissant","Crostini","Croutons","Crumble","Crystallised ginger","Cucumber","Cumberland sauce","Cumin","Curacao","Curd","Curd cheese","Curly kale","Currant bread","Currants","Curry","Curry leaves","Curry paste","Fettuccine","Field mushroom","Fig","Fillet of beef","Filo pastry","Fish","Fish roe","Fish sauce","Fish soup","Five-spice powder","Flageolet beans","Flaked almonds","Flank","Flapjacks","Flatbread","Flatfish","Fleur de sel","Flour","Flour tortilla","Floury potato","Flying fish","Focaccia","Foie gras","Curry powder","Custard","Custard powder","Cuttlefish","Fondant icing","Fondant potatoes","Fontina cheese","Food colouring","Forced rhubarb","Fortified wine","Fragrant rice","Frangipane","Frankfurter","Freekeh","French beans","French bread","French dressing","Fresh coriander","Fresh tuna","Fromage frais","Fruit","Fruit brandy","Fruit cake","Fruit juice","Fruit salad","Fudge","Jaggery","Jam","January King cabbage","Japanese pumpkin","Jelly","Jerk seasoning","Jersey Royal potatoes","Jerusalem artichoke","John Dory","Jujube","Juniper berries","Kabana","Kale","Ketchup","Ketjap manis","Kidney","Kidney beans","King Edward","Kipper","Kirsch","Kiwi fruit","Kohlrabi","Bacon","Fusilli","Jus","Kumquat","Bagel","Baguette","Baked beans","Baking","Baking powder","Balsamic vinegar","Bamboo shoots","Banana","Banana bread","Barbary duck","Barbecue sauce","Barley","Basil","Basmati rice","Bay boletes","Bay leaf","Beans","Beansprouts","B\u00e9chamel sauce","Beef","Beef consomme","Galangal","Game","Gammon","Garam masala","Garlic","Garlic and herb cream cheese","Garlic bread","Gelatine","Dab","Daikon","Dal","Damsons","Dandelion","Danish blue","Dark chocolate","Date","Demerara sugar","Beef dripping","Beef mince","Beef ribs","Beef rump","Beef sausage","Beef stock","Beef tomato","Beer","Beetroot","Berry","Betel leaves","Bicarbonate of soda","Bilberries","Bird's-eye chillies","Biscotti","Biscuits","Blachan","Black beans","Black bream","Ghee","Gherkin","Giblets","Gin","Ginger","Ginger ale","Ginger beer","Ginger biscuit","Gingerbread","Glace cherries","Globe artichoke","Glucose","Gnocchi","Goats' cheese","Goats' milk","Golden syrup","Goose","Goose fat","Demi-glace sauce","Desiccated coconut","Desiree","Digestive biscuit","Dijon mustard","Dill","Dim sum wrappers","Dolcelatte","Double cream","Double Gloucester","Dover sole","Dragon fruit","Dried apricots","Dried cherries","Dried chilli","Dried fruit","Dried mixed fruit","Dry sherry","Duck","Duck confit","Duck fat","Dulce de leche","Dumplings","Black eyed beans","Black pepper","Black pudding","Black sesame seeds","Black treacle","Blackbean sauce","Blackberry","Blackcurrant","Blackcurrant juice drink","Blini","Blood orange","Blueberry","Boar","Bok choi","Bonito","Borage","Borlotti beans","Bouquet garni","Braising steak","Bramley apple","Bran","Brandy","Gooseberry","Gorgonzola","Gouda","Grain","Gram flour","Grape juice","Grapefruit","Grapefruit juice","Grapes","Grapeseed oil","Gratin","Gravy","Gravy browning","Green banana","Green beans","Green cabbage","Green lentil","Green tea","Greengages","Grey mullet","Ground almonds","Duxelles","Lager","Lamb","Lamb breast","Lamb chop","Lamb fillet","Lamb kidney","Lamb loin","Lamb mince","Brandy butter","Brandy snaps","Bratwurst","Brazil nut","Bread","Bread roll","Bread sauce","Breadcrumbs","Breadfruit","Breadsticks","Bresaola","Brie","Brill","Brioche","Brisket","Broad beans","Broccoli","Broth","Brown bread","Ground ginger","Grouse","Gruyere","Guacamole","Guava","Guinea fowl","Gurnard","Lamb neck","Lamb rump","Lamb shank","Lamb shoulder","Lamb stock","Lancashire","Langoustine","Lard","Lardons","Lasagne","Lasagne sheets","Laverbread","Leek","Leftover turkey","Leg of lamb","Lemon","Lemon balm","Lemon curd","Lemon juice","Brown lentil","Brown rice","Brown sauce","Brown shrimp","Brown sugar","Brussels sprouts","Buckwheat","Buckwheat flour","Bulgur wheat","Buns","Burger","Butter","Butter beans","Buttercream icing","Butterhead lettuce","Buttermilk","Butternut squash","Ice cream","Iceberg lettuce","Icing","Icing sugar","Irish stout","Macadamia","Macaroni","Macaroon","Mace","Mackerel","Madeira","Lemon sole","Lemonade","Lemongrass","Lentils","Lettuce","Lime","Lime cordial","Lime juice","Lime leaves","Lime pickle","Ling","Lingonberry","Linguine","Liqueur","Liquorice","Little Gem lettuce","Liver","Naan bread","Nachos","Nashi","Nasturtium","Nectarine","Nettle","New potatoes","Nibbed almonds","Noodle soup","Noodles","Madeira cake","Madeleines","Maize","Malted grain bread","Manchego","Mandarin","Mangetout","Mango","Mango chutney","Mango juice","Mango pickle","Mangosteen","Maple syrup","Margarine","Marjoram","Marmalade","Marrow","Marrowfat peas","Marsala wine","Marshmallow","Quail","Quails' egg","Quark","Quince","Quinoa","Loaf cake","Lobster","Loganberry","Long-grain rice","Lovage","Low-calorie sweetener","Lychee","Paella","Nori","Nougat","Nut","Nutmeg","Rabbit","Rack of lamb","Radicchio","Radish","Rainbow chard","Rainbow trout","Raisins","Raita","Rapeseed oil","Marzipan","Mascarpone","Mashed potato","Matzo","Mayonnaise","Meat","Medlars","Megrim","Melon","Melon seeds","Meringue","Mesclun","Milk","Milk chocolate","Milkshake","Millet","Millet flour","Mince","Mince pies","Mincemeat","Pak choi","Palm oil","Palm sugar","Pancakes","Pancetta","Pandan leaves","Paneer","Panettone","Papaya","Pappardelle","Paprika","Parfait","Parmesan","Parsley","Parsnip","Partridge","Passata","Passion fruit","Passion fruit juice","Pasta","Pastrami","Pastry","Ras-el-hanout","Raspberry","Raspberry jam","Ratafia biscuits","Ratatouille","Red cabbage","Red Leicester","Red lentil","Red mullet","Red onion","Red rice","Red snapper","Red wine","Red wine vinegar","Redcurrant","Redcurrant jelly","Rennet","Rhubarb","Rib of beef","Rice","Rice flour","Rice noodles","Rice pudding","Mint","Mint sauce","Mirepoix","Mirin","Miso","Mixed berries","Mixed dried beans","Mixed fish","Mixed nuts","Mixed spice","Mixed spices","Molasses","Monk's beard","Monkfish","Morel","Mortadella","Mozzarella","Muesli","Muffins","Pasty","Paw-paw","Pea shoots","Peach","Peanut butter","Peanut oil","Peanuts","Pear","Pearl barley","Peas","Pecan","Pecorino","Pectin","Peel","Penne","Pepper","Peppercorn","Pepperoni","Rice vinegar","Rice wine","Ricotta","Rigatoni","Risotto","Risotto rice","Roast beef","Roast chicken","Roast lamb","Roast pork","Roast potatoes","Roast turkey","Roasted vegetables","Rock salmon","Rock salt","Rocket","Root beer","Root vegetable","Roquefort","Rose wine","Rosehip syrup","Mulberries","Mulled wine","Mung beans","Mushroom","Mussels","Mustard","Mustard cress","Mustard leaves","Mustard oil","Mustard powder","Mustard seeds","Mutton","Perch","Perry","Pesto","Pheasant","Piccalilli","Pickle","Pickled onion","Pie","Pig cheeks","Pigeon","Pigeon peas","Pike","Pine nut","Pineapple","Pineapple juice","Pink Fir Apple","Pink peppercorn","Pinto beans","Piri-piri","Pistachio","Pitta bread","Pizza","Plaice","Oatcakes","Oatmeal","Oats","Octopus","Offal","Oil","Oily fish","Okra","Rosemary","Rosewater","Rouille","Royal icing","Rum","Rump","Runner beans","Rye bread","Rye flour","Plain flour","Plantain","Plum","Polenta","Pollack","Pollock","Pomegranate","Pomegranate juice","Pomegranate molasses","Pomelo","Popcorn","Poppy seeds","Porcini","Pork","Pork belly","Pork chop","Pork fillet","Pork leg","Pork loin","Pork mince","Pork sausages","Pork shoulder","T-bone steak","Tabasco","Taco","Tagliatelle","Tahini","Taleggio","Tamari","Tamarillo","Tamarind","Olive","Olive oil","Onion","Orange","Orange juice","Orange liqueur","Oregano","Ouzo","Oxtail","Oyster","Oyster mushrooms","Oyster sauce","Pork spare rib","Port","Portobello mushrooms","Potato","Potato wedges","Poultry","Poussin","Praline","Prawn","Prawn crackers","Preserved lemons","Preserves","Prosciutto","Prune","Prune juice","Pudding rice","Tangerine","Tapenade","Tapioca","Taro","Tarragon","Tartare sauce","Tayberry","Tea","Tempura","Tequila","Teriyaki","Teriyaki sauce","Terrine","Thai basil","Thyme","Tilapia","Tinned tuna","Toffee","Tofu","Tomatillo","Tomato","Tomato chutney","Tomato juice","Puff pastry","Pulled pork","Pulse","Pumpernickel bread","Pumpkin","Pumpkin seed","Purple sprouting broccoli","Puy lentils","Tomato pur\u00e9e","Tongue","Tonic","Topside","Tortellini","Tripe","Trout","Truffle","Truffle oil","Turbot","Turkey","Turkey breast","Turkey mince","Turkish delight","Turmeric","Turnip","Safflower oil","Saffron","Sage","Salad","Salad cream","Salad leaves","Salami","Salmon","Salsa","Salsify","Salt","Salt beef","Salt cod","Sambuca","Samphire","Sardine","Sashimi","Satsuma","Sauces","Saucisson","Sausage","Savory","Savoy cabbage","Scallop","Scotch bonnet chilli","Scrag","Sea bass","Sea bream","Sea salt","Sea trout","Seafood","Seasoning","Seaweed","Seeds","Self-raising flour","Semolina","Serrano ham","Sesame oil","Sesame seeds","Seville orange","Shallot","Sharon fruit","Shellfish","Sherry","Sherry vinegar","Shiitake mushroom","Shin","Shortbread","Shortcrust pastry","Sichuan pepper","Silverside","Single cream","Sirloin","Skate","Sloe","Sloe gin","Smoked cheese","Smoked fish","Smoked haddock","Smoked mackerel","Smoked salmon","Smoked trout","Snapper","Soba noodles","Soda","Soda bread","Sole","Sorbet","Sorrel","Soup","Sourdough bread","Soured cream","Soy sauce","Soya beans","Soya flour","Soya milk","Soya oil","Spaghetti","Spaghetti squash","Sparkling wine","Spelt","Spelt flour","Spices","Spinach","Split peas","Sponge cake","Spring greens","Vacherin","Vanilla essence","Vanilla extract","Vanilla pod","Veal","Vegetable curry","Vegetable oil","Vegetable shortening","Vegetable stock","Vegetables","Vegetarian sausage","Venison","Zander","Zest","Spring onion","Spring roll wrappers","Squash","Squid","Star anise","Starfruit","Steak","Stem ginger","Stew","Stewing lamb","Stilton","Stock","Straw mushroom","Strawberry","Strawberry jam","Strega liqueur","Strong white flour","Stuffing","Sucralose","Suet","Sugar","Unleavened bread","Verjus","Vermicelli (pasta)","Vermouth","Vine leaves","Vinegar","Vodka","Vodka cocktail","Sugar-snap peas","Sultanas","Sumac","Summer cabbage","Summer fruit","Sunflower oil","Sunflower seed","Sushi rice","Swede","Sweet potato","Sweet sherry","Sweetbread","Sweetcorn","Sweets","Swiss chard","Swiss rolls and roulades","Swordfish","Syrup","Waffles","Walnut","Walnut oil","Wasabi","Water chestnut","Watercress","Watermelon","Waxy potato","Webbs lettuce","Wensleydale","Wheatgerm","Whelk","Whipping cream","Whisky","Whisky cocktail","Whisky liqueur","White bread","White cabbage","White chocolate","White fish","White pepper","White wine","White wine vinegar","Whitebait","Whitecurrant","Whiting","Whole wheat pasta","Wholegrain mustard","Wholemeal bread","Wholemeal flour","Wild duck","Wild garlic","Wild mushrooms","Wild rice","Wine","Winkles","Wood pigeon","Worcestershire sauce","Wraps","Yam","Yeast","Yellow lentil","Yoghurt","Yuzu"]
    });
  }

  /* Add an array of ingredients to this.state.ingredients */
  addIngredients(newIngredients) {
    let newIngredientName;
    let newIngredientQuantity = '';
    let hasMeasure, ingredients;
    let measures = ['cup','teaspoon','tablespoon','pinch','pound','oz','can','bottle'];

    // Get the list of names of the ingredients to verify that the ingredient does not already exist in this.state.ingredients
    let ingredientNames = this.state.ingredients.map(ingredient => {
      return ingredient['name'];
    })
    // For each of the ingredients to add, check if this.state.ingredients already lists that ingredient
    newIngredients.forEach(newIngredient => {
      hasMeasure = 0;
      if (!ingredientNames.includes(newIngredient)) {
        // Check if the ingredient text has a measurement; if so, split the text into quantity, and ingredient name
        for (var i = 0; i < measures.length; i++) {
          if (newIngredient.includes(measures[i])) {
            console.log(newIngredient);
            [newIngredientQuantity, newIngredientName] = newIngredient.split(` ${measures[i]} `);
            newIngredientQuantity += ` ${measures[i]}`;
            hasMeasure = 1;
            break;
          }
        };

        if (!hasMeasure) {
          console.log(newIngredient);
          newIngredientName = newIngredient;
          newIngredientQuantity = "";
        }

        ingredients = [...this.state.ingredients, {
          "name": newIngredientName,
          "quantity": newIngredientQuantity,
          "createdDate": moment()
        }]
      }
    })
    console.log(ingredients);
    this.setState({ingredients: ingredients}, () => {
      this.refs.newIngredientName.value = "";
      this.setState({newIngredientName: ""});
    })
  }

  /* Add a step to this.state.steps */
  addStep(newStep) {
    let steps = this.state.steps;
    const currentTime = moment().format();
    let tokens = newStep.split(" ");
    let newIngredients = [];
    tokens.forEach(token => {
      this.state.ingredientList.forEach(ingredient => {
        if (token.toLowerCase() === ingredient.toLowerCase()) {
          newIngredients.push(ingredient);
        }
      })
    })
    if (newIngredients.length != 0) {
      this.addIngredients(newIngredients);
    }
    steps = [...steps, {
      "text": newStep,
      "startTime": 0,
      "duration": 10,
      "createdDate": moment()
    }];
    this.setState({steps: steps}, () => {
      this.refs.newStepText.value = "";
      this.setState({newStepText: ""});
    })
  }

  addRecipe(newRecipe) {
    axios.request({
      method: 'post',
      url: 'http://localhost:3000/api/recipes/',
      data: newRecipe
    }).then((response) => {
      let recipeId = response.data.id;
      this.state.ingredients.forEach((ingredient) => {
        /* Split name and quantity algorithmically */
        axios.request({
          method: 'post',
          url: 'http://localhost:3000/api/ingredients/',
          data: {
            "recipeId": response.data.id,
            "name": ingredient.name,
            "quantity": ingredient.quantity,
            "createdDate": ingredient.createdDate
          }
        }).catch(err => console.log(err));
      })
      return recipeId;
    }).then((recipeId) => {
      this.state.steps.forEach((step) => {
        axios.request({
          method: 'post',
          url: 'http://localhost:3000/api/steps/',
          data: {
            "recipeId": recipeId,
            "text": step.text,
            "startTime": step.startTime,
            "duration": step.duration,
            "createdDate": step.createdDate
          }
        }).catch(err => console.log(err));
      })
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  currentTime() {
    setInterval(() => {
      let date = new Date();
      let hours = date.getHours()>12 ? date.getHours()-12 : date.getHours();
      hours = hours===0 ? 12 : hours;
      const minutes = date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes();
      let currentTimeValue = `${hours}:${minutes}`;
      this.setState({currentTimeValue: currentTimeValue})
    }, 1000)
  }

  handleClick(e) {
    let eClass = e.target.className.split(" ")[e.target.className.split(" ").length-1];
    let index;
    switch (eClass) {
      case 'addIngredients':
        this.addIngredients(this.state.newIngredientName);
        break;
      case 'addStep':
        this.addStep(this.state.newStepText);
        break;
        case 'removeIngredient':
          index = e.target.id;
          let ingredients = this.state.ingredients;
          let newIngredients = [...ingredients.slice(0, parseInt(index)), ...ingredients.slice(parseInt(index)+1, ingredients.length)];
          this.setState({ingredients: newIngredients});
          break;
        case 'removeStep':
          index = e.target.id;
          let steps = this.state.steps;
          let newSteps = [...steps.slice(0, parseInt(index)), ...steps.slice(parseInt(index)+1, steps.length)];
          this.setState({steps: newSteps});
          break;
      default:
        console.log('Other');
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newRecipe = {
      name: this.refs.name.value,
      author: this.refs.author.value,
      source: this.refs.source.value,
      servings: this.refs.servingsCount.value,
      approved: false,
      createdDate: moment()
    }
    this.addRecipe(newRecipe);
  }

  onKeyDown(e) {
    if (e.keyCode === 9) {
      switch (e.target.id) {
        case 'newIngredientName':
          if (this.state.newIngredientName !== "") {
            e.preventDefault();
            this.addIngredients([this.state.newIngredientName]);
          }
          break;
        case 'newStepText':
          if (this.state.newStepText !== "") {
            e.preventDefault();
            this.addStep(this.state.newStepText);
          }
          break;
        default:
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <form id="addRecipe" onSubmit={this.onSubmit.bind(this)}>
          <div className="recipe">
            <div className="row">
              <h5>Add Recipe</h5>
            </div>
            <div className="row">
              <input className="h1Input" type="text" name="name" ref="name" placeholder="Recipe Name" autoComplete="off" />
            </div>
            <div className="row">
              <input type="text" className="stdInput" name="author" ref="author" placeholder="Author" autoComplete="off" />
            </div>
            <div className="row">
              <input type="text" className="stdInput" name="source" ref="source" placeholder="Source" autoComplete="off" />
            </div>
            <div className="row">
              <h3>How many people does this recipe serve?</h3>
              <input type="text" className="servingsCount" id="servingsCount" name="servingsCount" ref="servingsCount" onChange={this.handleInputChange} autoComplete="off" />
            </div>
            <div className="container recipe-container">
              <div className="ingredientBox">
                <h4 className="ingredients">Ingredients</h4>
                <ul>
                  {this.state.ingredients.map((ingredient, index) =>
                    <li key={index} className="ingredient">
                      <p><strong>{ingredient.quantity}</strong> {ingredient.name}</p><FontAwesome name="minus-circle" className="icon minusCircle removeIngredient" id={index} onClick={this.handleClick} />
                    </li>
                  )}
                  <li className="newIngredientLI"><input className="newIngredient" type="text" name="newIngredientName" id="newIngredientName" ref="newIngredientName" placeholder="Add Ingredient" onChange={this.handleInputChange} onKeyDown={this.onKeyDown} autoComplete="off" /><FontAwesome name="plus-circle" className="icon plusCircle addIngredient" onClick={this.handleClick} /></li>
                </ul>
              </div>
              <div className="stepBox">
                <div className="subStepHead">
                  <h6>Start cooking at {this.state.currentTimeValue}</h6>
                </div>
                <div className="steps">
                  <ul className="stepsText">
                    {this.state.steps.map((step, index) =>
                      <li key={index} className="step newStep">
                        <div className="stepText">{step.text}</div><FontAwesome name="minus-circle" className="icon minusCircle removeStep" id={index} onClick={this.handleClick} />
                      </li>
                    )}
                    <li className="row-basic"><input className="newStep" type="text" name="newStepText" id="newStepText" ref="newStepText" placeholder="Add Step" onChange={this.handleInputChange} onKeyDown={this.onKeyDown} autoComplete="off" /><FontAwesome name="plus-circle" className="icon plusCircle addStep" onClick={this.handleClick} /></li>
                  </ul>
                </div>
                <div className="stepFooter">
                  <button type="submit" form="addRecipe" className="submitRecipe submit">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    )
  }
}

AddRecipe.propTypes = {
};

export default AddRecipe;
