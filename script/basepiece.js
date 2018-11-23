class BasePiece {
    constructor(color,position,image,point,id) {
        this.color = color;
        this.position = position;
        this.image = image;
        this.point = point;
        this.id = id; 
    }
}

const COLOR = {
    white: 'white',
    black: 'black'
}

const IMAGE_SOURCE_TAG = {
    whitepawn: '<img src="./images/wp.svg"></img>',
    blackpawn: '<img src="./images/bp.svg"></img>',
    whitebishop: '<img src="./images/wb.svg"></img>',
    blackbishop: '<img src="./images/bb.svg"></img>',
    whiterook: '<img src="./images/wr.svg"></img>',
    blackrook: '<img src="./images/br.svg"></img>',
    whiteknight: '<img src="./images/wk.svg"></img>',
    blackknight: '<img src="./images/bk.svg"></img>',
    whiteking: '<img src="./images/wx.svg"></img>',
    blackking: '<img src="./images/bx.svg"></img>',
    whitequeen: '<img src="./images/wq.svg"></img>',
    blackqueen: '<img src="./images/bq.svg"></img>',  
}

const PointsTable = {
    pawn_point: 1,
    rook_point: 5,
    knight_point: 3,
    bishop_point: 3,
    queen_point: 9,
    king_point: Infinity 
}

class pawn extends BasePiece {
    constructor(color,position,image,point,id) {
        super(color,position,image,point,id);
    }

    validMoves() {
        var validcoordinates =[];
        var x = this.position[0];
        var y = this.position[1];
        if(this.id=='wp') {
            if(x==6 && chess_board[4][y-2][0]!='w') {
                 validcoordinates.push([4][y-2]);
            }
            if(chess_board[x-1][y-1][0]=='b') {
                validcoordinates.push([x-1,y-1]);
            }
            if(chess_board[x+1][y-1][0]=='b') {
                validcoordinates.push([x+1][y-1]);
            }
            if(chess_board[x][y-1]!='w' && chess_board[x][y-1]!='b') {
                validcoordinates.push([x,y-1]);
            }
        }
        else {
           if(x==1 && chess_board[3][y+2][0]!='b') {
                validcoordinates.push([3][y+2]);
           }
           if(chess_board[x+1][y+1][0]=='w') {
               validcoordinates.push([x+1,y+1]);
           }
           if(chess_board[x-1][y+1][0]=='w') {
               validcoordinates.push([x-1][y+1]);
           }
           if(chess_board[x][y+1]!='w' && chess_board[x][y+1]!='b') {
               validcoordinates.push([x,y+1]);
           }
        }
        return validcoordinates;
    }
}

class rook extends BasePiece {
    constructor(color,position,image,point,id) {
        super(color,position,image,point,id);
    }
    validMoves() {
        var validcoordinates = [];
        var x = this.position[0];
        var y = this.position[1];
        opp_color = this.color=='white' ? 'b' : 'w';
        /*Right*/
        for(i = x + 1 ; i < 8 ; i++) {
            if(chess_board[i][y][0]==this.color[0]) {
                break;
            }
            else if(chess_board[i][y][0]==opp_color) {
                validcoordinates.push([i,y]);
                break;
            }
            validcoordinates.push([i,y]);
        }
        /*Left*/
        for(i = x - 1 ; i > -1 ; i--) {
            if(chess_board[i][y][0]==this.color[0]) {
                break;
            }
            else if(chess_board[i][y][0]==opp_color) {
                validcoordinates.push([i,y]);
                break;
            }
            validcoordinates.push([i,y]);
        }
        /*Down*/
        for(i = y + 1 ; i < 8 ; i++) {
            if(chess_board[x][i][0]==this.color[0]) {
                break;
            }
            else if(chess_board[x][i][0]==opp_color) {
                validcoordinates.push([x,i]);
                break;
            }
            validcoordinates.push([x,i]);
        }
        /*Up*/
        for(i = y - 1 ; i > -1 ; i--) {
            if(chess_board[x][i][0]==this.color[0]) {
                break;
            }
            else if(chess_board[x][i][0]==opp_color) {
                validcoordinates.push([x,i]);
                break;
            }
            validcoordinates.push([x,i]);
        }
        return validcoordinates;
    }
}

class knight extends BasePiece {
    constructor(color,position,image,point,id) {
        super(color,position,image,point,id);
    }
}

class bishop extends BasePiece {
    constructor(color,position,image,point,id) {
        super(color,position,image,point,id);
    }
}

class king extends BasePiece {
    constructor(color,position,image,point,id) {
        super(color,position,image,point,id);
    }
}

class queen extends BasePiece {
    constructor(color,position,image,point,id) {
        super(color,position,image,point,id);
    }
}

const fun = () => () => {

}

var white_pieces = [];
var black_pieces = [];

function initPieces() {
    for(i=0 ; i<8 ; i++) {
        white_pieces.push(new pawn(COLOR.white, [6,i], IMAGE_SOURCE_TAG.whitepawn, PointsTable.pawn_point, 'wp'));
        black_pieces.push(new pawn(COLOR.black, [1,i], IMAGE_SOURCE_TAG.blackpawn, PointsTable.pawn_point, 'bp'));
    }

    for(i=0; i<8; i+=7) {
        white_pieces.push(new rook(COLOR.white, [7,i], IMAGE_SOURCE_TAG.whiterook, PointsTable.rook_point, 'wr'));
        black_pieces.push(new rook(COLOR.black, [0,i], IMAGE_SOURCE_TAG.blackrook, PointsTable.rook_point, 'br'));     
    }
    for(i=1; i<7; i+=5) {
        white_pieces.push(new knight(COLOR.white, [7,i], IMAGE_SOURCE_TAG.whiteknight, PointsTable.knight_point, 'wk'));
        black_pieces.push(new knight(COLOR.black, [0,i], IMAGE_SOURCE_TAG.blackknight, PointsTable.knight_point, 'bk'));      
    }
    for(i=2; i<8; i+=3) {
        white_pieces.push(new bishop(COLOR.white, [7,i], IMAGE_SOURCE_TAG.whitebishop, PointsTable.bishop_point, 'wb'));
        black_pieces.push(new bishop(COLOR.black, [0,i], IMAGE_SOURCE_TAG.blackbishop, PointsTable.bishop_point, 'bb'));   
    }

    white_pieces.push(new king(COLOR.white, [7,3], IMAGE_SOURCE_TAG.whiteking, PointsTable.king_point, 'wx'));
    black_pieces.push(new king(COLOR.black, [0,3], IMAGE_SOURCE_TAG.blackking, PointsTable.king_point, 'bx'));
    
    white_pieces.push(new queen(COLOR.white, [7,4], IMAGE_SOURCE_TAG.whitequeen, PointsTable.queen_point, 'wq'));
    black_pieces.push(new queen(COLOR.black, [0,4], IMAGE_SOURCE_TAG.blackqueen, PointsTable.queen_point, 'bq'));

    /* Enforce rules on piece objects*/
    white_pieces.forEach(function(element) {
        Object.preventExtensions(element);
    });
    black_pieces.forEach(function(element) {
        Object.preventExtensions(element);
    })
}

/* 
Test cases
*/
function testcases() {
    console.log("testing extensibility...");
    const extensibleErrorMsg = "object is not extensible";
    for(i=0; i<8; i++) {
        console.assert(Object.isExtensible(white_pieces[i]), {object: white_pieces[i], error: extensibleErrorMsg});
        console.assert(Object.isExtensible(black_pieces[i]), {object: black_pieces[i], error: extensibleErrorMsg});
    }
}

/*
Chess board is a 2D array of 8x8.
The value of a square represents if its empty or occupied.
For eg: position [3,4] = 0 =>  empty
        position [5,6] = 'bk' => black knight
*/
function initBoard() {
    chess_board = new Array(8);
    for(i=0; i<8; i++) {
        chess_board[i]=new Array(8);
    }

    for(i=0; i<8; i++) {
        for(j=0; j<8; j++) {
            chess_board[i][j]=0;
        }
    }
    white_pieces.forEach(function(element){
        var pos_x = element.position[0];
        var pos_y = element.position[1];
        chess_board[pos_x][pos_y] = element.id;
        
    });
    black_pieces.forEach(function(element){
        var pos_x = element.position[0];
        var pos_y = element.position[1];
        chess_board[pos_x][pos_y] = element.id;
        
    });
}

function display() {
    initPieces();
    initBoard();

    var table = document.getElementById("myTable");

    for(i=0; i<8; i++) {
        var row = table.insertRow(i);
        for(j=0; j<8; j++) {
            var cell = row.insertCell(j);
            if(i%2==0) {
                if(j%2==0) {
                    cell.classList.add("blackcell");
                }
            }
            else {
                if(j%2!=0) {
                    cell.classList.add("blackcell");
                }
            }
        }
    }
    white_pieces.forEach(function(element) {
        var pos_x = element.position[0];
        var pos_y = element.position[1];
        table.rows[pos_x].cells[pos_y].innerHTML = element.image;
    });
    black_pieces.forEach(function(element) {
        var pos_x = element.position[0];
        var pos_y = element.position[1];
        table.rows[pos_x].cells[pos_y].innerHTML = element.image;
    });
}

