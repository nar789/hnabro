;(function(){
	module.exports=function(_g){

		var app = _g.app;

		function route(){
            app.post('/api/user/create',async (req,res)=>{
                //g, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType

                const name = req.body.name;
                const address = req.body.address;
                const sex = req.body.sex;
                const age = req.body.age;
                const hashtags = req.body.hashtags;
                const personality = req.body.personality;
                const job = req.body.job;
                const oauthType = req.body.oauth_type;
                const likes = req.body.likes;
                const subscribeType = req.body.subscribe_type;

                const create = await require('./create')(_g, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType);
                res.json(create);
            });

            app.post('/api/user/update',async (req,res)=>{
                //g, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType
                const id = req.body.id;
                const name = req.body.name;
                const address = req.body.address;
                const sex = req.body.sex;
                const age = req.body.age;
                const hashtags = req.body.hashtags;
                const personality = req.body.personality;
                const job = req.body.job;
                const oauthType = req.body.oauth_type;
                const likes = req.body.likes;
                const subscribeType = req.body.subscribe_type;

                const update = await require('./update')(_g, id, name, address, sex, age, hashtags, personality, job, oauthType, likes, subscribeType);
                res.json(update);
            });

            app.post('/api/user/read',async (req,res)=>{
                const id = req.body.id;
                const read = await require('./read')(_g, id);
                res.json(read);
            });

            app.post('/api/user/subscribe_type',async (req,res)=>{
                const id = req.body.id;
                const subscribeType = await require('./subscribe_type')(_g, id);
                res.json(subscribeType);
            });

            app.post('/api/user/likes',async (req,res)=>{
                const id = req.body.id;
                const likes = await require('./likes')(_g, id);
                res.json(likes);
            });

            app.post('/api/user/delete',async (req,res)=>{
                const id = req.body.id;
                const deleteUser = await require('./delete')(_g, id);
                res.json(deleteUser);
            });

		}

		return {
            route : route, 
        }
	}

})();



