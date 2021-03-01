;(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    var conn = mysql.createConnection(config);
    conn.connect();

    let perfume_list = [];
    const PERFUME_COUNT = 100;
    for(var i=0;i<PERFUME_COUNT;i++){
        perfume_list.push(i);
    }
    perfume_list = JSON.stringify(perfume_list);

    const qry = `insert into recommand values(null, 1, 1, 1,'${perfume_list}')`;
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
})();


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

