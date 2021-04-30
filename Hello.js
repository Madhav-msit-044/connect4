import React, {Component} from 'react';
import logo from './logo.svg';
import Board from './board.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import './App.css';




class Hello extends Component {
    constructor(props){
      super(props)
      this.state={
        input1:"",
        input2:"",
        show:true
      }
  
    }
  
    UpdateResponse1=(event)=>{
      this.setState({
        input1:event.target.value
      })
    }
  
    UpdateResponse2=(event)=>{
      this.setState({
        input2:event.target.value
      })
    }
  
    render() {
      return (
          
        <div className="App">
            {/* <Navigate/> */}
                      
           <div>
            <Link to='/' style={{textDecoration:'none'}}><button style={{marginLeft:'88%',marginTop: '5px'}}>Home </button> </Link>
          </div>
          { this.state.show &&(
          <div className="App-header">
               
           <h2>Enter Player Names</h2>
            <label>First player:</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input onChange={this.UpdateResponse1} value={this.state.input1} />&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;<label>Second player:</label>&nbsp;&nbsp;
            <input onChange={this.UpdateResponse2} value={this.state.input2} />
            <button onClick={()=>{this.setState({
                show:false
              })}}>save</button>
          </div>)
          }
          { !this.state.show &&(
          <div className="Game">
              
            <div className="third">
            <p style={{color:'red'}}>Player1: {this.state.input1}</p>&nbsp;&nbsp;&nbsp;
              <p style={{color:'blue'}}>player2: {this.state.input2}</p>
            </div >
            <div>
            <Board player1={this.state.input1} player2={this.state.input2}></Board> </div>
          </div>
          )}
        </div>
      );
    }
  }
export default Hello;