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
var moved = false;
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
/*Update player's turn display text and styles*/
function updateturncss(player_turn) {
    let turn_text = document.getElementById('turn');
    if(player_turn=='b') {
        turn_text.className = 'bt';
        turn_text.innerHTML = "BLACK'S TURN";
    }
    else {
        turn_text.className = 'wt';
        turn_text.innerHTML = "WHITE'S TURN";
    }  
}

/*Player turn is controlled by a global variable*/
function updatePlayerTurn() {
    
    if(player_turn=='w') {
        player_turn='b';
    }
    else {
        player_turn='w';
    }
}

/*After every drop event is concluded, the old cell needs to be updated*/
function updateDOM(target_x , target_y , source_x , source_y) {
    var table = document.getElementById('myTable');
    table.rows[target_x].cells[target_y].innerHTML='';
    table.rows[target_x].cells[target_y].innerHTML=table.rows[source_x].cells[source_y].innerHTML;
    table.rows[source_x].cells[source_y].innerHTML='';
}

function updateCheckDOM(checkmate) {
    let checkdiv = document.getElementById('check');
    if(check==true) {   
        checkdiv.style.display = 'block';
    }
    else {
        checkdiv.style.display = 'none';
    }
    if(checkmate==true) {
        checkdiv.innerHTML = "CHECKMATE";
        let turn_box = document.getElementById('turn');
        let text = player_turn=='b' ? "WHITE WINS" : "BLACK WINS"; 
        turn_box.innerHTML = text;
        turn_box.style.backgroundColor = "rgb(136, 31, 31)";
        turn_box.style.border = "2px rgb(82, 19, 19) solid";
        turn_box.style.color = "white";
    }
}

/*Update logical chess board that maps all pieces*/
function updateChessBoard(target_x , target_y , source_x , source_y) {
    chess_board[target_x][target_y] = chess_board[source_x][source_y];
    chess_board[source_x][source_y] = '00';

}

function check_if_check_begin(source_x = 0, source_y = 0 , target_x = 0, target_y = 0) {
    let attacking_color = (player_turn=='w') ? 'b' : 'w';
    let temp_att_squares = [];
    let defendingking = player_turn+'x';
    let defendingking_x = 0;
    let defendingking_y = 0;
    let attacking_squares = [];
    let targetpiece = chess_board[target_x][target_y];
    let sourcepiece = chess_board[source_x][source_y];

    chess_board[target_x][target_y] = sourcepiece;
    chess_board[source_x][source_y] = '00';
    
    for(let i=0;i<8;i++) {
        for(let j=0;j<8;j++) {
            if(chess_board[i][j][0]==attacking_color) {
                temp_att_squares = piece[chess_board[i][j][1]].validMoves(i,j,attacking_color);
                temp_att_squares.forEach(function (element) {
                    attacking_squares.push(element);
                });
            }
            if(chess_board[i][j]==defendingking) {
                defendingking_x = i;
                defendingking_y = j;
            }
            temp_att_squares = [];
        }
    }
    for(let i=0; i<attacking_squares.length;i++) {
        if(attacking_squares[i][0]==defendingking_x && attacking_squares[i][1]==defendingking_y) {
            chess_board[source_x][source_y] = sourcepiece;
            chess_board[target_x][target_y] = targetpiece;
            return true;
        }   
    }
    chess_board[source_x][source_y] = sourcepiece;
    chess_board[target_x][target_y] = targetpiece;
    return false;
}
// nice function name :)
function check_if_check() {
    let attacking_color = (player_turn=='w') ? 'b' : 'w';
    let temp_att_squares = [];
    let defendingking = player_turn+'x';
    let defendingking_x = 0;
    let defendingking_y = 0;
    let attacking_squares = [];
    for(let i=0;i<8;i++) {
        for(let j=0;j<8;j++) {
            if(chess_board[i][j][0]==attacking_color) {
                temp_att_squares = piece[chess_board[i][j][1]].validMoves(i,j,attacking_color);
                temp_att_squares.forEach(function (element) {
                    attacking_squares.push(element);
                });
            }
            if(chess_board[i][j]==defendingking) {
                defendingking_x = i;
                defendingking_y = j;
            }
            temp_att_squares = [];
        }
    }
    for(let i=0; i<attacking_squares.length;i++) {
        if(attacking_squares[i][0]==defendingking_x && attacking_squares[i][1]==defendingking_y) {
            return true;
        }   
    }
    return false;
}

function isCheckmate() {
    let temp_def_squares = [];
    let defending_color = player_turn;
    let t_x, t_y, p, ip;
    let temp_check;
    checkmate = true;

    for(let i=0;i<8;i++) {
        for(let j=0;j<8;j++) {
            if(chess_board[i][j][0]==defending_color) {
                temp_def_squares = piece[chess_board[i][j][1]].validMoves(i,j,defending_color);
                temp_def_squares.forEach(function (element) {
                    t_x = element[0];
                    t_y = element[1];
                    p = chess_board[i][j];
                    ip = chess_board[t_x][t_y];

                    chess_board[t_x][t_y] = p;
                    chess_board[i][j] = '00';

                    temp_check = check_if_check();

                    chess_board[t_x][t_y] = ip;
                    chess_board[i][j] = p;

                    temp_def_squares = [];
                    if(temp_check==false) {
                        checkmate = false;
                        return false;
                    }
                });
            }
            if(checkmate == false) {
                return false;
            }
        }
    }
    return true;
}
/* Fired when a drag starts*/
function dragStart(event) {
    source_x = this.parentNode.parentNode.rowIndex;
    source_y = this.parentNode.cellIndex;
    event.dataTransfer.setData("image/svg", event.target.outerHTML);
    source = event.target.outerHTML;
    piece[chess_board[source_x][source_y][1]].validMoves(source_x,source_y,chess_board[source_x][source_y][0]);
}

/* Fired when a drag ends*/
function dragEnd() {
}

/* Fired when you drag over something*/
function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
}

function dragLeave() {
}

function dragDrop(event) {
    let killmove = false;
    if(event.target.nodeName == 'IMG') {
        target_x = event.target.parentNode.parentNode.rowIndex;
        target_y = event.target.parentNode.cellIndex;
        killmove = true;
    }
    else {
        target_x = event.target.parentNode.rowIndex;
        target_y = event.target.cellIndex;
    }
    let i=0;
    let exists = false;
    turn = chess_board[source_x][source_y][0];
    console.log("Target x = " , target_x);
    console.log("Target y = " , target_y);
    for(i=0;i<validcoordinates.length;i++) {
        if(validcoordinates[i][0]==target_x && validcoordinates[i][1]==target_y) {
            exists = true;
            break;
        }
    }
    console.log("Player turn = " , turn);
    check = check_if_check_begin(source_x,source_y,target_x,target_y);
   
    /*If it's correct player's turn and the movement is valid*/
    if (player_turn==turn && exists && check==false) {
        var data = event.dataTransfer.getData("image/svg");
        event.target.innerHTML = data;

        /*Imgs copied dont have listeners attached automatically,
        this adds listeners to all piece imgs. Poor implementation tho
        since it loops through all imgs instead of 'only' the copied image*/
        let imgs = document.getElementsByTagName("img");
        for(i=0;i<imgs.length;i++)
        {
            imgs[i].addEventListener('dragstart', dragStart);
            imgs[i].addEventListener('dragend', dragEnd);
        }
        
        updatePlayerTurn();
        updateDOM(target_x , target_y , source_x , source_y)
        updateChessBoard(target_x , target_y , source_x , source_y);

        /*Update text box and its styles based on player turn*/
        updateturncss(player_turn);
        check = check_if_check();
        if(check == true) {
            checkmate = isCheckmate();
        }
        updateCheckDOM(checkmate);
    }
}

function display() {
    initPieces();
    initBoard();

    var table = document.getElementById("myTable");

    for(i=0; i<8; i++) {
        var row = table.insertRow(i);
        for(j=0; j<8; j++) {
            var cell = row.insertCell(j);
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('dragleave', dragLeave);
            cell.addEventListener('drop', dragDrop);
            if(chess_board[i][j]!='00') {
                cell.innerHTML = IMAGE_SOURCE_TAG[chess_board[i][j]];
            }
            if(i%2==0) {
                if(j%2==0) {
                    cell.classList.add("blackcell");
                }
                else {
                    cell.classList.add("whitecell");
                }
            }
            else {
                if(j%2!=0) {
                    cell.classList.add("blackcell");
                }
                else {
                    cell.classList.add("whitecell");
                }
            }
        }
    }
    /*Add event listeners on every piece image*/
    imgs = document.getElementsByTagName('img');
    for(i=0;i<imgs.length;i++)
    {
        imgs[i].addEventListener('dragstart', dragStart);
        imgs[i].addEventListener('dragend', dragEnd);
    }
}

