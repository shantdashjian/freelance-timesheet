angular.module('timesheet')
.component('report',{
	templateUrl: 'app/timesheet/report/report.component.html',
	controller: function(timesheetService){
		var vm = this;
		vm.workItems = [];
				
		vm.reload = function() {
			timesheetService.index()
			.then(function(response) {
				vm.workItems = response.data;
				vm.total = vm.getTotal();
			});			
		}
		
		vm.reload();
		
		vm.getTotal = function(){
			var total = 0;
			vm.workItems.forEach(function(workItem, index, array) {
					var itemTotal = workItem.period * workItem.rate;
					total += itemTotal;
			});
			return total;
		}
		
	},
	controllerAs: 'vm',
	

})