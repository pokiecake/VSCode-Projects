#include "../include/input.h"
#include "../include/logic.h"
#include <iostream>


void request_initialization(int& rows, int& cols, int& num_win, char& p1Char, char& p2Char) {
    std::cout << "Enter # of rows: ";
    std::cin >> rows;

    std::cout << "Enter # of cols: ";
    std::cin >> cols;

    std::cout << "Enter # needed to win: ";
    std::cin >> num_win;

    std::cout << "Enter player 1's character mark: ";
    std::cin >> p1Char;

    std::cout << "Enter player 2's character mark: ";
    std::cin >> p2Char;

    NUM_CELLS = rows * cols;
    CELL_DIGITS = count_digits(NUM_CELLS);
}

char * initialize_board(int n) {
    char * board = new char[n];
    for (int i = 0; i < n; ++i) {
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

void game_loop() {
    char * board;
    bool running = true;
    int turn = P1_TURN; //0 - x, 1 - o
    int choice = 0;
    int state;
    char mark;
    
    board = initialize_board(NUM_CELLS);
    mark = p1Char;
    //game loop
    while (running) {
        print_dividers();
        print_board(board);
        prompt_input(mark);
        std::cin >> choice;
        while (choice > NUM_CELLS || choice < 1 || !add_mark(board, mark, choice - 1)) {
            prompt_input_failed();
            std::cin >> choice;
        }
        state = check_state(board);
        print_dividers();
        if (state == 0) {
            turn = (turn == P1_TURN ? P2_TURN : P1_TURN);
            mark = (turn == P1_TURN ? p1Char : p2Char);
        } else {
            running = false;
        }
    }
    print_board(board);
    switch(state) {
        case 1:
        //x wins
            std::cout << p1Char << " wins!\n";
        break;
        case 2:
        //o wins
            std::cout << p2Char << " wins!\n";
        break;
        case 3:
        //draw
            std::cout << "Draw!\n";
        break;
        default:
            std::cerr << "Game state " << state << " not recognized.\n";
    }
    delete[] board;
}