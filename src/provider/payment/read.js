const { user } = require('../../../dbConfig');

(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id, userId)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await read(conn, id, userId);   
        return out;
    };

    function read(conn, id, userId) {
        let qry = 'select * from payment';
        if(id){
            qry = qry + ` where id = ${id}`;
        } else if(userId){
            qry = qry + ` where user_id = ${userId}`;
        }
        qry = qry + ' order by id desc';
        
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
        const id = 1;
        const userId = 1;
        console.log(await module.exports(g, null, userId));
        process.exit(0);
    }
    test();
})();



