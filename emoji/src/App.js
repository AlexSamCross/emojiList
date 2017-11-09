import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Emojis from './Emojis.js';
import emojiList from './emojiList.json'


class App extends Component { 
    constructor (props) {
        super(props);
        //set statess
        this.state = {
            list: [],
            input: ''
        }
        //setuping your own custom functions
        this.inputHandler = this.inputHandler.bind(this);
        this.handleEmojiClick = this.handleEmojiClick.bind(this);
    }
    //methods
    inputHandler (event) {

      var input = event.target.value.toLowerCase();

      var newEmojiList = emojiList.filter(function (emojiObject) {
        if (emojiObject.keywords.includes(input)) {
          if (input === '') return; 
          else return emojiObject;
        }
      })

      this.setState({
        input: input,
        list : newEmojiList
      }) 

    }
    handleEmojiClick (event) {
      var selectedEmoji = event.target.innerHTML;
      var emojiElement = event.target;

      emojiElement.style.backgroundColor = "red";
      //window.prompt("Copy to clip board: Ctrl+C Enter", selectedEmoji)
      var textArea = document.createElement('textarea');
      textArea.textContent = selectedEmoji;
      document.body.appendChild(textArea);
      textArea.select();

      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    render () {
        return (
            <div className="app">
                <input 
                  className="searchBar"
                  placeholder="Search Emoji" 
                  onChange={this.inputHandler}
                />
                <Emojis 
                parentState ={ this.state.list }
                handleEmojiClick ={this.handleEmojiClick}
                />
            </div>
        )
    }
}

export default App;