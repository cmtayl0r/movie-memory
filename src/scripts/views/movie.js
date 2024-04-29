class Movie {
    constructor(title, year) {
        this.title = title;
        this.year = year;
    }

    printInfo() {
        console.log(`${this.title} was released in ${this.year}`);
    }
}

export default Movie;
