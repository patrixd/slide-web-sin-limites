
function Bone() {
	this.inix = this.inibx = this.bx = this.dx = 0;
	this.iniy = this.iniby = this.by = this.dy = 0;
	this.iniz = this.dz = 0;
	this.gx = this.gy = this.gz = 0;
	this.vx = this.vy = 0;
	this.ox = this.oy = 0;
	this.rz = 0;
	this.orz = this.orz2 = 0;
	this.rs = 0;
	this.s = 0;
	
	this.rsa = 0;
	this.parent = null;
	this.grz = 0;
	this.rzr = 0;
	this.scale = 1;
	this.xsa = 0; this.ysa = 0; this.zsa = 0;
	
	this.rzt = 0;
	this.cosZ = 0;
	this.sinZ = 0;
	this.myR = 0;
	this.myR2 = 0;
	this.cc = 0;
	this.cclimit = 0;
};

Bone.prototype.setData = function( dt ) {
	var scl = 1;
	this.name = dt[0];
	this.inix = this.inibx = this.bx = this.ox = this.dx = dt[2] * scl;
	this.iniy = this.iniby = this.by = this.oy = this.dy = dt[3] * scl;
	this.iniz = this.dz = dt[4] * scl;
};

Bone.prototype.setParent = function( b ) {
	if( b ){
		this.parent = b;
		this.inix = this.ox = this.dx = b.dx + this.bx;
		this.iniy = this.oy = this.dy = b.dy + this.by;
		this.bz = this.dz - b.dz;
		this.iniz = this.dz = this.dz + b.dz;
		this.myL = Math.sqrt( this.bx * this.bx + this.by * this.by );
	}
};

Bone.prototype.setParent2 = function( b ) {
	if( b ){
		this.parent = b;
		this.inibx = this.bx = this.dx - b.dx;
		this.iniby = this.by = this.dy - b.dy;
		this.bz = this.dz - b.dz;
		this.iniz = this.dz = this.dz + b.dz;
		this.myL = Math.sqrt( this.bx * this.bx + this.by * this.by );
	}
};

Bone.prototype.setVertices = function( arr, isRotate ) {
	var len = arr.length;
	for( var i=0; i<len; ++i ){ arr[i].addBone( this ); }
	if( isRotate ){
		this.rotateType( arr );
	}
	this.vertices = arr;
};

Bone.prototype.slim = function( scl ) {
	var arr = this.vertices;
	var len = arr.length;
	for( var i=0; i<len; ++i ){ arr[i].slim( scl ); }
	this.bx = this.inibx * scl;
};

Bone.prototype.updateMtx = function() {
	this.rzt = this.rz;
	this.scale2 = this.scale;
	this.cosZ = Math.cos( this.rzt ) * this.scale;
	this.sinZ = Math.sin( this.rzt ) * this.scale;
};

Bone.prototype.multMtx = function() {
	var p = this.parent;
	this.dx = p.cosZ * this.bx - p.sinZ * this.by + p.dx;
	this.dy = p.sinZ * this.bx + p.cosZ * this.by + p.dy;
	this.dz = p.dz;
	this.rzt = this.rz + p.rzt;
	this.scale2 = this.scale * p.scale2;
	this.cosZ = Math.cos( this.rzt ) * this.scale2;
	this.sinZ = Math.sin( this.rzt ) * this.scale2;
};

Bone.prototype.rotateType = function( arr ) {
	this.rx = 0;
	this.ry = 0;
	var len = arr.length;
	for( var i=0; i<len; ++i ){
		arr[i].rotateType();
	}
};

Bone.prototype.updateMtx2 = function() {
	this.scale2 = this.scale;
	this.rzt = this.rz;
	var cos_x = Math.cos( this.rx );
	var sin_x = Math.sin( this.rx );
	var cos_y = Math.cos( this.ry );
	var sin_y = Math.sin( this.ry );
	var cos_z = Math.cos( this.rz );
	var sin_z = Math.sin( this.rz );
	this.cosZ = cos_z;
	this.sinZ = sin_z;
	var cc = sin_y * sin_x;
	var gg = cos_y * sin_x;
	this.m0 = ( cos_y * cos_z + cc * sin_z ) * this.scale2;
	this.m1 = ( cos_y * -sin_z + cc * cos_z ) * this.scale2;
	this.m2 = ( sin_y * cos_x ) * this.scale2;
	this.m3 = this.dx;
	this.m4 = ( cos_x * sin_z ) * this.scale2;
	this.m5 = ( cos_x * cos_z ) * this.scale2;
	this.m6 = ( -sin_x ) * this.scale2;
	this.m7 = this.dy;
	this.m8 = ( -sin_y * cos_z + gg * sin_z ) * this.scale2;
	this.m9 = ( -sin_y * -sin_z + gg * cos_z ) * this.scale2;
	this.m10 = ( cos_y * cos_x ) * this.scale2;
	this.m11 = this.dz;
};

Bone.prototype.toPpos = function() {
	var p = this.parent;
	this.dx = p.cosZ * this.bx - p.sinZ * this.by + p.dx;
	this.dy = p.sinZ * this.bx + p.cosZ * this.by + p.dy;
	this.dz = p.dz;
};

Bone.prototype.toPpos2 = function() {
	var b = this.parent;
	this.dx = b.m0 * this.bx + b.m1 * this.by + b.m2 * this.bz + b.m3;
	this.dy = b.m4 * this.bx + b.m5 * this.by + b.m6 * this.bz + b.m7;
	this.dz = b.m8 * this.bx + b.m9 * this.by + b.m10 * this.bz + b.m11;
};

Bone.prototype.render = function( tg ) {
	var ssx = this.dx + cam.revx;
	var ssy = this.dy + cam.revy;
	var sz = this.dz + cam.revz;
	var zs = cam.wscale / sz;
	this.sx = stageCx + ( cam.m0 * ssx + cam.m1 * ssy ) * zs;
	this.sy = stageCy + ( cam.m4 * ssx + cam.m5 * ssy ) * zs;
	tg.fillRect( this.sx - 2, this.sy - 2, 4, 4 );
	if( this.parent ){
		tg.beginPath();
		tg.moveTo( this.parent.sx, this.parent.sy );
		tg.lineTo( this.sx, this.sy );
		tg.stroke();
	}
};
