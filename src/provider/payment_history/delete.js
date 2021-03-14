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
        
        const out = await deletePaymentHistory(conn, id);
        return out;
    };

    function deletePaymentHistory(conn, id) {
        if(id == null) {
            return new Promise((resolve,reject)=>{
                resolve('err');
            });
        }

        const qry = `delete from payment_history where id=${id}`;
        
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
        let id = 102;
        console.log(await module.exports(g,id));
        process.exit(0);
    }
    test();
})();



