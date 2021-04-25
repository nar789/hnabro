const { user } = require('../../../dbConfig');

;(function(){
	module.exports=function(_g){

		var app = _g.app;

		function route(){

            app.post('/api/comment/create',async (req,res)=>{
                //g, userId, perfumeId, comment
                const userId = req.body.user_id;
                const perfumeId = req.body.perfume_id;
                const comment = req.body.comment;
                const create = await require('./create')(_g, userId, perfumeId, comment);
                res.json(create);                
            });

            app.post('/api/comment/update',async (req,res)=>{
                //g, userId, perfumeId, comment
                const id = req.body.id;
                const userId = req.body.user_id;
                const perfumeId = req.body.perfume_id;
                const comment = req.body.comment;
                
                const update = await require('./update')(_g, id, userId, perfumeId, comment);
                res.json(update);                
            });

            app.post('/api/comment/read',async (req,res)=>{
                const id = req.body.id;
                const perfumeId = req.body.perfume_id; 
                const update = await require('./read')(_g, id, perfumeId);
                res.json(update);                
            });

            app.post('/api/comment/delete',async (req,res)=>{
                const id = req.body.id;
                const deleteComment = await require('./delete')(_g, id);
                res.json(deleteComment);                
            });
		}

		return {
            route : route, 
        }
	}

})();



