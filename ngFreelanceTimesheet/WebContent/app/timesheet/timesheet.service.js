angular.module('timesheet')
.factory('timesheetService', function($http) {
	var service = {};

	var BASE_URL = 'http://localhost:8080/FreelanceTimesheetREST/api/workitems/';

	// private
	var workItems = [];

	// public
	service.index = function() {
		return $http({
			method : 'GET',
			url : BASE_URL
		})
	};

	service.show = function(id) {
		return $http({
			method : 'GET',
			url : BASE_URL + id
		})
	};

	service.create = function(workItem) {
		return $http({
			method : 'POST',
			url : BASE_URL,
			headers : {
				'Content-Type' : 'application/json'
			},
			data : workItem
		})

	};

	service.update = function(workItem) {
		
		return $http({
			method : 'PUT',
			url : BASE_URL + workItem.id,
			headers : {
				'Content-Type' : 'application/json'
			},
			data : workItem
		})
	};

	service.destroy = function(id) {
		return $http({
			method : 'DELETE',
			url : BASE_URL + id,
		})
	};
	
//	service.getTotalPay = function(){
//		var total = 0;
//		service.index()
//		.then(function(response){
//			var data = response.data;
//			data.forEach(function(workItem, index, array) {
//				var itemTotal = workItem.period * workItem.rate;
//				total += itemTotal;
//				
//			});
//			console.log(total);
//			return total;
//		})
//		
//	}
	
	return service;
})
