'use strict';
// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// MODEL
import Model from './model.js';

// VIEWS
// import exampleView from './views/exampleView.js';

// -----------------------------------------------------------------------------
// CONTROLLER
// -----------------------------------------------------------------------------

/*
Manages the flow between user models and views, initializing the model and potentially preloading data or responding to user actions.
*/
/*
Main controller class that handles all event subscribers and publisher interactions.
*/

// class to manage interactions between the model and views.
class Controller {
    constructor() {
        this.model = new UserModel();
        // Bindings for methods to ensure 'this' context is maintained
        this.exampleMethod = this.exampleMethod.bind(this);

        // Bind handlers upon initialization
        this.init();
    }

    async exampleMethod() {
        // Example of a method that could be called by a view or another controller
    }

    init() {
        // Method to initialize controller functions and bind model updates to view updates.
        // Example of binding a view method to a controller method
        // methodInView is a subscriber method in the view that listens for a custom event and calls the controller method.
        // exampleView.methodInView(this.exampleMethod);
    }
}

const Controller = new Controller();
export default Controller;
