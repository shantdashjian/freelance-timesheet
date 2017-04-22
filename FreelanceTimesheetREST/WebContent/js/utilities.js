var capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var date = function(year, month, day) {
	return month + '/' + day + '/' + year;
}

var dollarAmount = function(amount){
	return '$'+amount.toFixed(2);
}

var twoDecimalAmount = function(amount){
	return amount.toFixed(2);
}