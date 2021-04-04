const { user } = require('../../../dbConfig');

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
        
        const out = await read(conn, userId);   
        return out;
    };

    function read(conn, userId) {
        if(userId == null) {
            return new Promise((resolve, reject)=>{
                resolve('err userid is null');
            });    
        }
        let qry = `select * from week where user_id = ${userId} order by id desc limit 1`;
        
        return new Promise((resolve, reject)=>{
            conn.query(qry, (err, ret)=>{
                if(err || ret == null){
                    resolve('err');
                    return;
                }
                resolve(JSON.stringify(ret));
            });
        });
    }
    
    async function test(){
        const userId = 1;
        
        console.log(await module.exports(g, userId));
        process.exit(0);
    }
    //test();
})();



