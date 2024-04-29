'use strict';
// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// MAIN CONTROLLER
// import * as controller from './controller.js';

// -----------------------------------------------------------------------------
// MODEL
// -----------------------------------------------------------------------------
let state = {
    movieList: [],
};

// -----------------------------------------------------------------------------
// VIEW
// -----------------------------------------------------------------------------
class ShowListView {
    _data; // data from state/model
    _parentElement = document.querySelector('#movie-list');

    render(data) {
        // Take state from controller
        this._data = data;
        // Generate markup
        this.markup = this.markupList();
        // Clear parent element
        this._clear();
        // Insert markup to parent element
        this._parentElement.insertAdjacentHTML('afterbegin', this.markup);
    }
    _clear() {
        this._parentElement.innerHTML = '';
    }

    markupList() {
        return this._data.map(movie => this.markupCard(movie)).join('');
    }

    markupCard(movie) {
        return `
            <li class="movie-card">
                <span>${movie.title}</span>
                <span>${movie.rating}</span>
                <span>${movie.genre}</span>
            </li>
        `;
    }
    renderSpinner() {
        this._parentElement.innerHTML = '<div>Loading...</div>';
    }
    renderError(message = 'An error has occured!') {
        this._parentElement.innerHTML = `<div>${message}</div>`;
    }
    renderMessage(message = 'No movies found. Please add a movie.') {
        this._parentElement.innerHTML = `<div>${message}</div>`;
    }
}

const showListView = new ShowListView();

class AddMovieView {
    _btnAddMovie = document.querySelector('#add-movie');
    _formAddMovie = document.querySelector('#form-add-movie');

    addHandlerAddMovie(handler) {
        this._btnAddMovie.addEventListener('click', e => {
            e.preventDefault();
            // Get data from form
            const formData = new FormData(this._formAddMovie);
            console.log(formData.entries());
            // Convert FormData to Object
            const movie = Object.fromEntries(formData.entries());
            console.log(`Movie:`, movie);
            // Pass data to controller
            handler(movie);
        });
    }
}
const addMovieView = new AddMovieView();

// -----------------------------------------------------------------------------
// APP CONTROLLER
// -----------------------------------------------------------------------------
class Controller {
    constructor() {
        this.controlMovieList = this.controlMovieList.bind(this);
        this.controlAddMovie = this.controlAddMovie.bind(this);

        // Bind
        this.init();
    }

    controlMovieList() {
        // TODO: renderSpinner
        // 1. Get data from model
        const data = state.movieList;
        // 2. Render data to view
        showListView.render(data);
        // resultsView.render(model.getSearchResultsPage());
    }

    controlAddMovie(newMovie) {
        // TODO: AddMovieView.renderSpinner();
        // 1. Add data to model
        state.movieList.push(newMovie);
        // 2. Render data to view
        showListView.render(state.movieList);
    }
    init() {
        // Event/Bind handlers
        // 1. Load Movie List
        // showListView.addHandlerMovieList(this.controlMovieList);
        this.controlMovieList();
        // 2. Add Movie
        addMovieView.addHandlerAddMovie(this.controlAddMovie);
        // 3. Delete Movie
        // 4. Edit Movie
        // 5. Save Movie
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const controller = new Controller();
});
