;(function(){
	module.exports=function(_g){

		var app = _g.app;

		function route(){
            //recommand
            app.post('/api/recommand/perfume_list',async (req,res)=>{
                const userId = req.body.user_id;
                const type = req.body.type;
                if(userId == null || type == null) {
                    res.send('err');
                    return;
                }
                const perfumeList = await require('./perfume_list')(_g, userId, type);
                res.json(perfumeList);
            });

            app.post('/api/recommand/read',async (req,res)=>{
                const id = req.body.id;
                const read = await require('./read')(_g, id);
                res.json(read);
            });

            app.post('/api/recommand/create',async (req,res)=>{
                //userid, perfumeid, type, perfumeList
                const userId = req.body.user_id;
                const perfumeId = req.body.perfume_id;
                const type = req.body.type;
                const perfumeList = req.body.perfume_list;
                const create = await require('./create')(_g, userId, perfumeId, type, perfumeList);
                res.json(create);
            });

            app.post('/api/recommand/update',async (req,res)=>{
                //id, userid, perfumeid, type, perfumeList
                const id = req.body.id;
                const userId = req.body.user_id;
                const perfumeId = req.body.perfume_id;
                const type = req.body.type;
                const perfumeList = req.body.perfume_list;
                const update = await require('./update')(_g, id, userId, perfumeId, type, perfumeList);
                res.json(update);
            });

            app.post('/api/recommand/delete',async (req,res)=>{
                const id = req.body.id;
                const deleteRecommand = await require('./delete')(_g, id);
                res.json(deleteRecommand);
            });


		}

		return {
            route : route, 
        }
	}

})();



