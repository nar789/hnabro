;(function(){
	module.exports=function(_g){

		var app = _g.app;

		function route(){
            app.post('/api/week/create',async (req,res)=>{
                //userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate

                const userId = req.body.user_id;
                const address = req.body.address; 
                const wantedDate = req.body.wanted_date;
                const confirmedPerfume = req.body.confirmed_perfume;
                const confirmState = req.body.confirm_state;
                const confirmedDate = req.body.confirmed_date;
            
                const create = await require('./create')(_g, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate);
                res.json(create);
            });

            app.post('/api/week/update',async (req,res)=>{
                //userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate
                const id = req.body.id;
                const userId = req.body.user_id;
                const address = req.body.address; 
                const wantedDate = req.body.wanted_date;
                const confirmedPerfume = req.body.confirmed_perfume;
                const confirmState = req.body.confirm_state;
                const confirmedDate = req.body.confirmed_date;
            
                const update = await require('./update')(_g, id, userId, address, wantedDate, confirmedPerfume, confirmState, confirmedDate);
                res.json(update);
            });

            app.post('/api/week/read',async (req,res)=>{
                const id = req.body.id;
                const userId = req.body.user_id;
                const read = await require('./read')(_g, id, userId);
                res.json(read);
            });

            app.post('/api/week/read_last',async (req,res)=>{
                const userId = req.body.user_id;
                const readLast = await require('./read_last')(_g, userId);
                res.json(readLast);
            });

            app.post('/api/week/delete',async (req,res)=>{
                const id = req.body.id;
                const deleteWeek = await require('./delete')(_g, id);
                res.json(deleteWeek);
            });

		}

		return {
            route : route, 
        }
	}

})();



