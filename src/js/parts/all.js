var map;
var app = angular.module('app', ['ngRoute', 'chart.js']);

function hideMobMenu() {
	document.getElementById('#mobMenuButton').attr( 'aria-expanded', 'false');
}

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'template/dash.html'		
	})
	.when('/map', {
		templateUrl : 'template/map.html'		
	})
	.when('/chart', {
		templateUrl : 'template/chart.html'	 
	})
	.when('/news', {
		templateUrl : 'template/news.html'	 
	})
	.when('/stat', {
		templateUrl : 'template/stat.html'		
	});
}]);

app.controller('getStat', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
	var prevOrder;
	var reverse = true;

	$scope.order = function (order, scope) {
		if (prevOrder == order && reverse == false){
			switch(scope) {
				case 'statYear':
					this.statYear = $filter('orderBy')(this.statYear, order, 'reverse');
				break;	
				case 'statLast1':
					this.statLast1 = $filter('orderBy')(this.statLast1, order, 'reverse');
				break;
				case 'statLast2':
					this.statLast2 = $filter('orderBy')(this.statLast2, order, 'reverse');
				break;
				case 'statLast3':
					this.statLast3 = $filter('orderBy')(this.statLast3, order, 'reverse');
				break;
			}			
			reverse = !reverse;
		} else if (prevOrder == order && reverse == true){
			switch(scope) {
				case 'statYear':
					this.statYear = $filter('orderBy')(this.statYear, order);
				break;
				case 'statLast1':
					this.statLast1 = $filter('orderBy')(this.statLast1, order);
				break;
				case 'statLast2':
					this.statLast2 = $filter('orderBy')(this.statLast2, order);
				break;
				case 'statLast3':
					this.statLast3 = $filter('orderBy')(this.statLast3, order);
				break;
			}
			reverse = !reverse;
		} else if (prevOrder != order && reverse == false){
			switch(scope) {
				case 'statYear':
					this.statYear = $filter('orderBy')(this.statYear, order, 'reverse');
				break;
				case 'statLast1':
					this.statLast1 = $filter('orderBy')(this.statLast1, order, 'reverse');
				break;
				case 'statLast2':
					this.statLast2 = $filter('orderBy')(this.statLast2, order, 'reverse');
				break;
				case 'statLast3':
					this.statLast3 = $filter('orderBy')(this.statLast3, order, 'reverse');
				break;
			}
			reverse = !reverse;
		} else {
			switch(scope) {
				case 'statYear':
					this.statYear = $filter('orderBy')(this.statYear, order);
				break;
				case 'statLast1':
					this.statLast1 = $filter('orderBy')(this.statLast1, order);
				break;
				case 'statLast2':
					this.statLast2 = $filter('orderBy')(this.statLast2, order);
				break;
				case 'statLast3':
					this.statLast3 = $filter('orderBy')(this.statLast3, order);
				break;
			}
			reverse = !reverse;		
		}
		prevOrder = order;
	};

	$http.get('../others/2016Total.csv')
	.then(function(response) {
		var allTheText = response.data.split(/\r?\n|\r/);
		var rowCellsArray = [];
		var dataCellsArray = [];
		var obRowCells = {};
		for (var singleRow = 2; singleRow < allTheText.length; singleRow++) {
			var rowCells = allTheText[singleRow].split(';');
			rowCellsArray.push(rowCells);
		}
		for (var k=0; k<rowCellsArray.length; k++) {
			obRowCells = {};
			obRowCells.num = Number(rowCellsArray[k][0]);
			obRowCells.month = rowCellsArray[k][1];
			obRowCells.totalGross = Number(rowCellsArray[k][2]);
			obRowCells.percentYearGross = Number(rowCellsArray[k][3]);
			obRowCells.movies = Number(rowCellsArray[k][4]);
			obRowCells.topMovie = rowCellsArray[k][7];
			obRowCells.topMovieGross = Number(rowCellsArray[k][8]);
			obRowCells.percentMonthGross = Number(rowCellsArray[k][9]);
			dataCellsArray.push(obRowCells);
		}			
		$scope.statYear = dataCellsArray;	

		var monthArray = [];
		var totalGrossArray = [];
		var topMovieGrossArray = [];
		var moviesArray = [];
		for (var i = 0; i < dataCellsArray.length; i++) {
			monthArray.push(dataCellsArray[i].month);
			totalGrossArray.push(dataCellsArray[i].totalGross);
			topMovieGrossArray.push(dataCellsArray[i].topMovieGross);
			moviesArray.push(dataCellsArray[i].topMovie);
		}
		$scope.labelsY = monthArray;
		$scope.seriesY = ['Total gross', '1st movie gross'];	
		$scope.dataY = [
			totalGrossArray, topMovieGrossArray
		];
		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};
		$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
		$scope.options = {
			scales: {
				yAxes: [
					{
						id: 'y-axis-1',
						type: 'linear',
						display: true,
						position: 'left'
					}
				]
			}
		};
	});

	$http.get('../others/2017.01.csv')
	.then(function(response) {
		var allTheText = response.data.split(/\r?\n|\r/);
		var rowCellsArray = [];
		var dataCellsArray = [];
		var obRowCells = {};
		for (var singleRow = 1; singleRow < allTheText.length; singleRow++) {
			var rowCells = allTheText[singleRow].split(';');
			rowCellsArray.push(rowCells);
		}
		for (var k=0; k<rowCellsArray.length; k++) {
			obRowCells = {};
			obRowCells.number1 = Number(rowCellsArray[k][0]);
			obRowCells.name1 = rowCellsArray[k][1];
			obRowCells.totalGross1 = Number(rowCellsArray[k][3]);
			obRowCells.firstWeekGross1 = Number(rowCellsArray[k][5]);
			obRowCells.cinemas1 = Number(rowCellsArray[k][4]);
			obRowCells.startDate1 = rowCellsArray[k][6];
			obRowCells.finishDate1 = rowCellsArray[k][7];
			dataCellsArray.push(obRowCells);
		}			
		$scope.statLast1 = dataCellsArray;

		var nameArray = [];
		var totalGrossArray = [];
		var firstWeekGrossArray = [];
		for (var i = 0; i < dataCellsArray.length; i++) {
			nameArray.push(dataCellsArray[i].name1);
			totalGrossArray.push(dataCellsArray[i].totalGross1);
			firstWeekGrossArray.push(dataCellsArray[i].firstWeekGross1);
		}
		$scope.labels1 = nameArray;
		$scope.series1 = ['Total gross', '1st week gross'];	
		$scope.data1 = [
			totalGrossArray, firstWeekGrossArray
		];
	});

	$http.get('../others/2016.12.csv')
	.then(function(response) {
		var allTheText = response.data.split(/\r?\n|\r/);
		var rowCellsArray = [];
		var dataCellsArray = [];
		var obRowCells = {};
		for (var singleRow = 1; singleRow < allTheText.length; singleRow++) {
			var rowCells = allTheText[singleRow].split(';');
			rowCellsArray.push(rowCells);
		}
		for (var k=0; k<rowCellsArray.length; k++) {
			obRowCells = {};
			obRowCells.number2 = Number(rowCellsArray[k][0]);
			obRowCells.name2 = rowCellsArray[k][1];
			obRowCells.totalGross2 = Number(rowCellsArray[k][3]);
			obRowCells.firstWeekGross2 = Number(rowCellsArray[k][5]);
			obRowCells.cinemas2 = Number(rowCellsArray[k][4]);
			obRowCells.startDate2 = rowCellsArray[k][6];
			obRowCells.finishDate2 = rowCellsArray[k][7];
			dataCellsArray.push(obRowCells);
		}			
		$scope.statLast2 = dataCellsArray;

		var nameArray = [];
		var totalGrossArray = [];
		var firstWeekGrossArray = [];
		for (var i = 0; i < dataCellsArray.length; i++) {
			nameArray.push(dataCellsArray[i].name2);
			totalGrossArray.push(dataCellsArray[i].totalGross2);
			firstWeekGrossArray.push(dataCellsArray[i].firstWeekGross2);
		}
		$scope.labels2 = nameArray;
		$scope.series2 = ['Total gross', '1st week gross'];	
		$scope.data2 = [
			totalGrossArray, firstWeekGrossArray
		];
	});

	$http.get('../others/2016.11.csv')
	.then(function(response) {
		var allTheText = response.data.split(/\r?\n|\r/);
		var rowCellsArray = [];
		var dataCellsArray = [];
		var obRowCells = {};
		for (var singleRow = 1; singleRow < allTheText.length; singleRow++) {
			var rowCells = allTheText[singleRow].split(';');
			rowCellsArray.push(rowCells);
		}
		for (var k=0; k<rowCellsArray.length; k++) {
			obRowCells = {};
			obRowCells.number3 = Number(rowCellsArray[k][0]);
			obRowCells.name3 = rowCellsArray[k][1];
			obRowCells.totalGross3 = Number(rowCellsArray[k][3]);
			obRowCells.firstWeekGross3 = Number(rowCellsArray[k][5]);
			obRowCells.cinemas3 = Number(rowCellsArray[k][4]);
			obRowCells.startDate3 = rowCellsArray[k][6];
			obRowCells.finishDate3 = rowCellsArray[k][7];
			dataCellsArray.push(obRowCells);
		}			
		$scope.statLast3 = dataCellsArray;

		var nameArray = [];
		var totalGrossArray = [];
		var firstWeekGrossArray = [];
		for (var i = 0; i < dataCellsArray.length; i++) {
			nameArray.push(dataCellsArray[i].name3);
			totalGrossArray.push(dataCellsArray[i].totalGross3);
			firstWeekGrossArray.push(dataCellsArray[i].firstWeekGross3);
		}
		$scope.labels3 = nameArray;
		$scope.series3 = ['Total gross', '1st week gross'];	
		$scope.data3 = [
			totalGrossArray, firstWeekGrossArray
		];
	});
}]);

app.controller('getChart', ['$scope', '$http', function($scope, $http) {
	$http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=bbc248f411ec3657bd9844f9bd4a2bda&language=en-US&page=1')
	.then(function(response) {
		$scope.charts = response.data.results;
	});
}]);

app.controller('getTrailer', ['$scope', '$http', function($scope, $http) {
	var firstMovieID;
	var theTrailerLink;
	$http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=bbc248f411ec3657bd9844f9bd4a2bda&language=en-US&page=1')
	.then(function(response) {
		firstMovieID = response.data.results[0].id;
		return firstMovieID;
	})
	.then(function(firstMovieID) {
		var theRequest = 'https://api.themoviedb.org/3/movie/' + firstMovieID + '/videos?api_key=bbc248f411ec3657bd9844f9bd4a2bda&language=en-US';
		$http.get(theRequest)
		.then(function(response) {
			theTrailerLink = '<iframe src="https://www.youtube.com/embed/' + response.data.results[0].key + '" frameborder="0" allowfullscreen></iframe>';
			$scope.trailer = theTrailerLink;
		});
	});
	this.showMe = false;
	$scope.showPopup = function() {
		this.showMe = !this.showMe;
		var myElement = angular.element(document.querySelector('#youtubeDiv'));
		myElement.append(theTrailerLink);
	};
	$scope.hidePopup = function() {
		this.showMe = false;
	};
}]);

app.controller('getCurrent', ['$scope', '$location', function($scope, $location) {
	$scope.isCurrentPage = function(path) {
		return path == $location.path();
	};
}]);	

app.controller('getNews', ['$scope', '$http', function($scope, $http) {

	var timerId = setTimeout(function theNews() {
		$http.get('https://newsapi.org/v1/articles?source=daily-mail&sortBy=latest&apiKey=3e39927ec00f48d4b859103489c06f38')
		.then(function(response) {
			$scope.news = response.data.articles;
		});

		$http.get('https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=3e39927ec00f48d4b859103489c06f38')
		.then(function(response) {
			$scope.news2 = response.data.articles;
		});
		console.log('news updated');
		timerId = setTimeout(theNews, 120000);
	}, 0);
	
}]);

app.controller('getMap', ['$scope', '$http', function($scope, $http) {
	$http.get('../others/cities.csv')
	.then(function(response) {
		var geoArray = [];
		var citiesArray = [];
		var allTheText = response.data.split(/\r?\n|\r/);
		for (var singleRow = 1; singleRow < allTheText.length; singleRow++) {
			var rowCells = allTheText[singleRow].split(';');			
			geoArray.push({['lat']: eval(rowCells[2]), ['lng']: eval(rowCells[3])});
		}
		for (var anotherRow = 1; anotherRow < allTheText.length; anotherRow++) {
			var anotherCells = allTheText[anotherRow].split(';');			
			citiesArray.push([anotherCells[0], anotherCells[1]]);
		}		
		$scope.cities = citiesArray;

		function initMap() {
			var myLatLng = {lat: 30, lng: 0};
			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 2,
				center: myLatLng
			});
		}

		initMap();

		var markers = geoArray.map(function(location) {
			return new google.maps.Marker({
				position: location,
				label: 'Movie business is here!'
			});
		});

		var markerCluster = new MarkerClusterer(map, markers,
			{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
		);
	});
}]);
