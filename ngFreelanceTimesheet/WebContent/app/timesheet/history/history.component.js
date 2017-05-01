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
			var deleteWorkItem = confirm("Are you sure you want to delete this work item?");
			if (deleteWorkItem) {
				timesheetService.destroy(id)
				.then(function(response) {
					vm.reload();
				})
				.catch(function(error) {
					$location.path("/error");
				});
			}
		}
		
		vm.showCreateWorkItemForm = function(){
			$location.path("/new");
		}
		
	},
	controllerAs: 'vm',
	

})