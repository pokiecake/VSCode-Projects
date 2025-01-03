#ifndef DISPLAY_H
#define DISPLAY_H

#include "constants.h"

void print_start_screen();
void print_cell(char * board, int pos);
void print_row(char * board, int row);
void print_horiz_dividers();
void print_board(char * board);
void prompt_input_failed();
void print_dividers();

#endif