
function Camera() {
	this.x = 0; this.y = 0; this.z = 0;
	this.l = 100;
	this.fov = 30;
	this.fovR = this.fov * Math.PI / 360;
	this.wscale = 1;
	
	this.rz = 0;
	this.grz = 0;
	
	this.tgx = 0; this.tgy = 0; this.tgz = 0;
	this.gx = 0; this.gy = 0; this.gz = 0;
	
	this.zScale = this.myL = 14000;
	this.myLg = this.myL;
	this.myLgR = 0;
	this.xr = this.yr = this.zr = 0;
	this.rzr = 0;
	this.windowAngle = 0;
	this.orientation = 0;
	this.update = this.update1;
	this.update();
};

Camera.prototype.update1 = function() {
	var ts = timespeed;
	
	this.myLg = this.zScale;
	this.gy = isPC ? -300 : -300;
	this.grz = 0;
	
	var s = 0.6 * ts;
	this.myL += ( this.myLg - this.myL ) * s;
	this.tgy += ( this.gy - this.tgy ) * s;
	this.rz += ( this.grz - this.rz ) * s;
	
	var sinZ = Math.sin( -this.rz );
	var cosZ = Math.cos( -this.rz );
	this.y = this.tgy;
	this.x = this.tgx;
	this.z = this.tgz - this.myL;
	this.revx = -this.x; this.revy = -this.y; this.revz = -this.z;
	this.m0 = cosZ;
	this.m1 = sinZ;
	this.m4 = sinZ;
	this.m5 = -cosZ;
};

Camera.prototype.finish = function() {
	this.rrr = Math.random() * pi2;
	this.rrr2 = Math.random() * pi2;
	this.rrr3 = Math.random() * pi2;
	this.rrr4 = pi;
	this.ls = 0;
	this.update = this.update2;
};

Camera.prototype.update2 = function() {
	var ts = timespeed;
	this.rrr += 0.02 * ts;
	this.rrr2 += 0.016 * ts;
	this.rrr3 += 0.012 * ts;
	this.rrr4 += 0.01 * ts;
	
	this.myLg = Math.cos( this.rrr4 ) * 1000 + this.zScale - 2500;
	this.gx = Math.cos( this.rrr ) * 200;
	this.gy = Math.cos( this.rrr2 ) * 230 + ( isPC ? -300 : -300 );
	if( this.ls < 0.3 ) this.ls += 0.001 * ts;
	this.myL += ( this.myLg - this.myL ) * this.ls * ts;
	var s = this.ls;
	this.tgx += ( this.gx - this.tgx ) * s;
	this.tgy += ( this.gy - this.tgy ) * s;
	this.rz += ( this.grz - this.rz ) * s;
	
	var sinZ = Math.sin( -this.rz );
	var cosZ = Math.cos( -this.rz );
	this.y = this.tgy;
	this.x = this.tgx;
	this.z = this.tgz - this.myL;
	this.revx = -this.x; this.revy = -this.y; this.revz = -this.z;
	this.m0 = cosZ;
	this.m1 = sinZ;
	this.m4 = sinZ;
	this.m5 = -cosZ;
};

Camera.prototype.stageResize = function( pc ) {
	this.wscale = pc ? 1700 : ( isIPAD ? 1500 : 720 );
	this.wscale *= deviceScale;
	this.zz = this.zScale / this.wscale;
	this.zz2 = 13000 / this.wscale;
	this.zz_r = this.wscale / this.zScale;
};
