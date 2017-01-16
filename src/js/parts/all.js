var map;

var app = angular.module('app', ['ngRoute', 'chart.js']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		template:
			'<div class="mapD" ng-controller="getMap as map">\n' +
				'<div id="map">\n' +
				'</div>\n' +
			'</div>\n' +     
			'<div class="chartD" ng-controller="getChart as chart">\n' +	
				'<table>\n' +
					'<tr>\n' +
						'<td>{{ charts[0].title }}</td>\n' +
						'<td><img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + '{{ charts[0].poster_path }}"></td>\n' +
						'<td>{{ charts[0].release_date }}</td>\n' +
					'</tr>\n' +
				'</table>\n' +
			'</div>\n' +   
			'<div class="newsD" ng-controller="getNews as news">\n' +
				'<ul ng-repeat="x in news">\n' + 
					'<li><a href="' + '{{x.url}}' + '"> {{x.title}} </a><i> (from {{x.publishedAt}})<i/></li>' + 
				'</ul>' + 
			'</div>\n' +   
			'<div class="statD" ng-controller="getStat as stat">\n' + 
				'<table>\n' +
					'<tr>\n' +
						'<th><button ng-click="order(\'num\', \'statYear\')">#</button></th>\n' +
						'<th>Month</th>\n' +
						'<th><button ng-click="order(\'totalGross\', \'statYear\')">Total gross</button></th>\n' +						
						'<th><button ng-click="order(\'percentYearGross\', \'statYear\')">% of year gross</th>\n' +
						'<th><button ng-click="order(\'movies\', \'statYear\')">Movies</button></th>\n' +
						'<th><button ng-click="order(\'topMovie\', \'statYear\')">#1 Movie</th>\n' +
						'<th><button ng-click="order(\'topMovieGross\', \'statYear\')">Gross</th>\n' +
						'<th><button ng-click="order(\'percentMonthGross\', \'statYear\')">% of total gross in month</th>\n' +
					'</tr>\n' +  
					'<tr ng-repeat="x in statYear">\n' +
						'<td>{{ x.num | number }}</td>\n' +
						'<td>{{ x.month | limitTo: 3 }}</td>\n' +
						'<td>{{ x.totalGross }}</td>\n' +
						'<td>{{ x.percentYearGross }}</td>\n' +
						'<td>{{ x.movies }}</td>\n' +
						'<td>{{ x.topMovie }}</td>\n' +
						'<td>{{ x.topMovieGross }}</td>\n' +
						'<td>{{ x.percentMonthGross }}</td>\n' +
					'</tr>\n' +					
				'</table>\n' +  
			'</div>\n' 
	})
	.when('/map', {
		template:
			'<div class="mapMax" ng-controller="getMap as map">\n' +
				'<div id="map" style="width:95vw; height:70vh;">\n' +
				'</div>\n' +
				'</br>\n' +
				'<div>\n' +
					'<p><input type="text" ng-model="filterCities"></p>\n' +
					'<table>\n' +
						'<tr>\n' +
							'<th>#</th>\n' +
							'<th>Location</th>\n' +
							'<th>Country</th>\n' +
						'</tr>\n' +  
						'<tr ng-repeat="x in cities | filter: filterCities">\n' +
							'<td>{{ $index + 1 }}</td>\n' +
							'<td>{{ x[0] }}</td>\n' +
							'<td>{{ x[1] }}</td>\n' +
						'</tr>\n' +
					'</table>\n' +
				'</div>\n' +
			'</div>\n'
	})
	.when('/chart', {
		template:
			'<div class="chartMax" ng-controller="getChart as chart">\n' +
			'<table>\n' +
				'<tr ng-repeat="x in charts">\n' +
					'<td>{{ x.title }}</td>\n' +
					'<td><img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + '{{ x.poster_path }}"></td>\n' +
					'<td>{{ x.release_date }}</td>\n' +
				'</tr>\n' +
			'</table>\n' +
			'</div>\n' 
	})
	.when('/news', {
		template:
			'<div class="newsMax" ng-controller="getNews as news">\n' +
				'<ul ng-repeat="x in news">\n' + 
					'<li><a href="' + '{{x.url}}' + '"> {{x.title}} </a><i> (from {{x.publishedAt}})<i/></li>' + 
				'</ul>' +
				'<ul ng-repeat="x in news2">\n' + 
					'<li><a href="' + '{{x.url}}' + '"> {{x.title}} </a><i> (from {{x.publishedAt}})<i/></li>' + 
				'</ul>' +
			'</div>\n' 
	})
	.when('/stat', {
		template:
			'<div class="statMax" ng-controller="getStat as stat">\n' +
				'<table>\n' +
					'<tr>\n' +
						'<th><button ng-click="order(\'num\', \'statYear\')">#</button></th>\n' +
						'<th>Month</th>\n' +
						'<th><button ng-click="order(\'totalGross\', \'statYear\')">Total gross</button></th>\n' +
						'<th><button ng-click="order(\'percentYearGross\', \'statYear\')">% of year gross</button></th>\n' +
						'<th><button ng-click="order(\'movies\', \'statYear\')">Movies</button></th>\n' +
						'<th><button ng-click="order(\'topMovie\', \'statYear\')">#1 Movie</button></th>\n' +
						'<th><button ng-click="order(\'topMovieGross\', \'statYear\')">Gross</button></th>\n' +
						'<th><button ng-click="order(\'percentMonthGross\', \'statYear\')">% of total gross in month</button></th>\n' +
					'</tr>\n' +  
					'<tr ng-repeat="x in statYear">\n' +
						'<td>{{ x.num }}</td>\n' +
						'<td>{{ x.month | limitTo: 3}}</td>\n' +
						'<td>{{ x.totalGross }}</td>\n' +
						'<td>{{ x.percentYearGross }}</td>\n' +
						'<td>{{ x.movies }}</td>\n' +
						'<td>{{ x.topMovie }}</td>\n' +
						'<td>{{ x.topMovieGross }}</td>\n' +
						'<td>{{ x.percentMonthGross }}</td>\n' +
					'</tr>\n' +
				'</table>\n' +
				'<canvas id="line" class="chart chart-line" chart-data="dataY" chart-labels="labelsY" chart-series="seriesY" chart-options="options" chart-dataset-override="datasetOverride" chart-click="onClick">\n' +
				'</canvas>\n' +  
				'</br>\n' +
				'<table>\n' +
					'<tr>\n' +
						'<th><button ng-click="order(\'number1\', \'statLast1\')">#</button></th>\n' +
						'<th><button ng-click="order(\'name1\', \'statLast1\')">Movie</button></th>\n' +
						'<th><button ng-click="order(\'totalGross1\', \'statLast1\')">Total gross</button></th>\n' +
						'<th><button ng-click="order(\'firstWeekGross1\', \'statLast1\')">1st week gross</button></th>\n' +
						'<th><button ng-click="order(\'cinemas1\', \'statLast1\')">Cinemas</button></th>\n' +
						'<th><button ng-click="order(\'startDate1\', \'statLast1\')">Start date</button></th>\n' +
						'<th><button ng-click="order(\'finishDate1\', \'statLast1\')">Finish date</button></th>\n' +
					'</tr>\n' +  
					'<tr ng-repeat="x in statLast1">\n' +
						'<td>{{ x.number1 }}</td>\n' +
						'<td>{{ x.name1 }}</td>\n' +
						'<td>{{ x.totalGross1 }}</td>\n' +
						'<td>{{ x.firstWeekGross1 }}</td>\n' +
						'<td>{{ x.cinemas1 }}</td>\n' +
						'<td>{{ x.startDate1 }}</td>\n' +
						'<td>{{ x.finishDate1 }}</td>\n' +
					'</tr>\n' +
				'</table>\n' + 
				'<canvas id="horizontal" class="chart chart-horizontal-bar" chart-data="data1" chart-labels="labels1" chart-series="series1">\n' +
				'</canvas>\n' + 
				'</br>\n' +
				'<table>\n' +
					'<tr>\n' +
						'<th><button ng-click="order(\'number2\', \'statLast2\')">#</button></th>\n' +
						'<th><button ng-click="order(\'name2\', \'statLast2\')">Movie</button></th>\n' +
						'<th><button ng-click="order(\'totalGross2\', \'statLast2\')">Total gross</button></th>\n' +
						'<th><button ng-click="order(\'firstWeekGross2\', \'statLast2\')">1st week gross</button></th>\n' +
						'<th><button ng-click="order(\'cinemas2\', \'statLast2\')">Cinemas</button></th>\n' +
						'<th><button ng-click="order(\'startDate2\', \'statLast2\')">Start date</button></th>\n' +
						'<th><button ng-click="order(\'finishDate2\', \'statLast2\')">Finish date</button></th>\n' +
					'</tr>\n' +  
					'<tr ng-repeat="x in statLast2">\n' +
						'<td>{{ x.number2 }}</td>\n' +
						'<td>{{ x.name2 }}</td>\n' +
						'<td>{{ x.totalGross2 }}</td>\n' +
						'<td>{{ x.firstWeekGross2 }}</td>\n' +
						'<td>{{ x.cinemas2 }}</td>\n' +
						'<td>{{ x.startDate2 }}</td>\n' +
						'<td>{{ x.finishDate2 }}</td>\n' +
					'</tr>\n' +
				'</table>\n' +
				'<canvas id="horizontal" class="chart chart-horizontal-bar" chart-data="data2" chart-labels="labels2" chart-series="series2">\n' +
				'</canvas>\n' + 
				'</br>\n' +
				'<table>\n' +
					'<tr>\n' +
						'<th><button ng-click="order(\'number3\', \'statLast3\')">#</button></th>\n' +
						'<th><button ng-click="order(\'name3\', \'statLast3\')">Movie</button></th>\n' +
						'<th><button ng-click="order(\'totalGross3\', \'statLast3\')">Total gross</button></th>\n' +
						'<th><button ng-click="order(\'firstWeekGross3\', \'statLast3\')">1st week gross</button></th>\n' +
						'<th><button ng-click="order(\'cinemas3\', \'statLast3\')">Cinemas</button></th>\n' +
						'<th><button ng-click="order(\'startDate3\', \'statLast3\')">Start date</button></th>\n' +
						'<th><button ng-click="order(\'finishDate3\', \'statLast3\')">Finish date</button></th>\n' +
					'</tr>\n' +  
					'<tr ng-repeat="x in statLast3">\n' +
						'<td>{{ x.number3 }}</td>\n' +
						'<td>{{ x.name3 }}</td>\n' +
						'<td>{{ x.totalGross3 }}</td>\n' +
						'<td>{{ x.firstWeekGross3 }}</td>\n' +
						'<td>{{ x.cinemas3 }}</td>\n' +
						'<td>{{ x.startDate3 }}</td>\n' +
						'<td>{{ x.finishDate3 }}</td>\n' +
					'</tr>\n' +
				'</table>\n' + 
				'<canvas id="horizontal" class="chart chart-horizontal-bar" chart-data="data3" chart-labels="labels3" chart-series="series3">\n' +
				'</canvas>\n' +
			'</div>\n' 
	});
});

app.controller('getStat', function($scope, $http, $filter) {
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
});

app.controller('getChart', function($scope, $http) {
	$http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=bbc248f411ec3657bd9844f9bd4a2bda&language=en-US&page=1')
	.then(function(response) {
		$scope.charts = response.data.results;
	});
});


app.controller('getTrailer', function($scope, $http) {
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
		var myElement = angular.element( document.querySelector('#youtubeDiv'));
		myElement.append(theTrailerLink);
	};
	$scope.hidePopup = function() {
		this.showMe = false;
	};
});

app.controller('getCurrent', function($scope, $location) {
	$scope.isCurrentPage = function(path) {
		return path == $location.path();
	};
});	

app.controller('getNews', function($scope, $http) {

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

	
});

app.controller('getMap', function($scope, $http) {
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

		initMap();

//		for (var i=0; i<geoArray.length; i++) {
//			var theLatLng = geoArray[i];
//			var marker = new google.maps.Marker({
//				position: theLatLng,
//				title: 'Movie business is here!'
//			});
//			marker.setMap(map);
//		}

		var markers = geoArray.map(function(location) {
			return new google.maps.Marker({
				position: location,
				label: 'Movie business is here!'
			});
		});

			// Add a marker clusterer to manage the markers.
		var markerCluster = new MarkerClusterer(map, markers,
		{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	});
});

function initMap() {
	var myLatLng = {lat: 30, lng: 0};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: myLatLng
	});
}