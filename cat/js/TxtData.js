
function TxtData( id, per ) {
	this.isShow = true;
	this.vy = id * 15;
	this.per = per;
	this.rsa = 0;
	this.r = id * 0.3;
	this.rrr = id * -0.15;
	this.scaleG = 1;
	this.scale = 0;
	this.dx = this.dz = 0;
	this.dy = -1000;
	this.dycc = 0;
};
