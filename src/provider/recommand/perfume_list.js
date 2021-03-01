(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, userid, type)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const perfumeList = await getPrefumeList(conn, userid,type);
        return perfumeList;
    };

    function getPrefumeList(conn, userid, type) {
        const qry = `select perfume_list from recommand where user_id=${userid} and type=${type} order by id desc limit 1`;
        return new Promise((resolve, reject)=>{
            conn.query(qry, (err, ret)=>{
                if(err || ret.length!=1){
                    resolve('err');
                    return;
                }
                resolve(ret[0].perfume_list);
            });
        });
    }
    
    async function test(){
        console.log(await module.exports(g,2,2));
        process.exit(0);
    }
    test();
})();



