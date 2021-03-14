;(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    var conn = mysql.createConnection(config);
    conn.connect();

    let quries = [];
    const QRY_COUNT = 100;
    for(var i=0;i<QRY_COUNT;i++){
        quries.push(makeQrySample());
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

    function makeConfirmedPerfumeSample() {
        let perfume = {};
        perfume.main = 1; 
        perfume.new = 2;
        perfume.special = 3;
        return encodeURIComponent(JSON.stringify(perfume));
    }

    function makeQrySample() {
        const userId = 1;
        const address = 'address';
        const wantedDate = '2021-01-01';
        const confirmedPerfume = makeConfirmedPerfumeSample();
        const confirmState = true;
        const confirmedDate = '2021-01-15 12:12:12';
        
        const qry = `insert into week values(null, ${userId}, '${address}', '${wantedDate}', '${confirmedPerfume}', ${confirmState}, '${confirmedDate}')`;
        return qry;
    }

})();




