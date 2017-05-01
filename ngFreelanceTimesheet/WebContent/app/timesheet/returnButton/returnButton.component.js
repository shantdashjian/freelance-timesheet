angular.module('timesheet')
.component('returnButton',{
	templateUrl: 'app/timesheet/returnButton/returnButton.component.html',
	controller: function($location){
		var vm = this;
		
		vm.history = function() {
			$location.path("/history");
			
		} 
		
	},
	controllerAs: 'vm',
	

})