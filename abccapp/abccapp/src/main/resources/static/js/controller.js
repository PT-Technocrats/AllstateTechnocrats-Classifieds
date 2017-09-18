(function() {

  var app = angular.module('myApp', ['ui.router']);

  

  app.run(function($rootScope, $location, $state, LoginService) {

    $rootScope.$on('$stateChangeStart', 

      function(event, toState, toParams, fromState, fromParams){ 

          console.log('Changed state to: ' + toState);



      });

   

      if(!LoginService.isAuthenticated()) {

        $state.transitionTo('login');

      }

  });



  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    

    $stateProvider

      .state('login', {

        url : '/login',

        templateUrl : 'login.html',

        controller : 'LoginController'

      })

      .state('home', {

        url : '/home',

        templateUrl : 'Home.html',

        controller : 'HomeController'

      })

	  .state('car', {

        url : '/car',

        templateUrl : 'CarPooling.html',

        controller : 'CarController'

      })
      .state('house',{

        url : '/house',

        templateUrl : 'HouseRentals.html',

        controller : 'HouseController'



      });

  }]);



  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, $location, LoginService) {

    $rootScope.title = "Welcome to Allstate Catalog";

    

    $scope.formSubmit = function() {

      if(LoginService.login($scope.username, $scope.password)) {

        $scope.error = '';

        $rootScope.username =  $scope.username;

        $scope.password = '';

        $state.transitionTo('home');

        $location.path('/home');

      } else {

        $scope.error = "Incorrect Username/Password !";

      }   

    };

    

  });

  

  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {

      var title = 'Welcome  '+ $rootScope.username;

    $rootScope.title = title;

    

  });

  

   app.controller('HouseController', function($scope, $http, $location, $rootScope, $stateParams, $state, $filter, LoginService) {

      var title = 'Welcome to House Rental Ads  ';

    $rootScope.title = title;



    $scope.getAllRentals = function(){

      var url ="http://localhost:8080/HouseRentals/all";

      var config ={

          headers : {

                    'Content-Type': 'application/json;charset=utf-8;'

                }

      }



      $http.get(url,config).then(function(response){

        $scope.allRentals = response.data;

        

        angular.forEach($scope.allRentals, function(value, key){

            console.log("in the foreach");

            console.log(value.postedOn);

            if(value.postedOn )

                   value.postedOn = $filter('date')(value.postedOn, "yyyy-MM-dd");

                 

       });

      }, function(response){

          $scope.getResultMsg ="GET service failed";

      });

    }

    //callhttp function(call API)



    //on submit (){ post, callHttp}

    

    $scope.rentalSubmit =function(){

    	

    	var posturl = "http://localhost:8080/HouseRentals/post";

		

		var config = {

                headers : {

                    'Content-Type': 'application/json;charset=utf-8;'

                }

        }

		var data = {

				phoneNumber: $scope.phoneNumber,

				postedBy : $rootScope.username,

				emailId : $scope.emailId,	

				postDesc : $scope.postDesc,

				

				

        };

		

		

		$http.post(posturl, data, config).then(function (response) {

			$scope.postResultMessage = " Post Sucessful!";

			$scope.getAllRentals();

		}, function (response) {

			$scope.postResultMessage = "Post Fail!";

		});

		

	

		$scope.postDesc="";

		$scope.phoneNumber="";

		$scope.emailId="";

		$scope.postedBy="";

    }

    

    $scope.removeRental = function(id){

    	var deleteurl = 'http://localhost:8080/HouseRentals/delete';

    	

    	

    	$http({

            method : 'DELETE',

            url : 'http://localhost:8080/HouseRentals/delete/' + id

        }).then(function (response){

    		

    		$scope.deleteResultMessage = " Delete Sucessful!";

			$scope.getAllRentals();

    	}, function(response){

    		

    		$scope.deleteResultMessage = " Delete failed!";

    	});

    }

    

    

  

    

  });



app.controller('CarController', function($scope, $http, $filter, $rootScope, $stateParams) {

	 var title = 'Welcome to Car Pooling  ';

	    $rootScope.title = title;
	    
$scope.shownorequest = false;

$scope.shownopooling = false;

$scope.showofferedtable = false;

$scope.showrequesttable= false;

$scope.showRequestLayout = false;

$scope.showOfferLayout = false;

$scope.showNoSearch = false;

$scope.showSearchList = false;

$scope.showSearchPanel = false;

$scope.disableOffer =false;

$scope.disableRequest = false;

$scope.showPool = false;

$scope.showNoPoolDetails = false;

$scope.showPoolList = false;



$scope.showRequestList = function(){

	if($scope.pendingRequests.length > 0 ){

		$scope.shownorequest = false;

		$scope.showrequesttable = true;

	}

	if($scope.pendingRequests.length == 0 ){


			$scope.showrequesttable = false;

			$scope.shownorequest = true;	

	}

}



$scope.showOfferedList = function(){

	if($scope.pendingOffers.length > 0 ){

		$scope.shownopooling = false;

		$scope.showofferedtable = true;

	}

	if($scope.pendingOffers.length == 0 ){

			$scope.showofferedtable = false;

			$scope.shownopooling = true;	

	}

		

}



$scope.enableOfferLayout = function(){

	if($scope.showOfferLayout == false){

		$scope.showRequestLayout = false;

		$scope.disableRequest = true;

		$scope.showOfferLayout = true;	

	} else {

		$scope.showOfferLayout = false;

		$scope.disableRequest = false;

	}

}



$scope.enableRequestLayout = function(){

	if($scope.showRequestLayout == false){

		$scope.showOfferLayout = false;

		$scope.disableOffer =true;

		$scope.showRequestLayout = true;	

	} else {

		$scope.showRequestLayout = false;

		$scope.disableOffer =false;

	}

}



$scope.saveOfferDetails = function(){

	

	$scope.offerDetails.starttime = $filter('date') ($scope.offerDetails.starttime, 'h:mm a');

	$scope.pendingOffers.push($scope.offerDetails);

	console.log($scope.pendingOffers);

	$scope.showOfferLayout = false;

	$scope.disableRequest = false;

	

	$scope.offerDetails	= {name :'',to: '',starttime : '',seats:''};

	alert("Offer Submitted !!");

}



$scope.saveRequestDetails = function(){

	$scope.showSearchPanel = true;

	$scope.showRequestLayout = false;

	$scope.disableOffer =false;

	if($scope.pendingOffers.length > 0){

		angular.forEach($scope.pendingOffers, function(value, key){

			console.log(value.to);

			console.log($scope.requestDetails.to);

		if($scope.requestDetails.to == value.to){

			console.log(value.to);

			value.seatsNeeded = $scope.requestDetails.seatsNeeded;

			$scope.searchList.push(value);

			$scope.showSearchList = true;

			}

		});

	}

	else{

		$scope.showNoSearch = true;	

	}

	

}



$scope.savePendingRequest = function(index){

	

	$scope.pendingRequests.push($scope.searchList[index]);

	$scope.pendingOffers.seats =  $scope.pendingOffers.seats - 1;

	$scope.showSearchList = false;

	$scope.showNoSearch = false;

	$scope.showSearchPanel = false;

}



$scope.enablePoolLayout = function(){

	

	if($scope.showPool == false){

		$scope.showPool = true;

		$scope.showNoPoolDetails = true;

	}

	else{

		$scope.showPool = false;

		$scope.showNoPoolDetails = false;

		$scope.showPoolList = false;

	}

}







$scope.savePoolingDetails = function(requests, index){

	requests.offeredBy = "username" //username

	console.log(requests);	

	console.log(index);

	$scope.poolList.push(requests);

	$scope.showNoPoolDetails = false;

	$scope.showPoolList = true;

	$scope.showrequesttable = false;

	$scope.shownorequest = false;

}

	

$scope.users = [

					 {name :'User1'},

					 {name :'User2'},

			         

	];

$scope.poolList = [];	

	

$scope.requestDetails = [ {name :'',to: '',starttime : '', seatsNeeded:''}];



$scope.offerDetails	= {name :'',to: '',starttime : '',seats:'0'};



$scope.pendingOffers = [];



$scope.pendingRequests = [];



$scope.searchList = [];

	

});



  app.factory('LoginService', function() {

    var isAuthenticated = false;

	

    return {

      login : function(username, password) {

        isAuthenticated = username === password;

        

        return isAuthenticated;

      },

      isAuthenticated : function() {

        return isAuthenticated;

      }

    };

    

  });

  

})();