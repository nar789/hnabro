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

    function makeQrySample() {
        const address = "address";
        const name = "name";
        const sex = 0;
        const age = 20;
        let hashtags = [];
        hashtags.push('hot');
        hashtags.push('sexy');
        hashtags.push('cool');
        hashtags = encodeURIComponent(JSON.stringify(hashtags));
        const personality = 'personality'
        const job = 'job';
        const oauthType = 1;
        let likes = [];
        likes.push(1);
        likes.push(2);
        likes.push(3);
        likes = encodeURIComponent(JSON.stringify(likes));
        const subscribeType = 1;
        const qry = `insert into user values(null, '${address}', '${name}', ${sex},${age},'${hashtags}','${personality}','${job}',${oauthType},'${likes}',${subscribeType})`;
        return qry;
    }

})();




