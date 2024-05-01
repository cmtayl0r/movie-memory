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
    #data; // data from state/model
    #parentElement = document.querySelector('#movie-list');
    _;
    render(data) {
        console.log(data);
        // Take state from controller
        this.#data = data;
        // Generate markup
        this.markup = this.markupList();
        // Clear parent element
        this._clear();
        // Insert markup to parent element
        this.#parentElement.insertAdjacentHTML('afterbegin', this.markup);
    }
    _clear() {
        this.#parentElement.innerHTML = '';
    }

    markupList() {
        return this.#data.map(movie => this.markupCard(movie)).join('');
    }

    markupCard(movie) {
        return `
        <li class="movie-card">
            <h4>${movie.title}</h4>
            <p>Rating: ${movie.rating}</p>
            <p>Genre: ${movie.genre}</p>
        </li>
        `;
    }
    renderSpinner() {
        this.#parentElement.innerHTML = '<div>Loading...</div>';
    }
    renderError(message = 'An error has occured!') {
        this.#parentElement.innerHTML = `<div>${message}</div>`;
    }
    renderMessage(message = 'No movies found. Please add a movie.') {
        this.#parentElement.innerHTML = `<div>${message}</div>`;
    }
}

const showListView = new ShowListView();

class AddMovieView {
    _btnAddMovie = document.querySelector('#add-movie');
    _formAddMovie = document.querySelector('#form-add-movie');

    handleAddMovie(handler) {
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
        this.addMovie = this.addMovie.bind(this);

        // Bind
        this.init();
    }

    async loadMovies() {
        // Get data from localStorage
        const savedMovies = localStorage.getItem('movies');
        // Set state to savedMovies or empty array
        state.movieList = savedMovies ? JSON.parse(savedMovies) : [];
        // return state
        return state.movieList;
    }

    saveMovies() {
        localStorage.setItem('movies', JSON.stringify(state.movieList));
    }

    displayMovieList() {
        // TODO: renderSpinner
        showListView.render(state.movieList);
    }

    addMovie(newMovie) {
        // TODO: renderSpinner();
        state.movieList.push(newMovie);
        this.saveMovies();
        showListView.render(state.movieList);
    }

    handleError(error) {
        console.error('💥 An Error occured:', error);
        showListView.renderError(`Error: ${error.message}`);
    }

    async init() {
        try {
            await this.loadMovies();
            this.displayMovieList();
            addMovieView.handleAddMovie(this.addMovie);
        } catch (error) {
            console.error('Initialization failed:', error);
            showListView.renderError(`Failed to initialize: ${error.message}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const controller = new Controller();
});
