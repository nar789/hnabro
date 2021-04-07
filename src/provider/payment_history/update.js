(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id, userId, paymentId, price, paidDate)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await update(conn, id, userId, paymentId, price, paidDate);
        return out;
    };

    function update(conn, id, userId, paymentId, price, paidDate) {
        
        if(userId == null  || paymentId == null || price == null ) {
            return new Promise((resolve,reject)=>{
                resolve('err noArg');
            });
        }
        
        const qry = `update payment_history set user_id = ${userId}, payment_id = ${paymentId}, price = ${price}, paid_date = '${paidDate}' where id = ${id}`;
        
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

        const userId = 3;
        const paymentId = 3;
        const price = 33000;
        const paidDate = '2021-12-27';
        const id = 102;
        
        console.log(await module.exports(g, id, userId, paymentId, price, paidDate));
        process.exit(0);
    }
    //test();
})();



