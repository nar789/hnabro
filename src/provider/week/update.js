(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await update(conn, id, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate);
        return out;
    };

    function update(conn, id, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate) {
        
        if(userId == null  || address == null || wantedDate == null ) {
            return new Promise((resolve,reject)=>{
                resolve('errArg');
            });
        }
        
        const qry = `update week set user_id = ${userId}, address = '${address}', wanted_date = '${wantedDate}', confirmed_perfume = '${confirmedPerfume}', confirm_state = ${confirmState}, confirmed_date = '${confirmedDate}' where id = ${id}`;
        return new Promise((resolve, reject)=>{
            conn.query(qry, (err, ret)=>{
                if(err || ret == null){
                    resolve('errQry' + qry);
                    return;
                }
                resolve('success');
            });
        });
    }

    
    function makeConfirmedPerfumeSample() {
        let perfume = {};
        perfume.main = 1; 
        perfume.new = 2;
        perfume.special = 3;
        return encodeURIComponent(JSON.stringify(perfume));
    }
    
    
    async function test(){
        const userId = 3;
        const address = 'address3';
        const wantedDate = '2021-03-01';
        const confirmedPerfume = makeConfirmedPerfumeSample();
        const confirmState = true;
        const confirmedDate = '2021-03-15 12:12:12';
        
        const id = 102;

        console.log(await module.exports(g, id, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate));
        process.exit(0);
    }
    //test();
})();



