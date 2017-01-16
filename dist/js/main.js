'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//- inject:parts
var map;

var app = angular.module('app', ['ngRoute', 'chart.js']);

app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'template/dash.html'
	}).when('/map', {
		templateUrl: 'template/map.html'
	}).when('/chart', {
		templateUrl: 'template/chart.html'
	}).when('/news', {
		templateUrl: 'template/news.html'
	}).when('/stat', {
		templateUrl: 'template/stat.html'
	});
});

app.controller('getStat', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
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
}]);

app.controller('getChart', ['$scope', '$http', function ($scope, $http) {
	$http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=bbc248f411ec3657bd9844f9bd4a2bda&language=en-US&page=1').then(function (response) {
		$scope.charts = response.data.results;
	});
}]);

app.controller('getTrailer', ['$scope', '$http', function ($scope, $http) {
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
}]);

app.controller('getCurrent', ['$scope', '$location', function ($scope, $location) {
	$scope.isCurrentPage = function (path) {
		return path == $location.path();
	};
}]);

app.controller('getNews', ['$scope', '$http', function ($scope, $http) {

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
}]);

app.controller('getMap', ['$scope', '$http', function ($scope, $http) {
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
}]);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuLy8tIGluamVjdDpwYXJ0c1xudmFyIG1hcDtcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUm91dGUnLCAnY2hhcnQuanMnXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG5cdCRyb3V0ZVByb3ZpZGVyLndoZW4oJy8nLCB7XG5cdFx0dGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS9kYXNoLmh0bWwnXG5cdH0pLndoZW4oJy9tYXAnLCB7XG5cdFx0dGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS9tYXAuaHRtbCdcblx0fSkud2hlbignL2NoYXJ0Jywge1xuXHRcdHRlbXBsYXRlVXJsOiAndGVtcGxhdGUvY2hhcnQuaHRtbCdcblx0fSkud2hlbignL25ld3MnLCB7XG5cdFx0dGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS9uZXdzLmh0bWwnXG5cdH0pLndoZW4oJy9zdGF0Jywge1xuXHRcdHRlbXBsYXRlVXJsOiAndGVtcGxhdGUvc3RhdC5odG1sJ1xuXHR9KTtcbn0pO1xuXG5hcHAuY29udHJvbGxlcignZ2V0U3RhdCcsIFsnJHNjb3BlJywgJyRodHRwJywgJyRmaWx0ZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgJGZpbHRlcikge1xuXHR2YXIgcHJldk9yZGVyO1xuXHR2YXIgcmV2ZXJzZSA9IHRydWU7XG5cblx0JHNjb3BlLm9yZGVyID0gZnVuY3Rpb24gKG9yZGVyLCBzY29wZSkge1xuXHRcdGlmIChwcmV2T3JkZXIgPT0gb3JkZXIgJiYgcmV2ZXJzZSA9PSBmYWxzZSkge1xuXHRcdFx0c3dpdGNoIChzY29wZSkge1xuXHRcdFx0XHRjYXNlICdzdGF0WWVhcic6XG5cdFx0XHRcdFx0dGhpcy5zdGF0WWVhciA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRZZWFyLCBvcmRlciwgJ3JldmVyc2UnKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3RhdExhc3QxJzpcblx0XHRcdFx0XHR0aGlzLnN0YXRMYXN0MSA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRMYXN0MSwgb3JkZXIsICdyZXZlcnNlJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3N0YXRMYXN0Mic6XG5cdFx0XHRcdFx0dGhpcy5zdGF0TGFzdDIgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0TGFzdDIsIG9yZGVyLCAncmV2ZXJzZScpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzdGF0TGFzdDMnOlxuXHRcdFx0XHRcdHRoaXMuc3RhdExhc3QzID0gJGZpbHRlcignb3JkZXJCeScpKHRoaXMuc3RhdExhc3QzLCBvcmRlciwgJ3JldmVyc2UnKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHJldmVyc2UgPSAhcmV2ZXJzZTtcblx0XHR9IGVsc2UgaWYgKHByZXZPcmRlciA9PSBvcmRlciAmJiByZXZlcnNlID09IHRydWUpIHtcblx0XHRcdHN3aXRjaCAoc2NvcGUpIHtcblx0XHRcdFx0Y2FzZSAnc3RhdFllYXInOlxuXHRcdFx0XHRcdHRoaXMuc3RhdFllYXIgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0WWVhciwgb3JkZXIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzdGF0TGFzdDEnOlxuXHRcdFx0XHRcdHRoaXMuc3RhdExhc3QxID0gJGZpbHRlcignb3JkZXJCeScpKHRoaXMuc3RhdExhc3QxLCBvcmRlcik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3N0YXRMYXN0Mic6XG5cdFx0XHRcdFx0dGhpcy5zdGF0TGFzdDIgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0TGFzdDIsIG9yZGVyKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3RhdExhc3QzJzpcblx0XHRcdFx0XHR0aGlzLnN0YXRMYXN0MyA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRMYXN0Mywgb3JkZXIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0cmV2ZXJzZSA9ICFyZXZlcnNlO1xuXHRcdH0gZWxzZSBpZiAocHJldk9yZGVyICE9IG9yZGVyICYmIHJldmVyc2UgPT0gZmFsc2UpIHtcblx0XHRcdHN3aXRjaCAoc2NvcGUpIHtcblx0XHRcdFx0Y2FzZSAnc3RhdFllYXInOlxuXHRcdFx0XHRcdHRoaXMuc3RhdFllYXIgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0WWVhciwgb3JkZXIsICdyZXZlcnNlJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3N0YXRMYXN0MSc6XG5cdFx0XHRcdFx0dGhpcy5zdGF0TGFzdDEgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0TGFzdDEsIG9yZGVyLCAncmV2ZXJzZScpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzdGF0TGFzdDInOlxuXHRcdFx0XHRcdHRoaXMuc3RhdExhc3QyID0gJGZpbHRlcignb3JkZXJCeScpKHRoaXMuc3RhdExhc3QyLCBvcmRlciwgJ3JldmVyc2UnKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3RhdExhc3QzJzpcblx0XHRcdFx0XHR0aGlzLnN0YXRMYXN0MyA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRMYXN0Mywgb3JkZXIsICdyZXZlcnNlJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXZlcnNlID0gIXJldmVyc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN3aXRjaCAoc2NvcGUpIHtcblx0XHRcdFx0Y2FzZSAnc3RhdFllYXInOlxuXHRcdFx0XHRcdHRoaXMuc3RhdFllYXIgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0WWVhciwgb3JkZXIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzdGF0TGFzdDEnOlxuXHRcdFx0XHRcdHRoaXMuc3RhdExhc3QxID0gJGZpbHRlcignb3JkZXJCeScpKHRoaXMuc3RhdExhc3QxLCBvcmRlcik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3N0YXRMYXN0Mic6XG5cdFx0XHRcdFx0dGhpcy5zdGF0TGFzdDIgPSAkZmlsdGVyKCdvcmRlckJ5JykodGhpcy5zdGF0TGFzdDIsIG9yZGVyKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3RhdExhc3QzJzpcblx0XHRcdFx0XHR0aGlzLnN0YXRMYXN0MyA9ICRmaWx0ZXIoJ29yZGVyQnknKSh0aGlzLnN0YXRMYXN0Mywgb3JkZXIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0cmV2ZXJzZSA9ICFyZXZlcnNlO1xuXHRcdH1cblx0XHRwcmV2T3JkZXIgPSBvcmRlcjtcblx0fTtcblxuXHQkaHR0cC5nZXQoJy4uL290aGVycy8yMDE2VG90YWwuY3N2JykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHR2YXIgYWxsVGhlVGV4dCA9IHJlc3BvbnNlLmRhdGEuc3BsaXQoL1xccj9cXG58XFxyLyk7XG5cdFx0dmFyIHJvd0NlbGxzQXJyYXkgPSBbXTtcblx0XHR2YXIgZGF0YUNlbGxzQXJyYXkgPSBbXTtcblx0XHR2YXIgb2JSb3dDZWxscyA9IHt9O1xuXHRcdGZvciAodmFyIHNpbmdsZVJvdyA9IDI7IHNpbmdsZVJvdyA8IGFsbFRoZVRleHQubGVuZ3RoOyBzaW5nbGVSb3crKykge1xuXHRcdFx0dmFyIHJvd0NlbGxzID0gYWxsVGhlVGV4dFtzaW5nbGVSb3ddLnNwbGl0KCc7Jyk7XG5cdFx0XHRyb3dDZWxsc0FycmF5LnB1c2gocm93Q2VsbHMpO1xuXHRcdH1cblx0XHRmb3IgKHZhciBrID0gMDsgayA8IHJvd0NlbGxzQXJyYXkubGVuZ3RoOyBrKyspIHtcblx0XHRcdG9iUm93Q2VsbHMgPSB7fTtcblx0XHRcdG9iUm93Q2VsbHMubnVtID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bMF0pO1xuXHRcdFx0b2JSb3dDZWxscy5tb250aCA9IHJvd0NlbGxzQXJyYXlba11bMV07XG5cdFx0XHRvYlJvd0NlbGxzLnRvdGFsR3Jvc3MgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVsyXSk7XG5cdFx0XHRvYlJvd0NlbGxzLnBlcmNlbnRZZWFyR3Jvc3MgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVszXSk7XG5cdFx0XHRvYlJvd0NlbGxzLm1vdmllcyA9IE51bWJlcihyb3dDZWxsc0FycmF5W2tdWzRdKTtcblx0XHRcdG9iUm93Q2VsbHMudG9wTW92aWUgPSByb3dDZWxsc0FycmF5W2tdWzddO1xuXHRcdFx0b2JSb3dDZWxscy50b3BNb3ZpZUdyb3NzID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bOF0pO1xuXHRcdFx0b2JSb3dDZWxscy5wZXJjZW50TW9udGhHcm9zcyA9IE51bWJlcihyb3dDZWxsc0FycmF5W2tdWzldKTtcblx0XHRcdGRhdGFDZWxsc0FycmF5LnB1c2gob2JSb3dDZWxscyk7XG5cdFx0fVxuXHRcdCRzY29wZS5zdGF0WWVhciA9IGRhdGFDZWxsc0FycmF5O1xuXG5cdFx0dmFyIG1vbnRoQXJyYXkgPSBbXTtcblx0XHR2YXIgdG90YWxHcm9zc0FycmF5ID0gW107XG5cdFx0dmFyIHRvcE1vdmllR3Jvc3NBcnJheSA9IFtdO1xuXHRcdHZhciBtb3ZpZXNBcnJheSA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUNlbGxzQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdG1vbnRoQXJyYXkucHVzaChkYXRhQ2VsbHNBcnJheVtpXS5tb250aCk7XG5cdFx0XHR0b3RhbEdyb3NzQXJyYXkucHVzaChkYXRhQ2VsbHNBcnJheVtpXS50b3RhbEdyb3NzKTtcblx0XHRcdHRvcE1vdmllR3Jvc3NBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLnRvcE1vdmllR3Jvc3MpO1xuXHRcdFx0bW92aWVzQXJyYXkucHVzaChkYXRhQ2VsbHNBcnJheVtpXS50b3BNb3ZpZSk7XG5cdFx0fVxuXHRcdCRzY29wZS5sYWJlbHNZID0gbW9udGhBcnJheTtcblx0XHQkc2NvcGUuc2VyaWVzWSA9IFsnVG90YWwgZ3Jvc3MnLCAnMXN0IG1vdmllIGdyb3NzJ107XG5cdFx0JHNjb3BlLmRhdGFZID0gW3RvdGFsR3Jvc3NBcnJheSwgdG9wTW92aWVHcm9zc0FycmF5XTtcblx0XHQkc2NvcGUub25DbGljayA9IGZ1bmN0aW9uIChwb2ludHMsIGV2dCkge1xuXHRcdFx0Y29uc29sZS5sb2cocG9pbnRzLCBldnQpO1xuXHRcdH07XG5cdFx0JHNjb3BlLmRhdGFzZXRPdmVycmlkZSA9IFt7IHlBeGlzSUQ6ICd5LWF4aXMtMScgfV07XG5cdFx0JHNjb3BlLm9wdGlvbnMgPSB7XG5cdFx0XHRzY2FsZXM6IHtcblx0XHRcdFx0eUF4ZXM6IFt7XG5cdFx0XHRcdFx0aWQ6ICd5LWF4aXMtMScsXG5cdFx0XHRcdFx0dHlwZTogJ2xpbmVhcicsXG5cdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRwb3NpdGlvbjogJ2xlZnQnXG5cdFx0XHRcdH1dXG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG5cblx0JGh0dHAuZ2V0KCcuLi9vdGhlcnMvMjAxNy4wMS5jc3YnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdHZhciBhbGxUaGVUZXh0ID0gcmVzcG9uc2UuZGF0YS5zcGxpdCgvXFxyP1xcbnxcXHIvKTtcblx0XHR2YXIgcm93Q2VsbHNBcnJheSA9IFtdO1xuXHRcdHZhciBkYXRhQ2VsbHNBcnJheSA9IFtdO1xuXHRcdHZhciBvYlJvd0NlbGxzID0ge307XG5cdFx0Zm9yICh2YXIgc2luZ2xlUm93ID0gMTsgc2luZ2xlUm93IDwgYWxsVGhlVGV4dC5sZW5ndGg7IHNpbmdsZVJvdysrKSB7XG5cdFx0XHR2YXIgcm93Q2VsbHMgPSBhbGxUaGVUZXh0W3NpbmdsZVJvd10uc3BsaXQoJzsnKTtcblx0XHRcdHJvd0NlbGxzQXJyYXkucHVzaChyb3dDZWxscyk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGsgPSAwOyBrIDwgcm93Q2VsbHNBcnJheS5sZW5ndGg7IGsrKykge1xuXHRcdFx0b2JSb3dDZWxscyA9IHt9O1xuXHRcdFx0b2JSb3dDZWxscy5udW1iZXIxID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bMF0pO1xuXHRcdFx0b2JSb3dDZWxscy5uYW1lMSA9IHJvd0NlbGxzQXJyYXlba11bMV07XG5cdFx0XHRvYlJvd0NlbGxzLnRvdGFsR3Jvc3MxID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bM10pO1xuXHRcdFx0b2JSb3dDZWxscy5maXJzdFdlZWtHcm9zczEgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVs1XSk7XG5cdFx0XHRvYlJvd0NlbGxzLmNpbmVtYXMxID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bNF0pO1xuXHRcdFx0b2JSb3dDZWxscy5zdGFydERhdGUxID0gcm93Q2VsbHNBcnJheVtrXVs2XTtcblx0XHRcdG9iUm93Q2VsbHMuZmluaXNoRGF0ZTEgPSByb3dDZWxsc0FycmF5W2tdWzddO1xuXHRcdFx0ZGF0YUNlbGxzQXJyYXkucHVzaChvYlJvd0NlbGxzKTtcblx0XHR9XG5cdFx0JHNjb3BlLnN0YXRMYXN0MSA9IGRhdGFDZWxsc0FycmF5O1xuXG5cdFx0dmFyIG5hbWVBcnJheSA9IFtdO1xuXHRcdHZhciB0b3RhbEdyb3NzQXJyYXkgPSBbXTtcblx0XHR2YXIgZmlyc3RXZWVrR3Jvc3NBcnJheSA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUNlbGxzQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5hbWVBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLm5hbWUxKTtcblx0XHRcdHRvdGFsR3Jvc3NBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLnRvdGFsR3Jvc3MxKTtcblx0XHRcdGZpcnN0V2Vla0dyb3NzQXJyYXkucHVzaChkYXRhQ2VsbHNBcnJheVtpXS5maXJzdFdlZWtHcm9zczEpO1xuXHRcdH1cblx0XHQkc2NvcGUubGFiZWxzMSA9IG5hbWVBcnJheTtcblx0XHQkc2NvcGUuc2VyaWVzMSA9IFsnVG90YWwgZ3Jvc3MnLCAnMXN0IHdlZWsgZ3Jvc3MnXTtcblx0XHQkc2NvcGUuZGF0YTEgPSBbdG90YWxHcm9zc0FycmF5LCBmaXJzdFdlZWtHcm9zc0FycmF5XTtcblx0fSk7XG5cblx0JGh0dHAuZ2V0KCcuLi9vdGhlcnMvMjAxNi4xMi5jc3YnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdHZhciBhbGxUaGVUZXh0ID0gcmVzcG9uc2UuZGF0YS5zcGxpdCgvXFxyP1xcbnxcXHIvKTtcblx0XHR2YXIgcm93Q2VsbHNBcnJheSA9IFtdO1xuXHRcdHZhciBkYXRhQ2VsbHNBcnJheSA9IFtdO1xuXHRcdHZhciBvYlJvd0NlbGxzID0ge307XG5cdFx0Zm9yICh2YXIgc2luZ2xlUm93ID0gMTsgc2luZ2xlUm93IDwgYWxsVGhlVGV4dC5sZW5ndGg7IHNpbmdsZVJvdysrKSB7XG5cdFx0XHR2YXIgcm93Q2VsbHMgPSBhbGxUaGVUZXh0W3NpbmdsZVJvd10uc3BsaXQoJzsnKTtcblx0XHRcdHJvd0NlbGxzQXJyYXkucHVzaChyb3dDZWxscyk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGsgPSAwOyBrIDwgcm93Q2VsbHNBcnJheS5sZW5ndGg7IGsrKykge1xuXHRcdFx0b2JSb3dDZWxscyA9IHt9O1xuXHRcdFx0b2JSb3dDZWxscy5udW1iZXIyID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bMF0pO1xuXHRcdFx0b2JSb3dDZWxscy5uYW1lMiA9IHJvd0NlbGxzQXJyYXlba11bMV07XG5cdFx0XHRvYlJvd0NlbGxzLnRvdGFsR3Jvc3MyID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bM10pO1xuXHRcdFx0b2JSb3dDZWxscy5maXJzdFdlZWtHcm9zczIgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVs1XSk7XG5cdFx0XHRvYlJvd0NlbGxzLmNpbmVtYXMyID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bNF0pO1xuXHRcdFx0b2JSb3dDZWxscy5zdGFydERhdGUyID0gcm93Q2VsbHNBcnJheVtrXVs2XTtcblx0XHRcdG9iUm93Q2VsbHMuZmluaXNoRGF0ZTIgPSByb3dDZWxsc0FycmF5W2tdWzddO1xuXHRcdFx0ZGF0YUNlbGxzQXJyYXkucHVzaChvYlJvd0NlbGxzKTtcblx0XHR9XG5cdFx0JHNjb3BlLnN0YXRMYXN0MiA9IGRhdGFDZWxsc0FycmF5O1xuXG5cdFx0dmFyIG5hbWVBcnJheSA9IFtdO1xuXHRcdHZhciB0b3RhbEdyb3NzQXJyYXkgPSBbXTtcblx0XHR2YXIgZmlyc3RXZWVrR3Jvc3NBcnJheSA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUNlbGxzQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5hbWVBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLm5hbWUyKTtcblx0XHRcdHRvdGFsR3Jvc3NBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLnRvdGFsR3Jvc3MyKTtcblx0XHRcdGZpcnN0V2Vla0dyb3NzQXJyYXkucHVzaChkYXRhQ2VsbHNBcnJheVtpXS5maXJzdFdlZWtHcm9zczIpO1xuXHRcdH1cblx0XHQkc2NvcGUubGFiZWxzMiA9IG5hbWVBcnJheTtcblx0XHQkc2NvcGUuc2VyaWVzMiA9IFsnVG90YWwgZ3Jvc3MnLCAnMXN0IHdlZWsgZ3Jvc3MnXTtcblx0XHQkc2NvcGUuZGF0YTIgPSBbdG90YWxHcm9zc0FycmF5LCBmaXJzdFdlZWtHcm9zc0FycmF5XTtcblx0fSk7XG5cblx0JGh0dHAuZ2V0KCcuLi9vdGhlcnMvMjAxNi4xMS5jc3YnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdHZhciBhbGxUaGVUZXh0ID0gcmVzcG9uc2UuZGF0YS5zcGxpdCgvXFxyP1xcbnxcXHIvKTtcblx0XHR2YXIgcm93Q2VsbHNBcnJheSA9IFtdO1xuXHRcdHZhciBkYXRhQ2VsbHNBcnJheSA9IFtdO1xuXHRcdHZhciBvYlJvd0NlbGxzID0ge307XG5cdFx0Zm9yICh2YXIgc2luZ2xlUm93ID0gMTsgc2luZ2xlUm93IDwgYWxsVGhlVGV4dC5sZW5ndGg7IHNpbmdsZVJvdysrKSB7XG5cdFx0XHR2YXIgcm93Q2VsbHMgPSBhbGxUaGVUZXh0W3NpbmdsZVJvd10uc3BsaXQoJzsnKTtcblx0XHRcdHJvd0NlbGxzQXJyYXkucHVzaChyb3dDZWxscyk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGsgPSAwOyBrIDwgcm93Q2VsbHNBcnJheS5sZW5ndGg7IGsrKykge1xuXHRcdFx0b2JSb3dDZWxscyA9IHt9O1xuXHRcdFx0b2JSb3dDZWxscy5udW1iZXIzID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bMF0pO1xuXHRcdFx0b2JSb3dDZWxscy5uYW1lMyA9IHJvd0NlbGxzQXJyYXlba11bMV07XG5cdFx0XHRvYlJvd0NlbGxzLnRvdGFsR3Jvc3MzID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bM10pO1xuXHRcdFx0b2JSb3dDZWxscy5maXJzdFdlZWtHcm9zczMgPSBOdW1iZXIocm93Q2VsbHNBcnJheVtrXVs1XSk7XG5cdFx0XHRvYlJvd0NlbGxzLmNpbmVtYXMzID0gTnVtYmVyKHJvd0NlbGxzQXJyYXlba11bNF0pO1xuXHRcdFx0b2JSb3dDZWxscy5zdGFydERhdGUzID0gcm93Q2VsbHNBcnJheVtrXVs2XTtcblx0XHRcdG9iUm93Q2VsbHMuZmluaXNoRGF0ZTMgPSByb3dDZWxsc0FycmF5W2tdWzddO1xuXHRcdFx0ZGF0YUNlbGxzQXJyYXkucHVzaChvYlJvd0NlbGxzKTtcblx0XHR9XG5cdFx0JHNjb3BlLnN0YXRMYXN0MyA9IGRhdGFDZWxsc0FycmF5O1xuXG5cdFx0dmFyIG5hbWVBcnJheSA9IFtdO1xuXHRcdHZhciB0b3RhbEdyb3NzQXJyYXkgPSBbXTtcblx0XHR2YXIgZmlyc3RXZWVrR3Jvc3NBcnJheSA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUNlbGxzQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5hbWVBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLm5hbWUzKTtcblx0XHRcdHRvdGFsR3Jvc3NBcnJheS5wdXNoKGRhdGFDZWxsc0FycmF5W2ldLnRvdGFsR3Jvc3MzKTtcblx0XHRcdGZpcnN0V2Vla0dyb3NzQXJyYXkucHVzaChkYXRhQ2VsbHNBcnJheVtpXS5maXJzdFdlZWtHcm9zczMpO1xuXHRcdH1cblx0XHQkc2NvcGUubGFiZWxzMyA9IG5hbWVBcnJheTtcblx0XHQkc2NvcGUuc2VyaWVzMyA9IFsnVG90YWwgZ3Jvc3MnLCAnMXN0IHdlZWsgZ3Jvc3MnXTtcblx0XHQkc2NvcGUuZGF0YTMgPSBbdG90YWxHcm9zc0FycmF5LCBmaXJzdFdlZWtHcm9zc0FycmF5XTtcblx0fSk7XG59XSk7XG5cbmFwcC5jb250cm9sbGVyKCdnZXRDaGFydCcsIFsnJHNjb3BlJywgJyRodHRwJywgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHApIHtcblx0JGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9YmJjMjQ4ZjQxMWVjMzY1N2JkOTg0NGY5YmQ0YTJiZGEmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHQkc2NvcGUuY2hhcnRzID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzO1xuXHR9KTtcbn1dKTtcblxuYXBwLmNvbnRyb2xsZXIoJ2dldFRyYWlsZXInLCBbJyRzY29wZScsICckaHR0cCcsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwKSB7XG5cdHZhciBmaXJzdE1vdmllSUQ7XG5cdHZhciB0aGVUcmFpbGVyTGluaztcblx0JGh0dHAuZ2V0KCdodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9YmJjMjQ4ZjQxMWVjMzY1N2JkOTg0NGY5YmQ0YTJiZGEmbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRmaXJzdE1vdmllSUQgPSByZXNwb25zZS5kYXRhLnJlc3VsdHNbMF0uaWQ7XG5cdFx0cmV0dXJuIGZpcnN0TW92aWVJRDtcblx0fSkudGhlbihmdW5jdGlvbiAoZmlyc3RNb3ZpZUlEKSB7XG5cdFx0dmFyIHRoZVJlcXVlc3QgPSAnaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8nICsgZmlyc3RNb3ZpZUlEICsgJy92aWRlb3M/YXBpX2tleT1iYmMyNDhmNDExZWMzNjU3YmQ5ODQ0ZjliZDRhMmJkYSZsYW5ndWFnZT1lbi1VUyc7XG5cdFx0JGh0dHAuZ2V0KHRoZVJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XHR0aGVUcmFpbGVyTGluayA9ICc8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyByZXNwb25zZS5kYXRhLnJlc3VsdHNbMF0ua2V5ICsgJ1wiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nO1xuXHRcdFx0JHNjb3BlLnRyYWlsZXIgPSB0aGVUcmFpbGVyTGluaztcblx0XHR9KTtcblx0fSk7XG5cdHRoaXMuc2hvd01lID0gZmFsc2U7XG5cdCRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5zaG93TWUgPSAhdGhpcy5zaG93TWU7XG5cdFx0dmFyIG15RWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeW91dHViZURpdicpKTtcblx0XHRteUVsZW1lbnQuYXBwZW5kKHRoZVRyYWlsZXJMaW5rKTtcblx0fTtcblx0JHNjb3BlLmhpZGVQb3B1cCA9IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLnNob3dNZSA9IGZhbHNlO1xuXHR9O1xufV0pO1xuXG5hcHAuY29udHJvbGxlcignZ2V0Q3VycmVudCcsIFsnJHNjb3BlJywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uICgkc2NvcGUsICRsb2NhdGlvbikge1xuXHQkc2NvcGUuaXNDdXJyZW50UGFnZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG5cdFx0cmV0dXJuIHBhdGggPT0gJGxvY2F0aW9uLnBhdGgoKTtcblx0fTtcbn1dKTtcblxuYXBwLmNvbnRyb2xsZXIoJ2dldE5ld3MnLCBbJyRzY29wZScsICckaHR0cCcsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwKSB7XG5cblx0dmFyIHRpbWVySWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIHRoZU5ld3MoKSB7XG5cdFx0JGh0dHAuZ2V0KCdodHRwczovL25ld3NhcGkub3JnL3YxL2FydGljbGVzP3NvdXJjZT1kYWlseS1tYWlsJnNvcnRCeT1sYXRlc3QmYXBpS2V5PTNlMzk5MjdlYzAwZjQ4ZDRiODU5MTAzNDg5YzA2ZjM4JykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcdCRzY29wZS5uZXdzID0gcmVzcG9uc2UuZGF0YS5hcnRpY2xlcztcblx0XHR9KTtcblxuXHRcdCRodHRwLmdldCgnaHR0cHM6Ly9uZXdzYXBpLm9yZy92MS9hcnRpY2xlcz9zb3VyY2U9ZW50ZXJ0YWlubWVudC13ZWVrbHkmc29ydEJ5PXRvcCZhcGlLZXk9M2UzOTkyN2VjMDBmNDhkNGI4NTkxMDM0ODljMDZmMzgnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFx0JHNjb3BlLm5ld3MyID0gcmVzcG9uc2UuZGF0YS5hcnRpY2xlcztcblx0XHR9KTtcblx0XHRjb25zb2xlLmxvZygnbmV3cyB1cGRhdGVkJyk7XG5cdFx0dGltZXJJZCA9IHNldFRpbWVvdXQodGhlTmV3cywgMTIwMDAwKTtcblx0fSwgMCk7XG59XSk7XG5cbmFwcC5jb250cm9sbGVyKCdnZXRNYXAnLCBbJyRzY29wZScsICckaHR0cCcsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwKSB7XG5cdCRodHRwLmdldCgnLi4vb3RoZXJzL2NpdGllcy5jc3YnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdHZhciBnZW9BcnJheSA9IFtdO1xuXHRcdHZhciBjaXRpZXNBcnJheSA9IFtdO1xuXHRcdHZhciBhbGxUaGVUZXh0ID0gcmVzcG9uc2UuZGF0YS5zcGxpdCgvXFxyP1xcbnxcXHIvKTtcblx0XHRmb3IgKHZhciBzaW5nbGVSb3cgPSAxOyBzaW5nbGVSb3cgPCBhbGxUaGVUZXh0Lmxlbmd0aDsgc2luZ2xlUm93KyspIHtcblx0XHRcdHZhciBfZ2VvQXJyYXkkcHVzaDtcblxuXHRcdFx0dmFyIHJvd0NlbGxzID0gYWxsVGhlVGV4dFtzaW5nbGVSb3ddLnNwbGl0KCc7Jyk7XG5cdFx0XHRnZW9BcnJheS5wdXNoKChfZ2VvQXJyYXkkcHVzaCA9IHt9LCBfZGVmaW5lUHJvcGVydHkoX2dlb0FycmF5JHB1c2gsICdsYXQnLCBldmFsKHJvd0NlbGxzWzJdKSksIF9kZWZpbmVQcm9wZXJ0eShfZ2VvQXJyYXkkcHVzaCwgJ2xuZycsIGV2YWwocm93Q2VsbHNbM10pKSwgX2dlb0FycmF5JHB1c2gpKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgYW5vdGhlclJvdyA9IDE7IGFub3RoZXJSb3cgPCBhbGxUaGVUZXh0Lmxlbmd0aDsgYW5vdGhlclJvdysrKSB7XG5cdFx0XHR2YXIgYW5vdGhlckNlbGxzID0gYWxsVGhlVGV4dFthbm90aGVyUm93XS5zcGxpdCgnOycpO1xuXHRcdFx0Y2l0aWVzQXJyYXkucHVzaChbYW5vdGhlckNlbGxzWzBdLCBhbm90aGVyQ2VsbHNbMV1dKTtcblx0XHR9XG5cdFx0JHNjb3BlLmNpdGllcyA9IGNpdGllc0FycmF5O1xuXG5cdFx0aW5pdE1hcCgpO1xuXG5cdFx0Ly9cdFx0Zm9yICh2YXIgaT0wOyBpPGdlb0FycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly9cdFx0XHR2YXIgdGhlTGF0TG5nID0gZ2VvQXJyYXlbaV07XG5cdFx0Ly9cdFx0XHR2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0Ly9cdFx0XHRcdHBvc2l0aW9uOiB0aGVMYXRMbmcsXG5cdFx0Ly9cdFx0XHRcdHRpdGxlOiAnTW92aWUgYnVzaW5lc3MgaXMgaGVyZSEnXG5cdFx0Ly9cdFx0XHR9KTtcblx0XHQvL1x0XHRcdG1hcmtlci5zZXRNYXAobWFwKTtcblx0XHQvL1x0XHR9XG5cblx0XHR2YXIgbWFya2VycyA9IGdlb0FycmF5Lm1hcChmdW5jdGlvbiAobG9jYXRpb24pIHtcblx0XHRcdHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IGxvY2F0aW9uLFxuXHRcdFx0XHRsYWJlbDogJ01vdmllIGJ1c2luZXNzIGlzIGhlcmUhJ1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBBZGQgYSBtYXJrZXIgY2x1c3RlcmVyIHRvIG1hbmFnZSB0aGUgbWFya2Vycy5cblx0XHR2YXIgbWFya2VyQ2x1c3RlciA9IG5ldyBNYXJrZXJDbHVzdGVyZXIobWFwLCBtYXJrZXJzLCB7IGltYWdlUGF0aDogJ2h0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2V4YW1wbGVzL21hcmtlcmNsdXN0ZXJlci9tJyB9KTtcblx0fSk7XG59XSk7XG5cbmZ1bmN0aW9uIGluaXRNYXAoKSB7XG5cdHZhciBteUxhdExuZyA9IHsgbGF0OiAzMCwgbG5nOiAwIH07XG5cdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XG5cdFx0em9vbTogMixcblx0XHRjZW50ZXI6IG15TGF0TG5nXG5cdH0pO1xufVxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcblx0bmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zd0dldERhdGEuanMnKS50aGVuKGZ1bmN0aW9uIChyZWdpc3RyYXRpb24pIHtcblx0XHRjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24nLCByZWdpc3RyYXRpb24pO1xuXHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0Y29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgZXJyb3I6ICcgKyBlcnIpO1xuXHR9KTtcbn1cblxuLy8tIGVuZGluamVjdFxuLy8tIGluamVjdDpwbHVnaW5zXG5cbi8vLSBlbmRpbmplY3QiXSwiZmlsZSI6Im1haW4uanMifQ==
