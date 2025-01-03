#include "src/display.cpp"
#include "src/input.cpp"
#include "src/logic.cpp"
#include <string>

int main() {
    /*
        TODO:
        -Score saving?
    */
    
    std::string end_choice = "0"; //0 is for the start of the program

    do {
    //start screen
    std::string menu_input;
    if (end_choice == "0" || end_choice == "2") {
        do {
            print_start_screen();
            getline(std::cin, menu_input);

            if (menu_input == "options") {
                request_initialization(ROWS, COLS, NUM_WIN, p1Char, p2Char);
                std::cin.ignore(10000, '\n');
            }
            else if (menu_input != "start") {
                std::cout << "Sorry, I did not understand. Try again.\n";
            }
        } while (menu_input != "start");
    } else {
        print_dividers();
    }
    
    //game loop
    game_loop();

    //end screen
    std::cout << "Game over!\n";
    std::cout << "Would you like to restart?\n";
    std::cout << "1 - Play again.\n";
    std::cout << "2 - Back to main menu.\n";
    std::cout << "3 - Quit program.\n";

    std::cin.ignore(10000, '\n');
    getline(std::cin, end_choice, '\n');
    std::cout << end_choice;
    
    } while (end_choice != "3");

    return 0;
}