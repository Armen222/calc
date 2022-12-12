const modelController = (function() {

const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
}

const Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percetage = -1;
}


Expense.prototype.calcPercentage = function(totalIncome){
    if(totalIncome > 0){
        this.percetage = Math.round((this.value / totalIncome) * 100);
    } else {
        this.percetage = -1;
    }
}

Expense.prototype.getPercentage = function (){
    return this.percetage;
}

function addItem(type, desc, val){

    let newItem, ID, lastIndex;
    ID = 0;

    
    if(data.allItem[type].length > 0){
       const lastIndex = data.allItem[type].length - 1;

        ID = data.allItem[type][lastIndex].id + 1;
    }else {
        ID = 0;
    }

    if( type === "inc"){
        newItem = new Income(ID, desc, parseFloat(val));
    } else if(type === "exp" ) {
        newItem = new Expense(ID, desc, parseFloat(val));
    }
   
    data.allItem[type].push(newItem);

    return newItem;
    
}

function deleteItem(type, id){
    const ids = data.allItem[type].map(function(item){
        return item.id
    })
    console.log("🚀 ~ file: model.js ~ line 45 ~ ids ~ ds", ids)

    index = ids.indexOf(id);

    if(index !== -1){
        data.allItem[type].splice(index, 1)
    
    }
        console.log("🚀 ~ file: model.js ~ line 51 ~ deleteItem ~ data.allItem", data.allItem)
    
}

function caculateTotalSum(type){
    let sum = 0;
    data.allItem[type].forEach(function(item){
        sum = sum + item.value;
    });

    return sum;

}

function calculateBudjet(){
    data.totals.inc = caculateTotalSum("inc");
    
    data.totals.exp = caculateTotalSum("exp");
    

    data.budget = data.totals.inc - data.totals.exp;

    if(data.totals.inc > 0){
         data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    } else {
        data.percentage = -1;
    }

    
   

}

function getBudget(){
    return{
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage

    }
}


function calculatePersentages(){
    data.allItem.exp.forEach(function(item){
        item.calcPercentage(data.totals.inc);
    })
}


function getAllIdsAndPercentages(){
    const allPerc = data.allItem.exp.map(function(item){
        return [item.id, item.getPercentage()];

    });
    return allPerc;
}
const data = {
    allItem: {
        inc: [],
        exp: []
    },
    totals: {
        inc: 0,
        exp: 0
    },
    budget: 0,
    percentage: -1

}

return {
    addItem: addItem,
    calculateBudjet: calculateBudjet,
    getBudget: getBudget,
    deleteItem: deleteItem,
    calculatePersentages: calculatePersentages,
    getAllIdsAndPercentages: getAllIdsAndPercentages,
    test: function(){
        
    }
}

})();