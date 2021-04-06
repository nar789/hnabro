(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, ids)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await read(conn, ids);   
        return out;
    };

    function read(conn, ids) {
        let qry = '';
        if(ids){
            //const str = JSON.stringify(ids); 
            const str = ids;
            let idsQry = str.substr(1, str.length-2);
            idsQry = `(${idsQry})`;

            qry = `select * from perfume where id in ${idsQry}`;
        }else {
            //all
            qry = `select * from perfume`;
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
        let ids = [204,203,202];
        console.log(await module.exports(g, ids));
        process.exit(0);
    }
    //test();
})();



