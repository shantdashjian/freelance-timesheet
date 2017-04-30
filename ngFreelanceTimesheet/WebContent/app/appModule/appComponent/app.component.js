angular.module('appModule')
.component('appComponent',{
	templateUrl: 'app/appModule/appComponent/app.component.html',
	controller: function(){
		var vm = this;
		
		vm.makeActiveByElementId = function(elementId){
			console.log("hit make active");
			console.log(elementId);
			var $allNavbarButtons = angular.element(elementId).parent().children();
			$allNavbarButtons.each(function(){
				$(this).removeClass('active');
			});
			angular.element(elementId).addClass('active');
		}
		
		vm.clearAllByElementId = function(elementId){
			var $allNavbarButtons = angular.element(elementId).parent().next().children().first().children();
			$allNavbarButtons.each(function(){
				$(this).removeClass('active');
			});
//			angular.element($event.currentTarget).addClass('active');
		}
	},
	controllerAs: 'vm'
})