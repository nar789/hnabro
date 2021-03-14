(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, userId)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await slot_note_preference(conn, userId);   
        return out;
    };

    function slot_note_preference(conn, userId) {
        if(userId == null) {
            return new Promise((resolve,reject)=>{
                resolve('err');
            });
        }
        const qry = `select slot_note from preference where user_id = ${userId} order by id desc limit 1`;
        
        return new Promise((resolve, reject)=>{
            conn.query(qry, (err, ret)=>{
                if(err || ret == null || ret.length != 1){
                    resolve('err');
                    return;
                }
                let slotNote = decodeURIComponent(ret[0].slot_note);
                resolve(slotNote);
            });
        });
    }
    
    async function test(){
        let userId = 1;
        console.log(await module.exports(g, userId));
        process.exit(0);
    }
    test();
})();



