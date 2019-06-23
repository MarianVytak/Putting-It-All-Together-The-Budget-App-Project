var budgetController = (function () {

    var x = 18;

    var add = function (a) {
        return x + a;
    };

    return {
        publicTest: function (b) {
            return add(b);
        }
    }

})();



var UIController = (function () {

    // Some code

})();



var controller = (function (budgetCtrl, UICtrl) {

    var z = budgetCtrl.publicTest(5);

    return {
        anotherPublic: function () {
            console.log(z);
        }
    }

})(budgetController, UIController);