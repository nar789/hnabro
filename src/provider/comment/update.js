(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id, userId, perfumeId, comment)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await update(conn, id, userId, perfumeId, comment);
        return out;
    };

    function update(conn, id, userId, perfumeId, comment) {
        
        if(userId == null  || perfumeId == null || comment == null ) {
            return new Promise((resolve,reject)=>{
                resolve('err');
            });
        }
        
        const qry = `update comment set user_id = ${userId}, perfume_id = ${perfumeId}, comment = '${comment}' where id = ${id}`;
        
        return new Promise((resolve, reject)=>{
            conn.query(qry, (err, ret)=>{
                if(err || ret == null){
                    resolve('err');
                    return;
                }
                resolve('success');
            });
        });
    }

    async function test(){

        const userId = '3';
        const perfumeId = '3';
        const comment = 'test3';
        const id = 102;
        
        console.log(await module.exports(g, id, userId, perfumeId, comment));
        process.exit(0);
    }
    test();
})();



