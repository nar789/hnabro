(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await read(conn, id);
        return out;
    };

    function read(conn, id) {
        let qry = '';
        if(id){
            qry = `select * from recommand where id = ${id}`;
        }else {
            //all
            qry = `select * from recommand`;
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
        console.log(await module.exports(g));
        process.exit(0);
    }
    test();
})();



