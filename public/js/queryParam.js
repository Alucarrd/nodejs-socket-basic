
function getQueryVariable(variable){
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++){
		var pairs = vars[i].split('=');
		if(decodeURIComponent(pairs[0]) == variable){
			return decodeURIComponent(pairs[1]).replace(/\+/g, ' ');
		}

	}
	return undefined;
}