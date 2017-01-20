
function Fish() {};
Fish.prototype = new Mesh();

Fish.prototype.init = function( n ) {
	this.id = n;
	var mat_fish = { color : "#FFF", render : "renderSolid" };

	var verticesrc = [[-116,-70,0],[-22,-5,0],[-56,-96,0],[113,2,0],[10,34,0],[-23,5,0],[-115,68,0],[-45,93,0],[-73,0,0],[9,-34,0],[51,67,0],[47,-68,0],[48,-20,0],[27,6,0],[51,31,0],[72,5,0]];
	var polysrc = [[4,12,3,10,2,1,9,7,6,5,14,13,16,15,14,5,8,11]];
	var matsrc = [{material:mat_fish,vIDs:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]}];

	var scl = 0.7;
	var len = verticesrc.length;
	for( var i=0; i<len; ++i ){
		verticesrc[i][0] *= scl;
		verticesrc[i][1] *= scl;
	}
	
	this.makeBody( verticesrc, polysrc, matsrc );
	
	var vtxs = [];
	for( i=0; i<len; ++i ){
		if( i != 0 && i != 6 && i != 7 && i != 2 && i != 8 ){
			vtxs.push( this.vertices[i] );
		}
	}
	
	this.hasBone = true;
	this.myBone = new Bone();
	this.myBone.setVertices( vtxs, true );
	this.tail = new Bone();
	this.tail.setParent( this.myBone );
	this.tail.setVertices( [ this.vertices[0], this.vertices[6], this.vertices[8], this.vertices[2], this.vertices[7] ], true );
	
	this.renderMinX = this.renderMinY = 0;
	this.renderMaxX = this.renderMaxY = 1;
	this.r = 0;
	this.r2 = 0;
	this.rrr = 0;
	this.rrr2 = 0;
	this.animate = this.myUpdate;
};

Fish.prototype.setTarget = function( b0 ) {
	this.tg = b0;
};

Fish.prototype.myUpdate = function() {
	var ts = timespeed;
	var s = 0.2 * ts;
	var tg = this.tg;
	var b = this.myBone;
	b.oy = b.dy;
	b.dx += ( tg.dx + Math.cos( this.r ) * 100 - 150 - b.dx ) * s;
	
	b.gy = tg.dy + Math.cos( this.r2 ) * 60 - 550 + Math.min( 0.25, Math.max( 0, ( closeper - 0.4 ) )) * 1400;
	b.dy += ( b.gy - b.dy ) * s;
	if( state == 0 ){
		b.scale = 0;
	}else{
		b.scale += ( Math.min( 1, closeper * 2 ) - b.scale ) * s;
	}
	this.r += 0.06 * ts;
	this.r2 += 0.045 * ts;
	b.rz = ( b.dy - b.oy ) * 0.02;
	b.ry = Math.cos( this.rrr2 ) * 0.5;
	this.rrr2 += 0.1 * ts;
	
	this.tail.ry = Math.cos( this.rrr ) * 1.2;
	this.tail.rz = b.rz * 0.5;
	this.tail.scale = b.scale;
	this.rrr += 0.45 * ts;
};

Fish.prototype.finish = function() {
	this.animate = function(){};
	this.render = function(){};
};

Fish.prototype.updateBone = function() {
	this.myBone.updateMtx2();
	this.tail.toPpos2();
	this.tail.updateMtx2();
};


