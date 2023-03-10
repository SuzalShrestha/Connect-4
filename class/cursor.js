const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }
  up(){
    this.resetBackgroundColor();
    if(this.row>0){
      this.row+=-1;
    }
    this.setBackgroundColor();
  }
  down(){
    
    this.resetBackgroundColor();
    if(this.row<5){
      this.row+=1;
    }
    this.setBackgroundColor();
  }

  left() {
    // Move cursor left
    this.resetBackgroundColor();
    if(this.col>0){
      this.col+=-1;
    }

    this.setBackgroundColor();

  }

  right() {
    this.resetBackgroundColor();
    if(this.col<6){
      this.col+=1;
    }
    this.setBackgroundColor();
    // Move cursor right
  }

}


module.exports = Cursor;
