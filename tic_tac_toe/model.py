import source

gaming_field: list = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]
]
history_moves_crosses: list = []
history_moves_zeros: list = []


def crate_new_game() -> None:
    history_moves_zeros.clear()
    history_moves_crosses.clear()
    for i in range(len(gaming_field)):
        for j in range(len(gaming_field[i])):
            gaming_field[i][j] = "-"


def print_field():
    for item in gaming_field:
        print(item)


def _move_player(row: int, col: int, moves_chr):
    if gaming_field[row][col] != "-":
        raise Exception("Это место уже занято")
    gaming_field[row][col] = moves_chr


def _user_num() -> tuple[int, int]:
    return int(input("Введите строку\n")), int(input("Введите столбец\n"))


def move_user(player_first_moves: bool):
    moves_chr = source.PLAYER_FIRST if player_first_moves else source.PLAYER_SECOND
    try:
        x, y = _user_num()
        _move_player(x, y, moves_chr)
    except ValueError:
        print("Вводи только цифры")
        return move_user(player_first_moves)
    except Exception as e:
        print(e)
        return move_user(player_first_moves)
    _write_history((x, y), player_first_moves)
    return not player_first_moves


def _write_history(history: tuple[int, int], first_move: bool):
    if first_move:
        history_moves_crosses.append(history)
        return
    history_moves_zeros.append(history)


def check_end_game() -> bool:
    if len(history_moves_zeros) + len(history_moves_crosses) == 9:
        print("Победила дружба")
        return True
    if _check_win_player(history_moves_crosses):
        print("Победа крестов")
        return True
    if _check_win_player(history_moves_zeros):
        print("Победа нулей")
        return True
    return False


def _check_win_player(history_player: list) -> bool:
    for item in source.VICTORY_OPTIONS:
        win = 0
        for move in history_player:
            if move == item[0] or move == item[1] or move == item[2]:
                win += 1
        if win == 3:
            return True
    return False


# if __name__ == "__main__":
#     assert _check_win_player([(0, 0), (0, 1), (2, 2)])

