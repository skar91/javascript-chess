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

    pawn_white.push(new pawn('white', null, null, null, white_pawn_temp_id));
    pawn_black.push(new pawn('black', null, null, null, black_pawn_temp_id));
}

for(i=0; i<2; i++)
{
    var index = i.toString();

    var white_rook_temp_id = 'wr' + index;
    var black_rook_temp_id = 'br' + index;
    rook_white.push(new rook('white', null, null, null, white_rook_temp_id));
    rook_black.push(new rook('white', null, null, null, black_rook_temp_id));

    var white_knight_temp_id = 'wk' + index;
    var black_knight_temp_id = 'bk' + index;
    knight_white.push(new rook('white', null, null, null, white_knight_temp_id));
    knight_black.push(new rook('white', null, null, null, black_knight_temp_id));

    var white_bishop_temp_id = 'wb' + index;
    var black_bishop_temp_id = 'bb' + index;
    bishop_white.push(new rook('white', null, null, null, white_bishop_temp_id));
    bishop_black.push(new rook('white', null, null, null, black_bishop_temp_id));
}

king_white = new king('white', null, null, null, 'wv');
king_black = new king('black', null, null, null, 'bv');

queen_white = new queen('white', null, null, null, 'wx');
queen_black = new queen('black', null, null, null, 'bx');

function display() {
    pawn_white[0].movement();
    console.dir(pawn_black);
}

