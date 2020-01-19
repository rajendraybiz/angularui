// this is main controller file 

var app = angular.module('mainApp', ['ngRoute']);



app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl : 'login.html',
	})
	.when('/dashboard',{
		resolve : {
			'check' : function ($location,$rootScope) {
				if (!$rootScope.LoggedIn) {
					$location.path('/');
				}
			}
		},
		templateUrl : 'dashboard.html'		
	})
	.when('/edit',{
		resolve : {
			'check' : function ($location,$rootScope) {
				if (!$rootScope.LoggedIn) {
					$location.path('/');
				}
			}
		},
		templateUrl : 'edit.html',
	})
	.when('/audit',{
		resolve : {
			'check' : function ($location,$rootScope) {
				if (!$rootScope.LoggedIn) {
					$location.path('/');
				}
			}
		},
		templateUrl : 'audit.html',
	})
	.otherwise({
		redirectTo: '/'
	});

});


app.controller('loginController',[ '$scope' ,'restallService', '$location', '$rootScope', function($scope, restallService, $location, $rootScope) {
	
	$scope.title = 'Login';

	$scope.login = function() {	

		var email = $scope.email;
		var password = $scope.password;
		var post_data = {
			email : email,
			password : password,
		};

		var $restallService = restallService.authSuperUser(post_data);	

	}
	
}]);


app.controller('adduserController',['$scope', 'restallService', '$location', '$rootScope',  function($scope, restallService, $location, $rootScope) {
	
	$scope.title = 'Add User';

	// *************** //
	var current_user_id = $rootScope.current_user_id;
	var token = $rootScope.token;
	var post_data = {
		current_user_id : current_user_id,
		token : token,
	};
	$scope.allusers = restallService.alluserssrfn(post_data);
	// *************** //

	$scope.addUser = function() {	

		var firstname = $scope.firstname;
		var lastname = $scope.lastname;
		var email = $scope.email;
		var password = $scope.password;
		var current_user_id = $rootScope.current_user_id;
		var token = $rootScope.token;
		var post_data = {
			current_user_id : current_user_id,
			token : token,
			firstname : firstname,
			lastname : lastname,
			email : email,
			password : password,
		};

		var $restallService = restallService.addNormalUser(post_data);	

		$scope.allusers = restallService.alluserssrfn(post_data);

	}




	$scope.logout = function () {

		var post_data = {
			id : $rootScope.current_user_id,
			token : $rootScope.token,
		};

		var $restallService = restallService.logoutsrfn(post_data);	


	}


	
}]);

app.controller('auditController',['$scope', 'restallService', '$location', '$rootScope',  function($scope, restallService, $location, $rootScope) {

	$scope.audit = function () {

		var current_user_id = $rootScope.current_user_id;
		var token = $rootScope.token;
		// var id = uid;
		var post_data = {
			current_user_id : current_user_id,
			token : token,
		};
		$scope.auditdata = restallService.alluserssrfn(post_data);
		$location.path('/audit');
	}

	$scope.rdrctodshbrd = function () {
		$location.path('/dashboard');
	}

	$scope.logout = function () {

		var post_data = {
			id : $rootScope.current_user_id,
			token : $rootScope.token,
		};

		var $restallService = restallService.logoutsrfn(post_data);	


	}

}]);

app.controller('getnormaluserController',['$scope', 'restallService', '$location', '$rootScope',  function($scope, restallService, $location, $rootScope) {
	
	
	$scope.alluserscnfn = function() {			

		var current_user_id = $rootScope.current_user_id;
		var token = $rootScope.token;
		var post_data = {
			current_user_id : current_user_id,
			token : token,
		};
		var $restallService = restallService.alluserssrfn(post_data);	
	};


	$scope.deleteuser = function(uid) {

		var current_user_id = $rootScope.current_user_id;
		var token = $rootScope.token;
		// var id = uid;
		var post_data = {
			id : uid,
			current_user_id : current_user_id,
			token : token,
		};

		var $restallService = restallService.deleteusersrfn(post_data);
		$scope.allusers = restallService.alluserssrfn(post_data);
	};


	$scope.update_data = function(uid,firstname,lastname,status,email) {

		// console.log(uid,firstname,lastname,status,email);
		$rootScope.title = 'Update User';
		$rootScope.uid = uid;
		$rootScope.ufirstname = firstname;
		$rootScope.ulastname = lastname;
		$rootScope.ustatus = status;
		$rootScope.uemail = email;

		$location.path('/edit');

	}

	$scope.updateUser = function() {	

		var id = $scope.uid;
		var firstname = $scope.ufirstname;
		var lastname = $scope.ulastname;
		var lastname = $scope.ulastname;
		var status = $scope.ustatus;
		var email = $scope.uemail;
		var current_user_id = $rootScope.current_user_id;
		var token = $rootScope.token;

		var update_data = {
			id : id,
			firstname : firstname,
			lastname : lastname,
			email : email,
			status : status,
			current_user_id : current_user_id,
			token : token,
		};

		restallService.updateNormalUser(update_data);	
	}

	$scope.audit = function () {

		var current_user_id = $rootScope.current_user_id;
		var token = $rootScope.token;
		// var id = uid;
		var post_data = {
			current_user_id : current_user_id,
			token : token,
		};
		$scope.auditdata = restallService.auditdatasrfn(post_data);
		$location.path('/audit');
	}
	
}]);


