(function(){
	
	angular.module("eventManagement", ['ngRoute'])
	.controller("allEvents", ['$scope','$location', function($scope,$location){
		$scope.activeState = $location.path();
		VividSeats.eventService.all(function(results) {
			$scope.eventResults = results;
			$scope.$apply();
		}, 
		function(msg) {
			console.log(msg);
		});
	}])
	.controller("upcomingEvents",['$scope', '$location', function($scope, $location){
		$scope.activeState = $location.path();
		VividSeats.eventService.all(function(results) {
			$scope.eventResults = [];
			$scope.todaysDate = new Date().toISOString();
			angular.forEach(results, function(value, key) {
				if (value.date > $scope.todaysDate) {	
			  		$scope.eventResults.push(value);
			  	}
			});
			$scope.$apply();
		}, 
		function(msg) {
			console.log(msg);
		});
	}])
	.controller("localEvents",['$scope', '$location', function($scope, $location){
		$scope.activeState = $location.path();
		VividSeats.eventService.all(function(results) {
			$scope.eventResults = [];
			angular.forEach(results, function(value, key) {
			  	if (value.venue.city === 'Chicago') {	
			  		$scope.eventResults.push(value);
			  	}
			});
			$scope.$apply();
		}, 
		function(msg) {
			console.log(msg);
		});
	}])
	.directive('editEvents', function() {
	  return {
	  	restrict: 'E',
	  	scope: {
	  		eventResults: '='
	  	},
	    templateUrl: 'templates/event-results.html',
	    link: function(scope, attrs){

	    	scope.removeEvent = function(event) {
	    		VividSeats.eventService.remove(event, 
	    			function(result){
	    				var index = scope.eventResults.indexOf(event);
  						scope.eventResults.splice(index, 1);
	    				scope.$apply();
	    			}, 
	    			function(msg){
	    				console.log(msg);
	    		});
	    	}

	    	scope.editEvent = function(event) {
	    		this.editMode = !this.editMode;

	    		VividSeats.eventService.update(event, 
	    			function(result){
	    				
	    			}, 
	    			function(msg){
	    				console.log(msg);
	    		});
	    	}

	    	scope.toggleEdit = function(event) {
	    		this.editMode = !this.editMode;
	    	}

	    }
	  };
	})
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/',{
	    templateUrl: "templates/event-table.html",
	    controller: "allEvents"
	  }).when('/upcoming',{
	  	templateUrl: "templates/event-table.html",
	  	controller: "upcomingEvents"
	  }).when('/local',{
	  	templateUrl: "templates/event-table.html",
	  	controller: "localEvents"
	  }).otherwise({
	  	redirectTo: "/",
	  });
	 }]);

})();