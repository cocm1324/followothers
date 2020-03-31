import numpy as np

def AND(x):
    w = np.array([0.5, 0.5])
    b = -0.7
    tmp = np.sum(x * w) + b
    print(tmp)
    if tmp <= 0:
        return 0
    elif tmp > 0:
        return 1

def NAND(x):
    w = np.array([-0.5, -0.5])
    b = -0.7
    tmp = np.sum(x * w) + b
    print(tmp)
    if tmp <= 0:
        return 0
    elif tmp > 0:
        return 1




x = np.array([0, 1])

print(AND(x))

