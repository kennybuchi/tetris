//game parameters -- ADJUSTABLE!!
var width = 10;
var height = 20;
var tilesize = 24;

//other vars
var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
canvas.width = width * tilesize;
canvas.height = height * tilesize;
var done = false;
var score = 0;
var piece = null;

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
	[L, "yellow"],
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

Piece.prototype.lock = function() {
	for (let i = 0; i < this.orientation.length; i++) {
		for (let j = 0; j < this.orientation.length; j++) {
			if (!this.orientation[i][j]) {
				continue;
			}

			if (this.y + j < 0) {
				// Game ends!
				alert("GG");
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
			line = line && !board[y][x];
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
		score += nlines;
		drawBoard();
	}

};

//user input
var timer = Date.now();
document.body.addEventListener('keypress', function (e) {
  if (e.keycode == 90) { // z
    piece.rotate();
    timer = Date.now();
  }
  if (e.keyCode == 40) { // down
		console.log("down");
		piece.down();
    //timer = Date.now();
	}
	if (e.keyCode == 37) { // left
		piece.moveLeft();
		timer = Date.now();
	}
	if (e.keyCode == 39) { // right
		piece.moveRight();
		timer = Date.now();
  }
}, false);

//initialize board
var board = [];
for (let i=0; i < height; i++) {
  board[i] = [];
  for (let j=0; j < width; j++) {
    board[i][j] = '';
  }
}

function main() {
  var clock = Date.now();
  var delta = clock - timer;

  if (delta > 1000) { //1 second
    piece.down();
    timer = clock;
  }

  if (!done) {
    requestAnimationFrame(main);
  }
}

piece = newPiece();
drawBoard();
main();
