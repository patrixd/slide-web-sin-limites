
var isDebugMode = false;
var pi = Math.PI, pi180 = Math.PI / 180, pi2 = pi + pi, pi05 = pi * 0.5, pi25 = pi * 0.25;
var ctx, canvas;
var stageW, stageH, stageW0, stageH0, screenW, stageCx, stageCy, worldW, worldX, worldH, worldY, worldWmax;
var cam, timespeed = 1, timespeedR, oldTime, totalFrame;
var mouseXw = 0, mouseYw = 0;
var deviceScale = 1, deviceScale2 = 1;
var windX, windY, windXr, windYr;
var logo, cat, tree, fish, sun, hphone, models, renderList;
var mouseX, mouseXp, mouseXo, mouseY, mouseYo, mouseX2, mouseY2, pind = 0, taptype = -1;
var modelx, modely, modelz;
var isMouseDown, isMouse, isPC, isIPAD, isSafari, isIE, isStageResize;
var bgColor = "rgb( 80%, 0%, 40% )";
var closeper, closeperR, state = 0, mouseXpsa = 0, mouseXpR = 0;
var isCanvasClear, colcc = 0, finishCC = 0;
var crect_xx = 0, crect_yy = 0, crect_w = 1, crect_xstart = 1, crect_hh = 1;

if( window.devicePixelRatio == 2 ) {
	deviceScale = 1.98;
	deviceScale2 = 1 / deviceScale;
}
document.write( '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1" />' );
document.write(
'<script type="text/javascript" src="js/Polygon.js"></script>' +
'<script type="text/javascript" src="js/Bone.js"></script>' +
'<script type="text/javascript" src="js/Vertex.js"></script>' +
'<script type="text/javascript" src="js/Camera.js"></script>' +
'<script type="text/javascript" src="js/Logo.js"></script>' +
'<script type="text/javascript" src="js/TreeData.js"></script>' +
'<script type="text/javascript" src="js/TxtData.js"></script>' +
'<script type="text/javascript" src="js/Mesh.js"></script>' +
'<script type="text/javascript" src="js/TextField.js"></script>' +
'<script type="text/javascript" src="js/Tree.js"></script>' +
'<script type="text/javascript" src="js/Sun.js"></script>' +
'<script type="text/javascript" src="js/Fish.js"></script>' +
'<script type="text/javascript" src="js/Cat.js"></script>' +
'<script type="text/javascript" src="js/HeadPhone.js"></script>'
);

var addListener = function( e, str, func ) {
	if( e.addEventListener ) {
		e.addEventListener( str, func, false );
	}else if( e.attachEvent ) {
		e.attachEvent( "on" + str, func );
	}else {
		
	}
};
addListener( window, "load", init );

//init
function init() {
	var style = document.body.style;
	style.fontFamily = "Verdana, Arial, Helvetica, sans-serif";
	style.margin = style.padding = 0;
	style.overflow = "hidden";
	style.backgroundColor = bgColor;
	style.width = style.height = "100%";
	
	var chk = true;
	var ua = navigator.userAgent.toUpperCase();
	isIE = ua.indexOf( "MSIE" ) > -1;
	isMouse = !( "ontouchstart" in window );
	
	if ( ua.indexOf( "ANDROID" )  > -1 || ua.indexOf( "IPHONE" ) > -1 || ( isIPAD = ua.indexOf( "IPAD" ) > -1 ) || ua.indexOf( "IPOD" )  > -1 ) {
		isPC = false;
	}else {
		isPC = true;
	}
	if ( ua.indexOf( "SAFARI" ) > -1 && ua.indexOf( "CHROME" ) == -1 && ua.indexOf( "ANDROID" )  == -1 ) {
		isSafari = true;
		var idx0 = ua.indexOf( "VERSION" ) + 8;
		var idx1 = ua.indexOf( " ", idx0 );
		var versions = (ua.substring( idx0, idx1)).split(".");
		var version = versions[0];
		if ( versions.length > 1 ) version += "." + versions[1] + ( versions.length > 2 ? versions[2] : "" );
		version = Number( version );
	}else {
		isSafari = false;
	}
	
	canvas = document.createElement("canvas");
	if ( !canvas || !canvas.getContext ) {
		chk = false;
	}
	
	if ( !chk ) {
		var el = document.getElementById("message"); 
		el.style.display = "block";
		return;
	}else {
		setTimeout( init2 , 100 );
	}
};

function init2() {
	ctx = canvas.getContext("2d");
	document.body.appendChild( canvas ); 
	canvas.style.position = "absolute";
	
	canvas.width = screen.availWidth * deviceScale << 0;
	canvas.height = screen.availHeight * deviceScale << 0;
	
	logo = new Logo();
	logo.init();
	
	models = [ cat = new Cat(), hphone = new HeadPhone(), fish = new Fish(), sun = new Sun(), tree = new Tree(), txtf = new TextField() ];
	renderList = [ sun, tree, cat, fish, hphone, txtf ];
	for( i = 0; i < models.length; ++i ){
		models[i].init( i );
	}
	
	sun.setTarget( cat.spine3 );
	fish.setTarget( cat.spine3 );
	tree.createTrees( cat.spine2, cat.spine3, cat.spine4 );
	cam = new Camera();
	
	mouseX = mouseXp = mouseXo = mouseY = mouseYo = mouseX2 = mouseY2 = 0;
	addListener( window, "resize", stageResize );
	
	setTimeout( start , 300 );
};

function setBtnEvent( bt ) {
	bt.style.color = bt.normalColor;
	if( isMouse ){
		bt.addEventListener( "mouseover", function() { bt.style.color = bt.overColor; } , false );
		bt.addEventListener( "mouseout", function() { bt.style.color = bt.normalColor; } , false );
	}
};

function start() {
	worldX = 0;
	doStageResize();
	
	logo.show( true );
	eventSet( canvas );
	if( window.orientation != null ){
		addListener( window, "orientationchange", windowOrientation );
	}
	
	cat.opening();
	
	var interval = 1000 / 48 >> 0;
	totalFrame= 0;
	oldTime = new Date().getTime();
	windX = windY = 0;
	windXr = windYr = 0;
	var timer = setInterval( update, interval );
};

function trace( str ) {logo.trace( str );} //TODO

function finish(){
	state = 2;
	cat.finish();
	fish.finish();
	tree.finish();
	cam.finish();
	renderList = [ sun, cat, hphone, tree, txtf ];
};

function update() {
	var now = new Date().getTime();
	var passt = now - oldTime;
	oldTime = now;
	timespeed = passt / 33;
	if( timespeed < 0.4 ) timespeed = 0.4;
	else if( timespeed > 2 ) timespeed = 2;
	timespeedR = ( 2 / timespeed - 1 ) / 4;
	
	var ts = timespeed;
	if( isStageResize ){
		doStageResize();
	}
	
	if( !isPC ){
		var devZZr;
		var ms0 = 0.6 * ts;
		var ms1 = 0.3 + timespeedR * 0.4;
		if( state == 2 ){
			mouseXp += ( deviceW - mouseXp ) * 0.35 * ts;
		}
		else if( !isMouseDown ){
			devZZr = 0.35;
			if( mouseXp < devZZr * deviceW ){
				mouseXp += ( devZZr * deviceW - mouseXp ) * 0.6 * ts;
			}
			if( mouseXp > stageW ){
				mouseXp += ( stageW - mouseXp ) * 0.6 * ts;
			}
		}else{
			devZZr = 0.19;
			if( mouseXp < devZZr * deviceW ){
				mouseXp += ( devZZr * deviceW - mouseXp ) * 0.5 * ts;
			}
			ms1 *= 0.6;
		}
		mouseXpR += mouseXpsa = ( mouseXp - mouseXpR ) * ms0 + mouseXpsa * ms1;
		worldW = worldX = mouseXpR * cam.zz;
	}
	
	var wdbmin = isPC ? 3300 : 1500;
	var wdb =  Math.min( 4900, deviceW * cam.zz - wdbmin );
	closeper = Math.max( 0, ( worldW - wdbmin ) / wdb );
	
	if( state == 0 ){
		if( closeper < 0.2 ){
			state = 1;
		}
	}else if( state == 1 && closeper > 0.92 ){
		finishCC += ts;
		if( finishCC > 40 ){
			finish();
		}
	}else if( state == 2 ){
		finishCC = 0;
		closeper = 1;
	}else{
		finishCC = 0;
	}
	
	closeperR = Math.max( -1, 1 - closeper );
	totalFrame += ts;
	if( totalFrame > 2 ){
		totalFrame = 0;
		txtf.setTitle();
	}
	
	windX = ( Math.cos( windXr ) * 1 - 0 + Math.random() * 1 - 0.5 ) * ts;
	windY = ( Math.cos( windYr ) * 1 + Math.random() * 1 - 0.5 ) * ts;
	windXr += ( Math.random() * 0.2 + 0.05 ) * ts;
	windYr += ( Math.random() * 0.05 + 0.025 ) * ts;
	
	cam.update();
	
	var i, len = models.length, m;
	ctx.fillStyle = bgColor;
	
	if( isCanvasClear ){
		isCanvasClear = false;
		ctx.fillRect( 0, 0, canvas.width, canvas.height );
	}else{
		for( i = 0; i < len; ++i ){
			m = models[i];
			m.clearCanvas( ctx );
		}
	}
	
	if( !isPC ){
		ctx.fillStyle = bgColor;
		ctx.fillRect( crect_xx, crect_yy, crect_w,  crect_hh );
		ctx.fillRect( 0, crect_yy, crect_xstart,  crect_hh );
		
		ctx.fillStyle = "#000";
		var xx = ( worldX >> 1 ) * cam.zz_r + stageCx;
		var hh = stageH * 1 >> 0;
		var yy = stageH - hh >> 1;
		var xstart = stageW - xx;
		ctx.fillRect( xx, yy, stageW,  hh );
		ctx.fillRect( 0, yy, xstart,  hh );
		crect_xx = xx - 1;
		crect_yy = yy - 1;
		crect_w = stageW + 2;
		crect_xstart = xstart + 2;
		crect_hh = hh + 2;
	}
	
	for( i = 0; i < len; ++i ){
		models[i].update();
	}
	len = renderList.length;
	for( i = 0; i < len; ++i ){
		renderList[i].render();
	}
};

function eventSet( evtg ) {
	evtg.addEventListener( ( isMouse ? "mousedown" : "touchstart" ), touchStartHandler, false );
	evtg.addEventListener( ( isMouse ? "mousemove" : "touchmove" ), touchMoveHandler, false );
	evtg.addEventListener( ( isMouse ? "mouseup" : "touchend" ), touchEndHandler, false );
};

var windowOrientation = function() {
	stageResize();
};

var touchStartHandler = function( e ) {
	e.preventDefault();
	if ( !isMouseDown ) {
		isMouseDown = true;
		mouseX = e.pageX;
		mouseY = e.pageY;
		touchMoveHandler( e );
	}
};

var touchMoveHandler = function( e ) {
	if ( isMouseDown ) {
		if ( isMouse ) {
			taptype = 0;
			setMousePoint( e );
		}
		else{
			var ot = taptype;
			if ( ot != 1 ) {
				taptype = ( event.changedTouches.length == 1 ) ? 0 : 1;
			}
			var pt = e.changedTouches[0];
			mouseX = pt.pageX;
			mouseY = pt.pageY;
		}
		
		if ( taptype == 0 ) {
			
		}else {
			pt = event.changedTouches[1];
			mouseX2 = pt.pageX;
			mouseY2 = pt.pageY;
			var l0 = mouseX - mouseX2;
			var l1 = mouseY - mouseY2;
			var l = Math.sqrt( l0 * l0 + l1 * l1 );
			if( pind > 0 ){
				var d = ( l - pind ) * 1 * deviceScale;
				mouseXp += d;
			}
			pind = l;
		}
	}
};

function setMousePoint( e ){
	if( e ) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	}else{
		mouseX = event.x + document.body.scrollLeft;
		mouseY = event.y + document.body.scrollTop;
	}
};

var touchEndHandler = function( e ) {
	if( isMouseDown ){
		isMouseDown = false;
		taptype = -1;
		pind = 0;
	}
};

function stageResize() {
	isStageResize = true;
};

function doStageResize() {
	isStageResize = false;
	var w = window.innerWidth;
	var h = window.innerHeight;
	stageW0 = w;
	stageH0 = h;
	stageW = w * deviceScale;
	stageH = h * deviceScale;
	stageCx = stageW >> 1;
	stageCy = stageH >> 1;
	
	cam.stageResize( isPC );
	
	if( isPC ){
		if( stageW > canvas.width ){
			canvas.width = stageW;
			isCanvasClear = true;
		}
		if( stageH > canvas.height ){
			canvas.height = stageH;
			isCanvasClear = true;
		}
	}else{
		canvas.width = stageW;
		canvas.height = stageH;
		canvas.style.width = w + "px";
		canvas.style.height = h + "px";
		isCanvasClear = true;
	}
	
	if( mouseXp == 0 ){
		mouseXp = stageW;
		mouseXpR = mouseXp;
	}
	
	var xx = stageW * cam.zz;
	worldX = worldW = xx >> 0;
	worldWmax = xx >> 0;
	
	var yy = stageCy * cam.zz;
	worldY = -yy;
	worldH = worldY << 1;
	
	deviceW = screen.availWidth * deviceScale;
	
	screenW = screen.availWidth;
};
