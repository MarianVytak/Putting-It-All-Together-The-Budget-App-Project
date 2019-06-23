// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {

        addItem: function (type, des, val) {

            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item base on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des,val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;

        },

        testing: function () {
            console.log(data);
        }

    };

})();



// UI CONTROLLER
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        addListItem: function (obj, type) {

            var html, newHtml;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%">\n' +
                    '        <div class="item__description">%description%</div>\n' +
                    '        <div class="right clearfix">\n' +
                    '            <div class="item__value">%value%</div>\n' +
                    '            <div class="item__delete">\n' +
                    '                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%">\n' +
                    '        <div class="item__description">%description%</div>\n' +
                    '        <div class="right clearfix">\n' +
                    '            <div class="item__value">%value%</div>\n' +
                    '            <div class="item__percentage">21%</div>\n' +
                    '            <div class="item__delete">\n' +
                    '                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function () {

            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();

        },

        getDOMstrings: function () {
            return DOMstrings;
        }

    };

})();



// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });

    };

    var ctrlAddItem = function () {

        var input, newItem;

        // 1. Get the filed input data
        input = UICtrl.getinput();

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to th UI
        UICtrl.addListItem(newItem, input.type);

        // Clear the fields
        UICtrl.clearFields();

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    };

    return {
        init: function () {
            setupEventListeners();
        }
    }

})(budgetController, UIController);


controller.init();