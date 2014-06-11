var url = 'https://api.flickr.com/services/rest/?' + 
'method=flickr.interestingness.getList&' + 
'api_key=72ba71f6b1a5511c33d79e03be3ff7b7&' + 
'format=json';
$.ajax(url, { dataType: 'jsonp', jsonp: 'jsoncallback' })
	.then(function(data, status, xhr) {
		console.log(status);
		console.log('success (promises): ' + data.name);
}, function(xhr, status, error) {
	console.log('failed (promises): ' + error);
});
