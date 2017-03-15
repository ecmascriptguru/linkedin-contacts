(function(window, jQuery) {
	var lnContactsManager = (function() {
		var init = function() {
			console.log("content script is working...");
		}
		return {
			init: init
		};
	})();

	window.ContactsManager = lnContactsManager;
})(window, $);