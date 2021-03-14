;(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    var conn = mysql.createConnection(config);
    conn.connect();

    const userId = 1;
    const paymentId = 1;
    const price = 32000;
    const paidDate = '2021-12-25';

    const qry = `insert into payment_history values(null, ${userId}, ${paymentId}, ${price}, '${paidDate}')`;
    let quries = [];
    const QRY_COUNT = 100;
    for(var i=0;i<QRY_COUNT;i++){
        quries.push(qry);
    }

    for(var q of quries){
        let ret = await insertQry(conn, q);
        console.log(ret);
    }

    console.log('thanks.');
    process.exit();

    function insertQry(conn, qry) {
        return new Promise((resolve,reject)=>{
            conn.query(qry,(err,ret) => {
                if(err) {
                    console.log(err);
                }
                resolve('success');
            });
        });
    }
})();




