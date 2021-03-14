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
        if(id == null) {
            return new Promise((resolve,reject)=>{
                resolve('err');
            });
        }
        const qry = `select subscribe_type from user where id = ${id}`;
        
        return new Promise((resolve, reject)=>{
            conn.query(qry, (err, ret)=>{
                if(err || ret == null || ret.length != 1){
                    resolve('err');
                    return;
                }
                resolve(ret[0].subscribe_type);
            });
        });
    }
    
    async function test(){
        let id = 101;
        console.log(await module.exports(g, id));
        process.exit(0);
    }
    test();
})();



