// BISECTION METHOD
//  To find a root of a function between two values: fun(r) = 0 where r ∈[a,b].

function bisec(a, b, max_error, max_iter, fun) {
    //Parameters:
    //  a:          left limit [a,b].
    //  b:          right limit [a,b].
    //  max_error:  máximum relative error value.
    //  max_iter:   maximum number of iterations.
    //  fun:        function to apply the method.
        
    var a       = a;
    var b       = b;
    var fa      = fun(a);
    var fb      = fun(b);
    var r;
    var fr;
    var error   = 1;
    var i       = 0;
    
    var flag =  0;
        //  flag = 0: Initializing method.
        //  flag = 1: Successful execution.
        //  flag = 2: No sign change detected for f(a)*f(b).

    var comment;

    var result = {
        r:          r,       // function root.
        flag:       flag,    // method flag.
        error:      error,   // relative error.
        iter:       i,       // number of iterations.
        comment:    undefined, // comment of the execution.
    };     

    // Running the method:

    if (fa*fb < 0) {
        while (error >= max_error && i <= max_iter) {
            r   = (a+b)/2;
            fr  = fun(r);
            if (fa*fr < 0) {
                b = r;
                error = Math.abs((a-r)/r);
            }
            else {
                a = r;
                error = Math.abs((b-r)/r);
            }
            i++;
        }
        flag = 1;
    }
    else if (fa*fb == 0) {
        if (fa == 0) {
            r = a;
        }
        else {
            r = b;
        }
        flag    = 1;
        error   = 0;
        i++;
    }    
    else { 
        r       = undefined;
        flag    = 2;
        error   = undefined;
    }

    // Adding a comment for the result:
    if (flag == 0) {
        comment = "Initializing method";
    }
    else if (flag == 1) {
        comment = "Successful execution";
    }
    else {
        comment = "No sign change detected for f(a)*f(b)";
    }

    // Saving the results:
    result.r        = r;
    result.flag     = flag;
    result.error    = error;
    result.iter     = i;
    result.comment  = comment;
    
    return result;
}

if (require.main == module) {
    // Function parameters:
    var a           = (1/2)*Math.PI;
    var b           = (3/2)*Math.PI;
    var max_error   = 1e-12;
    var max_iter    = 1e6;
    var fun         = function(x) {return Math.sin(x)}

    // Running bisection method:
    var result = bisec(a, b, max_error, max_iter, fun);

    // Print result:
    console.log(result)
}