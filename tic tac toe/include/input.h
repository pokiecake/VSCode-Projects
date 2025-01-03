#ifndef INPUT_H
#define INPUT_H

#include "constants.h"

void request_initialization(int& rows, int& cols, int& num_win, char& p1Char, char& p2Char);
char * initialize_board(int n);
bool add_mark(char * board, char mark, int pos);
void request_mark(char * board, char mark);
void game_loop();

#endif