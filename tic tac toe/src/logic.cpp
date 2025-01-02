#include "../include/logic.h"

bool check_row(char * board, int row, int col, char c) {
    bool win = true;
    int bound = NUM_WIN + col;
    for (int i = col; i < bound; ++i) {
        win = win && *(board + row * SIZE + i) == c; //check all columns in the row
    }
    return win;
}

bool check_col(char * board, int row, int col, char c) {
    bool win = true;
    int bound = NUM_WIN + row;
    for (int i = row; i < bound; ++i) {
        win = win && *(board + i * SIZE + col) == c; //check all rows in the column
    }
    return win;
}

bool check_diag(char * board, int row, int col, char c, bool up) {
    bool win = true;
    if (up) {
        for (int i = 0; i < NUM_WIN; ++i) {
            win = win && *(board + (row - i) * SIZE + (col + i)) == c;
        }
        return win;
    } else {
        for (int i = 0; i < NUM_WIN; ++i) {
            win = win && *(board + (row + i) * SIZE + (col + i)) == c;
        }
        return win;
    }
}

//0 == game is continuing
//1 == x wins
//2 == o wins
//3 == draw
int check_state(char * board) {
    bool draw = true;
    bool x_wins = false;
    bool o_wins = false;

    for (int i = 0; i < SIZE; ++i) {
        for (int j = 0; j + 2 < SIZE; ++j) {
            if (check_row(board, i, j, p1Char)) {
                std::cout << "Row met: " << i << " " << j << "\n";
                return 1;
            }
            if (check_col(board, j, i, p1Char)) {
                std::cout << "Col met: " << i << " " << j << "\n";
                return 1;
            }
            if (check_row(board, i, j, p2Char)) {
                std::cout << "Row met: " << i << " " << j << "\n";
                return 2;
            }
            if (check_col(board, j, i, p2Char)) {
                std::cout << "Col met: " << i << " " << j << "\n";
                return 2;
            }
        }
    }

    for (int i = SIZE - 1; i - 2 >= 0; --i) {
        for (int j = 0; j + 2 < SIZE; ++j) {
            if (check_diag(board, i, j, p1Char, true)) {
                std::cout << "up diag met: " << i << " " << j << "\n";
                return 1;
            }
            if (check_diag(board, i, j, p2Char, true)) {
                std::cout << "up diag met: " << i << " " << j << "\n";
                return 2;
            }
        }
    }

    for (int i = 0; i < SIZE; ++i) {
        for (int j = 0; j + 2 < SIZE; ++j) {
            if (check_diag(board, i, j, p1Char, false)) {
                std::cout << "down diag met: " << i << " " << j << "\n";
                return 1;
            }
            if (check_diag(board, i, j, p2Char, false)) {
                std::cout << "down diag met: " << i << " " << j << "\n";
                return 2;
            }
        }
    }

    for (int i = 0; i < 9; ++i) {
        if (*(board + i) == '.') {
            draw = false;
        }
    }

    if (draw) {
        return 3;
    } else {
        return 0;
    }
    
}