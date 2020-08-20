function BillWithSettings() {
    var theCallCost = 0;
    var theSmsCost = 0;
    var theWarningLevel = 0;
    var theCriticalLevel = 0;

    var callCostTotal = 0;
    var smsCostTotal = 0;

    // call costs functions
    function setCallCost(callCost) {
        theCallCost = callCost;
    }

    function getCallCost() {
        return theCallCost;
    }

    // sms costs functions
    function setSmsCost(smsCost) {
        theSmsCost = smsCost;
    }

    function getSmsCost() {
        return theSmsCost;
    }

    // warning level function
    function setWarningLevel(warningLevel) {
        theWarningLevel = warningLevel;
    }

    function getWarningLevel() {
        return theWarningLevel;
    }

    // critical level function
    function setCriticalLevel(criticalLevel) {
        theCriticalLevel = criticalLevel;
    }

    function getCriticalLevel() {
        return theCriticalLevel;
    }

    function makeCall() {
        if (!hasReachedCriticalLevel()) {
            callCostTotal += theCallCost;
        }
    }

    function getTotalCost() {
        return callCostTotal + smsCostTotal;
    }

    function getTotalCallCost() {
        return callCostTotal;
    }

    function getTotalSmsCost() {
        return smsCostTotal;
    }

    function sendSms() {
        if (!hasReachedCriticalLevel()) {
            return smsCostTotal += theSmsCost;
        }
    }

    function hasReachedCriticalLevel() {
        return getTotalCallCost() >= getCriticalLevel()
    }

    function totalClassName() {
        if (hasReachedCriticalLevel()) {
            return "critical";
        }

        if (getTotalCallCost() >= getWarningLevel()) {
            return "warning";
        }
    }

    return {
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        getCriticalLevel,
        makeCall,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        sendSms,
        totalClassName
    }
}