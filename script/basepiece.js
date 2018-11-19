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


function assert(condition) {
    if(!condition) {
        console.log("assertion failed!")
    }
    else {
        console.log("success");
    }
}

function testcases() {
    console.log("testing extensibility...");
    for(i=0; i<8; i++) {
        assert(Object.isExtensible(pawn_white[i]));
        assert(Object.isExtensible(pawn_black[i]));
    }
    //assert(pawn_white[0].color == "white");
}


function display() {
    pawn_white[0].movement();
    console.dir(pawn_black);
}

