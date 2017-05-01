angular.module('timesheet')
.component('historyEdit',{
	templateUrl: 'app/timesheet/historyEdit/historyEdit.component.html',
	controller: function(timesheetService, $routeParams, $location){
		var vm = this;
		
		timesheetService.show($routeParams.id)
		.then(function(response){
			vm.workItem = response.data;
		});
		
		vm.submit = function(){
			timesheetService.update(vm.workItem);
			$location.path("/history");
		}
	},
	controllerAs: 'vm'
})