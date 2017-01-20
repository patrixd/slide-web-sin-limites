
function Tree() {};
Tree.prototype = new Mesh();

Tree.prototype.init = function( n ) {
	this.id = n;
	var mat_tree = { color : "#000", render : "renderSolid" };

	var verticesrc = [[-20,-21,0],[-11,178,0],[-102,295,0],[106,300,0],[11,178,0],[18,-21,0],[-0,299,0],[-36,276,0],[43,273,0]];
	var polysrc = [[7,9,4,5,6,1,2,3,8]];
	var matsrc = [{material:mat_tree,vIDs:[1,2,3,4,5,6,7,8,9]}];

	this.makeBody( verticesrc, polysrc, matsrc );
	
	var vtxs = this.vertices;
	this.myBone = new Bone();
	this.neck = new Bone();
	this.neck.by = 180;
	this.neck.setParent( this.myBone );
	this.myBone.setVertices( [vtxs[0], vtxs[1], vtxs[4], vtxs[5]], false );
	this.neck.setVertices( [vtxs[1], vtxs[2], vtxs[3], vtxs[4], vtxs[6], vtxs[7], vtxs[8]], false );
	this.hasBone = true;
	
	this.renderMinX = this.renderMinY = 0;
	this.renderMaxX = this.renderMaxY = 1;
};

Tree.prototype.createTrees = function( b0, b1, b2 ) {
	this.trees = [];
	var len = 10;
	var per = 0.03;
	var spc = ( 0.9 - per ) / ( len-1 );
	var v;
	
	for( var i=0; i<len; ++i ){
		if( i % 2 == 0 ){
			v = new TreeData( i, b1, b0, per + Math.random() * 0.1, true );
		}else{
			v = new TreeData( i, b1, b2, per + Math.random() * 0.1, false );
		}
		per += spc;
		this.trees[i] = v;
	}
	this.render = this.render0;
};

Tree.prototype.update = function() {
};

Tree.prototype.finish = function() {
	var trees = this.trees;
	var len = trees.length;
	for ( var i = 0; i < len; ++i ) {
		t = trees[i];
		t.vy = Math.random() * 300 + 100;
		t.r += Math.random() * 12 - 6;
	}
	this.render = this.render1;
};

Tree.prototype.clearCanvas = function( tg ) {
	var trees = this.trees;
	var len = trees.length;
	for ( var i = 0; i < len; ++i ) {
		var m = trees[i];
		tg.fillRect( m.renderMinX, m.renderMinY, m.renderMaxX - m.renderMinX,  m.renderMaxY - m.renderMinY );
	}
};

Tree.prototype.render0 = function() {
	var ts = timespeed;
	var trees = this.trees;
	var vtxs = this.vertices;
	var len = trees.length;
	var len2 = vtxs.length;
	var t, v, gr;
	var b0, b1;
	var myb = this.myBone;
	var neck = this.neck;
	var p = this.polygons[0];
	var rs = 0.1 * ts;
	var s1 = 0.06;
	var s2 = 0.85;
	var showLimit;
	var ss = 0.2 * ts;
	var ss2 = 0.2 * ts;
	var minX, maxX, minY, maxY;
	var offset = 4;
	
	if( state == 0 || state == 2 ){
		showLimit = 0;
	}else{
		showLimit = Math.max( 0, closeper - 0.18 ) * 2 * len >> 0;
	}
	
	for ( i = 0; i < len; ++i ) {
		t = trees[i];
		if( i < showLimit ){
			t.rrr += rs;
			gr = Math.cos( t.rrr ) * 0.24;
			t.scale += ( t.scaleG - t.scale ) * ss;
		}else{
			gr = t.rg;
			t.scale += ( 0 - t.scale ) * ss2;
		}
		t.r += t.rsa = ( gr - t.r ) * s1 + t.rsa * s2;
		
		t.dx = ( t.b1.dx - t.b0.dx ) * t.per + t.b0.dx;
		t.dy = ( t.b1.dy - t.b0.dy ) * t.per + t.b0.dy;
		
		myb.dx = t.dx;
		myb.dy = t.dy;
		myb.rz = t.r;
		myb.scale = t.scale;
		myb.updateMtx();
		neck.rz = myb.rz * 1.25;
		neck.multMtx();
		minX = minY = 9999;
		maxX = maxY = 0;
		
		for ( n = 0; n < len2; ++n ) {
			v = vtxs[n];
			v.tBone();
			v.update();
			if( v.sx < minX ){
				minX = v.sx;
			}else if( v.sx > maxX ){
				maxX = v.sx;
			}
			if( v.sy < minY ){
				minY = v.sy;
			}else if( v.sy > maxY ){
				maxY = v.sy;
			}
		}
		p.render( ctx );
		t.renderMinX = minX - offset >> 0;
		t.renderMaxX = maxX + offset >> 0;
		t.renderMinY = minY - offset >> 0;
		t.renderMaxY = maxY + offset >> 0;
		
		if( isDebugMode ){
			ctx.strokeStyle = "#E680AC";
			ctx.stroke();
		}
	}
};

Tree.prototype.render1 = function() {
	var ts = timespeed;
	var s = 0.1 * ts;
	var trees = this.trees;
	var vtxs = this.vertices;
	var len = trees.length;
	var len2 = vtxs.length;
	var t, v, gr;
	var b0, b1;
	var myb = this.myBone;
	var neck = this.neck;
	var p = this.polygons[0];
	var rs = 0.08 * ts;
	var s1 = 0.1;
	var s2 = 0.9;
	var ss = 0.2 * ts;
	var ss2 = 0.2 * ts;
	var g = -15 * ts;
	var minX, maxX, minY, maxY;
	var offset = 8;
	
	for ( i = 0; i < len; ++i ) {
		t = trees[i];
		t.rrr += rs;
		gr = Math.cos( t.rrr ) * 0.3;
		t.scale += ( 0.8 - t.scale ) * ss;
		
		t.dx += ( t.gx - t.dx ) * s;
		t.dy += t.vy;
		if( t.dy < -1000 ){
			t.dy = -1000;
			if( ++t.dycc < 3 ){
				t.vy = -t.vy * 0.4;
			}
		}
		t.r += t.rsa = ( gr - t.r ) * s1 + t.rsa * s2;
		t.vy += g;
		t.dz += ( t.gz - t.dz ) * s;
		
		myb.dx = t.dx;
		myb.dy = t.dy;
		myb.dz = t.dz;
		
		myb.rz = t.r;
		myb.scale = t.scale;
		myb.updateMtx();
		neck.rz = myb.rz * 1.25;
		neck.multMtx();
		minX = minY = 9999;
		maxX = maxY = 0;
		
		for ( n = 0; n < len2; ++n ) {
			v = vtxs[n];
			v.tBone();
			v.update();
			if( v.sx < minX ){
				minX = v.sx;
			}else if( v.sx > maxX ){
				maxX = v.sx;
			}
			if( v.sy < minY ){
				minY = v.sy;
			}else if( v.sy > maxY ){
				maxY = v.sy;
			}
		}
		p.render( ctx );
		t.renderMinX = minX - offset >> 0;
		t.renderMaxX = maxX + offset >> 0;
		t.renderMinY = minY - offset >> 0;
		t.renderMaxY = maxY + offset >> 0;
		
		if( isDebugMode ){
			ctx.strokeStyle = "#E680AC";
			ctx.stroke();
		}
	}
};



