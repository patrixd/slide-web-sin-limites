
function Polygon( mat, vtxsrc, vtxids ) {
	this.material = mat;
	this.color = mat.color;
	
	var len = vtxids.length;
	if( len > 5 ){
		this.vertices = [];
		for( var i=0; i<len; ++i ){
			this.vertices[i] = vtxsrc[ vtxids[i]-1 ];
		}
		this.render = this.renderN;
		this.sz = this.vertices[0].dz;
	}else{
		this.v0 = vtxsrc[ vtxids[0]-1 ];
		this.v1 = vtxsrc[ vtxids[1]-1 ];
		this.v2 = vtxsrc[ vtxids[2]-1 ];
		if( len == 3 ){
			this.render = this.render3;
		}else if( len == 4 ){
			this.v3 = vtxsrc[ vtxids[3]-1 ];
			this.render = this.render4;
		}
		else{
			this.v3 = vtxsrc[ vtxids[3]-1 ];
			this.v4 = vtxsrc[ vtxids[4]-1 ];
			this.render = this.render5;
		}
		this.sz = this.v0.dz;
	}
	
	if( mat.render ){
		this.render = this[ mat.render ];
	}
}

Polygon.prototype.renderN = function( tg ) {
	
	var vtxs = this.vertices;
	var len = vtxs.length;
	var v0, v1, v2, v3;
	v0 = vtxs[ len-1 ];
	v1 = vtxs[ 0 ];
	v2 = vtxs[ 1 ];
	v3 = vtxs[ 2 ];
	tg.fillStyle = this.material.color;
	tg.beginPath();
	tg.moveTo( v1.sx,  v1.sy );
	
	var a = -0.0735;
	var b = 0.8155;
	var c = 0.2895;
	var d = -0.0315;
	
	for( var i=0; i<len; ++i ){
		tg.lineTo( v0.sx * a + v1.sx * b + v2.sx * c + v3.sx * d, v0.sy * a + v1.sy * b + v2.sy * c + v3.sy * d );
		tg.lineTo( v0.sx * d + v1.sx * c + v2.sx * b + v3.sx * a, v0.sy * d + v1.sy * c + v2.sy * b + v3.sy * a );
		tg.lineTo( v2.sx, v2.sy );
		v0 = v1;
		v1 = v2;
		v2 = v3;
		v3 = vtxs[ ( i+3 ) % len ];
	}
	if( !isDebugMode ){
		tg.fill();
	}
};

Polygon.prototype.renderSolid = function( tg ) {
	var len = this.vertices.length;
	tg.fillStyle = this.material.color;
	tg.beginPath();
	var v = this.vertices[0];
	tg.moveTo( v.sx,  v.sy );
	for( var i=1; i<len; ++i ){
		v = this.vertices[ i ];
		tg.lineTo(  v.sx,  v.sy );
	}
	tg.closePath();
	if( !isDebugMode ){
		tg.fill();
	}
};

Polygon.prototype.render3 = function( tg ) {
	tg.fillStyle = this.material.color;
	tg.beginPath();
	tg.moveTo( this.v0.sx, this.v0.sy );
	tg.lineTo( this.v1.sx, this.v1.sy );
	tg.lineTo( this.v2.sx, this.v2.sy );
	tg.closePath();
	if( !isDebugMode ){
		tg.fill();
	}
};

Polygon.prototype.render4 = function( tg ) {
	tg.fillStyle = this.material.color;
	tg.beginPath();
	tg.moveTo( this.v0.sx, this.v0.sy );
	tg.lineTo( this.v1.sx, this.v1.sy );
	tg.lineTo( this.v2.sx, this.v2.sy );
	tg.lineTo( this.v3.sx, this.v3.sy );
	tg.closePath();
	if( !isDebugMode ){
		tg.fill();
	}
};

Polygon.prototype.render5 = function( tg ) {
	tg.fillStyle = this.material.color;
	tg.beginPath();
	tg.moveTo( this.v0.sx, this.v0.sy );
	tg.lineTo( this.v1.sx, this.v1.sy );
	tg.lineTo( this.v2.sx, this.v2.sy );
	tg.lineTo( this.v3.sx, this.v3.sy );
	tg.lineTo( this.v4.sx, this.v4.sy );
	tg.closePath();
	if( !isDebugMode ){
		tg.fill();
	}
};
