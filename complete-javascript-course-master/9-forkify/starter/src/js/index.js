import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

/**
 * Global Application State
 * - Search object
 * - Current Recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/*********************
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {

    // 1. Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. New Search object and add it to the State.
        state.search = new Search(query);        

        // 3. Prepare UI for results (e.g. loading spinner, etc.)
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        try {
            // 4. Search for Recipes
            await state.search.getRecipes();
    
            // 5. Render results on UI.
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (error ) {
            clearLoader();
            alert('Something went wrong :(');
        }
    }
    
};

elements.searchForm.addEventListener('submit', event => {
    // avoid reloading of the web page due to form submit(which is default behaviour)
    event.preventDefault();
    controlSearch();
});

// event delegation because user can click on span, icon or button.
elements.searchResultPages.addEventListener('click', event => {
    // closent() method traverses the Element and its parents (heading toward the document root) 
    // until it finds a node that matches the provided selector string.
    const button = event.target.closest('.btn-inline');
    if (button) {
        const nextPage = parseInt(button.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, nextPage);
    }
});


/*********************
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if (state.search) {
            searchView.highlightSelected(id);
        }

        // Create new Recipe object
        state.recipe = new Recipe(id);
        try {
            // Get Recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
    
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render Recipe on UI
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
            
        } catch (error) {
            alert('Something went wrong while fetching recipe. :(');
        }
    }
}

// better way of adding same event listener to multiple events
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('onload', controlRecipe);

/*********************
 * LIST CONTROLLER
 */
const controlList = () => {

    // create shopping list if one does not exist
    if (!state.list) state.list = new List();

    state.recipe.ingredients.forEach( ing => {
        const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
        listView.renderItem(item);
    });
};

// handle delete and update list item events - Event Delegation
elements.shopping.addEventListener('click', (event) => {
    const id = event.target.closest('.shopping__item').dataset.itemid;

    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        // handle delete event
        state.list.deleteItem(id);
        listView.deleteItem(id);

    } else if (event.target.matches('.shopping__count-value')) {
        // handle update event
        const value = parseFloat(event.target.value);
        // update state
        state.list.updateCount(id, value);
    }
});

/*********************
 * LIST CONTROLLER
 */
const controlLikes = () => {

    if(!state.likes) state.likes = new Likes();

    const currentId = state.recipe.id;
    if (!state.likes.isLiked(currentId)) {
        // recipe has not liked

        // 1. Add like to the state
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // 2. toggle the like button
        likesView.toggleLikeBtn(true);

        // 3. Add like to the UI list
        likesView.renderLike(newLike);

    } else {
        // recipe is liked

        // 1. Remove like from the state
        state.likes.deleteLike(currentId);

        // 2. toggle the like button
        likesView.toggleLikeBtn(false);

        // 3. Remove like from the UI list
        likesView.deleteLike(currentId);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};


// read likes from local storage
window.addEventListener('load', (event) => {

    state.likes = new Likes();
    state.likes.loadLikesFromLocalStorage();
    if (state.likes.likes) {
        // show likes menu
        likesView.toggleLikeMenu(state.likes.getNumLikes());
        // render likes
        state.likes.likes.forEach( like => likesView.renderLike(like));
    }
});

// event delegation - as these elements are dynamicaly added later
elements.recipe.addEventListener('click', (event) => {

    // event on btn-decrease or any of its child elements
    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
        // descrease button is clicked
        if (state.recipe && state.recipe.servings > 1) {
            state.recipe.updateIngredients('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        if (state.recipe) {
            state.recipe.updateIngredients('inc');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();

    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        controlLikes();
    }
});

