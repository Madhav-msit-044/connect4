import React, {Component} from 'react';
// import logo from './logo.svg';
// import Board from './board.js';
import Hello from './Hello.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import './App.css';


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      launch:false

    }
  }
  render(){
    if(this.state.launch){
      return (<Hello />)
    }
    else{
      return this.renderHTML()
    }
  }

  launch=()=>{
    this.setState({
      launch:true
    })
  }
  
  renderHTML(){
    return (
      <div class="App-header"><br></br>
       <img src="image.jpeg" className="App-logo" alt="logo" />
      <h1 class="App">Let's Play Connect4 !!!</h1>
<h3 class="App1"><u>Instructions to be followed:-</u></h3>
<ul class="Instruct"><li>In Connect4,the first player starting Connect Four by dropping one of their red discs into the center column of an empty game board. </li>
<li>The two players then alternate turns dropping one of their discs at a time into an unfilled column, until the second player, with red discs, achieves a diagonal four in a row, and wins the game.</li>
<li> If the board fills up before either player achieves four in a row, then the game is a draw.</li></ul>
<div>
<Link to='/hello' style={{textDecoration:'none'}}><button class="button"> Launch Game </button>  </Link>
</div>
    </div>
    
    )
  }
  
} 






export default App;
