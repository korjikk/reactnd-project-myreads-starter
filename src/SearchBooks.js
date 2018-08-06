import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { DebounceInput } from 'react-debounce-input';

class SearchBooks extends Component {

    state = {
        query: '',
        searchResultBooks: [],
        noResultsMessage: false
    }


    componentDidUpdate(prevProps, prevState) {
        //The book items from the search results do not have a 'shelf' state, that's why
        //when the search results update, we loop over our library and over the search results 
        //and if a book from our library exists in the results, set its shelf property to the corresponding one
        let newSearchResultBooks = [];
        if (this.state.searchResultBooks.length > 0 && this.props.books.length > 0 && prevState && JSON.stringify(prevState.searchResultBooks) !== JSON.stringify(this.state.searchResultBooks)) {
            this.state.searchResultBooks.forEach(searchResultBook => {
                this.props.books.forEach(book => {
                    if (searchResultBook.id === book.id) {
                        searchResultBook.shelf = book.shelf;
                    }
                })
                newSearchResultBooks.push(searchResultBook);
            })
            this.setState({ searchResultBooks: newSearchResultBooks })
        }
    }


    onSearch = (event) => {
        const query = event.target.value;
        this.setState({ query, noResultsMessage: false });
        //if the query is not empty
        if (query !== '') {
            //fetch search results
            BooksAPI.search(query).then((result) => {
                //if there are no errors, update the books on the page
                if (result && !result.error) {
                    this.setState({ searchResultBooks: result, noResultsMessage: false });
                }
                //if there are no corresponding search results, show the "No results" message
                else {
                    this.setState({ searchResultBooks: [], noResultsMessage: true });
                }

            });
        }
        //if the query is empty,display blank page
        else {
            this.setState({ searchResultBooks: [], noResultsMessage: false });
        }
    }


    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        {/*the DebounceInput is used to increase the app performance.
                            Search executes only if the user is not typing for 300ms*/}
                        <DebounceInput
                            debounceTimeout={300}
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={this.onSearch} />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.noResultsMessage && this.state.searchResultBooks.length === 0 &&
                        <h2>
                            There are no results to match your query.
                        </h2>
                    }
                    <ol className="books-grid">
                        {this.state.searchResultBooks.map((book) =>
                            <li key={book.id}>
                                <Book url={book.imageLinks && book.imageLinks.thumbnail} title={book.title} authors={book.authors} id={book.id} shelf={book.shelf} onChangeBookState={this.props.onChangeBookState} />
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks