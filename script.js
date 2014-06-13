$(document).ready(function() {
  'use strict';
  var app = (function(){

		var key = '72ba71f6b1a5511c33d79e03be3ff7b7';
		var flickrUrl = 'https://api.flickr.com/services/rest/?' +
		'method=flickr.interestingness.getList&' +
		'api_key=' + key + '&format=json';
		var x = 40;
		$.ajax(flickrUrl, { dataType: 'jsonp', jsonp: 'jsoncallback' })
			.then(function(data, status, xhr) {
				console.log(status);
				console.log('success (promises): ' + data.name);
				generatePics(generateUrl(makeArrayOfObj(data, x)));
		}, function(xhr, status, error) {
			console.log('failed (promises): ' + error);
		});

		/* Flickr getting data from API and Displaying */

		$(window).scroll(function() {
		    if($(window).scrollTop() === $(document).height() - $(window).height()) {
		    	x = x+40;
					$.ajax(flickrUrl, { dataType: 'jsonp', jsonp: 'jsoncallback' })
						.then(function(data, status, xhr) {
							console.log(status);
							console.log('success (promises): ' + data.name);
							generatePics(generateUrl(makeArrayOfObj(data, x)));
					}, function(xhr, status, error) {
						console.log('failed (promises): ' + error);
					});
		    }
		});

		var makeArrayOfObj = function(jsonData) {
			var list = [];
			var items = jsonData.photos.photo;
			for (var i = 0; i < items.length; i++) {
				var title = '(untitled)';
				if (items[i].title !== '') {
					title = items[i].title;
				}
				list.push ({
					farm: items[i].farm,
					server: items[i].server,
					photo: items[i].id,
					secret: items[i].secret,
					owner: items[i].owner,
					title: title

				});

			}
			return list;
		};

		function generateUrl(arrayOfObj) {
			var urlArray = [];
			arrayOfObj.forEach(function(picObj){
				var picUrl = 'https://farm' + picObj.farm +
				'.staticflickr.com/' + picObj.server + '/' +
				picObj.photo + '_'+ picObj.secret +'_q.jpg';
				urlArray.push(picUrl);
			});
			return urlArray;
		}

		function generatePics(urlArray, numOfPhotos) {

			var leftOvers = urlArray.length - numOfPhotos;
			var i = 0;
			urlArray.forEach(function(url, cb) {
				$('body').append('<img src="' + url + '"/>');
				i = i + 1;
				if (i === numOfPhotos) { cb(); }

			});
		}

  });

  $(app());

})();
