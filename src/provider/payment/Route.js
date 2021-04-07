const { user } = require('../../../dbConfig');

;(function(){
	module.exports=function(_g){

		var app = _g.app;

		function route(){

            app.post('/api/payment/create',async (req,res)=>{
                //g, userId, dateToPay, cardInfo
                const userId = req.body.user_id;
                const dateToPay = req.body.date_to_pay;
                const cardInfo = req.body.card_info;
                
                const create = await require('./create')(_g, userId, dateToPay, cardInfo);
                res.json(create);                
            });

            app.post('/api/payment/update',async (req,res)=>{
                //g, userId, dateToPay, cardInfo
                const id = req.body.id;
                const userId = req.body.user_id;
                const dateToPay = req.body.date_to_pay;
                const cardInfo = req.body.card_info;
                
                const update = await require('./update')(_g, id, userId, dateToPay, cardInfo);
                res.json(update);                
            });

            app.post('/api/payment/read',async (req,res)=>{
                const id = req.body.id;
                const userId = req.body.user_id;                
                const read = await require('./read')(_g, id, userId);
                res.json(read);                
            });

            app.post('/api/payment/delete',async (req,res)=>{
                const id = req.body.id;
                const deletePayment = await require('./delete')(_g, id);
                res.json(deletePayment);                
            });
		}

		return {
            route : route, 
        }
	}

})();



