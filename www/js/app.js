angular.module("multi", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","ionicLazyLoad","multi.controllers", "multi.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "multi" ;
		$rootScope.appLogo = "data/images/header/logo.png" ;
		$rootScope.appVersion = "1" ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})




.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("multi",{
		url: "/multi",
			abstract: true,
			templateUrl: "templates/multi-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("multi.about_us", {
		url: "/about_us",
		views: {
			"multi-side_menus" : {
						templateUrl:"templates/multi-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("multi.dashboard", {
		url: "/dashboard",
		views: {
			"multi-side_menus" : {
						templateUrl:"templates/multi-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("multi.faqs", {
		url: "/faqs",
		views: {
			"multi-side_menus" : {
						templateUrl:"templates/multi-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("multi.menu_1", {
		url: "/menu_1",
		views: {
			"multi-side_menus" : {
						templateUrl:"templates/multi-menu_1.html",
						controller: "menu_1Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("multi.menu_2", {
		url: "/menu_2",
		views: {
			"multi-side_menus" : {
						templateUrl:"templates/multi-menu_2.html",
						controller: "menu_2Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("multi.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"multi-side_menus" : {
						templateUrl:"templates/multi-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})


// router by user


	$urlRouterProvider.otherwise("/multi/dashboard");
});
