// define a service for rest api calls
app.service('restallService',[ '$http','$rootScope','$location', function ($http,$rootScope,$location) {

	var authSuperUser = function (user) {
		
		$http({
		    method: "POST",
		    url: "http://localhost/api/users/login.php",
		    dataType: 'json',
		    data: user,
		    headers: { "Content-Type": "application/json" }
		}).then(function(result) {

		  if(result.data.status == 1) {
				$rootScope.LoggedIn = true;
				$rootScope.messaage = result.data.message;
				$rootScope.title = 'Add User';
				$rootScope.current_user_id = result.data.current_user_id;
				$rootScope.token = result.data.token;
				$location.path('/dashboard');
			} else {
				$rootScope.LoggedIn = false;
				$rootScope.messaage = result.data.message;
			

			} 

		 
		 }, function(error) {
		 	//Error
		 	// $rootScope.messaage = error.data.message;
		 });  

		

	  					

	};

	var addNormalUser = function (userdata) {

		$http({
		    method: "POST",
		    url: "http://localhost/api/users/create.php",
		    dataType: 'json',
		    data: userdata,
		    headers: { "Content-Type": "application/json" }
		}).then(function(result) {
		  if(result.data.status == 1) {
				$rootScope.LoggedIn = true;
				$rootScope.messaage = result.data.message;
				$location.path('/dashboard');
			} else {
				
				$rootScope.LoggedIn = false;
				$rootScope.messaage = result.data.message;
			} 		  
		 }, function(error) {
		 	// $rootScope.messaage = error.data.message;
		 });  

	};

	var updateNormalUser = function (userdata) {

		$http({
		    method: "POST",
		    url: "http://localhost/api/users/update.php",
		    dataType: 'json',
		    data: userdata,
		    headers: { "Content-Type": "application/json" }
		}).then(function(result) {
		  
		  if(result.data.status == 1) {
				$rootScope.LoggedIn = true;
				$rootScope.messaage = result.data.message;
				$location.path('/dashboard');
			} else {
				
				$rootScope.LoggedIn = false;
				$rootScope.messaage = result.data.message;
			} 		  
		 }, function(error) {
		 	
		 	// $rootScope.messaage = error.data.message;
		 });  

	};

	var alluserssrfn = function (userdata) {

		$http({
			method : "POST",
			url: "http://localhost/api/users/read.php",
		    dataType: 'json',
		    data: userdata,
		    headers: { "Content-Type": "application/json" }
		}).then(function(result) {

		  $rootScope.LoggedIn = true;
		  $rootScope.users = result.data;
		 }, function(error) {
		 	//Error		 	
		 	// $rootScope.messaage = error.data.message;
		 });

	};

	var deleteusersrfn = function (userdata) {

		$http({
			method : "POST",
			url: "http://localhost/api/users/delete.php",
		    dataType: 'json',
		    data: userdata,
		    headers: { "Content-Type": "application/json" }
		}).then(function(result) {

		  $rootScope.LoggedIn = true;
		  $rootScope.users = result.data;
		 }, function(error) {

		 	//Error
		 	// $rootScope.messaage = error.data.message;
		 });

	};

	var logoutsrfn = function (userdata) {

		$http({
			method : "POST",
			url: "http://localhost/api/users/logout.php",
		    dataType: 'json',
		    data: userdata,
		    headers: { "Content-Type": "application/json" }
		}).then(function(result) {

		  delete $rootScope.current_user_id;	
		  delete $rootScope.token;	
		  $rootScope.LoggedIn = false;
		  $location.path('/');
		 }, function(error) {
		 	
		 	//Error
		 	// $rootScope.messaage = error.data.message;
		 });	
	}

	var auditdatasrfn = function (userdata) {

		$http({
			method : "POST",
			url: "http://localhost/api/users/audit.php",
		    dataType: 'json',
		    data: userdata,
		    headers: { "Content-Type": "application/json" }
		}).then(function(result) {

		  $rootScope.LoggedIn = true;
		  $rootScope.audits = result.data;
		 }, function(error) {
		 	//Error		 	
		 	// $rootScope.messaage = error.data.message;
		 });

	};

	return {
		authSuperUser:authSuperUser,
		addNormalUser:addNormalUser,
		alluserssrfn:alluserssrfn,
		deleteusersrfn:deleteusersrfn,
		updateNormalUser:updateNormalUser,
		logoutsrfn:logoutsrfn,
		auditdatasrfn:auditdatasrfn,
	}

}]);