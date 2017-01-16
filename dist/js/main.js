'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//- inject:parts
var map;

var app = angular.module('app', ['ngRoute', 'chart.js']);

app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		template: '<div class="mapD" ng-controller="getMap as map">\n' + '<div id="map">\n' + '</div>\n' + '</div>\n' + '<div class="chartD" ng-controller="getChart as chart">\n' + '<table>\n' + '<tr>\n' + '<td>{{ charts[0].title }}</td>\n' + '<td><img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + '{{ charts[0].poster_path }}"></td>\n' + '<td>{{ charts[0].release_date }}</td>\n' + '</tr>\n' + '</table>\n' + '</div>\n' + '<div class="newsD" ng-controller="getNews as news">\n' + '<ul ng-repeat="x in news">\n' + '<li><a href="' + '{{x.url}}' + '"> {{x.title}} </a><i> (from {{x.publishedAt}})<i/></li>' + '</ul>' + '</div>\n' + '<div class="statD" ng-controller="getStat as stat">\n' + '<table>\n' + '<tr>\n' + '<th><button ng-click="order(\'num\', \'statYear\')">#</button></th>\n' + '<th>Month</th>\n' + '<th><button ng-click="order(\'totalGross\', \'statYear\')">Total gross</button></th>\n' + '<th><button ng-click="order(\'percentYearGross\', \'statYear\')">% of year gross</th>\n' + '<th><button ng-click="order(\'movies\', \'statYear\')">Movies</button></th>\n' + '<th><button ng-click="order(\'topMovie\', \'statYear\')">#1 Movie</th>\n' + '<th><button ng-click="order(\'topMovieGross\', \'statYear\')">Gross</th>\n' + '<th><button ng-click="order(\'percentMonthGross\', \'statYear\')">% of total gross in month</th>\n' + '</tr>\n' + '<tr ng-repeat="x in statYear">\n' + '<td>{{ x.num | number }}</td>\n' + '<td>{{ x.month | limitTo: 3 }}</td>\n' + '<td>{{ x.totalGross }}</td>\n' + '<td>{{ x.percentYearGross }}</td>\n' + '<td>{{ x.movies }}</td>\n' + '<td>{{ x.topMovie }}</td>\n' + '<td>{{ x.topMovieGross }}</td>\n' + '<td>{{ x.percentMonthGross }}</td>\n' + '</tr>\n' + '</table>\n' + '</div>\n'
	}).when('/map', {
		template: '<div class="mapMax" ng-controller="getMap as map">\n' + '<div id="map" style="width:95vw; height:70vh;">\n' + '</div>\n' + '</br>\n' + '<div>\n' + '<p><input type="text" ng-model="filterCities"></p>\n' + '<table>\n' + '<tr>\n' + '<th>#</th>\n' + '<th>Location</th>\n' + '<th>Country</th>\n' + '</tr>\n' + '<tr ng-repeat="x in cities | filter: filterCities">\n' + '<td>{{ $index + 1 }}</td>\n' + '<td>{{ x[0] }}</td>\n' + '<td>{{ x[1] }}</td>\n' + '</tr>\n' + '</table>\n' + '</div>\n' + '</div>\n'
	}).when('/chart', {
		template: '<div class="chartMax" ng-controller="getChart as chart">\n' + '<table>\n' + '<tr ng-repeat="x in charts">\n' + '<td>{{ x.title }}</td>\n' + '<td><img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + '{{ x.poster_path }}"></td>\n' + '<td>{{ x.release_date }}</td>\n' + '</tr>\n' + '</table>\n' + '</div>\n'
	}).when('/news', {
		template: '<div class="newsMax" ng-controller="getNews as news">\n' + '<ul ng-repeat="x in news">\n' + '<li><a href="' + '{{x.url}}' + '"> {{x.title}} </a><i> (from {{x.publishedAt}})<i/></li>' + '</ul>' + '<ul ng-repeat="x in news2">\n' + '<li><a href="' + '{{x.url}}' + '"> {{x.title}} </a><i> (from {{x.publishedAt}})<i/></li>' + '</ul>' + '</div>\n'
	}).when('/stat', {
		template: '<div class="statMax" ng-controller="getStat as stat">\n' + '<table>\n' + '<tr>\n' + '<th><button ng-click="order(\'num\', \'statYear\')">#</button></th>\n' + '<th>Month</th>\n' + '<th><button ng-click="order(\'totalGross\', \'statYear\')">Total gross</button></th>\n' + '<th><button ng-click="order(\'percentYearGross\', \'statYear\')">% of year gross</button></th>\n' + '<th><button ng-click="order(\'movies\', \'statYear\')">Movies</button></th>\n' + '<th><button ng-click="order(\'topMovie\', \'statYear\')">#1 Movie</button></th>\n' + '<th><button ng-click="order(\'topMovieGross\', \'statYear\')">Gross</button></th>\n' + '<th><button ng-click="order(\'percentMonthGross\', \'statYear\')">% of total gross in month</button></th>\n' + '</tr>\n' + '<tr ng-repeat="x in statYear">\n' + '<td>{{ x.num }}</td>\n' + '<td>{{ x.month | limitTo: 3}}</td>\n' + '<td>{{ x.totalGross }}</td>\n' + '<td>{{ x.percentYearGross }}</td>\n' + '<td>{{ x.movies }}</td>\n' + '<td>{{ x.topMovie }}</td>\n' + '<td>{{ x.topMovieGross }}</td>\n' + '<td>{{ x.percentMonthGross }}</td>\n' + '</tr>\n' + '</table>\n' + '<canvas id="line" class="chart chart-line" chart-data="dataY" chart-labels="labelsY" chart-series="seriesY" chart-options="options" chart-dataset-override="datasetOverride" chart-click="onClick">\n' + '</canvas>\n' + '</br>\n' + '<table>\n' + '<tr>\n' + '<th><button ng-click="order(\'number1\', \'statLast1\')">#</button></th>\n' + '<th><button ng-click="order(\'name1\', \'statLast1\')">Movie</button></th>\n' + '<th><button ng-click="order(\'totalGross1\', \'statLast1\')">Total gross</button></th>\n' + '<th><button ng-click="order(\'firstWeekGross1\', \'statLast1\')">1st week gross</button></th>\n' + '<th><button ng-click="order(\'cinemas1\', \'statLast1\')">Cinemas</button></th>\n' + '<th><button ng-click="order(\'startDate1\', \'statLast1\')">Start date</button></th>\n' + '<th><button ng-click="order(\'finishDate1\', \'statLast1\')">Finish date</button></th>\n' + '</tr>\n' + '<tr ng-repeat="x in statLast1">\n' + '<td>{{ x.number1 }}</td>\n' + '<td>{{ x.name1 }}</td>\n' + '<td>{{ x.totalGross1 }}</td>\n' + '<td>{{ x.firstWeekGross1 }}</td>\n' + '<td>{{ x.cinemas1 }}</td>\n' + '<td>{{ x.startDate1 }}</td>\n' + '<td>{{ x.finishDate1 }}</td>\n' + '</tr>\n' + '</table>\n' + '<canvas id="horizontal" class="chart chart-horizontal-bar" chart-data="data1" chart-labels="labels1" chart-series="series1">\n' + '</canvas>\n' + '</br>\n' + '<table>\n' + '<tr>\n' + '<th><button ng-click="order(\'number2\', \'statLast2\')">#</button></th>\n' + '<th><button ng-click="order(\'name2\', \'statLast2\')">Movie</button></th>\n' + '<th><button ng-click="order(\'totalGross2\', \'statLast2\')">Total gross</button></th>\n' + '<th><button ng-click="order(\'firstWeekGross2\', \'statLast2\')">1st week gross</button></th>\n' + '<th><button ng-click="order(\'cinemas2\', \'statLast2\')">Cinemas</button></th>\n' + '<th><button ng-click="order(\'startDate2\', \'statLast2\')">Start date</button></th>\n' + '<th><button ng-click="order(\'finishDate2\', \'statLast2\')">Finish date</button></th>\n' + '</tr>\n' + '<tr ng-repeat="x in statLast2">\n' + '<td>{{ x.number2 }}</td>\n' + '<td>{{ x.name2 }}</td>\n' + '<td>{{ x.totalGross2 }}</td>\n' + '<td>{{ x.firstWeekGross2 }}</td>\n' + '<td>{{ x.cinemas2 }}</td>\n' + '<td>{{ x.startDate2 }}</td>\n' + '<td>{{ x.finishDate2 }}</td>\n' + '</tr>\n' + '</table>\n' + '<canvas id="horizontal" class="chart chart-horizontal-bar" chart-data="data2" chart-labels="labels2" chart-series="series2">\n' + '</canvas>\n' + '</br>\n' + '<table>\n' + '<tr>\n' + '<th><button ng-click="order(\'number3\', \'statLast3\')">#</button></th>\n' + '<th><button ng-click="order(\'name3\', \'statLast3\')">Movie</button></th>\n' + '<th><button ng-click="order(\'totalGross3\', \'statLast3\')">Total gross</button></th>\n' + '<th><button ng-click="order(\'firstWeekGross3\', \'statLast3\')">1st week gross</button></th>\n' + '<th><button ng-click="order(\'cinemas3\', \'statLast3\')">Cinemas</button></th>\n' + '<th><button ng-click="order(\'startDate3\', \'statLast3\')">Start date</button></th>\n' + '<th><button ng-click="order(\'finishDate3\', \'statLast3\')">Finish date</button></th>\n' + '</tr>\n' + '<tr ng-repeat="x in statLast3">\n' + '<td>{{ x.number3 }}</td>\n' + '<td>{{ x.name3 }}</td>\n' + '<td>{{ x.totalGross3 }}</td>\n' + '<td>{{ x.firstWeekGross3 }}</td>\n' + '<td>{{ x.cinemas3 }}</td>\n' + '<td>{{ x.startDate3 }}</td>\n' + '<td>{{ x.finishDate3 }}</td>\n' + '</tr>\n' + '</table>\n' + '<canvas id="horizontal" class="chart chart-horizontal-bar" chart-data="data3" chart-labels="labels3" chart-series="series3">\n' + '</canvas>\n' + '</div>\n'
	});
});

app.controller('getStat', function ($scope, $http, $filter) {
	var prevOrder;
	var reverse = true;

	$scope.order = function (order, scope) {
		if (prevOrder == order && reverse == false) {
			switch (scope) {
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
		} else if (prevOrder == order && reverse == true) {
			switch (scope) {
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
		} else if (prevOrder != order && reverse == false) {
			switch (scope) {
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
			switch (scope) {
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

	$http.get('../others/2016Total.csv').then(function (response) {
		var allTheText = response.data.split(/\r?\n|\r/);
		var rowCellsArray = [];
		var dataCellsArray = [];
		var obRowCells = {};
		for (var singleRow = 2; singleRow < allTheText.length; singleRow++) {
			var rowCells = allTheText[singleRow].split(';');
			rowCellsArray.push(rowCells);
		}
		for (var k = 0; k < rowCellsArray.length; k++) {
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
		$scope.dataY = [totalGrossArray, topMovieGrossArray];
		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};
		$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
		$scope.options = {
			scales: {
				yAxes: [{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				}]
			}
		};
	});

	$http.get('../others/2017.01.csv').then(function (response) {
		var allTheText = response.data.split(/\r?\n|\r/);
		var rowCellsArray = [];
		var dataCellsArray = [];
		var obRowCells = {};
		for (var singleRow = 1; singleRow < allTheText.length; singleRow++) {
			var rowCells = allTheText[singleRow].split(';');
			rowCellsArray.push(rowCells);
		}
		for (var k = 0; k < rowCellsArray.length; k++) {
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
		$scope.data1 = [totalGrossArray, firstWeekGrossArray];
	});

	$http.get('../others/2016.12.csv').then(function (response) {
		var allTheText = response.data.split(/\r?\n|\r/);
		var rowCellsArray = [];
		var dataCellsArray = [];
		var obRowCells = {};
		for (var singleRow = 1; singleRow < allTheText.length; singleRow++) {
			var rowCells = allTheText[singleRow].split(';');
			rowCellsArray.push(rowCells);
		}
		for (var k = 0; k < rowCellsArray.length; k++) {
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
		$scope.data2 = [totalGrossArray, firstWeekGrossArray];
	});

	$http.get('../others/2016.11.csv').then(function (response) {
		var allTheText = response.data.split(/\r?\n|\r/);
		var rowCellsArray = [];
		var dataCellsArray = [];
		var obRowCells = {};
		for (var singleRow = 1; singleRow < allTheText.length; singleRow++) {
			var rowCells = allTheText[singleRow].split(';');
			rowCellsArray.push(rowCells);
		}
		for (var k = 0; k < rowCellsArray.length; k++) {
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
		$scope.data3 = [totalGrossArray, firstWeekGrossArray];
	});
});

app.controller('getChart', function ($scope, $http) {
	$http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=bbc248f411ec3657bd9844f9bd4a2bda&language=en-US&page=1').then(function (response) {
		$scope.charts = response.data.results;
	});
});

app.controller('getTrailer', function ($scope, $http) {
	var firstMovieID;
	var theTrailerLink;
	$http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=bbc248f411ec3657bd9844f9bd4a2bda&language=en-US&page=1').then(function (response) {
		firstMovieID = response.data.results[0].id;
		return firstMovieID;
	}).then(function (firstMovieID) {
		var theRequest = 'https://api.themoviedb.org/3/movie/' + firstMovieID + '/videos?api_key=bbc248f411ec3657bd9844f9bd4a2bda&language=en-US';
		$http.get(theRequest).then(function (response) {
			theTrailerLink = '<iframe src="https://www.youtube.com/embed/' + response.data.results[0].key + '" frameborder="0" allowfullscreen></iframe>';
			$scope.trailer = theTrailerLink;
		});
	});
	this.showMe = false;
	$scope.showPopup = function () {
		this.showMe = !this.showMe;
		var myElement = angular.element(document.querySelector('#youtubeDiv'));
		myElement.append(theTrailerLink);
	};
	$scope.hidePopup = function () {
		this.showMe = false;
	};
});

app.controller('getCurrent', function ($scope, $location) {
	$scope.isCurrentPage = function (path) {
		return path == $location.path();
	};
});

app.controller('getNews', function ($scope, $http) {

	var timerId = setTimeout(function theNews() {
		$http.get('https://newsapi.org/v1/articles?source=daily-mail&sortBy=latest&apiKey=3e39927ec00f48d4b859103489c06f38').then(function (response) {
			$scope.news = response.data.articles;
		});

		$http.get('https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=3e39927ec00f48d4b859103489c06f38').then(function (response) {
			$scope.news2 = response.data.articles;
		});
		console.log('news updated');
		timerId = setTimeout(theNews, 120000);
	}, 0);
});

app.controller('getMap', function ($scope, $http) {
	$http.get('../others/cities.csv').then(function (response) {
		var geoArray = [];
		var citiesArray = [];
		var allTheText = response.data.split(/\r?\n|\r/);
		for (var singleRow = 1; singleRow < allTheText.length; singleRow++) {
			var _geoArray$push;

			var rowCells = allTheText[singleRow].split(';');
			geoArray.push((_geoArray$push = {}, _defineProperty(_geoArray$push, 'lat', eval(rowCells[2])), _defineProperty(_geoArray$push, 'lng', eval(rowCells[3])), _geoArray$push));
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

		var markers = geoArray.map(function (location) {
			return new google.maps.Marker({
				position: location,
				label: 'Movie business is here!'
			});
		});

		// Add a marker clusterer to manage the markers.
		var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
	});
});

function initMap() {
	var myLatLng = { lat: 30, lng: 0 };
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: myLatLng
	});
}
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/swGetData.js').then(function (registration) {
		console.log('ServiceWorker registration', registration);
	}).catch(function (err) {
		console.log('ServiceWorker error: ' + err);
	});
}

//- endinject
//- inject:plugins

//- endinject
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuLy8tIGluamVjdDpwYXJ0c1xudmFyIG1hcDtcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUm91dGUnLCAnY2hhcnQuanMnXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG5cdCRyb3V0ZVByb3ZpZGVyLndoZW4oJy8nLCB7XG5cdFx0dGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwibWFwRFwiIG5nLWNvbnRyb2xsZXI9XCJnZXRNYXAgYXMgbWFwXCI+XFxuJyArICc8ZGl2IGlkPVwibWFwXCI+XFxuJyArICc8L2Rpdj5cXG4nICsgJzwvZGl2PlxcbicgKyAnPGRpdiBjbGFzcz1cImNoYXJ0RFwiIG5nLWNvbnRyb2xsZXI9XCJnZXRDaGFydCBhcyBjaGFydFwiPlxcbicgKyAnPHRhYmxlPlxcbicgKyAnPHRyPlxcbicgKyAnPHRkPnt7IGNoYXJ0c1swXS50aXRsZSB9fTwvdGQ+XFxuJyArICc8dGQ+PGltZyBzcmM9XCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93MjAwX2FuZF9oMzAwX2Jlc3R2Mi8nICsgJ3t7IGNoYXJ0c1swXS5wb3N0ZXJfcGF0aCB9fVwiPjwvdGQ+XFxuJyArICc8dGQ+e3sgY2hhcnRzWzBdLnJlbGVhc2VfZGF0ZSB9fTwvdGQ+XFxuJyArICc8L3RyPlxcbicgKyAnPC90YWJsZT5cXG4nICsgJzwvZGl2PlxcbicgKyAnPGRpdiBjbGFzcz1cIm5ld3NEXCIgbmctY29udHJvbGxlcj1cImdldE5ld3MgYXMgbmV3c1wiPlxcbicgKyAnPHVsIG5nLXJlcGVhdD1cInggaW4gbmV3c1wiPlxcbicgKyAnPGxpPjxhIGhyZWY9XCInICsgJ3t7eC51cmx9fScgKyAnXCI+IHt7eC50aXRsZX19IDwvYT48aT4gKGZyb20ge3t4LnB1Ymxpc2hlZEF0fX0pPGkvPjwvbGk+JyArICc8L3VsPicgKyAnPC9kaXY+XFxuJyArICc8ZGl2IGNsYXNzPVwic3RhdERcIiBuZy1jb250cm9sbGVyPVwiZ2V0U3RhdCBhcyBzdGF0XCI+XFxuJyArICc8dGFibGU+XFxuJyArICc8dHI+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ251bVxcJywgXFwnc3RhdFllYXJcXCcpXCI+IzwvYnV0dG9uPjwvdGg+XFxuJyArICc8dGg+TW9udGg8L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCd0b3RhbEdyb3NzXFwnLCBcXCdzdGF0WWVhclxcJylcIj5Ub3RhbCBncm9zczwvYnV0dG9uPjwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ3BlcmNlbnRZZWFyR3Jvc3NcXCcsIFxcJ3N0YXRZZWFyXFwnKVwiPiUgb2YgeWVhciBncm9zczwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ21vdmllc1xcJywgXFwnc3RhdFllYXJcXCcpXCI+TW92aWVzPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwndG9wTW92aWVcXCcsIFxcJ3N0YXRZZWFyXFwnKVwiPiMxIE1vdmllPC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwndG9wTW92aWVHcm9zc1xcJywgXFwnc3RhdFllYXJcXCcpXCI+R3Jvc3M8L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCdwZXJjZW50TW9udGhHcm9zc1xcJywgXFwnc3RhdFllYXJcXCcpXCI+JSBvZiB0b3RhbCBncm9zcyBpbiBtb250aDwvdGg+XFxuJyArICc8L3RyPlxcbicgKyAnPHRyIG5nLXJlcGVhdD1cInggaW4gc3RhdFllYXJcIj5cXG4nICsgJzx0ZD57eyB4Lm51bSB8IG51bWJlciB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC5tb250aCB8IGxpbWl0VG86IDMgfX08L3RkPlxcbicgKyAnPHRkPnt7IHgudG90YWxHcm9zcyB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC5wZXJjZW50WWVhckdyb3NzIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4Lm1vdmllcyB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC50b3BNb3ZpZSB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC50b3BNb3ZpZUdyb3NzIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4LnBlcmNlbnRNb250aEdyb3NzIH19PC90ZD5cXG4nICsgJzwvdHI+XFxuJyArICc8L3RhYmxlPlxcbicgKyAnPC9kaXY+XFxuJ1xuXHR9KS53aGVuKCcvbWFwJywge1xuXHRcdHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cIm1hcE1heFwiIG5nLWNvbnRyb2xsZXI9XCJnZXRNYXAgYXMgbWFwXCI+XFxuJyArICc8ZGl2IGlkPVwibWFwXCIgc3R5bGU9XCJ3aWR0aDo5NXZ3OyBoZWlnaHQ6NzB2aDtcIj5cXG4nICsgJzwvZGl2PlxcbicgKyAnPC9icj5cXG4nICsgJzxkaXY+XFxuJyArICc8cD48aW5wdXQgdHlwZT1cInRleHRcIiBuZy1tb2RlbD1cImZpbHRlckNpdGllc1wiPjwvcD5cXG4nICsgJzx0YWJsZT5cXG4nICsgJzx0cj5cXG4nICsgJzx0aD4jPC90aD5cXG4nICsgJzx0aD5Mb2NhdGlvbjwvdGg+XFxuJyArICc8dGg+Q291bnRyeTwvdGg+XFxuJyArICc8L3RyPlxcbicgKyAnPHRyIG5nLXJlcGVhdD1cInggaW4gY2l0aWVzIHwgZmlsdGVyOiBmaWx0ZXJDaXRpZXNcIj5cXG4nICsgJzx0ZD57eyAkaW5kZXggKyAxIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4WzBdIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4WzFdIH19PC90ZD5cXG4nICsgJzwvdHI+XFxuJyArICc8L3RhYmxlPlxcbicgKyAnPC9kaXY+XFxuJyArICc8L2Rpdj5cXG4nXG5cdH0pLndoZW4oJy9jaGFydCcsIHtcblx0XHR0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJjaGFydE1heFwiIG5nLWNvbnRyb2xsZXI9XCJnZXRDaGFydCBhcyBjaGFydFwiPlxcbicgKyAnPHRhYmxlPlxcbicgKyAnPHRyIG5nLXJlcGVhdD1cInggaW4gY2hhcnRzXCI+XFxuJyArICc8dGQ+e3sgeC50aXRsZSB9fTwvdGQ+XFxuJyArICc8dGQ+PGltZyBzcmM9XCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93MjAwX2FuZF9oMzAwX2Jlc3R2Mi8nICsgJ3t7IHgucG9zdGVyX3BhdGggfX1cIj48L3RkPlxcbicgKyAnPHRkPnt7IHgucmVsZWFzZV9kYXRlIH19PC90ZD5cXG4nICsgJzwvdHI+XFxuJyArICc8L3RhYmxlPlxcbicgKyAnPC9kaXY+XFxuJ1xuXHR9KS53aGVuKCcvbmV3cycsIHtcblx0XHR0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJuZXdzTWF4XCIgbmctY29udHJvbGxlcj1cImdldE5ld3MgYXMgbmV3c1wiPlxcbicgKyAnPHVsIG5nLXJlcGVhdD1cInggaW4gbmV3c1wiPlxcbicgKyAnPGxpPjxhIGhyZWY9XCInICsgJ3t7eC51cmx9fScgKyAnXCI+IHt7eC50aXRsZX19IDwvYT48aT4gKGZyb20ge3t4LnB1Ymxpc2hlZEF0fX0pPGkvPjwvbGk+JyArICc8L3VsPicgKyAnPHVsIG5nLXJlcGVhdD1cInggaW4gbmV3czJcIj5cXG4nICsgJzxsaT48YSBocmVmPVwiJyArICd7e3gudXJsfX0nICsgJ1wiPiB7e3gudGl0bGV9fSA8L2E+PGk+IChmcm9tIHt7eC5wdWJsaXNoZWRBdH19KTxpLz48L2xpPicgKyAnPC91bD4nICsgJzwvZGl2Plxcbidcblx0fSkud2hlbignL3N0YXQnLCB7XG5cdFx0dGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwic3RhdE1heFwiIG5nLWNvbnRyb2xsZXI9XCJnZXRTdGF0IGFzIHN0YXRcIj5cXG4nICsgJzx0YWJsZT5cXG4nICsgJzx0cj5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwnbnVtXFwnLCBcXCdzdGF0WWVhclxcJylcIj4jPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD5Nb250aDwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ3RvdGFsR3Jvc3NcXCcsIFxcJ3N0YXRZZWFyXFwnKVwiPlRvdGFsIGdyb3NzPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwncGVyY2VudFllYXJHcm9zc1xcJywgXFwnc3RhdFllYXJcXCcpXCI+JSBvZiB5ZWFyIGdyb3NzPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwnbW92aWVzXFwnLCBcXCdzdGF0WWVhclxcJylcIj5Nb3ZpZXM8L2J1dHRvbj48L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCd0b3BNb3ZpZVxcJywgXFwnc3RhdFllYXJcXCcpXCI+IzEgTW92aWU8L2J1dHRvbj48L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCd0b3BNb3ZpZUdyb3NzXFwnLCBcXCdzdGF0WWVhclxcJylcIj5Hcm9zczwvYnV0dG9uPjwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ3BlcmNlbnRNb250aEdyb3NzXFwnLCBcXCdzdGF0WWVhclxcJylcIj4lIG9mIHRvdGFsIGdyb3NzIGluIG1vbnRoPC9idXR0b24+PC90aD5cXG4nICsgJzwvdHI+XFxuJyArICc8dHIgbmctcmVwZWF0PVwieCBpbiBzdGF0WWVhclwiPlxcbicgKyAnPHRkPnt7IHgubnVtIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4Lm1vbnRoIHwgbGltaXRUbzogM319PC90ZD5cXG4nICsgJzx0ZD57eyB4LnRvdGFsR3Jvc3MgfX08L3RkPlxcbicgKyAnPHRkPnt7IHgucGVyY2VudFllYXJHcm9zcyB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC5tb3ZpZXMgfX08L3RkPlxcbicgKyAnPHRkPnt7IHgudG9wTW92aWUgfX08L3RkPlxcbicgKyAnPHRkPnt7IHgudG9wTW92aWVHcm9zcyB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC5wZXJjZW50TW9udGhHcm9zcyB9fTwvdGQ+XFxuJyArICc8L3RyPlxcbicgKyAnPC90YWJsZT5cXG4nICsgJzxjYW52YXMgaWQ9XCJsaW5lXCIgY2xhc3M9XCJjaGFydCBjaGFydC1saW5lXCIgY2hhcnQtZGF0YT1cImRhdGFZXCIgY2hhcnQtbGFiZWxzPVwibGFiZWxzWVwiIGNoYXJ0LXNlcmllcz1cInNlcmllc1lcIiBjaGFydC1vcHRpb25zPVwib3B0aW9uc1wiIGNoYXJ0LWRhdGFzZXQtb3ZlcnJpZGU9XCJkYXRhc2V0T3ZlcnJpZGVcIiBjaGFydC1jbGljaz1cIm9uQ2xpY2tcIj5cXG4nICsgJzwvY2FudmFzPlxcbicgKyAnPC9icj5cXG4nICsgJzx0YWJsZT5cXG4nICsgJzx0cj5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwnbnVtYmVyMVxcJywgXFwnc3RhdExhc3QxXFwnKVwiPiM8L2J1dHRvbj48L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCduYW1lMVxcJywgXFwnc3RhdExhc3QxXFwnKVwiPk1vdmllPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwndG90YWxHcm9zczFcXCcsIFxcJ3N0YXRMYXN0MVxcJylcIj5Ub3RhbCBncm9zczwvYnV0dG9uPjwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ2ZpcnN0V2Vla0dyb3NzMVxcJywgXFwnc3RhdExhc3QxXFwnKVwiPjFzdCB3ZWVrIGdyb3NzPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwnY2luZW1hczFcXCcsIFxcJ3N0YXRMYXN0MVxcJylcIj5DaW5lbWFzPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwnc3RhcnREYXRlMVxcJywgXFwnc3RhdExhc3QxXFwnKVwiPlN0YXJ0IGRhdGU8L2J1dHRvbj48L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCdmaW5pc2hEYXRlMVxcJywgXFwnc3RhdExhc3QxXFwnKVwiPkZpbmlzaCBkYXRlPC9idXR0b24+PC90aD5cXG4nICsgJzwvdHI+XFxuJyArICc8dHIgbmctcmVwZWF0PVwieCBpbiBzdGF0TGFzdDFcIj5cXG4nICsgJzx0ZD57eyB4Lm51bWJlcjEgfX08L3RkPlxcbicgKyAnPHRkPnt7IHgubmFtZTEgfX08L3RkPlxcbicgKyAnPHRkPnt7IHgudG90YWxHcm9zczEgfX08L3RkPlxcbicgKyAnPHRkPnt7IHguZmlyc3RXZWVrR3Jvc3MxIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4LmNpbmVtYXMxIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4LnN0YXJ0RGF0ZTEgfX08L3RkPlxcbicgKyAnPHRkPnt7IHguZmluaXNoRGF0ZTEgfX08L3RkPlxcbicgKyAnPC90cj5cXG4nICsgJzwvdGFibGU+XFxuJyArICc8Y2FudmFzIGlkPVwiaG9yaXpvbnRhbFwiIGNsYXNzPVwiY2hhcnQgY2hhcnQtaG9yaXpvbnRhbC1iYXJcIiBjaGFydC1kYXRhPVwiZGF0YTFcIiBjaGFydC1sYWJlbHM9XCJsYWJlbHMxXCIgY2hhcnQtc2VyaWVzPVwic2VyaWVzMVwiPlxcbicgKyAnPC9jYW52YXM+XFxuJyArICc8L2JyPlxcbicgKyAnPHRhYmxlPlxcbicgKyAnPHRyPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCdudW1iZXIyXFwnLCBcXCdzdGF0TGFzdDJcXCcpXCI+IzwvYnV0dG9uPjwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ25hbWUyXFwnLCBcXCdzdGF0TGFzdDJcXCcpXCI+TW92aWU8L2J1dHRvbj48L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCd0b3RhbEdyb3NzMlxcJywgXFwnc3RhdExhc3QyXFwnKVwiPlRvdGFsIGdyb3NzPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwnZmlyc3RXZWVrR3Jvc3MyXFwnLCBcXCdzdGF0TGFzdDJcXCcpXCI+MXN0IHdlZWsgZ3Jvc3M8L2J1dHRvbj48L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCdjaW5lbWFzMlxcJywgXFwnc3RhdExhc3QyXFwnKVwiPkNpbmVtYXM8L2J1dHRvbj48L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCdzdGFydERhdGUyXFwnLCBcXCdzdGF0TGFzdDJcXCcpXCI+U3RhcnQgZGF0ZTwvYnV0dG9uPjwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ2ZpbmlzaERhdGUyXFwnLCBcXCdzdGF0TGFzdDJcXCcpXCI+RmluaXNoIGRhdGU8L2J1dHRvbj48L3RoPlxcbicgKyAnPC90cj5cXG4nICsgJzx0ciBuZy1yZXBlYXQ9XCJ4IGluIHN0YXRMYXN0MlwiPlxcbicgKyAnPHRkPnt7IHgubnVtYmVyMiB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC5uYW1lMiB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC50b3RhbEdyb3NzMiB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC5maXJzdFdlZWtHcm9zczIgfX08L3RkPlxcbicgKyAnPHRkPnt7IHguY2luZW1hczIgfX08L3RkPlxcbicgKyAnPHRkPnt7IHguc3RhcnREYXRlMiB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC5maW5pc2hEYXRlMiB9fTwvdGQ+XFxuJyArICc8L3RyPlxcbicgKyAnPC90YWJsZT5cXG4nICsgJzxjYW52YXMgaWQ9XCJob3Jpem9udGFsXCIgY2xhc3M9XCJjaGFydCBjaGFydC1ob3Jpem9udGFsLWJhclwiIGNoYXJ0LWRhdGE9XCJkYXRhMlwiIGNoYXJ0LWxhYmVscz1cImxhYmVsczJcIiBjaGFydC1zZXJpZXM9XCJzZXJpZXMyXCI+XFxuJyArICc8L2NhbnZhcz5cXG4nICsgJzwvYnI+XFxuJyArICc8dGFibGU+XFxuJyArICc8dHI+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ251bWJlcjNcXCcsIFxcJ3N0YXRMYXN0M1xcJylcIj4jPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwnbmFtZTNcXCcsIFxcJ3N0YXRMYXN0M1xcJylcIj5Nb3ZpZTwvYnV0dG9uPjwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ3RvdGFsR3Jvc3MzXFwnLCBcXCdzdGF0TGFzdDNcXCcpXCI+VG90YWwgZ3Jvc3M8L2J1dHRvbj48L3RoPlxcbicgKyAnPHRoPjxidXR0b24gbmctY2xpY2s9XCJvcmRlcihcXCdmaXJzdFdlZWtHcm9zczNcXCcsIFxcJ3N0YXRMYXN0M1xcJylcIj4xc3Qgd2VlayBncm9zczwvYnV0dG9uPjwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ2NpbmVtYXMzXFwnLCBcXCdzdGF0TGFzdDNcXCcpXCI+Q2luZW1hczwvYnV0dG9uPjwvdGg+XFxuJyArICc8dGg+PGJ1dHRvbiBuZy1jbGljaz1cIm9yZGVyKFxcJ3N0YXJ0RGF0ZTNcXCcsIFxcJ3N0YXRMYXN0M1xcJylcIj5TdGFydCBkYXRlPC9idXR0b24+PC90aD5cXG4nICsgJzx0aD48YnV0dG9uIG5nLWNsaWNrPVwib3JkZXIoXFwnZmluaXNoRGF0ZTNcXCcsIFxcJ3N0YXRMYXN0M1xcJylcIj5GaW5pc2ggZGF0ZTwvYnV0dG9uPjwvdGg+XFxuJyArICc8L3RyPlxcbicgKyAnPHRyIG5nLXJlcGVhdD1cInggaW4gc3RhdExhc3QzXCI+XFxuJyArICc8dGQ+e3sgeC5udW1iZXIzIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4Lm5hbWUzIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4LnRvdGFsR3Jvc3MzIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4LmZpcnN0V2Vla0dyb3NzMyB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC5jaW5lbWFzMyB9fTwvdGQ+XFxuJyArICc8dGQ+e3sgeC5zdGFydERhdGUzIH19PC90ZD5cXG4nICsgJzx0ZD57eyB4LmZpbmlzaERhdGUzIH19PC90ZD5cXG4nICsgJzwvdHI+XFxuJyArICc8L3RhYmxlPlxcbicgKyAnPGNhbnZhcyBpZD1cImhvcml6b250YWxcIiBjbGFzcz1cImNoYXJ0IGNoYXJ0LWhvcml6b250YWwtYmFyXCIgY2hhcnQtZGF0YT1cImRhdGEzXCIgY2hhcnQtbGFiZWxzPVwibGFiZWxzM1wiIGNoYXJ0LXNlcmllcz1cInNlcmllczNcIj5cXG4nICsgJzwvY2FudmFzPlxcbicgKyAnPC9kaXY+XFxuJ1xuXHR9KTtcbn0pO1xuXG5hcHAuY29udHJvbGxlcignZ2V0U3RhdCcsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCAkZmlsdGVyKSB7XG5cdHZhciBwcmV2T3JkZXI7XG5cdHZhciByZXZlcnNlID0gdHJ1ZTtcblxuXHQkc2NvcGUub3JkZXIgPSBmdW5jdGlvbiAob3JkZXIsIHNjb3BlKSB7XG5cdFx0aWYgKHByZXZPcmRlciA9PSBvcmRlciAmJiByZXZlcnNlID09IGZhbHNlKSB7XG5cdFx0XHRzd2l0Y2ggKHNjb3BlKSB7XG5cdFx0XHRcdGNhc2UgJ3N0YXRZZWFyJzpcblx0XHRcdFx0XHR0aGlzLnN0YXRZZWFyID0gJGZpbHRlcignb3JkZXJCeScpKHRoaXMuc3RhdFllYXIsIG9yZGVyLCAncmV2ZXJzZScpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzdGF0TGFzdDEnOlxuXHRcdFx0XHRcdHRoaXMuc3RhdExhc3QxID0gJGZpbHRlcignb3JkZXJCeScpKHRoaXMuc3RhdExhc3QxLCBvcmRlciwgJ3JldmVyc2UnKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3RhdExhc3QyJzpcblx0XHRcdFx0XHR0aGlzLnN0YXRMYXN0MiA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRMYXN0Miwgb3JkZXIsICdyZXZlcnNlJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3N0YXRMYXN0Myc6XG5cdFx0XHRcdFx0dGhpcy5zdGF0TGFzdDMgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0TGFzdDMsIG9yZGVyLCAncmV2ZXJzZScpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0cmV2ZXJzZSA9ICFyZXZlcnNlO1xuXHRcdH0gZWxzZSBpZiAocHJldk9yZGVyID09IG9yZGVyICYmIHJldmVyc2UgPT0gdHJ1ZSkge1xuXHRcdFx0c3dpdGNoIChzY29wZSkge1xuXHRcdFx0XHRjYXNlICdzdGF0WWVhcic6XG5cdFx0XHRcdFx0dGhpcy5zdGF0WWVhciA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRZZWFyLCBvcmRlcik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3N0YXRMYXN0MSc6XG5cdFx0XHRcdFx0dGhpcy5zdGF0TGFzdDEgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0TGFzdDEsIG9yZGVyKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3RhdExhc3QyJzpcblx0XHRcdFx0XHR0aGlzLnN0YXRMYXN0MiA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRMYXN0Miwgb3JkZXIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzdGF0TGFzdDMnOlxuXHRcdFx0XHRcdHRoaXMuc3RhdExhc3QzID0gJGZpbHRlcignb3JkZXJCeScpKHRoaXMuc3RhdExhc3QzLCBvcmRlcik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXZlcnNlID0gIXJldmVyc2U7XG5cdFx0fSBlbHNlIGlmIChwcmV2T3JkZXIgIT0gb3JkZXIgJiYgcmV2ZXJzZSA9PSBmYWxzZSkge1xuXHRcdFx0c3dpdGNoIChzY29wZSkge1xuXHRcdFx0XHRjYXNlICdzdGF0WWVhcic6XG5cdFx0XHRcdFx0dGhpcy5zdGF0WWVhciA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRZZWFyLCBvcmRlciwgJ3JldmVyc2UnKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3RhdExhc3QxJzpcblx0XHRcdFx0XHR0aGlzLnN0YXRMYXN0MSA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRMYXN0MSwgb3JkZXIsICdyZXZlcnNlJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3N0YXRMYXN0Mic6XG5cdFx0XHRcdFx0dGhpcy5zdGF0TGFzdDIgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0TGFzdDIsIG9yZGVyLCAncmV2ZXJzZScpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzdGF0TGFzdDMnOlxuXHRcdFx0XHRcdHRoaXMuc3RhdExhc3QzID0gJGZpbHRlcignb3JkZXJCeScpKHRoaXMuc3RhdExhc3QzLCBvcmRlciwgJ3JldmVyc2UnKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHJldmVyc2UgPSAhcmV2ZXJzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3dpdGNoIChzY29wZSkge1xuXHRcdFx0XHRjYXNlICdzdGF0WWVhcic6XG5cdFx0XHRcdFx0dGhpcy5zdGF0WWVhciA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRZZWFyLCBvcmRlcik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3N0YXRMYXN0MSc6XG5cdFx0XHRcdFx0dGhpcy5zdGF0TGFzdDEgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0TGFzdDEsIG9yZGVyKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3RhdExhc3QyJzpcblx0XHRcdFx0XHR0aGlzLnN0YXRMYXN0MiA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRMYXN0Miwgb3JkZXIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzdGF0TGFzdDMnOlxuXHRcdFx0XHRcdHRoaXMuc3RhdExhc3QzID0gJGZpbHRlcignb3JkZXJCeScpKHRoaXMuc3RhdExhc3QzLCBvcmRlcik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXZlcnNlID0gIXJldmVyc2U7XG5cdFx0fVxuXHRcdHByZXZPcmRlciA9IG9yZGVyO1xuXHR9O1xuXG5cdCRodHRwLmdldCgnLi4vb3RoZXJzLzIwMTZUb3RhbC5jc3YnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdHZhciBhbGxUaGVUZXh0ID0gcmVzcG9uc2UuZGF0YS5zcGxpdCgvXFxyP1xcbnxcXHIvKTtcblx0XHR2YXIgcm93Q2VsbHNBcnJheSA9IFtdO1xuXHRcdHZhciBkYXRhQ2VsbHNBcnJheSA9IFtdO1xuXHRcdHZhciBvYlJvd0NlbGxzID0ge307XG5cdFx0Zm9yICh2YXIgc2luZ2xlUm93ID0gMjsgc2luZ2xlUm93IDwgYWxsVGhlVGV4dC5sZW5ndGg7IHNpbmdsZVJvdysrKSB7XG5cdFx0XHR2YXIgcm93Q2VsbHMgPSBhbGxUaGVUZXh0W3NpbmdsZVJvd10uc3BsaXQoJzsnKTtcblx0XHRcdHJvd0NlbGxzQXJyYXkucHVzaChyb3dDZWxscyk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGsgPSAwOyBrIDwgcm93Q2VsbHNBcnJheS5sZW5ndGg7IGsrKykge1xuXHRcdFx0b2JSb3dDZWxscyA9IHt9O1xuXHRcdFx0b2JSb3dDZWxscy5udW0gPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVswXSk7XG5cdFx0XHRvYlJvd0NlbGxzLm1vbnRoID0gcm93Q2VsbHNBcnJheVtrXVsxXTtcblx0XHRcdG9iUm93Q2VsbHMudG90YWxHcm9zcyA9IE51bWJlcihyb3dDZWxsc0FycmF5W2tdWzJdKTtcblx0XHRcdG9iUm93Q2VsbHMucGVyY2VudFllYXJHcm9zcyA9IE51bWJlcihyb3dDZWxsc0FycmF5W2tdWzNdKTtcblx0XHRcdG9iUm93Q2VsbHMubW92aWVzID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bNF0pO1xuXHRcdFx0b2JSb3dDZWxscy50b3BNb3ZpZSA9IHJvd0NlbGxzQXJyYXlba11bN107XG5cdFx0XHRvYlJvd0NlbGxzLnRvcE1vdmllR3Jvc3MgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVs4XSk7XG5cdFx0XHRvYlJvd0NlbGxzLnBlcmNlbnRNb250aEdyb3NzID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bOV0pO1xuXHRcdFx0ZGF0YUNlbGxzQXJyYXkucHVzaChvYlJvd0NlbGxzKTtcblx0XHR9XG5cdFx0JHNjb3BlLnN0YXRZZWFyID0gZGF0YUNlbGxzQXJyYXk7XG5cblx0XHR2YXIgbW9udGhBcnJheSA9IFtdO1xuXHRcdHZhciB0b3RhbEdyb3NzQXJyYXkgPSBbXTtcblx0XHR2YXIgdG9wTW92aWVHcm9zc0FycmF5ID0gW107XG5cdFx0dmFyIG1vdmllc0FycmF5ID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhQ2VsbHNBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0bW9udGhBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLm1vbnRoKTtcblx0XHRcdHRvdGFsR3Jvc3NBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLnRvdGFsR3Jvc3MpO1xuXHRcdFx0dG9wTW92aWVHcm9zc0FycmF5LnB1c2goZGF0YUNlbGxzQXJyYXlbaV0udG9wTW92aWVHcm9zcyk7XG5cdFx0XHRtb3ZpZXNBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLnRvcE1vdmllKTtcblx0XHR9XG5cdFx0JHNjb3BlLmxhYmVsc1kgPSBtb250aEFycmF5O1xuXHRcdCRzY29wZS5zZXJpZXNZID0gWydUb3RhbCBncm9zcycsICcxc3QgbW92aWUgZ3Jvc3MnXTtcblx0XHQkc2NvcGUuZGF0YVkgPSBbdG90YWxHcm9zc0FycmF5LCB0b3BNb3ZpZUdyb3NzQXJyYXldO1xuXHRcdCRzY29wZS5vbkNsaWNrID0gZnVuY3Rpb24gKHBvaW50cywgZXZ0KSB7XG5cdFx0XHRjb25zb2xlLmxvZyhwb2ludHMsIGV2dCk7XG5cdFx0fTtcblx0XHQkc2NvcGUuZGF0YXNldE92ZXJyaWRlID0gW3sgeUF4aXNJRDogJ3ktYXhpcy0xJyB9XTtcblx0XHQkc2NvcGUub3B0aW9ucyA9IHtcblx0XHRcdHNjYWxlczoge1xuXHRcdFx0XHR5QXhlczogW3tcblx0XHRcdFx0XHRpZDogJ3ktYXhpcy0xJyxcblx0XHRcdFx0XHR0eXBlOiAnbGluZWFyJyxcblx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdHBvc2l0aW9uOiAnbGVmdCdcblx0XHRcdFx0fV1cblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHQkaHR0cC5nZXQoJy4uL290aGVycy8yMDE3LjAxLmNzdicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0dmFyIGFsbFRoZVRleHQgPSByZXNwb25zZS5kYXRhLnNwbGl0KC9cXHI/XFxufFxcci8pO1xuXHRcdHZhciByb3dDZWxsc0FycmF5ID0gW107XG5cdFx0dmFyIGRhdGFDZWxsc0FycmF5ID0gW107XG5cdFx0dmFyIG9iUm93Q2VsbHMgPSB7fTtcblx0XHRmb3IgKHZhciBzaW5nbGVSb3cgPSAxOyBzaW5nbGVSb3cgPCBhbGxUaGVUZXh0Lmxlbmd0aDsgc2luZ2xlUm93KyspIHtcblx0XHRcdHZhciByb3dDZWxscyA9IGFsbFRoZVRleHRbc2luZ2xlUm93XS5zcGxpdCgnOycpO1xuXHRcdFx0cm93Q2VsbHNBcnJheS5wdXNoKHJvd0NlbGxzKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgayA9IDA7IGsgPCByb3dDZWxsc0FycmF5Lmxlbmd0aDsgaysrKSB7XG5cdFx0XHRvYlJvd0NlbGxzID0ge307XG5cdFx0XHRvYlJvd0NlbGxzLm51bWJlcjEgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVswXSk7XG5cdFx0XHRvYlJvd0NlbGxzLm5hbWUxID0gcm93Q2VsbHNBcnJheVtrXVsxXTtcblx0XHRcdG9iUm93Q2VsbHMudG90YWxHcm9zczEgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVszXSk7XG5cdFx0XHRvYlJvd0NlbGxzLmZpcnN0V2Vla0dyb3NzMSA9IE51bWJlcihyb3dDZWxsc0FycmF5W2tdWzVdKTtcblx0XHRcdG9iUm93Q2VsbHMuY2luZW1hczEgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVs0XSk7XG5cdFx0XHRvYlJvd0NlbGxzLnN0YXJ0RGF0ZTEgPSByb3dDZWxsc0FycmF5W2tdWzZdO1xuXHRcdFx0b2JSb3dDZWxscy5maW5pc2hEYXRlMSA9IHJvd0NlbGxzQXJyYXlba11bN107XG5cdFx0XHRkYXRhQ2VsbHNBcnJheS5wdXNoKG9iUm93Q2VsbHMpO1xuXHRcdH1cblx0XHQkc2NvcGUuc3RhdExhc3QxID0gZGF0YUNlbGxzQXJyYXk7XG5cblx0XHR2YXIgbmFtZUFycmF5ID0gW107XG5cdFx0dmFyIHRvdGFsR3Jvc3NBcnJheSA9IFtdO1xuXHRcdHZhciBmaXJzdFdlZWtHcm9zc0FycmF5ID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhQ2VsbHNBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0bmFtZUFycmF5LnB1c2goZGF0YUNlbGxzQXJyYXlbaV0ubmFtZTEpO1xuXHRcdFx0dG90YWxHcm9zc0FycmF5LnB1c2goZGF0YUNlbGxzQXJyYXlbaV0udG90YWxHcm9zczEpO1xuXHRcdFx0Zmlyc3RXZWVrR3Jvc3NBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLmZpcnN0V2Vla0dyb3NzMSk7XG5cdFx0fVxuXHRcdCRzY29wZS5sYWJlbHMxID0gbmFtZUFycmF5O1xuXHRcdCRzY29wZS5zZXJpZXMxID0gWydUb3RhbCBncm9zcycsICcxc3Qgd2VlayBncm9zcyddO1xuXHRcdCRzY29wZS5kYXRhMSA9IFt0b3RhbEdyb3NzQXJyYXksIGZpcnN0V2Vla0dyb3NzQXJyYXldO1xuXHR9KTtcblxuXHQkaHR0cC5nZXQoJy4uL290aGVycy8yMDE2LjEyLmNzdicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0dmFyIGFsbFRoZVRleHQgPSByZXNwb25zZS5kYXRhLnNwbGl0KC9cXHI/XFxufFxcci8pO1xuXHRcdHZhciByb3dDZWxsc0FycmF5ID0gW107XG5cdFx0dmFyIGRhdGFDZWxsc0FycmF5ID0gW107XG5cdFx0dmFyIG9iUm93Q2VsbHMgPSB7fTtcblx0XHRmb3IgKHZhciBzaW5nbGVSb3cgPSAxOyBzaW5nbGVSb3cgPCBhbGxUaGVUZXh0Lmxlbmd0aDsgc2luZ2xlUm93KyspIHtcblx0XHRcdHZhciByb3dDZWxscyA9IGFsbFRoZVRleHRbc2luZ2xlUm93XS5zcGxpdCgnOycpO1xuXHRcdFx0cm93Q2VsbHNBcnJheS5wdXNoKHJvd0NlbGxzKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgayA9IDA7IGsgPCByb3dDZWxsc0FycmF5Lmxlbmd0aDsgaysrKSB7XG5cdFx0XHRvYlJvd0NlbGxzID0ge307XG5cdFx0XHRvYlJvd0NlbGxzLm51bWJlcjIgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVswXSk7XG5cdFx0XHRvYlJvd0NlbGxzLm5hbWUyID0gcm93Q2VsbHNBcnJheVtrXVsxXTtcblx0XHRcdG9iUm93Q2VsbHMudG90YWxHcm9zczIgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVszXSk7XG5cdFx0XHRvYlJvd0NlbGxzLmZpcnN0V2Vla0dyb3NzMiA9IE51bWJlcihyb3dDZWxsc0FycmF5W2tdWzVdKTtcblx0XHRcdG9iUm93Q2VsbHMuY2luZW1hczIgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVs0XSk7XG5cdFx0XHRvYlJvd0NlbGxzLnN0YXJ0RGF0ZTIgPSByb3dDZWxsc0FycmF5W2tdWzZdO1xuXHRcdFx0b2JSb3dDZWxscy5maW5pc2hEYXRlMiA9IHJvd0NlbGxzQXJyYXlba11bN107XG5cdFx0XHRkYXRhQ2VsbHNBcnJheS5wdXNoKG9iUm93Q2VsbHMpO1xuXHRcdH1cblx0XHQkc2NvcGUuc3RhdExhc3QyID0gZGF0YUNlbGxzQXJyYXk7XG5cblx0XHR2YXIgbmFtZUFycmF5ID0gW107XG5cdFx0dmFyIHRvdGFsR3Jvc3NBcnJheSA9IFtdO1xuXHRcdHZhciBmaXJzdFdlZWtHcm9zc0FycmF5ID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhQ2VsbHNBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0bmFtZUFycmF5LnB1c2goZGF0YUNlbGxzQXJyYXlbaV0ubmFtZTIpO1xuXHRcdFx0dG90YWxHcm9zc0FycmF5LnB1c2goZGF0YUNlbGxzQXJyYXlbaV0udG90YWxHcm9zczIpO1xuXHRcdFx0Zmlyc3RXZWVrR3Jvc3NBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLmZpcnN0V2Vla0dyb3NzMik7XG5cdFx0fVxuXHRcdCRzY29wZS5sYWJlbHMyID0gbmFtZUFycmF5O1xuXHRcdCRzY29wZS5zZXJpZXMyID0gWydUb3RhbCBncm9zcycsICcxc3Qgd2VlayBncm9zcyddO1xuXHRcdCRzY29wZS5kYXRhMiA9IFt0b3RhbEdyb3NzQXJyYXksIGZpcnN0V2Vla0dyb3NzQXJyYXldO1xuXHR9KTtcblxuXHQkaHR0cC5nZXQoJy4uL290aGVycy8yMDE2LjExLmNzdicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0dmFyIGFsbFRoZVRleHQgPSByZXNwb25zZS5kYXRhLnNwbGl0KC9cXHI/XFxufFxcci8pO1xuXHRcdHZhciByb3dDZWxsc0FycmF5ID0gW107XG5cdFx0dmFyIGRhdGFDZWxsc0FycmF5ID0gW107XG5cdFx0dmFyIG9iUm93Q2VsbHMgPSB7fTtcblx0XHRmb3IgKHZhciBzaW5nbGVSb3cgPSAxOyBzaW5nbGVSb3cgPCBhbGxUaGVUZXh0Lmxlbmd0aDsgc2luZ2xlUm93KyspIHtcblx0XHRcdHZhciByb3dDZWxscyA9IGFsbFRoZVRleHRbc2luZ2xlUm93XS5zcGxpdCgnOycpO1xuXHRcdFx0cm93Q2VsbHNBcnJheS5wdXNoKHJvd0NlbGxzKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgayA9IDA7IGsgPCByb3dDZWxsc0FycmF5Lmxlbmd0aDsgaysrKSB7XG5cdFx0XHRvYlJvd0NlbGxzID0ge307XG5cdFx0XHRvYlJvd0NlbGxzLm51bWJlcjMgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVswXSk7XG5cdFx0XHRvYlJvd0NlbGxzLm5hbWUzID0gcm93Q2VsbHNBcnJheVtrXVsxXTtcblx0XHRcdG9iUm93Q2VsbHMudG90YWxHcm9zczMgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVszXSk7XG5cdFx0XHRvYlJvd0NlbGxzLmZpcnN0V2Vla0dyb3NzMyA9IE51bWJlcihyb3dDZWxsc0FycmF5W2tdWzVdKTtcblx0XHRcdG9iUm93Q2VsbHMuY2luZW1hczMgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVs0XSk7XG5cdFx0XHRvYlJvd0NlbGxzLnN0YXJ0RGF0ZTMgPSByb3dDZWxsc0FycmF5W2tdWzZdO1xuXHRcdFx0b2JSb3dDZWxscy5maW5pc2hEYXRlMyA9IHJvd0NlbGxzQXJyYXlba11bN107XG5cdFx0XHRkYXRhQ2VsbHNBcnJheS5wdXNoKG9iUm93Q2VsbHMpO1xuXHRcdH1cblx0XHQkc2NvcGUuc3RhdExhc3QzID0gZGF0YUNlbGxzQXJyYXk7XG5cblx0XHR2YXIgbmFtZUFycmF5ID0gW107XG5cdFx0dmFyIHRvdGFsR3Jvc3NBcnJheSA9IFtdO1xuXHRcdHZhciBmaXJzdFdlZWtHcm9zc0FycmF5ID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhQ2VsbHNBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0bmFtZUFycmF5LnB1c2goZGF0YUNlbGxzQXJyYXlbaV0ubmFtZTMpO1xuXHRcdFx0dG90YWxHcm9zc0FycmF5LnB1c2goZGF0YUNlbGxzQXJyYXlbaV0udG90YWxHcm9zczMpO1xuXHRcdFx0Zmlyc3RXZWVrR3Jvc3NBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLmZpcnN0V2Vla0dyb3NzMyk7XG5cdFx0fVxuXHRcdCRzY29wZS5sYWJlbHMzID0gbmFtZUFycmF5O1xuXHRcdCRzY29wZS5zZXJpZXMzID0gWydUb3RhbCBncm9zcycsICcxc3Qgd2VlayBncm9zcyddO1xuXHRcdCRzY29wZS5kYXRhMyA9IFt0b3RhbEdyb3NzQXJyYXksIGZpcnN0V2Vla0dyb3NzQXJyYXldO1xuXHR9KTtcbn0pO1xuXG5hcHAuY29udHJvbGxlcignZ2V0Q2hhcnQnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCkge1xuXHQkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT1iYmMyNDhmNDExZWMzNjU3YmQ5ODQ0ZjliZDRhMmJkYSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdCRzY29wZS5jaGFydHMgPSByZXNwb25zZS5kYXRhLnJlc3VsdHM7XG5cdH0pO1xufSk7XG5cbmFwcC5jb250cm9sbGVyKCdnZXRUcmFpbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHApIHtcblx0dmFyIGZpcnN0TW92aWVJRDtcblx0dmFyIHRoZVRyYWlsZXJMaW5rO1xuXHQkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT1iYmMyNDhmNDExZWMzNjU3YmQ5ODQ0ZjliZDRhMmJkYSZsYW5ndWFnZT1lbi1VUyZwYWdlPTEnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdGZpcnN0TW92aWVJRCA9IHJlc3BvbnNlLmRhdGEucmVzdWx0c1swXS5pZDtcblx0XHRyZXR1cm4gZmlyc3RNb3ZpZUlEO1xuXHR9KS50aGVuKGZ1bmN0aW9uIChmaXJzdE1vdmllSUQpIHtcblx0XHR2YXIgdGhlUmVxdWVzdCA9ICdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllLycgKyBmaXJzdE1vdmllSUQgKyAnL3ZpZGVvcz9hcGlfa2V5PWJiYzI0OGY0MTFlYzM2NTdiZDk4NDRmOWJkNGEyYmRhJmxhbmd1YWdlPWVuLVVTJztcblx0XHQkaHR0cC5nZXQodGhlUmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcdHRoZVRyYWlsZXJMaW5rID0gJzxpZnJhbWUgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJyArIHJlc3BvbnNlLmRhdGEucmVzdWx0c1swXS5rZXkgKyAnXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPic7XG5cdFx0XHQkc2NvcGUudHJhaWxlciA9IHRoZVRyYWlsZXJMaW5rO1xuXHRcdH0pO1xuXHR9KTtcblx0dGhpcy5zaG93TWUgPSBmYWxzZTtcblx0JHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLnNob3dNZSA9ICF0aGlzLnNob3dNZTtcblx0XHR2YXIgbXlFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5b3V0dWJlRGl2JykpO1xuXHRcdG15RWxlbWVudC5hcHBlbmQodGhlVHJhaWxlckxpbmspO1xuXHR9O1xuXHQkc2NvcGUuaGlkZVBvcHVwID0gZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuc2hvd01lID0gZmFsc2U7XG5cdH07XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ2dldEN1cnJlbnQnLCBmdW5jdGlvbiAoJHNjb3BlLCAkbG9jYXRpb24pIHtcblx0JHNjb3BlLmlzQ3VycmVudFBhZ2UgPSBmdW5jdGlvbiAocGF0aCkge1xuXHRcdHJldHVybiBwYXRoID09ICRsb2NhdGlvbi5wYXRoKCk7XG5cdH07XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ2dldE5ld3MnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCkge1xuXG5cdHZhciB0aW1lcklkID0gc2V0VGltZW91dChmdW5jdGlvbiB0aGVOZXdzKCkge1xuXHRcdCRodHRwLmdldCgnaHR0cHM6Ly9uZXdzYXBpLm9yZy92MS9hcnRpY2xlcz9zb3VyY2U9ZGFpbHktbWFpbCZzb3J0Qnk9bGF0ZXN0JmFwaUtleT0zZTM5OTI3ZWMwMGY0OGQ0Yjg1OTEwMzQ4OWMwNmYzOCcpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XHQkc2NvcGUubmV3cyA9IHJlc3BvbnNlLmRhdGEuYXJ0aWNsZXM7XG5cdFx0fSk7XG5cblx0XHQkaHR0cC5nZXQoJ2h0dHBzOi8vbmV3c2FwaS5vcmcvdjEvYXJ0aWNsZXM/c291cmNlPWVudGVydGFpbm1lbnQtd2Vla2x5JnNvcnRCeT10b3AmYXBpS2V5PTNlMzk5MjdlYzAwZjQ4ZDRiODU5MTAzNDg5YzA2ZjM4JykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcdCRzY29wZS5uZXdzMiA9IHJlc3BvbnNlLmRhdGEuYXJ0aWNsZXM7XG5cdFx0fSk7XG5cdFx0Y29uc29sZS5sb2coJ25ld3MgdXBkYXRlZCcpO1xuXHRcdHRpbWVySWQgPSBzZXRUaW1lb3V0KHRoZU5ld3MsIDEyMDAwMCk7XG5cdH0sIDApO1xufSk7XG5cbmFwcC5jb250cm9sbGVyKCdnZXRNYXAnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCkge1xuXHQkaHR0cC5nZXQoJy4uL290aGVycy9jaXRpZXMuY3N2JykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHR2YXIgZ2VvQXJyYXkgPSBbXTtcblx0XHR2YXIgY2l0aWVzQXJyYXkgPSBbXTtcblx0XHR2YXIgYWxsVGhlVGV4dCA9IHJlc3BvbnNlLmRhdGEuc3BsaXQoL1xccj9cXG58XFxyLyk7XG5cdFx0Zm9yICh2YXIgc2luZ2xlUm93ID0gMTsgc2luZ2xlUm93IDwgYWxsVGhlVGV4dC5sZW5ndGg7IHNpbmdsZVJvdysrKSB7XG5cdFx0XHR2YXIgX2dlb0FycmF5JHB1c2g7XG5cblx0XHRcdHZhciByb3dDZWxscyA9IGFsbFRoZVRleHRbc2luZ2xlUm93XS5zcGxpdCgnOycpO1xuXHRcdFx0Z2VvQXJyYXkucHVzaCgoX2dlb0FycmF5JHB1c2ggPSB7fSwgX2RlZmluZVByb3BlcnR5KF9nZW9BcnJheSRwdXNoLCAnbGF0JywgZXZhbChyb3dDZWxsc1syXSkpLCBfZGVmaW5lUHJvcGVydHkoX2dlb0FycmF5JHB1c2gsICdsbmcnLCBldmFsKHJvd0NlbGxzWzNdKSksIF9nZW9BcnJheSRwdXNoKSk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGFub3RoZXJSb3cgPSAxOyBhbm90aGVyUm93IDwgYWxsVGhlVGV4dC5sZW5ndGg7IGFub3RoZXJSb3crKykge1xuXHRcdFx0dmFyIGFub3RoZXJDZWxscyA9IGFsbFRoZVRleHRbYW5vdGhlclJvd10uc3BsaXQoJzsnKTtcblx0XHRcdGNpdGllc0FycmF5LnB1c2goW2Fub3RoZXJDZWxsc1swXSwgYW5vdGhlckNlbGxzWzFdXSk7XG5cdFx0fVxuXHRcdCRzY29wZS5jaXRpZXMgPSBjaXRpZXNBcnJheTtcblxuXHRcdGluaXRNYXAoKTtcblxuXHRcdC8vXHRcdGZvciAodmFyIGk9MDsgaTxnZW9BcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdC8vXHRcdFx0dmFyIHRoZUxhdExuZyA9IGdlb0FycmF5W2ldO1xuXHRcdC8vXHRcdFx0dmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdC8vXHRcdFx0XHRwb3NpdGlvbjogdGhlTGF0TG5nLFxuXHRcdC8vXHRcdFx0XHR0aXRsZTogJ01vdmllIGJ1c2luZXNzIGlzIGhlcmUhJ1xuXHRcdC8vXHRcdFx0fSk7XG5cdFx0Ly9cdFx0XHRtYXJrZXIuc2V0TWFwKG1hcCk7XG5cdFx0Ly9cdFx0fVxuXG5cdFx0dmFyIG1hcmtlcnMgPSBnZW9BcnJheS5tYXAoZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG5cdFx0XHRyZXR1cm4gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBsb2NhdGlvbixcblx0XHRcdFx0bGFiZWw6ICdNb3ZpZSBidXNpbmVzcyBpcyBoZXJlISdcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIGEgbWFya2VyIGNsdXN0ZXJlciB0byBtYW5hZ2UgdGhlIG1hcmtlcnMuXG5cdFx0dmFyIG1hcmtlckNsdXN0ZXIgPSBuZXcgTWFya2VyQ2x1c3RlcmVyKG1hcCwgbWFya2VycywgeyBpbWFnZVBhdGg6ICdodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9leGFtcGxlcy9tYXJrZXJjbHVzdGVyZXIvbScgfSk7XG5cdH0pO1xufSk7XG5cbmZ1bmN0aW9uIGluaXRNYXAoKSB7XG5cdHZhciBteUxhdExuZyA9IHsgbGF0OiAzMCwgbG5nOiAwIH07XG5cdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XG5cdFx0em9vbTogMixcblx0XHRjZW50ZXI6IG15TGF0TG5nXG5cdH0pO1xufVxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcblx0bmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zd0dldERhdGEuanMnKS50aGVuKGZ1bmN0aW9uIChyZWdpc3RyYXRpb24pIHtcblx0XHRjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24nLCByZWdpc3RyYXRpb24pO1xuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0Y29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgZXJyb3I6ICcgKyBlcnIpO1xuXHR9KTtcbn1cblxuLy8tIGVuZGluamVjdFxuLy8tIGluamVjdDpwbHVnaW5zXG5cbi8vLSBlbmRpbmplY3QiXSwiZmlsZSI6Im1haW4uanMifQ==
