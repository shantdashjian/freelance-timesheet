angular.module('appModule', ['nav', 'static', 'timesheet', 'ngRoute'])
.config(function($routeProvider){
	  $routeProvider
	    .when('/', {
	      template : '<home>Loading home</home>'
	    })
	    .when('/new', {
	      template : '<new>Loading new</new>'
	    })
	    .when('/history', {
	      template : '<history>Loading history</history>'
	    })
	    .when('/report', {
	      template : '<report>Loading report</report>'

	    })
	    .when('/about', {
	      template : '<about>Loading about</about>'

	    })
	    .when('/history/:id', {
	      template : '<history-show>Loading history show</history-show>'
	    })
	    .otherwise({
	      template : '<not-found>Loading not found</not-found>'
	    })
	});