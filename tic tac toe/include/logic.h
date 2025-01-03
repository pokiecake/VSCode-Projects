#ifndef LOGIC_H
#define LOGIC_H

#include "constants.h"

bool check_row(char * board, int row, int col, char c);
bool check_col(char * board, int row, int col, char c);
bool check_diag(char * board, int row, int col, char c, bool up);
int check_state(char * board);

#endif