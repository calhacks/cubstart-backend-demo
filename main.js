
function sendGet(route, cb) {
	var url = API_BASE_URL + route;
	$('#requests-content').append('GET ' + url);
	$('#requests-content').append('<br/>');
	$.get(url, function(data) {
		$('#responses-content').append(JSON.stringify(data) + ' (status 200)');
		$('#responses-content').append('<br/>');
		if (cb) cb(data);
	});
}

function sendPost(route, d, cb) {
	var url = API_BASE_URL + route;
	$('#requests-content').append('POST ' + url + ' ' + JSON.stringify(d));
	$('#requests-content').append('<br/>');
	$.post(url, d, function(data) {
		console.log(data)
		$('#responses-content').append('' + JSON.stringify(data) + ' (status 200)');
		$('#responses-content').append('<br/>');
		if (cb) cb(data);
	});
}

function refreshCounter() {
	sendGet('/counter', function(data) {
		$('#number').text(data);
	});
}

$(document).ajaxError(function(event, jqxhr, settings, error) {
	$('#responses-content').append('Error status ' + jqxhr.status + ' <br/>');
});

$(function() {
	refreshCounter();

	$('#add').click(function() {
		sendPost('/add', {}, function() {
			refreshCounter();
		});
	});

	$('#subtract').click(function() {
		sendPost('/subtract', {}, function() {
			refreshCounter();
		});
	});

	setInterval(refreshCounter, 1000);
});
