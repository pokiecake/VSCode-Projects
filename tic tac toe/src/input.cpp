#include "../include/input.h"
#include <iostream>

char * initialize_board(int n) {
    char * board = new char[NUM_CELLS];
    for (int i = 0; i < NUM_CELLS; ++i) {
        *(board + i) = '.';
    }
    return board;
}

bool add_mark(char * board, char mark, int pos) {
    if (*(board + pos) != '.') {
        return false;
    }
    *(board + pos) = mark;
    return true;
}

void request_mark(char * board, char mark) {
    int pos;
    std::cout << mark << "'s turn";
    std::cin >> pos;
    add_mark(board, mark, pos);
}