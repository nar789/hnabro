(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, userid, perfumeid, type, perfumeList)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await create(conn, userid, perfumeid, type, perfumeList);
        return out;
    };

    function create(conn, userid, perfumeid, type, perfumeList) {
        if(userid == null  || 
            perfumeid == null  || type == null ||
            perfumeList == null){
                return new Promise((resolve,reject)=>{
                    resolve('err');
                });
            }

        perfumeList = JSON.stringify(perfumeList);
        const qry = `insert into recommand values(null,${userid},${perfumeid},${type},'${perfumeList}')`;
        
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
        let userid=2;
        let perfumeid=2;
        let type=2;
        let perfumeList = [];
        for(var i=0;i<100;i++){
            perfumeList.push(i+2);
        }
        console.log(await module.exports(g,userid,perfumeid,type,perfumeList));
        process.exit(0);
    }
    test();
})();



