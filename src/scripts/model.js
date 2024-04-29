// -----------------------------------------------------------------------------
// MODEL
// -----------------------------------------------------------------------------
// data management and business logic, providing methods to manipulate the user data.

class Model {
    constructor() {
        // Initial data set, could also be fetched from an API
        this.users = ['Chris', 'Anna', 'Hazel'];
    }

    loadData() {
        // Loads data into the model; could be from a local source or an API.
    }

    // addUser(userData) {
    //     this.users.push(userData);
    //     // Optionally trigger an event or callback here if needed
    // }
}

export default model;
