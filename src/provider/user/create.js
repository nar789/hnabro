(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await create(conn, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType);
        return out;
    };

    function create(conn, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType) {
        
        if(name == null  || address == null || sex == null ) {
            return new Promise((resolve,reject)=>{
                resolve('errArg');
            });
        }
        
        const qry = `insert into user values(null, '${address}', '${name}', ${sex}, ${age}, '${hashtags}', '${personality}', '${job}', ${oauthType}, '${likes}', ${subscribeType})`;
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
        hashtags.push('cool2');
        hashtags.push('nice2');
        hashtags.push('sexy2');
        return  encodeURIComponent(JSON.stringify(hashtags));
    }

    function makeLikesSample() {
        let likes = [];
        likes.push(1);
        likes.push(2);
        likes.push(3);
        return  encodeURIComponent(JSON.stringify(likes));
    }
    
    async function test(){
        const address = "address2";
        const name = "name2";
        const sex = 0;
        const age = 21;
        const hashtags = makeHashTagsSample();
        const personality = 'personality2';
        const job = 'job2';
        const oauthType = 2;
        const likes = makeLikesSample();
        const subscribeType = 2;
        
        console.log(await module.exports(g, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType));
        process.exit(0);
    }
    test();
})();



