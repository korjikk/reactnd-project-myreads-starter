import React, { Component } from 'react'

class Book extends Component {


    state = {
        selectValue: 'none'
    }

    componentDidMount(prevProps) {
        //set the shelf prop
        if (this.props.shelf && prevProps && prevProps.shelf !== this.props.shelf || !prevProps) {
            this.setState({ selectValue: this.props.shelf });
        }
    }

    componentDidUpdate(prevProps) {
        //if the shelf prop changed, set it to the new value
        if (prevProps.shelf !== this.props.shelf) {
            this.setState({ selectValue: this.props.shelf });
        }
    }

    onBookShelfChange = (event) => {
        //if we change a shelf of a book, or add a book to our library, we update it's state and
        //call the callback that will update the book object from the server
        this.setState({ selectValue: event.target.value });
        const bookDTO = { id: this.props.id, shelf: event.target.value };
        this.props.onChangeBookState(bookDTO);
    }

    render() {
        const { url, title, authors } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.selectValue} onChange={this.onBookShelfChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                {authors && authors.length > 0 &&
                    <div className="book-authors">
                        {authors.map((author) =>
                            <span key={author}>
                                {author} &nbsp;
                        </span>
                        )}
                    </div>
                }
            </div>
        )
    }
}

export default Book


