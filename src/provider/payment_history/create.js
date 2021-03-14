(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, userId, paymentId, price, paidDate)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await create(conn, userId, paymentId, price, paidDate);
        return out;
    };

    function create(conn, userId, paymentId, price, paidDate) {
        
        if(userId == null  || paymentId == null || price == null ) {
            return new Promise((resolve,reject)=>{
                resolve('err');
            });
        }
        
        const qry = `insert into payment_history values(null, ${userId}, ${paymentId}, ${price}, '${paidDate}')`;
        
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

        const userId = 2;
        const paymentId = 2;
        const price = 27000;
        const paidDate = '2021-12-26';
        
        console.log(await module.exports(g, userId, paymentId, price, paidDate));
        process.exit(0);
    }
    test();
})();



