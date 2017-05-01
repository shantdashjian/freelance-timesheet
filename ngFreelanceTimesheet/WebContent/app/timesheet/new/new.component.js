angular.module('timesheet')
.component('new',{
	templateUrl: 'app/timesheet/new/new.component.html',
	controller: function(timesheetService, $location){
		var vm = this;
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		
		vm.workItem ={
				period: 1,
				rate: 1.00,
				month: mm,
				day: dd,
				year: yyyy,
				notes: ""
				
		}
		vm.submit = function(){
			timesheetService.create(vm.workItem)
			.then(function(response) {
				$location.path("/history");
			})
			.catch(function(error) {
				$location.path("/error");
			});
		}
		
	},
	controllerAs: 'vm'
})