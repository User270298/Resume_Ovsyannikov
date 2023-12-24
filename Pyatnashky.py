import random


FIELD_VINNER = [[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, '-']]


def generation_field():
    field = [i for i in range(16)]
    for i in range(len(field)):
        if field[i] == 0:
            field[i] = '-'
        random.shuffle(field)
        return field


field_generation = generation_field()


def new_field(field):
    for i in range(0, len(field), 4):
        yield field[i: i + 4]


field = list(new_field(field_generation))
print(field)


def new(field):
    for i in range(4):
        print(field[i])


print('Начало игры:')


def check(row, col, lst):
    while True:
        try:
            if (lst[row - 1][col] == '-' or lst[row][col - 1] == '-' \
                    or lst[row + 1][col] == '-' or lst[row][col + 1] == '-'):
                return True
            break
        except Exception:
            print('Введите корректные данные')
            break


def player_motion(lst: list):
    while True:
        try:
            row = int(input("Введите номер строки:\n"))
            col = int(input("Введите номер столбца:\n"))
            break
        except Exception:
            print('Ввести координаты')
    if check(row,col,lst):
        for i in range(len(lst)):
            for j in range(len(lst)):
                if lst[i][j] == '-':
                    lst[row][col], lst[i][j] = lst[i][j], lst[row][col]
    else:
        print('Введите корректные данные')
    return lst


def check_win():
    if field == FIELD_VINNER:
        print('Победа')

def win():
    new(field)
    while field != FIELD_VINNER:
        player_motion(field)
        new(field)
        if check_win():
            break

print(win())
