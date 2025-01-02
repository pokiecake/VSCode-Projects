#ifndef CONSTANTS
#define CONSTANTS

const int SIZE = 3;
const int NUM_CELLS = SIZE * SIZE;
const int NUM_WIN = 3;
const char p1Char = 'X';
const char p2Char = 'O';

int count_digits(int num) {
    int digits = 0;
    while (num != 0) {
        ++digits;
        num /= 10;
    }
    return digits;
}

const int CELL_DIGITS = count_digits(NUM_CELLS);

#endif