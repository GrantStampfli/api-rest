var url = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=4cd56a0ac053497268c94cc90da8b9a5&format=json&api_sig=31fde54e12236c5cd3b48ac28e1be278';
$.ajax(url, { dataType: 'jsonp', jsonp: 'jsoncallback' })
	.then(function(data, status, xhr) {
		console.log(status);
		console.log('success (promises): ' + data.name);
}, function(xhr, status, error) {
	console.log('failed (promises): ' + error);
});
