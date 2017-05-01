angular.module('timesheet')
.component('history',{
	templateUrl: 'app/timesheet/history/history.component.html',
	controller: function(timesheetService, $location){
		var vm = this;
		vm.workItems = [];
				
		vm.reload = function() {
			timesheetService.index()
			.then(function(response) {
				vm.workItems = response.data;
			});			
		}
		
		vm.reload();
		
		vm.showWorkItem = function(id) {
			$location.path("/history/"+id);
		}
		vm.editWorkItem = function(id) {
			$location.path("/history/"+id + "/edit");
		}
		vm.deleteWorkItem = function(id) {
			$location.path("/history/"+id + "/delete");
		}
		
	},
	controllerAs: 'vm',
	

})