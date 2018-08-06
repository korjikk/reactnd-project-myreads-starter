# MyReads Project

The app functionality was developed starting from the static example of the app.

The app allows you to see your list of reads, ordered by shelves. 
You can move the books from one shelf to another, or to remove them from your list.
To get new books to the list, you can use the search page.

## Running the app

Follow the steps:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
