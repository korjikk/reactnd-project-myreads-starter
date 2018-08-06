import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'
import { Route } from 'react-router-dom'



class BooksApp extends Component {
  state = {
    books: []
  };

  changeBookState = (book) => {
    //update the book shelf 
    BooksAPI.update(book, book.shelf).then(this.getAllBooks);
  }

  getAllBooks = () => {
    return BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  componentDidMount() {
    //fetch the book list
    this.getAllBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onChangeBookState={this.changeBookState}
            listTitle='MyReads'
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            onChangeBookState={this.changeBookState}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
