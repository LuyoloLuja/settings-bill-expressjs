module.exports = function SettingsBill(){
    let smsCost;
    let callCost;
    let warningLevel;
    let criticalLevel;

    let actionList = [];

    function setSettings(settings){
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function getSettings(){
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action){
        let cost = 0;
        if (!hasReachedCriticalLevel()) { 
         if(action === 'sms'){
            cost = smsCost;
        }else if (action === 'call') {
            cost = callCost;
        }

        actionList.push({
            type: action,
            cost, 
            timestamp: new Date()
        });}
    
    }

    function actions(){
        return actionList;
    }

    function actionsFor(type){
        filteredList = [];
        for (var i = 0; i < actionList.length; i++) {
            let eachBill = actionList[i];

            if (eachBill.type === type) {
                filteredList.push(eachBill)
            }
        }
        return filteredList;
    }

    function getTotal(type){
        total = 0;
        for(var i = 0; i < actionList.length; i++){
            let eachBill = actionList[i];

            if (eachBill.type === type) {
                total += eachBill.cost;
            }
        }
        return total;
    }

    function grandTotal(){
        return getTotal('sms') + getTotal('call');
    }

    function totals(){
        let smsTotal = getTotal('sms');
        let callTotal = getTotal('call');

        return {
            smsTotal,
            callTotal,
            grandTotal : grandTotal(),
            color: totalColor()
        }
    }

    function hasReachedWarningLevel(){
        const total = grandTotal();
        const reachedWarningLevel = total >= warningLevel && total < criticalLevel;

        return reachedWarningLevel;
    }
    function hasReachedCriticalLevel(){
        const total = grandTotal();
        return total >= criticalLevel;
    }

    function totalColor() {
        const total = grandTotal();

        if (hasReachedCriticalLevel()) {
            return "danger";
        }
        else if (hasReachedWarningLevel()) {
            return "warning";
        }
    }
    
    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        totalColor
    }
}