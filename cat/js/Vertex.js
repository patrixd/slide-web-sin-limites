
function Vertex( x, y, z ) {
	this.dx = x; this.dy = y; this.dz = z;
	this.inix = x; this.iniy = y; this.iniz = z;
	this.bx = 0; this.by = 0;
	this.bx1 = 0; this.by1 = 0;
	this.sx = 0; this.sy = 0; this.sz = 0;
	this.tBone = null;
	this.bone0 = null;
	this.bone1 = null;
};

Vertex.prototype.addBone = function( b ) {
	if(  this.bone0 == null ){
		this.bone0 = b;
		this.bx =  this.inibx = this.dx - b.dx;
		this.by =  this.iniby = this.dy - b.dy;
		this.bz =  this.inibz = this.dz - b.dz;
		this.tBone =  this.tBone1;
	}else if( this.bone1 == null ){
		this.bone1 = b;
		this.bx1 =  this.inibx1 = this.dx - b.dx;
		this.by1 =  this.iniby1 = this.dy - b.dy;
		this.tBone =  this.tBone2;
	}
};

Vertex.prototype.update = function() {
	var ssx = this.dx + modelx + cam.revx;
	var ssy = this.dy + modely + cam.revy;
	this.sz = this.dz + modelz + cam.revz;
	var zs = cam.wscale / this.sz;
	this.sx = stageCx + ( cam.m0 * ssx + cam.m1 * ssy ) * zs;
	this.sy = stageCy + ( cam.m4 * ssx + cam.m5 * ssy ) * zs;
};

Vertex.prototype.tBone1 = function() {
	var b = this.bone0;
	this.dx = b.cosZ * this.bx - b.sinZ * this.by + b.dx;
	this.dy = b.sinZ * this.bx + b.cosZ * this.by + b.dy;
	this.dz = b.dz;
};

Vertex.prototype.tBone2 = function() {
	var b0 = this.bone0;
	var b1 = this.bone1;
	this.dx = b0.cosZ * this.bx - b0.sinZ * this.by + b0.dx + b1.cosZ * this.bx1 - b1.sinZ * this.by1 + b1.dx >> 1;
	this.dy = b0.sinZ * this.bx + b0.cosZ * this.by + b0.dy + b1.sinZ * this.bx1 + b1.cosZ * this.by1 + b1.dy >> 1;
	this.dz = b0.dz + b1.dz >> 1;
};

Vertex.prototype.rotateType = function() {
	if( this.bone1 == null ){
		this.tBone =  this.tBone3;
	}
};

Vertex.prototype.tBone3 = function() {
	var b = this.bone0;
	var bx = this.bx;
	this.dx = b.m0 * bx + b.m1 * this.by + b.m2 * this.bz + b.m3;
	this.dy = b.m4 * bx + b.m5 * this.by + b.m6 * this.bz + b.m7;
	this.dz = b.m8 * bx + b.m9 * this.by + b.m10 * this.bz + b.m11;
};

Vertex.prototype.slim = function( scl ) {
	this.bx = this.inibx * scl;
	this.bz = this.inibz * scl;
	if( this.bone1 != null ){
		this.bx1 = this.inibx1 * scl;
	}
};

