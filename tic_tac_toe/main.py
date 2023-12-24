
from model import *


def game():
    first_player_moves = True
    # crate_new_game()
    print_field()
    while True:
        first_player_moves = move_user(first_player_moves)
        print_field()
        if check_end_game():
            break


if __name__ == "__main__":
    game()
