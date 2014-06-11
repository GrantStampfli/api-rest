var key = '72ba71f6b1a5511c33d79e03be3ff7b7';
var flickrUrl = 'https://api.flickr.com/services/rest/?' +
'method=flickr.interestingness.getList&' +
'api_key=' + key + '&format=json';
var x = 40;
var y = 0;
$.ajax(flickrUrl, { dataType: 'jsonp', jsonp: 'jsoncallback' })
	.then(function(data, status, xhr) {
		console.log(status);
		console.log('success (promises): ' + data.name);
		generatePics(generateUrl(makeArrayOfObj(data, x, y)));
}, function(xhr, status, error) {
	console.log('failed (promises): ' + error);
});

/* Flickr getting data from API and Displaying */

$(window).scroll(function() {
    if($(window).scrollTop() === $(document).height() - $(window).height()) {
    	x = x + 40;
    	y = y + 40;
			$.ajax(flickrUrl, { dataType: 'jsonp', jsonp: 'jsoncallback' })
				.then(function(data, status, xhr) {
					console.log(status);
					console.log('success (promises): ' + data.name);
					generatePics(generateUrl(makeArrayOfObj(data, x, y)));
			}, function(xhr, status, error) {
				console.log('failed (promises): ' + error);
			});
    }
});

var makeArrayOfObj = function(jsonData, numOfPhotos, startPhoto) {
	var list = [];
	var items = jsonData.photos.photo;
	for (var i = startPhoto; i < numOfPhotos; i++) {
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

function generatePics(urlArray) {
	urlArray.forEach(function(url) {
		$('body').append('<img src="' + url + '"/>');
	});
}
