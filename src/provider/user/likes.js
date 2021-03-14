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
        const qry = `select likes from user where id = ${id}`;
        
        return new Promise((resolve, reject)=>{
            conn.query(qry, (err, ret)=>{
                if(err || ret == null || ret.length != 1){
                    resolve('err');
                    return;
                }
                let likes = decodeURIComponent(ret[0].likes);
                resolve(likes);
            });
        });
    }
    
    async function test(){
        let id = 100;
        console.log(await module.exports(g, id));
        process.exit(0);
    }
    test();
})();



