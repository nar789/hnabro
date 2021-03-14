;(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    var conn = mysql.createConnection(config);
    conn.connect();

    const userId = 1;
    const slot = makeSlotSample();
    const slotNote = makeSlotNoteSample();

    const qry = `insert into preference values(null, ${userId}, '${slot}', '${slotNote}')`;
    let quries = [];
    const QRY_COUNT = 100;
    for(var i=0;i<QRY_COUNT;i++){
        quries.push(qry);
    }

    for(var q of quries){
        let ret = await insertQry(conn, q);
        console.log(ret);
    }

    console.log('thanks.');
    process.exit();

    function insertQry(conn, qry) {
        return new Promise((resolve,reject)=>{
            conn.query(qry,(err,ret) => {
                if(err) {
                    console.log(err);
                }
                resolve('success');
            });
        });
    }

    function makeSlotSample() {
        let slot = {};
        slot.main = [];
        slot.new = [];
        slot.special = []; 
        slot.main.push("ingre1");
        slot.main.push("ingre2");
        slot.main.push("ingre3");
        slot.new.push('ingre4');
        slot.new.push('ingre5');
        slot.new.push('ingre6');
        slot.special.push("ingre7");
        slot.special.push("ingre8");
        slot.special.push("ingre9");
        return encodeURIComponent(JSON.stringify(slot));
    }

    function insertIngreToSlot(slot) {
        slot.base = [];
        slot.middle = [];
        slot.top = [];
        slot.base.push("ingre1");
        slot.base.push("ingre2");
        slot.base.push("ingre3");
        slot.middle.push("ingre4");
        slot.middle.push("ingre5");
        slot.middle.push("ingre6");
        slot.top.push("ingre7");
        slot.top.push("ingre8");
        slot.top.push("ingre9");
    }

    function makeSlotNoteSample() {
        let slot = {};
        slot.main = {};
        slot.new = {};
        slot.special = {}; 
        insertIngreToSlot(slot.main);
        insertIngreToSlot(slot.new);
        insertIngreToSlot(slot.special);        
        return  encodeURIComponent(JSON.stringify(slot));
    }
})();




