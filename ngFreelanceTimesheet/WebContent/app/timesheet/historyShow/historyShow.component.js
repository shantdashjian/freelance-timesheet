angular.module('timesheet')
.component('historyShow',{
	templateUrl: 'app/timesheet/historyShow/historyShow.component.html',
	controller: function(timesheetService, $routeParams){
		var vm = this;
		
		timesheetService.show($routeParams.id)
		.then(function(response){
			vm.workItem = response.data;
		});
		
	},
	controllerAs: 'vm'
})