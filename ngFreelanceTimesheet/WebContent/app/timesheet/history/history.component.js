angular.module('timesheet')
.component('history',{
	templateUrl: 'app/timesheet/history/history.component.html',
	controller: function(timesheetService){
		var vm = this;
		vm.workItems = [];
				
		vm.reload = function() {
			timesheetService.index()
			.then(function(response) {
				vm.workItems = response.data;
			});			
		}
		
		vm.reload();
		
		
	},
	controllerAs: 'vm',
	

})