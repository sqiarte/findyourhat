const prompt = require('prompt-sync')({sigint: true});

// Create variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const defaultField = [
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
];

// Character index
//     [0,0], [1,0], [2,0],
//     [0,1], [1,1], [2,1],
//     [0,2], [1,2], [2,2],


// DECLARE THE CLASS
class Field {
  constructor(field) {
    this.positionNow = [0,0];
    this.field = field;
  }

  // Create random field
  static generateField (width,height,percentage) {
    let newArray = [];
    let xRandom = Math.floor(Math.random()*width)
    let yRandom = Math.floor(Math.random()*height)
    let holePercent = (percentage*width*height)/100
    
    for (let i=0; i < height; i++) {
      newArray.push([]);
      newArray[i].push(new Array(width));
      for (let j=0; j < width; j++) {
        newArray[i][j] = fieldCharacter;
      }
    }
    for (let a=0; a < holePercent; a++) {
      newArray[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hole;
    }
    newArray[yRandom][xRandom] = hat;
    newArray[0][0] = pathCharacter;
    return newArray;
    console.log(newArray.map(n => n.join('')).join('\n'))
  }

  
  // Conditions while moving right, left, up, and down
  moveRight() {
    if (this.positionNow[0] + 1 < this.field[0].length) {
      this.positionNow[0]++;
      this.newField();
  } else {throw Error ('😥 You walked outside the field, YOU ARE DEAD! 😥')}
  }

  moveLeft() {
    if (this.positionNow[0] - 1 >= 0) {
      this.positionNow[0]--;
      this.newField();
  } else {throw Error ('😥 You walked outside the field, YOU ARE DEAD! 😥')}
  }

  moveUp() {
    if (this.positionNow[1] - 1 >= 0) {
      this.positionNow[1]--;
      this.newField();
  } else {throw Error ('😥 You walked outside the field, YOU ARE DEAD! 😥')}
  }

  moveDown() {
    if (this.positionNow[1] + 1 < this.field.length) {
      this.positionNow[1]++;
      this.newField();
  } else {throw Error ('😥 You walked outside the field, YOU ARE DEAD! 😥')}
  }


  // Update field while playing, set win and lose conditions
  newField () {
    const x = this.positionNow[0];
    const y = this.positionNow[1];

    if(this.field[y][x] === hole){
      throw Error('😱 You fell into the hole, YOU ARE DEAD! 😱 ')
    } else if (this.field[y][x] === hat) {
      console.log('😍 you found the hat, YOU WON!!! 😍')
      throw Error ('Please start new game ▶️')
    }
    this.field[y][x] = pathCharacter
  }

  
  // Print playing field
  printField () {
    console.log(this.field.map(m => m.join('')).join('\n'))
  }

}

//=================== END OF CLASS DECLARATION =====================


// Create field by choosing field width, height, and percentage of the hole
const randomField = Field.generateField(10,5,20);

// Create class instance
const myField = new Field (randomField); // you can choose 'defaultField'
myField.printField();


// Receive input and set conditions
while (true) {
  const input = prompt ('Which direction [r,l,u,d] 🤔 ? ');
  switch (input) {
    case 'r' :
      myField.moveRight();
      break;
    case 'l' :
      myField.moveLeft();
      break;
    case 'u' :
      myField.moveUp ();
      break;
    case 'd' :
      myField.moveDown ();
      break;
  }
  console.clear();
  myField.printField();
  console.log('My position is', myField.positionNow)
}