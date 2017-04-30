angular.module('nav')
.component('navigation',{
	templateUrl: 'app/nav/navigation/navigation.component.html',
	controller: function(){
		var vm = this;
		
		vm.makeActive = function($event){
			var $allNavbarButtons = angular.element($event.currentTarget).parent().children();
			$allNavbarButtons.each(function(){
				$(this).removeClass('active');
			});
			angular.element($event.currentTarget).addClass('active');
		}
		
		vm.clearAll = function($event){
			var $allNavbarButtons = angular.element($event.currentTarget).parent().next().children().first().children();
			$allNavbarButtons.each(function(){
				$(this).removeClass('active');
			});
//			angular.element($event.currentTarget).addClass('active');
		}
	},
	controllerAs: 'vm'
})