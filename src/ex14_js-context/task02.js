"use strict";

function Hangman(word) {

    this.word = word;
    this.message = '';
    this.errors = 6;
    this.errorSymbols = [];
    this.result = [];

    for (var i = 0; i < this.word.length; ++i) {
        this.result.push('_')
    }

    this.guess = function(letter) {
        var iL = this.word.indexOf(letter);
        if (iL !== -1) {
            this.result = this.word.split('').map(function(item, i) {
                if (item === letter) {
                    return letter
                }
                return this.result[i]
            }, this);
            this.message = this.result.join('');
            if (this.result.indexOf('_') === -1) {
                this.message = this.message + ' | You won!'
            }
        } else {
            --this.errors;
            this.errorSymbols.push(letter);
            this.message = 'wrong letter, errors left ' + this.errors + ' | ' + this.errorSymbols
        }
        console.log(this.message);
        return this
    };
    this.getGuessedString = function() {
        console.log(this.result.join(''));
        return this
    };
    this.getErrorsLeft = function() {
        console.log(this.errors);
        return this
    };
    this.getWrongSymbols = function() {
        console.log(this.errorSymbols);
        return this
    };
    this.startAgain = function(newWord) {

        this.word = input;
        this.result = [];
        this.message = '';
        this.errorSymbols = [];
        this.errors = 6;
        for (var i = 0; i < this.word.length; ++i) {
            this.result.push('_')
        }
    }
}

//var hangman = new Hangman('webpurple');

// hangman.guess('w'); // "w________"
// hangman.guess('e'); // "we______e"
// hangman.guess('a'); // "wrong letter, errors left 5 | a"
// hangman.guess('p'); // "we_p__p_e"
// hangman.guess('k'); // "wrong letter, errors left 4 | a,k"
// hangman.guess('b') // "webp___p_e"
//     .guess('l') // "webp__ple"
//     .getErrorsLeft() // 4
//     .getWrongSymbols() // [a,k]
//     .guess('u') // "webpu_ple"
//     .guess('r'); // "webpurple | You won!"

module.exports = new Hangman;