var IndexController = function(name) {

    Controller.call(this, name);

    var NORMAL      = 1;
    var TRADITIONAL = 2;
    var MEDIEVAL    = 3;

    var method = NORMAL;
    var number = 0;
    var result = 'nulla';

    // --------------------------------------------------------------------------------------------
    // Public methods:

    /**
     * Updates the result variable.
     *
     * This method simply reads which method of convertion should be used and calls the responsible
     * function for that method.
     */
    this.generateRomanNumeral = function() {
        var m = this.getMethod();
        switch(m) {
            case MEDIEVAL:
                this.setResult(
                  medieval(this.getNumber())
                );
                break;
            case TRADITIONAL:
                this.setResult(
                  traditional(this.getNumber())
                );
                break;
            case NORMAL:
            default:
                this.setResult(
                  normal(this.getNumber())
                );
                break;
        }
    };

    // --------------------------------------------------------------------------------------------
    // Private methods:

    /**
     * Converts Hindu–Arabic number into Traditional Roman number.
     *
     * The traditional Roman numeral system doesn't use subtractive forms.
     *
     * @param  number $x is the number to be converted.
     * @return string the roman numeral system version of the number.
     */
    function traditional(x) {
        var v = {
            1    : 'I'
          , 5    : 'V'
          , 10   : 'X'
          , 50   : 'L'
          , 100  : 'C'
          , 500  : 'D'
          , 1000 : 'M'
        };
        return convert(x, v);
    }

    /**
     * Converts Hindu–Arabic number into "normal" Roman number.
     *
     * The normal Roman numeral system uses subtractive forms.
     *
     * @param  number $x is the number to be converted.
     * @return string the roman numeral system version of the number.
     */
     function normal(x) {
        var v = {
            1    : 'I'
          , 4    : 'IV'
          , 5    : 'V'
          , 9    : 'IX'
          , 10   : 'X'
          , 40   : 'XL'
          , 50   : 'L'
          , 90   : 'XC'
          , 100  : 'C'
          , 400  : 'CD'
          , 500  : 'D'
          , 900  : 'CM'
          , 1000 : 'M'
        };
        return convert(x, v);
    }

    /**
     * Converts Hindu–Arabic number into Medieval Roman number.
     *
     * The medieval Roman numeral system has several different notations for different values.
     *
     * @param  number $x is the number to be converted.
     * @return string the roman numeral system version of the number.
     */
     function medieval(x) {
        var v = {
            1    : 'I'
          , 4    : 'IV'
          , 5    : 'A'
          , 6    : 'Ϛ'
          , 7    : 'Z'
          , 9    : 'IX'
          , 10   : 'X'
          , 11   : 'O'
          , 40   : 'F'
          , 50   : 'L'
          , 70   : 'S'
          , 80   : 'R'
          , 90   : 'N'
          , 100  : 'C'
          , 160  : 'Y'
          , 200  : 'T'
          , 250  : 'H'
          , 300  : 'E'
          , 400  : 'B'
          , 500  : 'P'
          , 900  : 'Q'
          , 1000 : 'M'
          , 2000 : 'Z'
        };
        return convert(x, v);
    }

    /**
     * Converts Hindu–Arabic number into Roman number.
     *
     * This method needs two arrays with the corresponding Hindu-Arabic and Roman numerals in the
     * same index. Then it iterates the list until it finds the largest number lesser than the
     * desired value, it then adds the Roman numeral, subtracts it's value from $x and repeats.
     *
     * This process allows to replicate the succession style of Roman numerals.
     *
     * @param  number $x is the number to be converted.
     * @param  array  $v is an array of values in Hindu-Arabic and their correspondent in Roman.
     * @return string the roman numeral system version of the number.
     */
    function convert(x, v) {
        if (x < 1) return 'nulla';
        if (x > 3999) return 'nimis magna!';
        x = Math.round(x);
        // A single array is good for readability.
        // The faster way of doing this is passing two arrays. For this system it is fine to do a
        // single array, but for bigger data this would be a slow process.
        var n = Object.keys(v);
        var c = [];
        for(var key in v)
            c.push(v[key]);
        var last_key = n.length-1;
        // -------------------
        var r = '';
        while (x > 0) {
            i = -1;
            while (x >= n[i+1] && i !== last_key) i++;
            x -= n[i];
            r += c[i];
        }
        return r;
    }

    // --------------------------------------------------------------------------------------------
    // Setters and getters:

    /**
     * Sets number.
     */
    this.setNumber = function(newValue) {
        number = newValue;
    };

    /**
     * Gets number.
     */
    this.getNumber = function() {
        return number;
    };

    /**
     * Sets result.
     */
    this.setResult = function(newValue) {
        result = newValue;
    };

    /**
     * Gets result.
     */
    this.getResult = function() {
        return result;
    };

    /**
     * Sets method.
     */
    this.setMethod = function(newValue) {
        method = newValue;
    };

    /**
     * Gets method.
     */
    this.getMethod = function() {
        return method;
    };

};


IndexController.prototype = Object.create(Controller.prototype);
IndexController.prototype.constructor = IndexController;

