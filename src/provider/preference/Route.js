;(function(){
	module.exports=function(_g){

		var app = _g.app;

		function route(){

            app.post('/api/preference/create',async (req,res)=>{
                //g, userId, slot, slotNote
                const userId = req.body.user_id;
                const slot = req.body.slot;
                const slotNote = req.body.slot_note;
            
                const create = await require('./create')(_g, userId, slot, slotNote);
                res.json(create);                
            });

            app.post('/api/preference/update',async (req,res)=>{
                //g, userId, slot, slotNote
                const id = req.body.id;
                const userId = req.body.user_id;
                const slot = req.body.slot;
                const slotNote = req.body.slot_note;
            
                const update = await require('./update')(_g, id, userId, slot, slotNote);
                res.json(update);                
            });

            app.post('/api/preference/read',async (req,res)=>{
                const id = req.body.id;
                const read = await require('./read')(_g, id);
                res.json(read);                
            });

            app.post('/api/preference/slot',async (req,res)=>{
                const userId = req.body.user_id;
                const slotPreference = await require('./slot_preference')(_g, userId);
                res.json(slotPreference);                
            });

            app.post('/api/preference/slot_note',async (req,res)=>{
                const userId = req.body.user_id;
                const slotNotePreference = await require('./slot_note_preference')(_g, userId);
                res.json(slotNotePreference);                
            });

            app.post('/api/preference/delete',async (req,res)=>{
                const id = req.body.id;
                const deletePreference = await require('./delete')(_g, id);
                res.json(deletePreference);                
            });

		}

		return {
            route : route, 
        }
	}

})();



