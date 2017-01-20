
function Sun() {};
Sun.prototype = new Mesh();

Sun.prototype.init = function( n ) {
	this.id = n;
	var mat_tree = { color : "#FB5B26", render : "renderSolid" };

	var verticesrc = [[-443,44,-50],[-414,380,-50],[233,511,-50],[558,-64,-50],[333,-296,-50],[112,-551,-50],[-179,-408,-50],[-173,116,-50],[208,8,-50],[72,-196,-50],[-164,-129,-50],[-489,-277,-50],[57,200,-50],[-203,256,-50],[181,272,-50],[315,-88,-50],[13,-327,-50],[-306,-114,-50],[-95,435,-50],[384,225,-50]];
	var polysrc = [[7,6,11,17,5,4,10,16,20,3,9,15,19,2,13,14,1,12,8,18]];
	var matsrc = [{material:mat_tree,vIDs:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}];

	var scl = 0.21;
	for( var i in verticesrc ){
		verticesrc[i][0] *= scl;
		verticesrc[i][1] *= scl;
	}

	this.makeBody( verticesrc, polysrc, matsrc );
	
	this.myBone = new Bone();
	this.myBone.setVertices( this.vertices, false );
	this.hasBone = true;
	
	this.renderMinX = this.renderMinY = 0;
	this.renderMaxX = this.renderMaxY = 1;
	this.r = 0;
	this.r2 = 0;
	this.animate = this.myUpdate;
};

Sun.prototype.setTarget = function( b0 ) {
	this.tg = b0;
};

Sun.prototype.myUpdate = function() {
	var ts = timespeed;
	var s = 0.2 * ts;
	var tg = this.tg;
	var b = this.myBone;
	var gscl;
	b.dx += ( tg.dx + Math.cos( this.r ) * 100 - b.dx ) * s;
	this.r += 0.05 * ts;
	
	if( state == 0 ){
		b.scale = 0;
		b.gy = tg.dy - 400;
	}else{
		gscl = Math.min( 1, closeper );
		if(  state == 2 ){
			b.gy = 2000;
			gscl = 1.3;
		}else 
		if( closeper < 0.7 ){
			b.gy = tg.dy - 400;
		}else{
			b.gy = tg.dy + Math.cos( this.r2 ) * 100 + Math.min( 0.1, closeper - 0.62 ) * 6000;
			this.r2 += 0.035 * ts;
		}
		b.scale += ( gscl - b.scale ) * s;
	}
	b.dy += ( b.gy - b.dy ) * s;
	b.rz -= 0.1 * ts;
};

Sun.prototype.updateBone = function() {
	this.myBone.updateMtx();
};
