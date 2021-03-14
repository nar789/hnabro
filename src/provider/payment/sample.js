;(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    var conn = mysql.createConnection(config);
    conn.connect();

    const userId = 1;
    const dateToPay = '2021-12-25';
    const cardInfo = makeCardInfoSample();

    const qry = `insert into payment values(null, ${userId}, '${dateToPay}', '${cardInfo}')`;
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

    function makeCardInfoSample() {
        let card = {};
        card.number=123456;
        return encodeURIComponent(JSON.stringify(card));
    }

})();




