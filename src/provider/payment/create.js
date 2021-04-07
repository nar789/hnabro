(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, userId, dateToPay, cardInfo)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await create(conn, userId, dateToPay, cardInfo);
        return out;
    };

    function create(conn, userId, dateToPay, cardInfo) {
        
        if(userId == null  || dateToPay == null || cardInfo == null ) {
            return new Promise((resolve,reject)=>{
                resolve('err');
            });
        }
        
        const qry = `insert into payment values(null, ${userId}, '${dateToPay}', '${cardInfo}')`;
        
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

    function makeCardInfoSample() {
        let card = {};
        card.number=123456;
        return encodeURIComponent(JSON.stringify(card));
    }
    
    async function test(){

        const userId = 2;
        const dateToPay = '2021-12-26';
        const cardInfo = makeCardInfoSample();
        
        console.log(await module.exports(g, userId, dateToPay, cardInfo));
        process.exit(0);
    }
    //test();
})();



