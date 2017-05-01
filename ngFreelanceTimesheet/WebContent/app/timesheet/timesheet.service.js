angular.module('timesheet')
.factory('timesheetService', function($http) {
	var service = {};

	var BASE_URL = 'http://shaundashjian.com:8080/FreelanceTimesheetREST/api/workitems/';

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
		
	return service;
})
