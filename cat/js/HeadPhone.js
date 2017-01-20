
function HeadPhone() {};
HeadPhone.prototype = new Mesh();

HeadPhone.prototype.init = function( n ) {
	this.id = n;
	var mat_w = { color : "#FFF" };
	var mat_b = { color : "#000" };

	var bone_src= [
	 ["cableR0", -1, 5011,500,0], //0
	 ["cable0", -1, 5613,-218,0], //1
	 ["cable1", 1, 5,-451,0], //2
	 ["cable2", 2, 0,-361,0], //3
	 ["cable3", 3, 0,-271,0], //4
	 ["cable4", 4, 0,-402,0], //5
	 ["cableR1", 0, 219,-469,0], //6
	 ["cableL0", -1, 6203,577,0], //7
	 ["cableL1", 7, -185,-540,0]
	];

	var verticesrc = [[5518,-1339,-85],[5794,-1439,-85],[5651,-1835,-85],[5375,-1734,-85],[4999,494,-85],[5197,20,-85],[5580,-268,-85],[5602,-680,-85],[5602,-1045,-85],[5597,-1313,-85],[5627,-1313,-85],[5632,-1045,-85],[5632,-680,-85],[5654,-264,-85],[6051,20,-85],[6219,569,-85],[6196,569,-85],[6017,20,-85],[5235,20,-85],[5019,494,-85],[5593,-214,-85],[5645,-213,-85],[5600,-307,-85],[5636,-305,-85],[5649,-1471,-91],[5630,-1523,-91],[5650,-1521,-91],[5631,-1572,-91],[5617,-1561,-91],[5592,-1626,-91],[5611,-1627,-91],[5591,-1681,-91],[5576,-1670,-91],[5558,-1721,-91],[5617,-1743,-91],[5708,-1492,-91],[5657,-1554,-91],[5618,-1660,-91],[5009,494,-85],[5560,-1356,-85],[5631,-1381,-85],[5648,-1306,-85],[5574,-1285,-85],[5730,-1644,-85],[5428,-1540,-85]];
	var polysrc = [[1,40,43,42,41,2,44,3,4,45],[20,19,21,22,18,17,16,15,14,24,13,12,11,10,9,8,23,7,6,5,39],[36,35,34,33,32,38,31,30,29,28,37,27,26,25]];
	var matsrc = [{material:mat_b,vIDs:[1,2,3,4,5,6,7,8,9,10]},{material:mat_b,vIDs:[11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},{material:mat_w,vIDs:[32,33,34,35,36,37,38,39,40,41,42,43,44,45]}];
	var weightsrc = [
	 {name:"cable0",vertices:[7,14,21,22,23,24]},
	 {name:"cable1",vertices:[8,13]},
	 {name:"cable2",vertices:[9,12]},
	 {name:"cable3",vertices:[1,2,3,4,10,11,25,26,27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,44,45]},
	 {name:"cable4",vertices:[]},
	 {name:"cableL0",vertices:[16,17]},
	 {name:"cableL1",vertices:[15,18]},
	 {name:"cableR0",vertices:[5,20,39]},
	 {name:"cableR1",vertices:[6,19]}
	];

	this.makeBody( verticesrc, polysrc, matsrc );
	this.makeBone( weightsrc, bone_src );
	
	var me = this;
	for ( var i = 0; i < me.bones.length; ++i ) { me[ me.bones[i].name ] = me.bones[i]; }
	this.cables = [ cat.face, this.cable0, this.cable1, this.cable2, this.cable3, this.cable4 ];
	
	this.cable0.setParent2( cat.face );
	this.cableR0.setParent2( cat.face );
	this.cableL0.setParent2( cat.face );
	
	this.animate = this.updateCable;
	
	for ( i = 0; i < me.bones.length; ++i ) { me.bones[i].oy = me.bones[i].dy += 5000; me.bones[i].ox = me.bones[i].dx += 5000; }
};

HeadPhone.prototype.updateCable = function() {
	var ts = timespeed;
	var i, b, b1, r, cos, sin, l, lsa, ddx, ddy;
	var cables = this.cables;
	var len = cables.length;
	
	var f = 0.98;
	var stf = 0.75;
	var windx = windX * 1;
	var windy = windY * 1.5;
	var g = -24 * ts + windy;
	var ymax = worldH + 280 >> 1;
	
	for( i=1; i<len; ++i ){
		b = cables[i-1];
		b1 = cables[ i ];
		if( b1.dy < ymax ){
			b1.dy = ymax;
			b1.vx *= 0.5;
			b1.vy = -b1.vy * 0.3;
		}
		b1.dx += b1.vx + windx;
		b1.dy += b1.vy + g;
		ddx = b1.dx - b.dx;
		ddy = b1.dy - b.dy;
		l = Math.sqrt( ddx * ddx + ddy * ddy );
		
		lsa = stf * ( b1.myL - l );
		r = Math.atan2( ddy, ddx );
		cos = Math.cos( r ) * lsa;
		sin = Math.sin( r ) * lsa;
		if( i > 1 ){
			b.dx -= cos;
			b.dy -= sin;
			b.rz = r + pi05;
		}
		b1.dx += cos;
		b1.dy += sin;
		
		b1.vx = ( b1.dx - b1.ox ) * f;
		b1.vy = ( b1.dy - b1.oy ) * f;
		b1.ox = b1.dx; b1.oy = b1.dy;
	}
	
	this.cableR0.toPpos2();
	this.cableL0.toPpos2();
	
	b = this.cableR0;
	b1 = this.cableR1;
	var b2 = this.cable0;
	ddx = b2.dx - b.dx;
	ddy = b2.dy - b.dy;
	b1.dx = b.dx + ddx * 0.4;
	b1.dy = b.dy + ddy * 0.6;
	b1.rz = Math.atan2( ddy, ddx ) + pi05;
	b = this.cableL0;
	b1 = this.cableL1;
	ddx = b2.dx - b.dx;
	ddy = b2.dy - b.dy;
	b1.dx = b.dx + ddx * 0.4;
	b1.dy = b.dy + ddy * 0.6;
	b1.rz = Math.atan2( ddy, ddx ) + pi05;
};

HeadPhone.prototype.updateBone = function() {
	var arr = this.bones;
	for( var i in arr ){ arr[i].updateMtx(); }
};


