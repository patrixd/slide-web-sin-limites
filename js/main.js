(function () {

	$(".html-preview-code code").blur(function (e) {
		var $el = $(e.currentTarget);
		var code = $el.text();
		$el.closest("section").find(".html-preview-container").html(code);
	});

    $(".play").click(function (e) {
        var $el = $(e.currentTarget);
        var url = $el.data('url');
        $el.closest("section").append("<iframe src='" + url + "'></iframe>");
        $el.closest("section").find(".close-iframe").removeClass("hidden");
        $el.addClass("hidden");
    });
    $(".close-iframe").click(function (e) {
        var $el = $(e.currentTarget);
        $el.closest("section").find("iframe").remove();
        $el.closest("section").find(".close-iframe").addClass("hidden");
        $el.closest("section").find(".play").removeClass("hidden");
    });
})();