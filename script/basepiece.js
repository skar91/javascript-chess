class BasePiece {
    constructor(id) {
        this.id = id; 
    }
}
///////////////////////// GLOBAL VARIABLES ////////////////////////////////////////////////////////
const PIECE_COLOR = {
    white: 'w',
    black: 'b'
}

const IMAGE_SOURCE_TAG = {
    wp: '<img class="white" src="./images/wp.svg"></img>',
    bp: '<img class="black" src="./images/bp.svg"></img>',
    wb: '<img class="white" src="./images/wb.svg"></img>',
    bb: '<img class="black" src="./images/bb.svg"></img>',
    wr: '<img class="white" src="./images/wr.svg"></img>',
    br: '<img class="black" src="./images/br.svg"></img>',
    wk: '<img class="white" src="./images/wk.svg"></img>',
    bk: '<img class="black" src="./images/bk.svg"></img>',
    wx: '<img class="white" src="./images/wx.svg"></img>',
    bx: '<img class="black" src="./images/bx.svg"></img>',
    wq: '<img class="white" src="./images/wq.svg"></img>',
    bq: '<img class="black" src="./images/bq.svg"></img>',  
}

const POINTS_TABLE = {
    pawn_point: 1,
    rook_point: 5,
    knight_point: 3,
    bishop_point: 3,
    queen_point: 9,
    king_point: Infinity 
}

var piece = {};
var validcoordinates = [];
var chess_board;
var source_x, source_y, target_x, target_y;
var player_turn = 'w';
var turn;
var check = false;
var checkmate = false;
///////////////////////////////////////////////////////////////////////////////////////////////////

class pawn extends BasePiece {
    constructor(id) {
        super(id);
    }
    validMoves(x,y,color) {
        validcoordinates = [];
        if(color=='w') {
            if(x==6 && chess_board[4][y]=='00') {
                 validcoordinates.push([4,y]);
            }
            if(y>0) {
                if(chess_board[x-1][y-1][0]=='b') {
                    validcoordinates.push([x-1,y-1]);
                }
            }
            if(y<7) {
                if(chess_board[x-1][y+1][0]=='b') {
                    validcoordinates.push([x-1,y+1]);
                }
            }  
            if(chess_board[x-1][y]=='00') {
                validcoordinates.push([x-1,y]);
            }
        }
        else {
           if(x==1 && chess_board[3][y]=='00') {
                validcoordinates.push([3,y]);
           }
           if(y>0) {
               if(chess_board[x+1][y-1][0]=='w') {
                   validcoordinates.push([x+1,y-1]);
               }
           }
           if(y<7) {
               if(chess_board[x+1][y+1][0]=='w') {
                   validcoordinates.push([x+1,y+1]);
               }
           }  
           if(chess_board[x+1][y]=='00') {
               validcoordinates.push([x+1,y]);
           }
        }
        return validcoordinates;
    }
}

class rook extends BasePiece {
    constructor(id) {
        super(id);
    }
    validMoves(x,y,color) {
        validcoordinates = [];
        let i = 0;
        let opp_color = (color=='w') ? 'b' : 'w';
        /*Right*/
        for(i = y + 1 ; i < 8 ; i++) {
            if(chess_board[x][i][0]==color) {
                break;
            }
            else if(chess_board[x][i][0]==opp_color) {
                validcoordinates.push([x,i]);
                break;
            }
            validcoordinates.push([x,i]);
        }
        /*Left*/
        for(i = y - 1 ; i > -1 ; i--) {
            if(chess_board[x][i][0]==color) {
                break;
            }
            else if(chess_board[x][i][0]==opp_color) {
                validcoordinates.push([x,i]);
                break;
            }
            validcoordinates.push([x,i]);
        }
        /*Down*/
        for(i = x + 1 ; i < 8 ; i++) {
            if(chess_board[i][y][0]==color) {
                break;
            }
            else if(chess_board[i][y][0]==opp_color) {
                validcoordinates.push([i,y]);
                break;
            }
            validcoordinates.push([i,y]);
        }
        /*Up*/
        for(i = x - 1 ; i > -1 ; i--) {
            if(chess_board[i][y][0]==color) {
                break;
            }
            else if(chess_board[i][y][0]==opp_color) {
                validcoordinates.push([i,y]);
                break;
            }
            validcoordinates.push([i,y]);
        }
        return validcoordinates;
    }
}

class knight extends BasePiece {
    constructor(id) {
        super(id);
    }
    validMoves(x,y,color) {
        validcoordinates = [];
        //opp_color = color=='w' ? 'b' : 'w';

        /*Top*/
        if(x>=2) {
            if(y>=1 && y<=6) {
                if(chess_board[x-2][y-1][0]!=color) {
                    validcoordinates.push([x-2,y-1]);
                }
                if(chess_board[x-2][y+1][0]!=color) {
                    validcoordinates.push([x-2,y+1]);
                }
            }
            if(y==0) {
                if(chess_board[x-2][y+1][0]!=color) {
                    validcoordinates.push([x-2,y+1]);
                }
            }
            if(y==7) {
                if(chess_board[x-2][y-1][0]!=color) {
                    validcoordinates.push([x-2,y-1]);
                }
            }
        }
        /*Bottom*/
        if(x<=5) {
            if(y>=1 && y<=6) {
                if(chess_board[x+2][y-1][0]!=color) {
                    validcoordinates.push([x+2,y-1]);
                }
                if(chess_board[x+2][y+1][0]!=color) {
                    validcoordinates.push([x+2,y+1]);
                }
            }
            if(y==0) {
                if(chess_board[x+2][y+1][0]!=color) {
                    validcoordinates.push([x+2,y+1]);
                }
            }
            if(y==7) {
                if(chess_board[x+2][y-1][0]!=color) {
                    validcoordinates.push([x+2,y-1]);
                }
            }
        }
        /*Left*/
        if(y>=2) {
            if(x>=1 && x<=6) {
                if(chess_board[x-1][y-2][0]!=color) {
                    validcoordinates.push([x-1,y-2]);
                }
                if(chess_board[x+1][y-2][0]!=color) {
                    validcoordinates.push([x+1,y-2]);
                }
            }
            if(x==0) {
                if(chess_board[x+1][y-2][0]!=color) {
                    validcoordinates.push([x+1,y-2]);
                }
            }
            if(x==7) {
                if(chess_board[x-1][y-2][0]!=color) {
                    validcoordinates.push([x-1,y-2]);
                }
            }
        }
        /*Right*/
        if(y<=5) {
            if(x>=1 && x<=6) {
                if(chess_board[x-1][y+2][0]!=color) {
                    validcoordinates.push([x-1,y+2]);
                }
                if(chess_board[x+1][y+2][0]!=color) {
                    validcoordinates.push([x+1,y+2]);
                }
            }
            if(x==0) {
                if(chess_board[x+1][y+2][0]!=color) {
                    validcoordinates.push([x+1,y+2]);
                }
            }
            if(x==7) {
                if(chess_board[x-1][y+2][0]!=color) {
                    validcoordinates.push([x-1,y+2]);
                }
            }
        }
        return validcoordinates;
    }
}

class bishop extends BasePiece {
    constructor(id) {
        super(id);
    }
    validMoves(x,y,color) {
        validcoordinates = [];
        let opp_color = (color=='w') ? 'b' : 'w';
        /*Bottom-Left*/
        for(i = x + 1, j = y - 1 ; i < 8 && j >= 0 ; i++ , j--) {
            if(chess_board[i][j][0]==color) {
                break;
            }
            else if(chess_board[i][j][0]==opp_color) {
                validcoordinates.push([i,j]);
                break;
            }
            validcoordinates.push([i,j]);
        }
        /*Top-Left*/
        for(i = x - 1, j = y - 1 ; i >= 0 && j >= 0 ; i-- , j--) {
            if(chess_board[i][j][0]==color) {
                break;
            }
            else if(chess_board[i][j][0]==opp_color) {
                validcoordinates.push([i,j]);
                break;
            }
            validcoordinates.push([i,j]);
        }
        /*Bottom-Right*/
        for(i = x + 1, j = y + 1 ; i < 8 && j < 8 ; i++ , j++) {
            if(chess_board[i][j][0]==color) {
                break;
            }
            else if(chess_board[i][j][0]==opp_color) {
                validcoordinates.push([i,j]);
                break;
            }
            validcoordinates.push([i,j]);
        }
        /*Top-Right*/
        for(i = x - 1, j = y + 1 ; i >= 0 && j < 8 ; i-- , j++) {
            if(chess_board[i][j][0]==color) {
                break;
            }
            else if(chess_board[i][j][0]==opp_color) {
                validcoordinates.push([i,j]);
                break;
            }
            validcoordinates.push([i,j]);
        }
        return validcoordinates;
    }
}

class king extends BasePiece {
    validMoves(x,y,color) {
        validcoordinates = [];
        if((x-1) >= 0 && (y-1) >= 0 && chess_board[x-1][y-1][0]!=color) 
            validcoordinates.push([x-1,y-1]);
        if((x-1) >= 0 && chess_board[x-1][y][0]!=color) 
            validcoordinates.push([x-1,y]);
        if((x-1) >= 0 && (y+1) < 8 && chess_board[x-1][y+1][0]!=color) 
            validcoordinates.push([x-1,y+1]);
        if((y-1) >= 0 && chess_board[x][y-1][0]!=color) 
            validcoordinates.push([x,y-1]);
        if((y+1) < 8 && chess_board[x][y+1][0]!=color) 
            validcoordinates.push([x,y+1]);
        if((x+1) < 8 && (y-1) >= 0 && chess_board[x+1][y-1][0]!=color) 
            validcoordinates.push([x+1,y-1]);
        if((x+1) < 8 && chess_board[x+1][y][0]!=color) 
            validcoordinates.push([x+1,y]);
        if((x+1) < 8 && (y+1) < 8 && chess_board[x+1][y+1][0]!=color) 
            validcoordinates.push([x+1,y+1]);    
        
        return validcoordinates;
    }
}

class queen extends BasePiece {
    constructor(id) {
        super(id);
    }
    validMoves(x,y,color) {
        validcoordinates = [];

        let temp_rook = new rook('temprook');
        let temp_bishop = new bishop('tempbishop');

        /* Queen moves are same as rook + bishop combined */
        let validcoordinates1 = temp_rook.validMoves(x,y,color);                           
        let validcoordinates2 = temp_bishop.validMoves(x,y,color);                          

        validcoordinates1.forEach(function(element) {
            validcoordinates.push(element);
        });
        validcoordinates2.forEach(function(element) {
            validcoordinates.push(element);
        });
        return validcoordinates;
    }
}