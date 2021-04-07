const { user } = require('../../../dbConfig');

;(function(){
	module.exports=function(_g){

		var app = _g.app;

		function route(){

            app.post('/api/payment_history/create',async (req,res)=>{
                //g, userId, paymentId, price, paidDate
                const userId = req.body.user_id;
                const paymentId = req.body.payment_id;
                const price = req.body.price;
                const paidDate = req.body.paid_date;
                
                const create = await require('./create')(_g, userId, paymentId, price, paidDate);
                res.json(create);                
            });

            app.post('/api/payment_history/update',async (req,res)=>{
                //g, userId, paymentId, price, paidDate
                const id = req.body.id;
                const userId = req.body.user_id;
                const paymentId = req.body.payment_id;
                const price = req.body.price;
                const paidDate = req.body.paid_date;
                
                const update = await require('./update')(_g, id, userId, paymentId, price, paidDate);
                res.json(update);                
            });

            app.post('/api/payment_history/read',async (req,res)=>{
                const id = req.body.id;
                const userId = req.body.user_id;                
                const read = await require('./read')(_g, id, userId);
                res.json(read);                
            });

            app.post('/api/payment_history/delete',async (req,res)=>{
                const id = req.body.id;
                const deletePaymentHistory = await require('./delete')(_g, id);
                res.json(deletePaymentHistory);                
            });
		}

		return {
            route : route, 
        }
	}

})();



