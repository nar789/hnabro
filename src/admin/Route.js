;(function(){
	module.exports=function(_g){

        var app = _g.app;

		function route(){
            app.get('/admin',function(req,res){
				res.render('admin/index.html',{});
			});
			app.get('/admin/recommand',function(req,res){
				res.render('admin/recommand.html',{});
			});
			app.get('/admin/perfume',function(req,res){
				res.render('admin/perfume.html',{});
			});
			app.get('/admin/user',function(req,res){
				res.render('admin/user.html',{});
			});
			app.get('/admin/preference',function(req,res){
				res.render('admin/preference.html',{});
			});
			app.get('/admin/comment',function(req,res){
				res.render('admin/comment.html',{});
			});
			app.get('/admin/week',function(req,res){
				res.render('admin/week.html',{});
			});
			app.get('/admin/payment',function(req,res){
				res.render('admin/payment.html',{});
			});
			app.get('/admin/payment_history',function(req,res){
				res.render('admin/payment_history.html',{});
			});
		}

		return {
            route : route, 
        }
	}

})();




