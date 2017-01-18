(function () {

	$(".html-preview-code code").blur(function (e) {
		var $el = $(e.currentTarget);
		var code = $el.text();
		$el.closest("section").find(".html-preview-container").html(code);
	});
})();