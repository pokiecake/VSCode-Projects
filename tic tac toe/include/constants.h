#ifndef CONSTANTS
#define CONSTANTS

//int SIZE = 3;
int ROWS = 3;
int COLS = 3;
int NUM_CELLS = ROWS * COLS;
int NUM_WIN = 3;
char p1Char = 'X';
char p2Char = 'O';
const int P1_TURN = 0;
const int P2_TURN = 1;

int count_digits(int num) {
    int digits = 0;
    while (num != 0) {
        ++digits;
        num /= 10;
    }
    return digits;
}

int CELL_DIGITS = count_digits(NUM_CELLS);

#endif