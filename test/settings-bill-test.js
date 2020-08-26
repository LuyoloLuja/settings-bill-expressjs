let assert = require("assert");
let settingsBill = require("../settings-bill");

describe('The bill with settings function', function(){
    it('Should be able to set the call, sms, warning and critical', function(){
        let SettingsBill = settingsBill();

        SettingsBill.setSettings({
            smsCost : 2,
            callCost : 3,
            warningLevel : 4,
            criticalLevel : 5

        });

        assert.deepEqual({
            smsCost : 2,
            callCost : 3,
            warningLevel : 4,
            criticalLevel : 5

        }, SettingsBill.getSettings())
    })
    it('Should be able to record action', function(){
        let SettingsBill = settingsBill();
        SettingsBill.setSettings({
            smsCost : 2,
            callCost : 3,
            warningLevel : 4,
            criticalLevel : 5

        });
        SettingsBill.recordAction('sms')
        SettingsBill.recordAction('sms')
        assert.equal(4, SettingsBill.getTotal('sms'));
    })
})