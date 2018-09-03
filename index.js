//game parameters -- ADJUSTABLE!!
var width = 10;
var height = 20;
var tilesize = 24;
var speed = 1000;

//other vars
var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
canvas.width = width * tilesize;
canvas.height = height * tilesize;
var done = false;
var score = 0;
var piece = null;
var swappiece = null;
var mute = true;

//sound player(s)
var gamesound = "http://k003.kiwi6.com/hotlink/3jx93tmrss/gang.mp3";
var gamemp = new Audio(gamesound);
gamemp.load();
gamemp.volume = 0;
gamemp.loop = true;

var ggsound = "http://k003.kiwi6.com/hotlink/lwx52lah63/intolerable.wav";
var ggmp = new Audio(ggsound);
ggmp.volume = 0;

var dropsound = "http://k003.kiwi6.com/hotlink/fxdioyp4k1/dropsound.mp3";
var dropmp = new Audio(dropsound);
dropmp.volume = 0;

var linesound = "http://k003.kiwi6.com/hotlink/lkqr402hq7/3brothers.wav";
var linemp = new Audio(linesound);
linemp.volume = 0;

//tetronimoes
var I = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ]
]
var J = [
  [
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ]
]
var L = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ]
]
var O = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ]
]
var S = [
  [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ]
]
var Z = [
  [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0]
  ]
]
var T = [
  [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ]
]

//pieces
var pieces = [
	[I, "red"],
	[J, "orange"],
	[L, "gold"],
	[O, "green"],
	[S, "blue"],
	[T, "purple"],
	[Z, "cyan"]
];

//functions
	
function drawSquare(x, y) {
  ctx.fillRect(x * tilesize, y * tilesize, tilesize, tilesize);
  ss = ctx.strokeStyle;
  ctx.strokeStyle = "#333";
  ctx.strokeRect(x * tilesize, y * tilesize, tilesize, tilesize);
  ctx.strokeStyle = ss;
}

function drawBoard() {
  fs = ctx.fillStyle;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      ctx.fillStyle = board[y][x] || 'white';
      drawSquare(x, y, tilesize, tilesize);
    }
  }
  ctx.fillStyle = fs;
}

function newPiece() {
  var p = pieces[parseInt(Math.random() * pieces.length, 10)];
  return new Piece(p[0], p[1]);
}

function Piece(type, color) {
  this.orientations = type;
  this.i = 0;
  this.orientation = type[this.i];

  this.color = color;
  
  this.x = width/2-parseInt(Math.ceil(this.orientation.length/2), 10);;
  this.y = -2;
}

function SwapPieces() {
  if (!swappiece) {
    swappiece = newPiece();
  }
  piece.undraw();
  piece.y = -2;

  var temppiece = piece;
  piece = swappiece;
  swappiece = temppiece;
  piece.draw();
}

Piece.prototype.draw = function() {
  fs.ctx.fillStyle;
  ctx.fillStyle = this.color;
  for (let i = 0; i < this.orientation.length; i++) {
    for (let j = 0; j < this.orientation.length; j++) {
      if (this.pattern[i][j]) {
        drawSquare(this.x + i, this.y + j);
      }
    }
  }
  ctx.fillStyle = fs;
}

Piece.prototype.down = function() {
  if (this._collides(0, 1, this.orientation)) {
    this.lock();
		piece = newPiece();
  } else {
    this.undraw();
    this.y++;
    this.draw();
  }
};

Piece.prototype.moveRight = function() {
  if (!this._collides(1, 0, this.orientation)) {
    this.undraw();
    this.x++;
    this.draw();
  }
};

Piece.prototype.moveLeft = function() {
  if (!this._collides(-1, 0, this.orientation)) {
    this.undraw();
    this.x--;
    this.draw();
  }
};

Piece.prototype.rotate = function() {
  var nextorientation = this.orientations[(this.i + 1) % this.orientations.length];
  if (!this._collides(0, 0, nextorientation)) {
    this.undraw();
    this.i = (this.i + 1) % this.orientations.length;
    this.orientation = this.orientations[this.i];
    this.draw();
  }
};

//checks for collision
Piece.prototype._collides = function(dx, dy, pat) {
	for (let i = 0; i < pat.length; i++) {
		for (let j = 0; j < pat.length; j++) {
			if (!pat[i][j]) {
				continue;
			}

			var x = this.x + i + dx;
			var y = this.y + j + dy;
			if (y >= height || x < 0 || x >= width) {
				return true;
			}
			if (y < 0) {
				continue;
			}
			if (board[y][x]) {
				return true;
			}
		}
	}

	return false;
};

Piece.prototype._fill = function(color) {
	fs = ctx.fillStyle;
	ctx.fillStyle = color;
	var x = this.x;
	var y = this.y;
	for (let i = 0; i < this.orientation.length; i++) {
		for (let j = 0; j < this.orientation.length; j++) {
			if (this.orientation[i][j]) {
				drawSquare(x + i, y + j);
			}
		}
	}
	ctx.fillStyle = fs;
};

Piece.prototype.undraw = function(ctx) {
	this._fill("white");
};

Piece.prototype.draw = function(ctx) {
	this._fill(this.color);
};

//Locks piece into place, checks for a line and game over,
Piece.prototype.lock = function() {
  dropmp.pause();
  dropmp.load();
  dropmp.play();
  
	for (let i = 0; i < this.orientation.length; i++) {
		for (let j = 0; j < this.orientation.length; j++) {
			if (!this.orientation[i][j]) {
				continue;
			}

			if (this.y + j < 0) {
				// Game ends!
        gamemp.pause();
        gamemp.load();
        ggmp.play();
				done = true;
				return;
			}
			board[this.y + j][this.x + i] = this.color;
		}
	}

  var nlines = 0;
	for (let y = 0; y < height; y++) {
		var line = true;
		for (let x = 0; x < width; x++) {
			line = line && board[y][x];
		}
		if (line) {
			for (let y2 = y; y2 > 1; y2--) {
				for (let x = 0; x < width; x++) {
					board[y2][x] = board[y2-1][x];
				}
			}
			for (let x = 0; x < width; x++) {
				board[0][x] = false;
			}
			nlines++;
		}
	}

  if (nlines > 0) {
    linemp.pause();
    linemp.load();
    linemp.play();
		score += nlines;
		drawBoard();
	}

};

//user input
var timer = Date.now();

document.body.addEventListener('keydown', function (e) {
  if (done && e.keyCode == 13) {
    boardReset();
    drawBoard();
    done = false;
    return;
  }
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > 1) {
    e.preventDefault();
  }
  switch (e.keyCode) {
    case 13: //start
      boardReset();
      main();
      break;
      
    case 38: // up
      piece.rotate();
      timer = Date.now();
      break;

    case 32: // space
      var piecetemp = piece;
      while (piece == piecetemp) {
  		  piece.down();
      }
      break;
    
    case 90: // z
      SwapPieces();
      break;
      
    case 40: // down
  		piece.down();
      break;

  	case 37: // left
  		piece.moveLeft();
  		timer = Date.now() - speed/2;
      break;

  	case 39:  // right
  		piece.moveRight();
  		timer = Date.now() - speed/2;
  }
}, false);

//initialize board
var board = [];

function boardReset() {
  for (let i=0; i < height; i++) {
    board[i] = [];
    for (let j=0; j < width; j++) {
      board[i][j] = '';
    }
  }
  
  gamemp.pause();
  gamemp.load();
  gamemp.play();
}

function main() {
  var clock = Date.now();
  var delta = clock - timer;

  if (delta > speed) { 
    piece.down();
    timer = clock;
  }

  if (!done) {
    requestAnimationFrame(main);
  }
}

boardReset();
piece = newPiece();
drawBoard();
//main();
