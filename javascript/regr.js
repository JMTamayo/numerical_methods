const { matrix, transpose, pow, multiply, inv, mean, log, exp } = require("mathjs");

let regr = {};

//Function to check data:
    regr.checkVal = {
        poly: function(x, y, deg) {
            let flag = 1;
    
            if(typeof deg === "number" && deg%1 === 0 && deg >= 1) {
                if(typeof x === "object" && typeof y === "object") {
                    if(x.length === y.length) {
                        x.forEach(element => {
                            if(typeof element !== "number") {
                                flag = 0;
                            };

                        });
                        y.forEach(element => {
                            if(typeof element !== "number") {
                                flag = 0;
                            };

                        });
                    }
                    else {
                        flag = 0;

                    };
                }
                else {
                    flag = 0;

                };
            }
            else {
                flag = 0;

            };
            return flag;
        },

        exp: function(x, y) {
            let flag = regr.checkVal.poly(x, y, 1);

            if(flag === 1) {
                y.forEach(element => {
                    if(element <= 0) {
                        flag = 0;
                    }
                });
            }

            return flag;
        }

    };

//Function to calculate error:
    regr.error = {
        R2: function(x, y, fun) {
            let yavg = mean(y);
            let num = 0;
            let den = 0;

            for(let i = 0; i < x.length; i++) {
                num = num + pow(fun(x[i]) - yavg, 2);
                den = den + pow(y[i] - yavg, 2);
            }

            return num/den;
        }
    }    
    
//Polynomial regression:
    regr.poly = function(x, y, deg) {

        let result = {
            coef:       [],
            fun:        undefined, 
            R2:         undefined,
            flag:       undefined,
            msg:        undefined

        };

        result.flag = this.checkVal.poly(x, y, deg);
        const n = x.length;

        if(result.flag === 0 || deg >= n) {
            result.msg = "Error: Check function parameters.";

        }
        else {
            let X = [];
            let Y = [];
            let row;
            let coef;

            for(let i = 0; i < n; i++) {
                row = [];

                for(let m = 0; m <= deg; m++) {
                    row.push(pow(x[i],m));
                }

                X.push(row);
                Y.push([y[i]]);
            }

            X = matrix(X);
            Y = matrix(Y);

            coef = multiply(multiply(inv(multiply(transpose(X), X)), transpose(X)), Y).valueOf();

            for(let i = 0; i < coef.length; i++) {
                row = coef[i];
                result.coef.push(row[0]);
            }

            result.fun = function(x) {
                let res = 0;

                for(let i = 0; i < result.coef.length; i++) {
                    res = res + pow(x, i)*result.coef[i];
                }

                return res;
            }

            result.msg = "Method executed successfully"; 
            result.R2 = this.error.R2(x, y, result.fun);
        };

        return result;
    }

    regr.exp = function(x, y) {
        let result = {
            coef:       [],
            fun:        undefined, 
            R2:         undefined,
            flag:       undefined,
            msg:        undefined

        };

        result.flag = this.checkVal.exp(x, y);
        const deg = 1;
        let logy = [];

        y.forEach(element => {
            logy.push(log(element));
        });
        
        result = this.poly(x, logy, deg);
        result.coef[0] = exp(result.coef[0]);
        result.fun = function(x) {
            return result.coef[0]*exp(result.coef[1]*x);
        }
        result.R2 = this.error.R2(x, y, result.fun);

        return result;
    }

if (require.main == module) {
    let x, y, deg;

    // Example of Polynomial Regression:
        // Function parameters:
            x   = [1, 2, 4, 8];
            y   = [3, 4, 3, 10];
            deg = 3;

        // Running Regression and print result:
            console.log("Polynomial Regression Example");
            console.table(regr.poly(x, y, deg));

    // Example of Exponential Regression:
        // Function parameters:
            x   = [2, 2.1, 3, 5];
            y   = [4, 5, 7.9, 32];

        // Running Regression and print result:
            console.log("Exponential Regression Example");
            console.table(regr.exp(x, y));
    }