
function Logo() {}

Logo.prototype.init = function( w, h ) {
	var zindex = 10;
	var el, els, body = document.body;
	var me = this;
	
	el = this.traceTF = document.createElement("div");
	els = el.style;
	el.innerHTML = "trace";
	body.appendChild( el );
	els.position = "absolute";
	els.fontSize = "9px";
	els.left = "16px";
	els.top = "70px";
	
	el = this.aboutbtn = document.createElement("a");
	els = el.style;
	body.appendChild( el );
	el.href = "http://roxik.com/";
	el.target = "_blank";
	el.innerHTML = "about me";
	els.position = "absolute";
	els.fontSize = isPC ? "11px" : "11px";
	els.zIndex = ++zindex;
	els.textDecoration = "none";
	els.whiteSpace = "nowrap";
	els.padding = "4px";
	el.normalColor = "#F9A";
	el.overColor = "#FFF";
	setBtnEvent( el );
	el.addEventListener( ( isMouse ? "mousedown" : "touchstart" ), function(){ this.style.color = "#FFF";}, false );
	el.addEventListener( ( isMouse ? "mouseup" : "touchend" ), function() { this.style.color = "#F9A"; } , false );
	
	el = this.subtxt = document.createElement("div");
	els = el.style;
	el.innerHTML = "change view";
	body.appendChild( el );
	els.position = "absolute";
	els.color = "#F9A";
	els.fontSize = isPC ? "11px" : "11px";
	els.zIndex = ++zindex;
	els.padding = "4px";
	els.whiteSpace = "nowrap";
	el.style.cursor = "pointer";
	el.addEventListener( "mouseover", function() { this.style.color = "#FFF"; } , false );
	el.addEventListener( "mouseout", function() { this.style.color = "#F9A"; } , false );
	el.addEventListener( ( isMouse ? "mousedown" : "touchstart" ), function(){ 
		this.style.color = "#F9A";
		isDebugMode = !isDebugMode;
	}, false );
	el.addEventListener( ( isMouse ? "mouseup" : "touchend" ), function() { this.style.color = "#F9A"; } , false );
	
	this.aboutbtn.style.top = 16 + "px";
	this.subtxt.style.top = 42 + "px";
	this.aboutbtn.style.left = this.subtxt.style.left = "12px";
	
	this.anum = -1;
	this.show( false );
}

Logo.prototype.show = function( isShow ) {
	this.aboutbtn.style.display = 
	this.subtxt.style.display = isShow ? "block" : "none";
};

Logo.prototype.trace = function( str ) {
	if( this.traceStr ){
		if( this.traceStr.length > 6 ){
			this.traceStr.shift();
		}
	}else{
		this.traceStr = [];
	}
	this.traceStr.push( str );
	this.traceTF.innerHTML = this.traceStr.join("<br>");
};

