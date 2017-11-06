import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Emojis from './Emojis.js';
import emojiList from './emojiList.json'


class App extends Component { 
    constructor (props) {
        super(props);
        //set states
        this.state = {
            list: [],
            input: ''
        }
        //setuping your own custom functions
        this.inputHandler = this.inputHandler.bind(this);
    }
    inputHandler (event) {
      //updating the state/value of input
      var input = event.target.value.toLowerCase();

      var newEmojiList = emojiList.filter(function (emojiObject) {
        if (emojiObject.keywords.includes(input)) {
          if (input === '') return;
          else return emojiObject;
        }
      })
      console.log(newEmojiList);
      this.setState({
        input: input,
        list : newEmojiList
      }) 
    }
    render () {
        return (
            <div className="app">
                <input className="searchBar"
                 placeholder="Search Emoji" 
                 onChange={this.inputHandler}
                 />
                <Emojis parentState={this.state.list}/>
            </div>
        )
    }
}

export default App;