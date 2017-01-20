
function TreeData( id, a, b, c, isL ) {
	this.b0 = a;
	this.b1 = b;
	this.per = c;
	this.isShow = false;
	this.rsa = 0;
	this.rg = isL ? -pi : pi;
	this.r = this.rg;
	this.rrr = id * -0.15;
	this.scaleG = ( id % 3 ) * 0.125 + 0.7;
	this.scale = 0;
	this.gx = c * 3000 - 1500 + Math.random() * 1000 - 500;
	this.gz = ( id % 4 ) * -2500 + Math.random() * -1500 - 200;
	this.dx = this.dy = this.dz = 0;
	this.dycc = 0;
	this.renderMinX = 1;
	this.renderMaxX = 0;
	this.renderMinY = 1;
	this.renderMaxY = 0;
};
