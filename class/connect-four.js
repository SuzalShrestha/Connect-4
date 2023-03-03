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
    Screen.addCommand('left', 'move cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'move cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('up', 'move cursor up', this.cursor.up.bind(this.cursor));

    Screen.addCommand('down', 'move cursor down', this.cursor.down.bind(this.cursor));

    Screen.addCommand('return', 'place move', this.placemove.bind(this));
    this.cursor.setBackgroundColor();
    Screen.render();
  }
  placemove(){
    let col=this.cursor.col;
    let row=this.cursor.row;
    let char=this.playerTurn;
    Screen.setGrid(row,col,char);
    Screen.render();
    if(this.playerTurn==="O"){
      this.playerTurn="X";
    }else{
      this.playerTurn="O";
    }
    let winner=ConnectFour.checkWin(Screen.grid);
    if(winner){
      ConnectFour.endGame(winner);
    }
    this.cursor.resetBackgroundColor();
  }
  static checkWin(grid) {
    let result;
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
   let bool= grid.every(ele=>{
      return ele.every(item=>{
        return item===" ";
      });
    });
    if(bool){
      return false;
    }
    let masterGrid=this.getmasterGrid(grid);
    let onlyFour=masterGrid.filter(ele=>{
      if(ele.length===4){
        return true;
      }
      return false;
    });
    let notFour=masterGrid.filter(ele=>{
      if(ele.length>4){
        return true;
      }
      return false;
    }) 
    onlyFour.forEach(
      ele=>{
        if(ele.indexOf(" ")===-1){

          let xwins=ele.filter(
            item=>{
              if(item!=="X"){
                return true;
              }
              return false;
            }
          );
          let owins=ele.filter(
            item=>{
              if(item!=="O"){
                return true;
              }
              return false;
            }
          );
            if(xwins.length===0){
              result= "X";
            }
            if(owins.length===0){
              result= "O";
            }
        }
      }
    );
    if(result!==undefined){
      return result;
    }
    notFour.forEach(ele=>{
      ele.forEach((item,index)=>{
  
        
        // if(ele[index+1]!==undefined&&
        //   ele[index+2]!==undefined&&
        //   ele[index+3]!==undefined){

        if(item!==" "){

          if(item===ele[index+1] &&
            ele[index+2]===ele[index+3]&& 
            item===ele[index+3]){
            return result=item;
          }
        }
          //}
       });
    });
    if(result!==undefined){
      return result;
    }
    masterGrid.forEach(
      ele=>{
        if(ele.includes(" ")){
          if(result===undefined){result=false;}
        }
      }
    );
    if(result===undefined){
      result="T";
    }
    return result;

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
        for(let l=0;l<4;l++){
        //   diagonal1.push(grid[k][l]);
          let diagmini=[grid[k][l]];
          let row=k;
          let col=l;

            for(let p=0;p<3;p++){
               
                
                diagmini.push(grid[row+=1][col+=1]);
                
            }
           diagonal.push(diagmini);
        }
      }
      masterGrid.push(...diagonal);
      //reverse diagonal
      let reverseGrid=[];
      let newGrid=JSON.parse(JSON.stringify(grid));//problem fix that json manipulated data
      for(let item of newGrid){
        reverseGrid.push(item.reverse());
      }
      diagonal=[]; //select a top left 3X4 portion of grid
      for(let k=0;k<3;k++){
        // let diagonal1=[];
        for(let l=0;l<4;l++){
        //   diagonal1.push(grid[k][l]);
          let diagmini=[reverseGrid[k][l]];
          let row=k;
          let col=l;

            for(let p=0;p<3;p++){
               
                
                diagmini.push(reverseGrid[row+=1][col+=1]);
                
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
