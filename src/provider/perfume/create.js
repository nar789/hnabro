(async ()=>{
    const mysql = require('mysql');
    const config = require('../../../dbConfig');
    let g = {};
    g.mysql = mysql;
    g.config = config;

    module.exports=async (g, name, avatar, notes, hotBanner, banner, story, hashTags, likes, subscribs)=>{
        const mysql = g.mysql;
        const config = g.config;

        let conn = mysql.createConnection(config);
        conn.connect();
        
        const out = await create(conn, name, avatar, notes, hotBanner, banner, story, hashTags, likes, subscribs);
        return out;
    };

    function create(conn, name, avatar, notes, hotBanner, banner, story, hashTags, likes, subscribs) {
        
        if(name == null  || notes == null || avatar == null ) {
            return new Promise((resolve,reject)=>{
                resolve('err');
            });
        }
        
        const qry = `insert into perfume values(null, '${name}', '${avatar}', '${notes}','${hotBanner}','${banner}','${story}','${hashTags}', ${likes}, ${subscribs})`;
        
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

    function makeHashTagsSample() {
        let hashtags = [];
        hashtags.push('cool2');
        hashtags.push('nice2');
        hashtags.push('sexy2');
        return  encodeURIComponent(JSON.stringify(hashtags));
    }

    function makeNotesSample() {
        let notes = {};
        notes.base = [];
        notes.middle = [];
        notes.top = [];
        notes.base.push('b0');
        notes.base.push('b0');
        notes.middle.push('m0');
        notes.middle.push('m0');
        notes.top.push('t0');
        notes.top.push('t0');
        return  encodeURIComponent(JSON.stringify(notes));
    }
    
    async function test(){

        const name = "name2";
        const avatar = "avatar2";
        const notes = makeNotesSample();
        const hot_banner = 'hot_banner2';
        const banner = 'banner2';
        const story = 'story2';
        const hashtags = makeHashTagsSample();
        const likes = 99;
        const subscribs = 88;
        
        console.log(await module.exports(g, name, avatar, notes, hot_banner, banner, story, hashtags, likes, subscribs));
        process.exit(0);
    }
    test();
})();



