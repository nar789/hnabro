;(function(){
	module.exports=function(_g){

		function route(){
            require('./recommand/Route')(_g).route();
            require('./user/Route')(_g).route();
            require('./week/Route')(_g).route();
            require('./preference/Route')(_g).route();
            require('./perfume/Route')(_g).route();

		}

		return {
            route : route, 
        }
	}

})();




