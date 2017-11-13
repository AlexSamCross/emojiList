import React, { Component } from 'react';
import './App.css';
import Emojis from './Emojis.js';
import emojiList from './emojiList.json';
import { debounced, copyToClipBoard } from './helpers.js';
import Notifications, {notify} from 'react-notify-toast';

class App extends Component { 
    constructor (props) {
        super(props);
        //set statess
        this.state = {
            list: [],
            input: '',
            currentEmoji: '',
            debounced: debounced(function (EmojiList) {
              this.setState({
                list: EmojiList
              })
            }, 750, this)
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
      });
      //set statess of method
      this.setState({ input: input }) 
      // call debounce function to add delay.
      this.state.debounced(newEmojiList);
    }

    handleEmojiClick (event) {
      
      var selectedEmoji = event.target.innerHTML,
        emojiElement = event.target;
      //remove styles
      if (this.state.currentEmoji){
        this.state.currentEmoji.removeAttribute('style');
      }
      //set style
      emojiElement.style.backgroundColor = "green";

      copyToClipBoard(selectedEmoji);
      notify.show('Copied to ClipBoard!');
      this.setState({ currentEmoji: emojiElement });
      
    }
    //render app
    render () {
        return (
            <div>
                <Notifications />
                <section className="hero is-small is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                            👻💩🐔 &nbsp; Emoji Funtime! &nbsp; 😁😆😍
                            </h1>
                        </div>
                    </div>
                </section>

                <div className="main">
                    <input 
                        className="input"
                        placeholder="Type something"
                        onChange={this.inputHandler}
                        value={this.state.input}
                    />
                    <div id="emojis">
                        {<Emojis 
                            parentState={this.state.list}
                            handleEmojiClick={this.handleEmojiClick}
                        />}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;