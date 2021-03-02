(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id, userid, perfumeid, type, perfumeList)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await update(conn, id, userid, perfumeid, type, perfumeList);
        return out;
    };

    function update(conn, id, userid, perfumeid, type, perfumeList) {
        if(userid == null  || id == null ||
            perfumeid == null  || type == null ||
            perfumeList == null){
                return new Promise((resolve,reject)=>{
                    resolve('err');
                });
            }

        perfumeList = JSON.stringify(perfumeList);
        const qry = `update recommand set user_id=${userid}, perfume_id=${perfumeid}, type=${type}, perfume_list = '${perfumeList}' where id=${id}`;
        
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
        let id = 331;
        let userid=3;
        let perfumeid=3;
        let type=3;
        let perfumeList = [];
        for(var i=0;i<100;i++){
            perfumeList.push(i+2);
        }
        console.log(await module.exports(g,id,userid,perfumeid,type,perfumeList));
        process.exit(0);
    }
    test();
})();



