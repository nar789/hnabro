;(function(){
	module.exports=function(_g){

		var app = _g.app;

		function route(){
			app.get('/',function(req,res){
				res.render('index.html',{});
			});

			//1. enetry point
			app.listen(2131,function(){
			  preLoad();
			  console.log('hnabro! Server listen on *:2131');
			});
		}

		function preLoad(){
			//to-do
		}

		return {
			route : route,
		};
	}

})();



