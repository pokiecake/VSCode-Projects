#include "src/display.cpp"
#include "src/input.cpp"
#include "src/logic.cpp"

int main() {
    const int P1_TURN = 0;
    const int P2_TURN = 1;

    /*
    let user modify values:
    int size;
    int num_to_win;
    char p1Char;
    char p2Char;
    */

    char * board = initialize_board(3);
    bool running = true;
    int turn = P1_TURN; //0 - x, 1 - o
    int choice = 0;
    int state;
    char mark = p1Char;
    //start screen
    print_start_screen();
    print_dividers();

    //game loop
    while (running) {
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
    std::cout << "Game over!\n";
    delete[] board;
    return 0;
}