#include "../include/display.h"
#include <iostream>
#include <iomanip>

void print_start_screen() {
    std::cout << std::setw(20) << std::right << "Tic Tac Toe!\n";
    std::cout << std::setw(26) << std::right << "Enter 'start' to begin.\n";
    std :: cout << "\n";
}

void print_cell(char * board, int pos) {
    char cell = *(board + pos);
    
    std::cout << std::setw(CELL_DIGITS) << std::left << std::setfill(' ');
    if (cell == '.') {
        std::cout << pos + 1; //display 1-9, or 1-n, n is max cells
    } else {
        std::cout << cell;
    }
}

void print_row(char * board, int row) {
    for (int i = 0; i < SIZE; ++i) {
        print_cell(board, row * SIZE + i);
        if (i == SIZE - 1) {
            std::cout << "\n";
        } else {
            std::cout << " | ";
        }
    }
}

void print_horiz_dividers() {
    std::cout << std::setw((CELL_DIGITS + 3) * SIZE) << std::right << std::setfill('-') << "\n";
}

void print_board(char * board) {
    for (int i = 0; i < SIZE; ++i) {
        print_row(board, i);
        if (i < SIZE - 1) {
            print_horiz_dividers();
        }
    }
    std :: cout << "\n";
}

void prompt_input(char turn) {
    std::cout << turn << "'s turn. Choose your space: ";
}

void prompt_input_failed() {
    std::cout << "Invalid space. Choose again: ";
}

void print_dividers() {
    std::cout << std::right;
    std :: cout << std::setw(12) << std::setfill(' ') << "\n";
    std::cout << std::setw(12) << std::setfill('*') << "\n";
    std :: cout << std::setw(12) << std::setfill(' ') << "\n";
}