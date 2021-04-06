;(function(){
	module.exports=function(_g){

		var app = _g.app;

		function route(){

            app.post('/api/perfume/create',async (req,res)=>{
                //g, name, avatar, notes, hotBanner, banner, story, hashTags, likes, subscribs
                const name = req.body.name;
                const avatar = req.body.avatar; 
                const notes = req.body.notes;
                const hotBanner = req.body.hot_banner;
                const banner = req.body.banner;
                const story = req.body.story;
                const hashtags = req.body.hashtags;
                const likes = req.body.likes;
                const subscribs = req.body.subscribs;
            
                const create = await require('./create')(_g, name, avatar, notes, hotBanner, banner, story, hashtags, likes, subscribs);
                res.json(create);                
            });

            app.post('/api/perfume/update',async (req,res)=>{
                //g, name, avatar, notes, hotBanner, banner, story, hashTags, likes, subscribs
                const id = req.body.id;
                const name = req.body.name;
                const avatar = req.body.avatar; 
                const notes = req.body.notes;
                const hotBanner = req.body.hot_banner;
                const banner = req.body.banner;
                const story = req.body.story;
                const hashtags = req.body.hashtags;
                const likes = req.body.likes;
                const subscribs = req.body.subscribs;
            
                const update = await require('./update')(_g, id, name, avatar, notes, hotBanner, banner, story, hashtags, likes, subscribs);
                res.json(update);                
            });

            app.post('/api/perfume/read',async (req,res)=>{
                const ids = req.body.ids;            
                const read = await require('./read')(_g, ids);
                res.json(read);                
            });

            app.post('/api/perfume/search',async (req,res)=>{
                const keyword = req.body.keyword;
                const search = await require('./search')(_g, keyword);
                res.json(search);                
            });

            app.post('/api/perfume/delete',async (req,res)=>{
                const id = req.body.id;
                const deletePerfume = await require('./delete')(_g, id);
                res.json(deletePerfume);                
            });
		}

		return {
            route : route, 
        }
	}

})();



