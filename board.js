import React, {Component} from 'react';

class Board extends Component {

  constructor() {
    super();
    this.state = {
      boardState: new Array(7).fill(new Array(6).fill(null)),
      playerTurn:'Red',
      gameMode: '',
      gameSelected: false,
      winner: '',
      time: {}, 
      seconds: 60,
      count:0
    }
    this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
  }

  selectedGame(mode){
    this.setState({
       gameMode: mode,
       gameSelected: true, 
       boardState: new Array(7).fill(new Array(6).fill(null))
    })
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  

  }

  makeMove(slatID){
    const boardCopy = this.state.boardState.map(function(arr) {
      return arr.slice();
    });
    if( boardCopy[slatID].indexOf(null) !== -1 ){
      let newSlat = boardCopy[slatID].reverse()
      newSlat[newSlat.indexOf(null)] = this.state.playerTurn
      newSlat.reverse()
      this.setState({
        playerTurn: (this.state.playerTurn === 'Red') ? 'Blue' : 'Red',
        count:this.state.count+1,
        boardState: boardCopy
      })
    }
  }

  /*Only make moves if winner doesn't exist*/
  handleClick(slatID) {
    if(this.state.winner === ''){
      this.makeMove(slatID)
    }
  }
  
  /*check the winner and make AI move IF game is in AI mode*/
  componentDidUpdate(){
    var { player1,player2 } = this.props;
  
    var win = checkWinner(this.state.boardState,player1,player2,this.state.count)
    if(this.state.winner !== win){
      this.setState({ winner : win })
    } else {
       if(this.state.gameMode === 'ai' && this.state.playerTurn === 'Blue'){
        let validMove = -1;
        while(validMove === -1){
          let slat = Math.floor((Math.random() * 7))
          if(this.state.boardState[slat].indexOf(null) !== -1){
            validMove = slat
          }else{
            validMove = -1
          }
        }
        this.makeMove(validMove)
       }
    }
  }


  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }
  startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      // Check if we're at zero.
      if (seconds == 0) { 
        clearInterval(this.timer);
      }
    }


  render(){

    /*If a winner exists display the name*/
    let winnerMessageStyle
    if(this.state.winner !== ""){
      winnerMessageStyle = "winnerMessage appear"
    }else {
      winnerMessageStyle = "winnerMessage"
    }

    /*Contruct slats allocating column from board*/
    let slats = [...Array(this.state.boardState.length)].map((x, i) => 
      <Slat 
          key={i}
          holes={this.state.boardState[i]}
          handleClick={() => this.handleClick(i)}
      ></Slat>
    )

    return (
      <div style={{paddingleft:'30%'}}>
        {this.state.gameSelected &&
        <>
       <p style={{color:'black',fontSize:'x-large'}}>   It's {this.state.playerTurn} turn </p>
       <div style={{fontSize:'x-large',marginLeft:'80%',color:'black',marginRight:'0px',backgroundColor:'skyblue',width:'15%',height:'15%'}}>             
          Timer- {this.state.time.m} : {this.state.time.s}
          </div>
          <div className="Board">
            {slats}
           
          </div>
          </>
        }
        <div className={winnerMessageStyle}>{this.state.winner}</div>
        {(!this.state.gameSelected || this.state.winner !== '') &&
          <div>
            <button onClick={() => this.selectedGame('human')}>Play Game</button>
          </div>
        }
      </div>
    )
  }
}
function Hole(props){
  return <div className="Hole"><div className={props.value}></div></div>
}

function Slat(props){
    return <div className="Slat" onClick={() => props.handleClick()}>
      {[...Array(props.holes.length)].map((x, j) => 
        <Hole key={j} value={props.holes[j]}></Hole>)}
      </div>
 }

 function checkLine(a,b,c,d) {
    return ((a !== null) && (a === b) && (a === c) && (a === d));
}

function checkWinner(bs,p1,p2,count) {
  for (let c = 0; c < 7; c++)
      for (let r = 0; r < 4; r++)
          if (checkLine(bs[c][r], bs[c][r+1], bs[c][r+2], bs[c][r+3]))
          {
            if (bs[c][r]=='Red'){
              return p1+' Wins! with '+Math.round(count/2)+' moves'
            }
            else{
              return p2+' Wins! with '+count/2+' moves'
            }

          }
              
            

  for (let r = 0; r < 6; r++)
       for (let c = 0; c < 4; c++)
           if (checkLine(bs[c][r], bs[c+1][r], bs[c+2][r], bs[c+3][r]))
           {
            if (bs[c][r]=='Red'){
              return p1+' Wins! with '+Math.round(count/2)+' moves'
            }
            else{
              return p2+' Wins! with '+count/2+' moves'
            }

          }

  for (let r = 0; r < 3; r++)
       for (let c = 0; c < 4; c++)
           if (checkLine(bs[c][r], bs[c+1][r+1], bs[c+2][r+2], bs[c+3][r+3]))
           {
            if (bs[c][r]=='Red'){
              return p1+' Wins! with '+Math.round(count/2)+' moves'
            }
            else{
              return p2+' Wins! with '+count/2+' moves'
            }

          }

  for (let r = 0; r < 4; r++)
       for (let c = 3; c < 6; c++)
           if (checkLine(bs[c][r], bs[c-1][r+1], bs[c-2][r+2], bs[c-3][r+3]))
           {
            if (bs[c][r]=='Red'){
              return p1+' Wins! with '+Math.round(count/2)+' moves'
            }
            else{
              
              return p2+' Wins! with '+count/2+' moves'
            }

          }

  return "";
}

export default Board;