class BasePiece {
    constructor(color,position,image,point,id) {
        this.color = color;
        this.position = position;
        this.image = image;
        this.point = point;
        this.id = id; 
    }
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
    var index = i.toString();

    var white_pawn_temp_id = 'wp' + index;
    var black_pawn_temp_id = 'bp' + index; 

    pawn_white.push(new pawn('white', null, null, 1, white_pawn_temp_id));
    pawn_black.push(new pawn('black', null, null, 1, black_pawn_temp_id));

    Object.preventExtensions(pawn_white[i]);
    Object.preventExtensions(pawn_black[i]);
}

for(i=0; i<2; i++)
{
    var index = i.toString();

    var white_rook_temp_id = 'wr' + index;
    var black_rook_temp_id = 'br' + index;
    rook_white.push(new rook('white', null, null, 5, white_rook_temp_id));
    rook_black.push(new rook('white', null, null, 5, black_rook_temp_id));
    Object.preventExtensions(rook_white[i]);
    Object.preventExtensions(rook_black[i]);

    var white_knight_temp_id = 'wk' + index;
    var black_knight_temp_id = 'bk' + index;
    knight_white.push(new rook('white', null, null, 3, white_knight_temp_id));
    knight_black.push(new rook('white', null, null, 3, black_knight_temp_id));
    Object.preventExtensions(knight_white[i]);
    Object.preventExtensions(knight_black[i]);

    var white_bishop_temp_id = 'wb' + index;
    var black_bishop_temp_id = 'bb' + index;
    bishop_white.push(new rook('white', null, null, 3, white_bishop_temp_id));
    bishop_black.push(new rook('white', null, null, 3, black_bishop_temp_id));
    Object.preventExtensions(bishop_white[i]);
    Object.preventExtensions(bishop_black[i]);
}

king_white = new king('white', null, null, Infinity, 'wv');
king_black = new king('black', null, null, Infinity, 'bv');
Object.preventExtensions(king_white);
Object.preventExtensions(king_black);

queen_white = new queen('white', null, null, 9, 'wx');
queen_black = new queen('black', null, null, 9, 'bx');
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

//Set initial position of each element on the board
function initPositions() {

    //Init Pawn postions
    for(i=0; i<8; i++) {
        chess_board[1][i]=pawn_black[i].id;
        pawn_black[i].position=[1,i];
        chess_board[6][i]=pawn_white[i].id;
        pawn_white[i].position=[6,i];
    }

    //Init Rooks
    chess_board[0][0] = rook_black[0].id;
    chess_board[0][7] = rook_black[1].id;
    rook_black[0].position = [0,0];
    rook_black[1].position = [0,7];
    chess_board[7][0] = rook_white[0].id;
    chess_board[7][7] = rook_white[1].id;
    rook_white[0].position = [7,0];
    rook_white[1].position = [7,7];

    //Init knights
    chess_board[0][1] = knight_black[0].id;
    chess_board[0][6] = knight_black[1].id;
    knight_black[0].position = [0,1];
    knight_black[1].position = [0,6];
    chess_board[7][1] = knight_white[0].id;
    chess_board[7][6] = knight_white[1].id;
    knight_black[0].position = [7,1];
    knight_black[1].position = [7,6];

    //Init bishops
    chess_board[0][2] = bishop_black[0].id;
    chess_board[0][5] = bishop_black[1].id;
    bishop_black[0].position = [0,2];
    bishop_black[1].position = [0,5];
    chess_board[7][2] = bishop_white[0].id;
    chess_board[7][5] = bishop_white[1].id;
    bishop_black[0].position = [7,2];
    bishop_black[1].position = [7,5];

    //Init kings
    chess_board[0][3] = king_black.id;
    king_black.position = [0,3];
    chess_board[7][3] = king_white.id;
    king_white.position = [0,3];
    
    //Init queens
    chess_board[0][4] = queen_black.id;
    queen_black.position = [0,4];
    chess_board[7][4] = queen_white.id;
    queen_white.position = [0,4];

}

function display() {
    initBoard();
    initPositions();
    console.log(chess_board);

    console.log(pawn_white);
}

