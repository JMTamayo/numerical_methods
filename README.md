# NUMERICAL METHODS

Numerical methods to solve mathematical problems. Before using it, you need to install the following libraries: mathjs.

## regr.js
Numerical Regression Methods
#### 1. `regr.poly(x, y, deg)`: 
Polynomial regression to approximate ***x*** and ***y*** data by a polynomial of degree ***deg***.


About function parameters: 
* ***x*** and ***y*** must be *arrays* with the same number of elements where each element must be *numeric*.
* ***deg*** must be *integer* greater than 1.


The result is an *object* with the following keys:
* ***fun(x)*** is the *polynomial regression function* **y = k<sub>0</sub> + k<sub>1</sub>x  + k<sub>2</sub>x<sup>2</sup> + k<sub>3</sub>x<sup>3</sup> + ... + k<sub>deg</sub>x<sup>deg</sup>**. Parameter ***x*** must be *numeric* and the ***result*** of the function is also a *number*·
* ***coef*** is an *array* with the coefficients of the polynomial regression: **coef = [k<sub>0</sub>, k<sub>1</sub>, k<sub>2</sub>, k<sub>3</sub>, ..., k<sub>deg</sub>]**.
* ***R2*** is the *R<sup>2</sup>* coefficient of the regression.
* ***flag*** is a *numeric* value that represents the execution of the polynomial regression: **flag = 1** means correct execution and **flag = 0** means incorrect execution.
* ***msg*** contains a *message* about the execution of the polynomial regression.


JMTamayo (https://github.com/JMTamayo)