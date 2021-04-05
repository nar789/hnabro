(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id, userId, slot, slotNote)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await update(conn, id, userId, slot, slotNote);
        return out;
    };

    function update(conn, id, userId, slot, slotNote) {
        
        if(userId == null  || slot == null || slotNote == null ) {
            return new Promise((resolve,reject)=>{
                resolve('errArg');
            });
        }
        
        const qry = `update preference set user_id =  ${userId}, slot = '${slot}', slot_note = '${slotNote}' where id = ${id}`;
        return new Promise((resolve, reject)=>{
            conn.query(qry, (err, ret)=>{
                if(err || ret == null){
                    resolve('errQry');
                    return;
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

    async function test(){
        const id = 102;
        const userId = 3;
        const slot = makeSlotSample();
        const slotNote = makeSlotNoteSample();
        
        console.log(await module.exports(g, id, userId, slot, slotNote));
        process.exit(0);
    }
    //test();
})();



