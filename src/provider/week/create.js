(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await create(conn, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate);
        return out;
    };

    function create(conn, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate) {
        
        if(userId == null  || address == null || wantedDate == null ) {
            return new Promise((resolve,reject)=>{
                resolve('errArg');
            });
        }
        
        const qry = `insert into week values(null, ${userId}, '${address}', '${wantedDate}', '${confirmedPerfume}', ${confirmState}, '${confirmedDate}')`;
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

    
    function makeConfirmedPerfumeSample() {
        let perfume = {};
        perfume.main = 1; 
        perfume.new = 2;
        perfume.special = 3;
        return encodeURIComponent(JSON.stringify(perfume));
    }
    
    
    async function test(){
        const userId = 2;
        const address = 'address2';
        const wantedDate = '2021-02-01';
        const confirmedPerfume = makeConfirmedPerfumeSample();
        const confirmState = true;
        const confirmedDate = '2021-02-15 12:12:12';

        console.log(await module.exports(g, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate));
        process.exit(0);
    }
    test();
})();



