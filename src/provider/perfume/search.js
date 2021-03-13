(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, keyword)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await read(conn, keyword);   
        return out;
    };

    function read(conn, keyword) {
        let qry = `select * from perfume where name like '%${keyword}%' order by id desc`;
        
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
        let keyword = 'name2';
        console.log(await module.exports(g, keyword));
        process.exit(0);
    }
    test();
})();



