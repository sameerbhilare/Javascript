import { elements } from './base';

// public function
export const getInput = () => {
    return elements.searchInput.value;
};

// public function
export const clearInput = () => {
    elements.searchInput.value = '';
};

// public function
export const clearResults = () => {
    elements.resultListDiv.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
}

/*
// 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
*/
export const limitRecipeTitle = (title, limit = 17) => {
    const newtitle = [];
    if (title.length > 17) {
        title.split(' ').reduce( (acc, cur) => {
            if (acc + cur.length <= limit) {
                newtitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newtitle.join(' ')} ...`;
    }
    return title;
};

// private function
const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.resultListDiv.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${page}">
        <span>Page ${page}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, recPerPage) => {

    /**
     * numResults = 42, recPerPage = 10,
     * then we need 5 pages. hence Math.ceeling() is used.
     */
    const totalPages = Math.ceil(numResults / recPerPage);
    let button;

    if (page === 1 && totalPages > 1) {
        // show only next button
        button = createButton(page + 1, 'next');
    } else if (page > 1 && page < totalPages) {
        // show both prev and next buttons
        button = `
            ${createButton(page + 1, 'next')}
            ${createButton(page - 1, 'prev')}
        `;
    } else if (page === totalPages && totalPages > 1) {
        // show only prev button
        button = createButton(page - 1, 'prev');
    }

    if (button) {
        elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
    }
};

// public function
export const renderResults = (recipes, page = 1, recPerPage = 10) => {
    const startInclusive = (page - 1) * recPerPage; //  0 10 20
    const endExclusive = page * recPerPage          // 10 20 30
    recipes.slice(startInclusive, endExclusive).forEach(renderRecipe); // recipes.forEach(el => el.renderRecipe());
    
    // render buttons
    renderButtons(page, recipes.length, recPerPage);
};

export const highlightSelected = id => {
    // remove active class from all other recipes
    Array.from(document.querySelectorAll('.results__link'))
    .forEach( el => el.classList.remove('results__link--active'));

    // add active class to selected recipe
    document.querySelector(`.results__link[href="#${id}"`).classList.add('results__link--active');
};