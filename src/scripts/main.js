'use strict';
// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// MAIN CONTROLLER
import * as controller from './controller.js';

// -----------------------------------------------------------------------------
// INITIALISE APP
// -----------------------------------------------------------------------------

class App {
    constructor() {
        this.controller = new controller();
    }

    async init() {
        this.controller.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
