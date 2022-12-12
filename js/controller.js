const controller = (function(budgetCtrl, uiCtrl) {
    
    

    const setupEventListeners = function(){
        const DOM = uiCtrl.getDomStrings();
          document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);

          document.querySelector(DOM.budgetTable).addEventListener("click", ctrlDeleteItem)

    }

    function updatePercentages(){
        budgetCtrl.calculatePersentages();
        budgetCtrl.test();
        const idsAndPercents =  budgetCtrl.getAllIdsAndPercentages();
        console.log("🚀 ~ file: controller.js ~ line 17 ~ updatePercentages ~ idsAndPercents", idsAndPercents)

        uiCtrl.updateItemsPercentages(idsAndPercents)
    }

    function ctrlAddItem(event) {
        event.preventDefault();
        

        const input = uiCtrl.getInput();
      

        if(input.description != "" && !isNaN(input.value) && input.value > 0) {

            const newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            budgetCtrl.test();

            uiCtrl.renderListItem(newItem, input.type);
            uiCtrl.clearFields();
            generateTestData.init();

            updateBudjet();

            updatePercentages();
        }


      
    }

    function ctrlDeleteItem(event){
        let itemID, splitID, type, ID;
        

        if(event.target.closest(".item__remove")){
            
            itemID = event.target.closest("li.budget-list__item").id;

            splitID = itemID.split("-");
            type= splitID[0];
            ID = parseInt(splitID[1]);

            budgetCtrl.deleteItem(type, ID);

            uiCtrl.deleteListItem(itemID);

            updateBudjet();

            updatePercentages();
        }
    }

    function updateBudjet(){
        budgetCtrl.calculateBudjet();

        budgetObj = budgetCtrl.getBudget();
        console.log(" updateBudjet ~ budgetObj", budgetObj);
        uiCtrl.updateBudjet(budgetObj);
    }


    return{
        init: function(){
            console.log("app started!");
            uiCtrl.displayMonth();
            setupEventListeners();
            uiCtrl.updateBudjet({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            })
        }
    }
  
})(modelController, viewController);

controller.init();