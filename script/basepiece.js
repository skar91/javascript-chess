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
    wp: '<img src="./images/wp.svg"></img>',
    bp: '<img src="./images/bp.svg"></img>',
    wb: '<img src="./images/wb.svg"></img>',
    bb: '<img src="./images/bb.svg"></img>',
    wr: '<img src="./images/wr.svg"></img>',
    br: '<img src="./images/br.svg"></img>',
    wk: '<img src="./images/wk.svg"></img>',
    bk: '<img src="./images/bk.svg"></img>',
    wx: '<img src="./images/wx.svg"></img>',
    bx: '<img src="./images/bx.svg"></img>',
    wq: '<img src="./images/wq.svg"></img>',
    bq: '<img src="./images/bq.svg"></img>',  
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
var validcoordinates;
var chess_board;
var player_turn = 'w';
///////////////////////////////////////////////////////////////////////////////////////////////////

class pawn extends BasePiece {
    constructor(id) {
        super(id);
    }

    validMoves(current_position,color) {
        validcoordinates = [];
        let x = current_position[0];
        let y = current_position[1];
        if(color=='w') {
            if(x==6 && chess_board[4][y][0]!='w') {
                 validcoordinates.push([4][y-2]);
            }
            if(chess_board[x-1][y-1][0]=='b') {
                validcoordinates.push([x-1,y-1]);
            }
            if(chess_board[x-1][y+1][0]=='b') {
                validcoordinates.push([x+1][y-1]);
            }
            if(chess_board[x-1][y]!='w' && chess_board[x-1][y]!='b') {
                validcoordinates.push([x,y-1]);
            }
        }
        else {
           if(x==1 && chess_board[3][y][0]!='b') {
                validcoordinates.push([3][y]);
           }
           if(chess_board[x+1][y-1][0]=='w') {
               validcoordinates.push([x+1,y-1]);
           }
           if(chess_board[x+1][y+1][0]=='w') {
               validcoordinates.push([x+1][y+1]);
           }
           if(chess_board[x+1][y]!='w' && chess_board[x+1][y]!='b') {
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
    validMoves(current_position,color) {
        validcoordinates = [];
        let x = current_position[0];
        let y = current_position[1];
        let i = 0;
        opp_color = color=='w' ? 'b' : 'w';
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
    validMoves(current_position,color) {
        validcoordinates = [];
        let x = current_position[0];
        let y = current_position[1];
        opp_color = color=='w' ? 'b' : 'w';

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
        if(y>=5) {
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
    validMoves(current_position,color) {
        validcoordinates = [];
        let x = current_position[0];
        let y = current_position[1];
        opp_color = color=='w' ? 'b' : 'w';
        /*Bottom-Left*/
        for(i = x + 1, j = y - 1 ; i < 8 && j >= 0 ; i++ , j--) {
            if(chess_board[i][y][0]==color) {
                break;
            }
            else if(chess_board[i][y][0]==opp_color) {
                validcoordinates.push([i,y]);
                break;
            }
            validcoordinates.push([i,y]);
        }
        /*Top-Left*/
        for(i = x - 1, j = y - 1 ; i >= 0 && j >= 0 ; i-- , j--) {
            if(chess_board[i][y][0]==color) {
                break;
            }
            else if(chess_board[i][y][0]==opp_color) {
                validcoordinates.push([i,y]);
                break;
            }
            validcoordinates.push([i,y]);
        }
        /*Bottom-Right*/
        for(i = x + 1, j = y + 1 ; i < 8 && j < 8 ; i++ , j++) {
            if(chess_board[x][i][0]==color) {
                break;
            }
            else if(chess_board[x][i][0]==opp_color) {
                validcoordinates.push([x,i]);
                break;
            }
            validcoordinates.push([x,i]);
        }
        /*Top-Right*/
        for(i = x - 1, j = y + 1 ; i >= 0 && j < 8 ; i-- , j++) {
            if(chess_board[x][i][0]==color) {
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

class king extends BasePiece {
    validMoves(current_position,color) {
        validcoordinates = [];
        let x = current_position[0];
        let y = current_position[1];
        opp_color = color=='w' ? 'b' : 'w';
        
        if((x-1) >= 0 && (y-1) >= 0) validcoordinates.push([x-1,y-1]);
        if((x-1) >= 0) validcoordinates.push([x-1,y]);
        if((x-1) >= 0 && (y+1) < 8) validcoordinates.push([x-1,y+1]);
        if((y-1) >= 0) validcoordinates.push([x,y-1]);
        if((y+1) < 8) validcoordinates.push([x,y+1]);
        if((x+1) < 8 && (y-1) >= 0) validcoordinates.push([x+1,y-1]);
        if((x+1) < 8) validcoordinates.push([x+1,y]);
        if((x+1) < 8 && (y+1) < 8) validcoordinates.push([x+1,y+1]);    
        
        return validcoordinates;
    }
}

class queen extends BasePiece {
    constructor(id) {
        super(id);
    }
    validMoves(current_position,color) {
        validcoordinates = [];
        let x = current_position[0];
        let y = current_position[1];
        opp_color = color=='w' ? 'b' : 'w';

        let temp_rook = new rook('temprook');
        let temp_bishop = new bishop('tempbishop');

        let validcoordinates1 = temp_rook.validMoves([x,y],color);
        let validcoordinates2 = temp_bishop.validMoves([x,y],color);

        validcoordinates1.forEach(function(element) {
            validcoordinates.push(element);
        });
        validcoordinates2.forEach(function(element) {
            validcoordinates.push(element);
        });
        return validcoordinates;

    }
}

function initPieces() {
    
    var p = new pawn('p');
    var r = new rook('r');
    var k = new knight('k');
    var b = new bishop('b');
    var x = new king('x');
    var q = new queen('q'); 

    piece['p'] = p;
    piece['r'] = r;
    piece['k'] = k;
    piece['b'] = b;
    piece['x'] = x;
    piece['q'] = q;
}

/*
Chess board is a 2D array of 8x8.
The value of a square represents if its empty or occupied.
For eg: position [3,4] = 00 =>  empty
        position [5,6] = 'bk' => black knight
*/
function initBoard() {
    chess_board = new Array(8);
    for(i=0; i<8; i++) {
        chess_board[i]=new Array(8);
    }

    for(i=0; i<8; i++) {
        for(j=0; j<8; j++) {
            chess_board[i][j]='00';
        }
    }
    for(i=0;i<8;i++) {
        chess_board[1][i] = 'bp';
        chess_board[6][i] = 'wp';
    }
    for(i=0;i<8;i+=7) {
        chess_board[0][i] = 'br';
        chess_board[7][i] = 'wr';
    }
    for(i=1;i<=6;i+=5) {
        chess_board[0][i] = 'bk';
        chess_board[7][i] = 'wk';
    }
    for(i=2;i<=5;i+=3) {
        chess_board[0][i] = 'bb';
        chess_board[7][i] = 'wb';
    }
    chess_board[0][3] = 'bx';
    chess_board[0][4] = 'bq';
    chess_board[7][3] = 'wx';
    chess_board[7][4] = 'wq';

}


function dragStart() {
    var x = this.parentNode.parentNode.rowIndex;
    var y = this.parentNode.cellIndex;
    
    console.log(x);
    console.log(y);
}

function dragEnd() {
    console.log("drag ended");
}

function display() {
    initPieces();
    initBoard();

    var table = document.getElementById("myTable");

    for(i=0; i<8; i++) {
        var row = table.insertRow(i);
        for(j=0; j<8; j++) {
            var cell = row.insertCell(j);
            if(chess_board[i][j]!='00') {
                cell.innerHTML = IMAGE_SOURCE_TAG[chess_board[i][j]];
            }
            //cell.setAttribute("draggable",true);
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
    imgs = document.getElementsByTagName('img');
    //console.log(imgs);
    for(i=0;i<imgs.length;i++)
    {
        imgs[i].addEventListener('dragstart', dragStart);
        imgs[i].addEventListener('dragend', dragEnd);
    }
}

