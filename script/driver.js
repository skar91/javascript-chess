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
    player_turn = (player_turn == 'w') ? 'b' : 'w';
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

/*Prevents other moves if king is in check.*/
function isCheckAtBeginning(source_x = 0, source_y = 0 , target_x = 0, target_y = 0) {
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

function isCheckAtEnd() {
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

                    temp_check = isCheckAtEnd();

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

/* Fired when you drag over something*/
function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
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
    let exists = false;
    turn = chess_board[source_x][source_y][0];
    for(let i=0;i<validcoordinates.length;i++) {
        if(validcoordinates[i][0]==target_x && validcoordinates[i][1]==target_y) {
            exists = true;
            break;
        }
    }
    check = isCheckAtBeginning(source_x,source_y,target_x,target_y);
   
    /*If it's correct player's turn and the movement is valid*/
    if (player_turn==turn && exists && check==false) {
        var data = event.dataTransfer.getData("image/svg");
        event.target.innerHTML = data;

        /*Imgs copied dont have listeners attached automatically,
        this adds listeners to all piece imgs. Poor implementation tho
        since it loops through all imgs instead of 'only' the copied image*/
        let imgs = document.getElementsByTagName("img");
        for(let i=0;i<imgs.length;i++) {
            imgs[i].addEventListener('dragstart', dragStart);
        }
 
        updatePlayerTurn();
        updateDOM(target_x , target_y , source_x , source_y)
        updateChessBoard(target_x , target_y , source_x , source_y);
        updateturncss(player_turn);
        check = isCheckAtEnd();
        if(check == true) {
            checkmate = isCheckmate();
        }
        updateCheckDOM(checkmate);
    }
}

function initDOMtable() {
    var table = document.getElementById("myTable");
    for (i = 0; i < 8; i++) {
        var row = table.insertRow(i);
        for (j = 0; j < 8; j++) {
            var cell = row.insertCell(j);
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('drop', dragDrop);
            if (chess_board[i][j] != '00') {
                cell.innerHTML = IMAGE_SOURCE_TAG[chess_board[i][j]];
            }
            if (i % 2 == 0) {
                if (j % 2 == 0) {
                    cell.classList.add("blackcell");
                }
                else {
                    cell.classList.add("whitecell");
                }
            }
            else {
                if (j % 2 != 0) {
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
    for(i=0;i<imgs.length;i++) {
        imgs[i].addEventListener('dragstart', dragStart);
    }
}

function game() {
    initPieces();
    initBoard();
    initDOMtable();
}