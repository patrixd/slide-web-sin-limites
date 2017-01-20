
function TextField() {};
TextField.prototype = new Mesh();

TextField.prototype.init = function( n ) {
	this.id = n;
	this.floorY = -1000;
	var mat_b = { color : "#000", render : "renderSolid" };
	
	var verticesrc = [[106,98,0],[114,142,0],[-71,-30,0],[106,-96,0],[114,-141,0],[-61,125,0],[-32,85,0],[-33,-84,0],[-117,-48,0],[-63,-126,0],[-117,47,0],[-71,31,0],[73,78,0],[73,51,0],[14,51,0],[14,-94,0],[-15,-94,0],[-15,51,0],[-73,51,0],[-73,78,0],[-90,-94,0],[0,95,0],[90,-94,0],[41,-54,0],[-38,-53,0],[-58,-94,0],[60,-94,0],[0,34,0],[29,-30,0],[-29,-30,0],[57,22,0],[57,-5,0],[69,86,0],[69,59,0],[-26,59,0],[-26,-94,0],[-56,-94,0],[-56,86,0],[-26,-5,0],[-26,22,0]];
	var polysrc = [[5,10,9,11,6,2,1,7,12,3,8,4],[13,14,15,16,17,18,19,20],[22,23,27,24,29,28,30,29,24,25,26,21],[38,33,34,35,40,31,32,39,36,37]];
	var matsrc = [{material:mat_b,vIDs:[1,2,3,4,5,6,7,8,9,10,11,12]},{material:mat_b,vIDs:[13,14,15,16,17,18,19,20]},{material:mat_b,vIDs:[21,22,23,24,25,26,27,28,29,30,31,32]},{material:mat_b,vIDs:[33,34,35,36,37,38,39,40,41,42]}];

	var scl = 0.6;
	for( var i in verticesrc ){
		verticesrc[i][0] *= scl;
		verticesrc[i][1] *= scl;
	}

	this.makeBody( verticesrc, polysrc, matsrc );
	
	this.pC = this.polygons[0];
	this.pA = this.polygons[2];
	this.pT = this.polygons[1];
	this.pF = this.polygons[3];
	
	this.hasBone = true;
	this.bC = new Bone();
	this.bA = new Bone();
	this.bT = new Bone();
	this.bF = new Bone();
	this.bC.setVertices( this.pC.vertices, false );
	this.bA.setVertices( this.pA.vertices, false );
	this.bT.setVertices( this.pT.vertices, false );
	this.bF.setVertices( this.pF.vertices, false );
	
	this.bC.dy = this.bA.dy = this.bT.dy = this.floorY;
	this.bF.dy = this.floorY + 800;
	
	this.bC.dz = this.bA.dz = this.bT.dz = this.bF.dz = -7000;
	
	this.bF.rz = -3;
	
	this.renderMinX = this.renderMinY = 0;
	this.renderMaxX = this.renderMaxY = 1;
	this.isFat = false;
	
	this.anum = -1;
	this.txts = [];
	var len = 10;
	var per = 0;
	var spc = ( 1 - per ) / ( len-1 );
	for( var i=0; i<len; ++i ){
		var v = new TxtData( i, per );
		per += spc;
		this.txts[i] = v;
	}
	this.render = this.render0;
};

TextField.prototype.update = function() {};

TextField.prototype.clearCanvas = function( tg ) {
	var m =this;
	tg.fillRect( m.renderMinX, m.renderMinY, m.renderMaxX - m.renderMinX,  m.renderMaxY - m.renderMinY );
};

TextField.prototype.setTitle = function() {
	if( state != 2 ){
		var len = Math.max( 1, Math.min( this.txts.length, ( worldX - 2800 ) * 0.0027 >> 0 ));
		if( !this.isFat && len == 1 ){ this.isFat = true; }
		if( len != this.anum ){
			this.anum = len;
			var str = this.isFat ? "F" : "C";
			while( len-- ){str += "a";}
			document.title = str + "t";
		}
	}
};

TextField.prototype.render0 = function() {
	var ts = timespeed;
	var txts = this.txts;
	var len = txts.length;
	var b, t, v, gr, p;
	var b0, b1;
	var bC = this.bC;
	var bA = this.bA;
	var bT = this.bT;
	var pC = this.pC;
	var pA = this.pA;
	var pT = this.pT;
	var vtxs, len2;
	
	var rs = 0.1 * ts;
	var s1 = 0.07;
	var s2 = 0.88;
	var showLimit = Math.min( len, this.anum );
	var ss = 0.2 * ts;
	var ss2 = 0.2 * ts;
	var xp = 125;
	var xx = -( showLimit + 1 ) * xp >> 1;
	var minX, maxX, minY, maxY;
	var offset = 4;
	var g = -20 * ts;
	var floorY = this.floorY;
	minX = minY = 9999;
	maxX = maxY = 0;
	
	//C
	if( this.isFat ){
		b = this.bF;
		p = this.pF;
		b.dx += ( xx + 4 - b.dx ) * ss;
		b.scale = 1;
		b.dy += b.vy;
		if( b.dy < floorY ){
			b.dy = floorY;
			if( ++b.cc < 4 ){
				b.vy = -b.vy * 0.7;
			}
		}
		b.rz += b.rsa = ( 0 - b.rz ) * s1 + b.rsa * s2;
		b.vy += g;
	}else{
		b = this.bC;
		p = this.pC;
		b.dx += ( xx - 6 - b.dx ) * ss;
		b.scale = 0.68;
	}
	
	b.updateMtx();
	vtxs = b.vertices;
	len2 = vtxs.length;
	for ( n = 0; n < len2; ++n ) {
		v = vtxs[n];
		v.tBone();
		v.update();
		if( v.sx < minX ){minX = v.sx;}
		if( v.sy < minY ){minY = v.sy;}
		else if( v.sy > maxY ){maxY = v.sy;}
	}
	p.render( ctx );
	if( isDebugMode ){
		ctx.strokeStyle = "#E680AC";
		ctx.stroke();
	}
	
	vtxs = pA.vertices;
	len2 = vtxs.length;
	
	for ( i = 0; i < len; ++i ) {
		t = txts[i];
		if( i < showLimit ){
			t.rrr += rs;
			gr = 0;
			t.scale += ( t.scaleG - t.scale ) * ss;
			xx += xp;
			if( !t.isShow ){
				t.vy = 40;
				t.dy = floorY + 150;
				t.r = pi;
				t.scale = 0.7;
				t.dycc = 0;
				t.isShow = true;
			}
		}else{
			gr = -pi;
			t.scale += ( 0 - t.scale ) * ss2;
			if( t.isShow ){
				t.vy = 90;
				t.isShow = false;
			}
		}
		
		t.dy += t.vy;
		if( t.dy < floorY ){
			t.dy = floorY;
			if( ++t.dycc < 3 ){
				t.vy = -t.vy * 0.4;
			}
		}
		t.r += t.rsa = ( gr - t.r ) * s1 + t.rsa * s2;
		t.vy += g;
		
		t.dx += ( xx - t.dx ) * ss;
		
		bA.dx = t.dx;
		bA.dy = t.dy;
		bA.rz = t.r;
		bA.scale = t.scale;
		bA.updateMtx();
		
		if( t.scale > 0.1 ){
			for ( n = 0; n < len2; ++n ) {
				v = vtxs[n];
				v.tBone();
				v.update();
				if( v.sx < minX ){minX = v.sx;}
				else if( v.sx > maxX ){	maxX = v.sx;}
				if( v.sy < minY ){minY = v.sy;}
				else if( v.sy > maxY ){maxY = v.sy;}
			}
			pA.render( ctx );
			
			if( isDebugMode ){
				ctx.strokeStyle = "#E680AC";
				ctx.stroke();
			}
		}
	}
	
	//T
	xx += xp;
	bT.dx += ( xx - 15 - bT.dx ) * ss;
	bT.scale = 1;
	bT.updateMtx();
	vtxs = bT.vertices;
	len2 = vtxs.length;
	for ( n = 0; n < len2; ++n ) {
		v = vtxs[n];
		v.tBone();
		v.update();
		if( v.sx > maxX ){	maxX = v.sx;}
		if( v.sy < minY ){minY = v.sy;}
		else if( v.sy > maxY ){maxY = v.sy;}
	}
	pT.render( ctx );
	if( isDebugMode ){
		ctx.strokeStyle = "#E680AC";
		ctx.stroke();
	}
	
	this.renderMinX = minX - offset >> 0;
	this.renderMaxX = maxX + offset >> 0;
	this.renderMinY = minY - offset >> 0;
	this.renderMaxY = maxY + offset >> 0;
};




