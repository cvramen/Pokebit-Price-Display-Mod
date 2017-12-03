jQuery(window).bind("load", function() {
setTimeout(function()
{

var whatloc = String(location); // Current page's URL

if ((whatloc.indexOf("product") != -1) && (whatloc.indexOf("product-category") == -1)) { // This instructs an element on the page to have a maximum width on certain pages
	jQuery("#primary").css("max-width","722px");
} 

var whatmod; // Set a variable to store the element we are going to modify

/* Specific instructions on which element to modify based on which page the user is on  */
if ((whatloc.indexOf("cart") != -1) && (whatloc.indexOf("pay") == -1) && (whatloc.indexOf("checkout") == -1)) {
	whatmod = ".amount";
} else if ((whatloc.indexOf("cart") == -1) && (whatloc.indexOf("pay") == -1) && (whatloc.indexOf("checkout") == -1)) {
	whatmod = ".amount";
/*} else if (whatloc.indexOf("cart") != -1) {
	whatmod = ".order-total .amount";*/
} else {
	whatmod = ".total .amount";
}

jQuery.getJSON("https://bitpay.com/api/rates", callbackFuncWithData); // Access Bitcoin US Dollar exchange rate data with JSON, data source is updated frequently

var gusdrate; // Variable to store the current US Dollar exchange rate of Bitcoin

function callbackFuncWithData(data)
{
var usdrate = data;
gusdrate = usdrate[1].rate; // access first element in the JSON object

	jQuery(whatmod).each(function() { // Go through each element that has been determined to be in need of modification
	var whatpr = "";
	whatpr = jQuery(this).html();
	whatpr = whatpr.substr(1);
	whatpr /= gusdrate; // Get the Bitcoin price automatically based on exchange rate data and performing division
	whatpr = Math.round(whatpr * 10000)/10000; // Remove unnecessary decimal places
	jQuery(this).before("<div class='mercer' style='color:#ee8d00;font-size:15pt;'>" + whatpr + " Bitcoin</div>");	// Precede the word "Bitcoin" with the Bitcoin price
	});
}

},1);
});

jQuery(window).bind("load", function() {
var presento = 0;
setInterval(function()
{
var tellme = String(jQuery("body").html());
if (tellme.indexOf("mercer") != -1 && (presento < 1)) {

	jQuery(".amount").prepend("<span style='font-size:79%;'>US Dollar Equivalent</span> ~ "); // The store stores product values in Dollars by default. The customers pay in Bitcoin. This simply informs the customer that the displayed value is the US Dollar Equivalent of the price they are actually paying
	presento++;
}
},1700);
});