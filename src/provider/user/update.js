(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, id, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await update(conn, id, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType);
        return out;
    };

    function update(conn, id, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType) {
        
        if(name == null  || address == null || sex == null ) {
            return new Promise((resolve,reject)=>{
                resolve('errArg');
            });
        }
        
        const qry = `update user set address = '${address}', name = '${name}', sex = ${sex}, age = ${age}, hashtags = '${hashtags}', personality = '${personality}', job = '${job}', oauth_type = ${oauthType}, likes = '${likes}', subscribe_type = ${subscribeType} where id = ${id}`;
        return new Promise((resolve, reject)=>{
            conn.query(qry, (err, ret)=>{
                if(err || ret == null){
                    resolve('errQry');
                    return;
                }
                resolve('success');
            });
        });
    }

    function makeHashTagsSample() {
        let hashtags = [];
        hashtags.push('cool3');
        hashtags.push('nice3');
        hashtags.push('sexy3');
        return  encodeURIComponent(JSON.stringify(hashtags));
    }

    function makeLikesSample() {
        let likes = [];
        likes.push(4);
        likes.push(5);
        likes.push(6);
        return  encodeURIComponent(JSON.stringify(likes));
    }
    
    async function test(){
        const address = "address3";
        const name = "name3";
        const sex = 0;
        const age = 21;
        const hashtags = makeHashTagsSample();
        const personality = 'personality3';
        const job = 'job3';
        const oauthType = 2;
        const likes = makeLikesSample();
        const subscribeType = 2;

        const id = 102;
        
        console.log(await module.exports(g, id, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType));
        process.exit(0);
    }
    //test();
})();



