(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id, userId, dateToPay, cardInfo)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await update(conn, id, userId, dateToPay, cardInfo);
        return out;
    };

    function update(conn, id, userId, dateToPay, cardInfo) {
        
        if(userId == null  || dateToPay == null || cardInfo == null ) {
            return new Promise((resolve,reject)=>{
                resolve('err');
            });
        }
        
        const qry = `update payment set user_id = ${userId}, date_to_pay = '${dateToPay}', card_info = '${cardInfo}' where id = ${id}`;
        
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

        const userId = 3;
        const dateToPay = '2021-12-27';
        const cardInfo = makeCardInfoSample();
        const id = 102;
        
        console.log(await module.exports(g, id, userId, dateToPay, cardInfo));
        process.exit(0);
    }
    test();
})();



