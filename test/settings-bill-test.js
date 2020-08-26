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
    it('Should be able to record action for sms', function(){
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
    it('Should be able to record action for call', function(){
        let SettingsBill = settingsBill();
        SettingsBill.setSettings({
            smsCost : 2,
            callCost : 3,
            warningLevel : 4,
            criticalLevel : 5
        });

        SettingsBill.recordAction('call')
        SettingsBill.recordAction('call')
        assert.equal(6, SettingsBill.getTotal('call'));
    })
    it('Sould return warning if warningLevel has been reached', function(){
        let SettingsBill = settingsBill();
        SettingsBill.setSettings({
            smsCost : 2,
            callCost : 3,
            warningLevel : 5,
            criticalLevel : 10
        });

        SettingsBill.recordAction('call');
        SettingsBill.recordAction('sms');

        assert.equal('warning', SettingsBill.totalColor())
    })
    it('Sould return danger if criticalLevel has been reached', function(){
        let SettingsBill = settingsBill();
        SettingsBill.setSettings({
            smsCost : 2,
            callCost : 3,
            warningLevel : 5,
            criticalLevel : 10
        });

        SettingsBill.recordAction('call');
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');
        SettingsBill.recordAction('sms');

        assert.equal('danger', SettingsBill.totalColor())
    })
})