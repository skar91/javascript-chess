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
    whitepawn: '<img width="30%" src="./images/wp.svg"></img>',
    blackpawn: '<img width="30%" src="./images/bp.svg"></img>',
    whitebishop: '<img width="30%" src="./images/wb.svg"></img>',
    blackbishop: '<img width="30%" src="./images/bb.svg"></img>',
    whiterook: '<img width="30%" src="./images/wr.svg"></img>',
    blackrook: '<img width="30%" src="./images/br.svg"></img>',
    whiteknight: '<img width="30%" src="./images/wk.svg"></img>',
    blackknight: '<img width="30%" src="./images/bk.svg"></img>',
    whiteking: '<img width="30%" src="./images/wv.svg"></img>',
    blackking: '<img width="30%" src="./images/bv.svg"></img>',
    whitequeen: '<img width="30%" src="./images/wx.svg"></img>',
    blackqueen: '<img width="30%" src="./images/bx.svg"></img>',  
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

    movement() {
        console.log("pawn move rules");
    }
}

class rook extends BasePiece {
    constructor(color,position,image,point,id) {
        super(color,position,image,point,id);
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

pawn_white = [];
pawn_black = [];

rook_white = [];
rook_black = [];

knight_white = [];
knight_black = [];

bishop_white = [];
bishop_black = [];


for(i=0 ; i<8 ; i++)
{
    pawn_white.push(new pawn(COLOR.white, [6,i], IMAGE_SOURCE_TAG.whitepawn, PointsTable.pawn_point, 'wp'+i));
    pawn_black.push(new pawn(COLOR.black, [1,i], IMAGE_SOURCE_TAG.blackpawn, PointsTable.pawn_point, 'bp'+i));

    Object.preventExtensions(pawn_white[i]);
    Object.preventExtensions(pawn_black[i]);
}

for(i=0; i<2; i++)
{
    rook_white.push(new rook(COLOR.white, null, IMAGE_SOURCE_TAG.whiterook, PointsTable.rook_point, 'wr'+i));
    rook_black.push(new rook(COLOR.black, null, IMAGE_SOURCE_TAG.blackrook, PointsTable.rook_point, 'br'+i));
    Object.preventExtensions(rook_white[i]);
    Object.preventExtensions(rook_black[i]);
  
    knight_white.push(new knight(COLOR.white, null, IMAGE_SOURCE_TAG.whiteknight, PointsTable.knight_point, 'wk'+i));
    knight_black.push(new knight(COLOR.black, null, IMAGE_SOURCE_TAG.blackknight, PointsTable.knight_point, 'bk'+i));
    Object.preventExtensions(knight_white[i]);
    Object.preventExtensions(knight_black[i]);

    bishop_white.push(new bishop(COLOR.white, null, IMAGE_SOURCE_TAG.whitebishop, PointsTable.bishop_point, 'wb'+i));
    bishop_black.push(new bishop(COLOR.black, null, IMAGE_SOURCE_TAG.blackbishop, PointsTable.bishop_point, 'bb'+i));
    Object.preventExtensions(bishop_white[i]);
    Object.preventExtensions(bishop_black[i]);
}

king_white = new king(COLOR.white, null, IMAGE_SOURCE_TAG.whiteking, PointsTable.king_point, 'wv0');
king_black = new king(COLOR.black, null, IMAGE_SOURCE_TAG.blackking, PointsTable.king_point, 'bv1');
Object.preventExtensions(king_white);
Object.preventExtensions(king_black);

queen_white = new queen(COLOR.white, null, IMAGE_SOURCE_TAG.whitequeen, PointsTable.queen_point, 'wx0');
queen_black = new queen(COLOR.black, null, IMAGE_SOURCE_TAG.blackqueen, PointsTable.queen_point, 'bx1');
Object.preventExtensions(queen_white);
Object.preventExtensions(queen_black);

//Test cases
function testcases() {
    console.log("testing extensibility...");
    const extensibleErrorMsg = "object is not extensible";
    for(i=0; i<8; i++) {
        console.assert(Object.isExtensible(pawn_white[i]), {object: pawn_white[i], error: extensibleErrorMsg});
    }
}

//Chess board is a 2D array of 8x8
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
}

//Set initial position of each element
function initPositions() {
    //Init Rooks
    rook_black[0].position = [0,0];
    rook_black[1].position = [0,7];
    rook_white[0].position = [7,0];
    rook_white[1].position = [7,7];

    //Init knights
    knight_black[0].position = [0,1];
    knight_black[1].position = [0,6];
    knight_white[0].position = [7,1];
    knight_white[1].position = [7,6];

    //Init bishops
    bishop_black[0].position = [0,2];
    bishop_black[1].position = [0,5];
    bishop_white[0].position = [7,2];
    bishop_white[1].position = [7,5];

    //Init kings  
    king_black.position = [0,3];
    king_white.position = [7,3];
    
    //Init queens
    queen_black.position = [0,4];
    queen_white.position = [7,4];
}

function display() {
    initBoard();
    initPositions();

    var table = document.getElementById("myTable");

    for(i=0; i<8; i++) {
        var row = table.insertRow(i);
        for(j=0; j<8; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = chess_board[i][j];
        }
    }

   
    console.log(pawn_white);
    console.log(knight_white);

}

