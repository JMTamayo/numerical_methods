// LINEAR REGRESSION METHOD
//  To model the relationship between an independent variable and dependent variable by the following equation: y = ax + b where y = f(x); x∈[R] and y∈[R].

function val_check(x, y) {
    // Checking if all x and y values are numbers. Checking x.length and y.length are the same.
    
    var flag = 0;
    if (typeof x == "object" && typeof y == typeof x && x.length == y.length) {
        flag = 1;
        for (var val of x) {
            if (typeof val != "number") {
                flag = 2;
                break
            }
        }
        for (var val of y) {
            if (typeof val != "number") {
                flag = 2;
                break
            }
        }
    }
    else {
        flag = 2;
    }

    return flag;
}

function linear_reg(x, y) {
    //Parameters:
    //  x:          x values as an array.
    //  y:          y values as an array.

    var a;
    var b;
    var r2;
    var flag;
    var comment = "Initializing method";

    var flag = check_flag = val_check(x, y);
    //  flag = 0: Initializing method.
    //  flag = 1: Successful execution.
    //  flag = 2: Error: Check the length and values of x and y.

    var result = {
        a:          a,       // y = ax + b
        b:          b,       // y = ax + b
        r2:         r2,      // method error.
        flag:       flag,    // method flag.
        comment:    comment, // comment of the execution.
    };

    if (flag == 1) {
        const len   = x.length;
        var sumx    = 0;
        var sumy    = 0;
        var sumxy   = 0;
        var sumx2   = 0;
        var r2_num  = 0;
        var r2_den  = 0;
        var yi_reg  = 0;
        
        for (var i = 0; i <= len -1; i++) {
            sumx    = sumx + x[i];
            sumy    = sumy + y[i];
            sumxy   = sumxy + x[i]*y[i];
            sumx2   = sumx2 + Math.pow(x[i], 2);
        }

        a = (len*sumxy - sumx*sumy)/(len*sumx2 - Math.pow(sumx, 2));
        b = (sumy - a*sumx)/len;

        for (var i = 0; i <= len -1; i++) {
            yi_reg = a*x[i] + b;

            r2_num = r2_num + Math.pow(y[i] - yi_reg, 2);
            r2_den = r2_den + Math.pow(y[i] - (sumy/len), 2);
        }

        r2      = 1-(r2_num/r2_den);
        comment = "Successful execution"
    }
    else {
        comment = "Error: Check the length and values of x and y"
    }

    result.a        = a;
    result.b        = b;
    result.r2       = r2;
    result.comment  = comment;
    return result;
}

if (require.main == module) {
    // Function parameters:
    var x   = [-1,  0,  1,  2,  3,  4,  5];
    var y   = [-1,0.1,0.9,2.1,2.9,4.2,4.8];

    // Running bisection method:
    var result = linear_reg(x, y);

    // Print result:
    console.log(result)
}