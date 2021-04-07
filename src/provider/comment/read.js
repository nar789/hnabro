(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id, perfumeId)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await read(conn, id, perfumeId);   
        return out;
    };

    function read(conn, id, perfumeId) {
        let qry = 'select * from comment';
        if(id) {
            qry = qry + ` where id = ${id}`;
        } else if(perfumeId) {
            qry = qry + ` where perfume_id = ${perfumeId}`;
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
        const perfumeId = 1;
        console.log(await module.exports(g, null, perfumeId));
        process.exit(0);
    }
    //test();
})();



