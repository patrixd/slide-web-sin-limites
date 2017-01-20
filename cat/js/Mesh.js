
function Mesh(){};

Mesh.prototype.makeBody = function( verticesrc, polysrc, matsrc ) {
	this.dx = 0;
	this.dy = 0;
	this.dz = 0;
	this.vertices = [];
	this.polygons = [];
	this.makeVertices( this.vertices, verticesrc );
	this.makePolygons( this.polygons, this.vertices, polysrc, matsrc );
	this.polygons.sort( compZ );
	this.renderMinX = 1;
	this.renderMaxX = 0;
	this.renderMinY = 1;
	this.renderMaxY = 0;
};

Mesh.prototype.makeVertices = function( res, src ) {
	var scl = 1;
	for ( var i in src ) {
		res[i] = new Vertex( src[i][0] * scl, src[i][1] * scl, src[i][2] * scl );
	}
};

Mesh.prototype.makePolygons = function( res, vtxs, src, mat ) {
	for ( var i in src ) {
		res[i] = new Polygon( mat[i].material, vtxs, src[i] );
	}
};

Mesh.prototype.makeBone = function( weightsrc, bonesrc ) {
	this.hasBone = true;
	this.bones = [];
	this.addBone( this.bones, bonesrc, weightsrc, this.vertices );
};

Mesh.prototype.addBone = function( res, arr, weightsrc, _vertices ) {
	var len = arr.length;
	var dt, bn, iii, ii, vlen;
	for ( var i = 0; i < len; ++i ) { arr[i].id = i; }
	
	var sortarr = [];
	var parentID;
	var parentIDarr = [-1];
	var pcount = 0;
	while( pcount < len ){
		for( var m in parentIDarr ){
			parentID = parentIDarr.shift();
			for( var n in arr ){
				if ( arr[n][1] == parentID ) {
					sortarr.push( arr[n] );
					parentIDarr.push( arr[n].id );
					++pcount;
				}
			}
		}
	}
	
	arr = sortarr;
	
	for( i=0; i<len; ++i ){
		dt = arr[i];
		for( ii=0; ii<len; ++ii ){
			if( dt[1] == arr[ii].id ){
				dt[1] = ii >> 0;
				break;
			}
		}
	}
	
	for ( i = 0; i < len; ++i ) {
		res[i] = bn = new Bone();
		bn.setData( arr[i] );
	}
	
	for( i=0; i<len; ++i ){
		dt = arr[i];
		bn = res[i];
		var weightVtxs;
		for( var k in weightsrc ){
			if( weightsrc[k].name == dt[0] ){
				weightVtxs = weightsrc[k].vertices;
				break;
			}
		}
		var vtxs = [];
		if( weightVtxs ){
			vlen = weightVtxs.length;
			for ( iii = 0; iii < vlen; ++iii ) { vtxs[iii] = _vertices[ weightVtxs[iii]-1 ]; }
		}
		bn.setParent( res[dt[1]] );
		bn.setVertices( vtxs, dt[5] );
	}
};

Mesh.prototype.update = function() {
	if( this.animate != null ){
		this.animate();
	}
	if( this.hasBone ){
		this.updateBone();
		this.tBone();
	}
};

Mesh.prototype.updateBone = function() {
	var bones = this.bones;
	var len = bones.length;
	bones[0].updateMtx();
	for ( var i = 1; i < len; ++i ) {
		bones[i].multMtx();
	}
};

Mesh.prototype.tBone = function() {
	var vertices = this.vertices;
	var len = vertices.length;
	for ( var i = 0; i < len; ++i ) {
		vertices[i].tBone();
	}
};

Mesh.prototype.render = function() {
	
	modelx = this.dx;
	modely = this.dy;
	modelz = this.dz;
	
	var vtxs = this.vertices;
	var len =vtxs.length;
	var v;
	var minX = 9999;
	var maxX = 0;
	var minY = 9999;
	var maxY = 0;
	
	for ( i = 0; i < len; ++i ) {
		v = vtxs[i];
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
	
	var offset = 8;
	this.renderMinX = minX - offset >> 0;
	this.renderMaxX = maxX + offset >> 0;
	this.renderMinY = minY - offset >> 0;
	this.renderMaxY = maxY + offset >> 0;
	
	var polygons = this.polygons;
	len = polygons.length;
	
	if( isDebugMode ){
		ctx.strokeStyle = "#E680AC";
		for ( i = 0; i < len; ++i ) { 
			polygons[i].render( ctx ); 
			ctx.stroke();
		}
		
		ctx.fillStyle = "#FFF";
		for ( i = 0; i < vtxs.length; ++i ) {ctx.fillRect( vtxs[i].sx - 1, vtxs[i].sy - 1, 2, 2 );}
		
		if( this.bones != null ){
			ctx.fillStyle = "#3D001B";
			ctx.strokeStyle = "#8E003E";
			ctx.lineWidth = 1;
			for ( i = 0; i < this.bones.length; ++i ) {
				this.bones[i].render( ctx );
			}
		}
	}else{
		for ( i = 0; i < len; ++i ) { 
			polygons[i].render( ctx ); 
		}
	}
};

Mesh.prototype.clearCanvas = function( tg ) {
	var m = this;
	tg.fillRect( m.renderMinX, m.renderMinY, m.renderMaxX - m.renderMinX,  m.renderMaxY - m.renderMinY );
};

var compZ = function( a, b ) {	return b.sz - a.sz; };
var compDX = function( a, b ) { return a.dx - b.dx; };
