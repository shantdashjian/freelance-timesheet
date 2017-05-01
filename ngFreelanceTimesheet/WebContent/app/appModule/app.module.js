angular.module('appModule', ['nav', 'static', 'timesheet', 'ngRoute'])
.config(function($routeProvider){
	  $routeProvider
	    .when('/', {
	      template : '<new>Loading home</new>'
	    })	    
	    .when('/history', {
	      template : '<history>Loading history</history>'
	    })
	    .when('/new', {
	      template : '<new>Loading new</new>'
	    })
	    .when('/report', {
	      template : '<report>Loading report</report>'

	    })
	    .when('/history/:id', {
	      template : '<history-show>Loading history show</history-show>'
	    })
	    .when('/history/:id/edit', {
	    	template : '<history-edit>Loading history edit</history-edit>'
	    })
	    .otherwise({
	      template : '<error>Loading error</error>'
	    })
	});