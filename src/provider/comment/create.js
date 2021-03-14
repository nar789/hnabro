(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, userId, perfumeId, comment)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await create(conn, userId, perfumeId, comment);
        return out;
    };

    function create(conn, userId, perfumeId, comment) {
        
        if(userId == null  || perfumeId == null || comment == null ) {
            return new Promise((resolve,reject)=>{
                resolve('err');
            });
        }
        
        const qry = `insert into comment values(null, ${userId}, ${perfumeId}, '${comment}')`;
        
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

        const userId = '2';
        const perfumeId = '2';
        const comment = 'test2';
        
        console.log(await module.exports(g, userId, perfumeId, comment));
        process.exit(0);
    }
    test();
})();



