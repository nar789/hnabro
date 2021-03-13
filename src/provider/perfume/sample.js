;(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    var conn = mysql.createConnection(config);
    conn.connect();

    const name = "name";
    const avatar = "avatar";
    const notes = makeNotesSample();
    const hot_banner = 'hot_banner';
    const banner = 'banner';
    const story = 'story';
    const hashtags = makeHashTagsSample();
    const likes = 101;
    const subscribs = 202;

    const qry = `insert into perfume values(null, '${name}', '${avatar}', '${notes}','${hot_banner}','${banner}','${story}','${hashtags}', ${likes}, ${subscribs})`;
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

    function makeHashTagsSample() {
        let hashtags = [];
        hashtags.push('cool');
        hashtags.push('nice');
        hashtags.push('sexy');
        return encodeURIComponent(JSON.stringify(hashtags));
    }

    function makeNotesSample() {
        let notes = {};
        notes.base = [];
        notes.middle = [];
        notes.top = [];
        notes.base.push('b1');
        notes.base.push('b2');
        notes.middle.push('m1');
        notes.middle.push('m2');
        notes.top.push('t1');
        notes.top.push('t2');
        return  encodeURIComponent(JSON.stringify(notes));
    }
})();




