;(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    var conn = mysql.createConnection(config);
    conn.connect();

    const userId = 1;
    const perfumeId = 1;
    const comment = 'test';
    
    const qry = `insert into comment values(null, ${userId}, ${perfumeId}, '${comment}')`;
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




