const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    let masterGrid=this.getmasterGrid(grid);
   
      
    

  }
  static getmasterGrid(grid){
    let masterGrid=[];
    for(let item of grid){
        masterGrid.push(item);
    }
    for(let i=0;i<grid.length+1;i++){
      let verticalGrid=[];
      for(let j=0;j<grid.length;j++){
        verticalGrid.push(grid[j][i]);
      }
      masterGrid.push(verticalGrid);
      //diagonal
      

    }
    let diagonal=[]; //select a top left 3X4 portion of grid
      for(let k=0;k<3;k++){
        // let diagonal1=[];
        for(l=0;l<4;l++){
        //   diagonal1.push(grid[k][l]);
          let diagmini=[grid[k][l]];
          let row=k;
          let col=l;

            for(p=0;p<3;p++){
               
                
                diagmini.push(grid[row+=1][col+=1]);
                
            }
           diagonal.push(diagmini);
        }
      }
      masterGrid.push(...diagonal);
      //reverse diagonal
      let reverseGrid=[];
      for(let item of grid){
        reverseGrid.push(item.reverse());
      }
      diagonal=[]; //select a top left 3X4 portion of grid
      for(let k=0;k<3;k++){
        // let diagonal1=[];
        for(l=0;l<4;l++){
        //   diagonal1.push(grid[k][l]);
          let diagmini=[grid[k][l]];
          let row=k;
          let col=l;

            for(p=0;p<3;p++){
               
                
                diagmini.push(grid[row+=1][col+=1]);
                
            }
           diagonal.push(diagmini);
        }
      }
      masterGrid.push(...diagonal);
      
    return masterGrid;
      

    
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
