
function Cat() {};
Cat.prototype = new Mesh();

Cat.prototype.init = function( n ) {
	this.id = n;
	var mat_w = { color : "#FFF" };
	var mat_b = { color : "#000" };
	var mat_body = { color : "#FFF", render : "renderSolid" };
	var mat_body2 = { color : "#CCC", render : "renderSolid" };

	var bone_src= [
	 ["leg1", -1, 194,-11,0], //0
	 ["leg0", 0, 0,0,0], //1
	 ["hip", 0, 412,10,0], //2
	 ["arm0", 4, 0,0,0], //3
	 ["arm1", -1, 6044,-173,0], //4
	 ["neck", 4, -382,48,0], //5
	 ["head", 5, -6,449,0], //6
	 ["face", 6, -36,241,0,1], //7
	 ["tail0", 2, -90,207,0], //8
	 ["tail1", 8, -42,65,0], //9
	 ["tail2", 9, -39,61,0], //10
	 ["earR0", 6, -259,465,0], //11
	 ["earR1", 11, -123,147,0], //12
	 ["earL0", 6, 112,503,0], //13
	 ["earL1", 13, 47,200,0], //14
	 ["spine0", 2, 185,368,0], //15
	 ["spine1", 15, 796,0,0], //16
	 ["spine2", 16, 792,0,0], //17
	 ["spine3", 17, 808,0,0], //18
	 ["spine4", 18, 793,0,0], //19
	 ["spine5", 19, 792,0,0], //20
	 ["spine6", 5, -85,501,0], //21
	 ["rib0", 2, 188,-268,0], //22
	 ["rib1", 22, 796,0,0], //23
	 ["rib2", 23, 792,0,0], //24
	 ["rib3", 24, 808,0,0], //25
	 ["rib4", 25, 793,0,0], //26
	 ["rib5", 26, 792,0,0], //27
	 ["rib6", 5, -85,-149,0] //28
	];

	var verticesrc = [[560,216,6],[523,302,6],[496,373,6],[432,450,6],[319,374,6],[372,286,6],[429,241,6],[509,168,6],[450,259,6],[404,307,6],[355,380,6],[408,426,6],[465,354,6],[504,286,6],[562,210,28],[349,135,28],[173,219,28],[1,132,28],[-8,-57,28],[46,114,28],[168,174,28],[352,102,28],[517,122,5],[343,55,5],[56,89,5],[-14,-159,5],[64,-275,5],[77,-233,5],[39,-166,5],[89,48,5],[342,21,5],[5993,-362,5],[6215,-282,5],[6222,-30,5],[6061,-30,5],[6035,-156,5],[5744,-41,5],[6077,-184,5],[6099,-54,5],[6180,-57,5],[6172,-255,5],[5994,-309,5],[6225,-5,21],[6213,139,21],[6048,137,21],[6006,-32,21],[5805,25,21],[6039,-62,21],[6075,99,21],[6175,105,21],[175,128,5],[183,77,5],[357,-81,5],[187,-58,5],[163,-205,5],[192,-229,5],[214,-98,5],[344,-117,5],[4764,-250,5],[3969,-250,5],[3174,-250,5],[2375,-250,5],[1584,-250,5],[1584,-294,5],[2375,-294,5],[3174,-294,5],[3969,-294,5],[4764,-294,5],[6143,26,5],[6134,-24,5],[6127,180,21],[6122,124,21],[784,-294,5],[786,-250,5],[5565,-294,5],[5563,-250,5],[5688,-33,8],[5812,48,8],[5841,195,8],[5786,68,8],[5149,768,0],[5087,572,0],[5104,394,0],[5151,306,0],[5349,158,0],[5530,120,0],[5786,135,0],[6010,240,0],[6122,375,0],[6148,491,0],[6134,672,0],[6053,845,0],[6167,677,0],[6206,498,0],[6170,358,0],[6035,215,0],[5791,109,0],[5525,92,0],[5335,129,0],[5108,274,0],[5064,375,0],[5049,575,0],[5154,774,0],[5075,1163,0],[5246,1079,0],[5407,1016,0],[5534,977,0],[5402,977,0],[5282,1003,0],[5163,1048,0],[5179,955,0],[5178,867,0],[5890,1325,0],[5932,1142,0],[5976,996,0],[5470,700,-395],[5433,629,-395],[5450,580,-395],[5482,541,-395],[5521,633,-395],[5503,668,-395],[5756,722,-395],[5716,656,-395],[5733,606,-395],[5765,573,-395],[5804,659,-395],[5786,695,-395],[5663,430,-471],[5609,474,-471],[5610,500,-471],[5658,495,-471],[5695,508,-471],[5706,490,-471],[5396,362,-395],[5433,357,-395],[5515,319,-395],[5677,318,-395],[5566,335,-395],[5493,365,-395],[5454,399,-395],[5436,438,-395],[5112,1006,0],[5140,879,0],[5783,1181,0],[5686,1078,0],[5583,976,0],[5738,986,0],[5860,967,0],[5959,921,0],[5585,311,-395],[5394,383,-395],[6042,850,0],[5225,228,0],[5199,192,0],[369,424,6],[333,442,6],[372,468,6],[5945,-169,5],[5941,-213,5],[5941,-45,21],[5938,-94,21],[591,228,34],[351,110,34],[171,189,34],[34,119,34],[-9,-96,34],[532,133,34],[344,39,34],[68,82,34],[173,111,34],[622,276,18],[567,202,18],[486,348,18],[409,441,18],[353,442,18],[338,380,18],[390,298,18],[441,250,18],[531,132,18],[344,35,18],[173,102,18],[22,-167,18],[71,-252,18],[5989,-358,18],[6215,-277,18],[6193,-54,18],[6091,-40,18],[6048,-178,18],[5731,3,18],[5795,53,18],[5844,207,18],[178,-218,18],[204,-80,18],[344,-97,18],[1584,-264,18],[2375,-264,18],[3174,-264,18],[3969,-264,18],[4764,-264,18],[78,72,18],[6144,-6,18],[5730,-284,18],[786,-274,18],[5584,-269,18],[531,145,18],[5575,382,18],[4764,363,18],[1584,363,18],[3174,363,18],[2376,363,18],[790,363,18],[5744,-44,18],[6222,-30,25],[6071,-36,25],[6043,-176,25],[5744,-41,25],[6187,117,25],[6068,109,25],[6026,-52,25],[5792,43,25],[6143,16,25],[6123,138,25],[6225,-5,25],[5732,3,25],[5149,768,5],[6068,820,5],[6147,672,5],[6166,503,5],[6130,373,5],[6020,225,5],[5789,125,5],[5525,114,5],[5345,151,5],[5138,300,5],[5092,389,5],[5079,571,5],[5407,982,5],[5292,1013,5],[5153,1063,5],[5169,950,5],[5163,862,5],[5583,976,5],[5738,996,5],[5860,977,5],[5959,936,5],[6042,860,5],[5217,222,5],[5941,-193,18],[5941,-185,25],[5934,-75,25],[3184,-20,13],[3969,355,13],[4764,393,13],[1584,393,13],[1584,355,13],[2376,355,13],[4764,355,13],[3969,393,13],[3174,393,13],[2376,393,13],[5575,382,13],[791,363,13],[523,122,13],[826,366,13],[697,342,13],[600,232,13],[587,253,13],[710,317,13],[3969,363,18],[3585,211,5],[3610,230,5],[3583,240,5],[3245,266,5],[3270,285,5],[3228,295,5],[3355,111,5],[3380,130,5],[3363,150,5],[2910,216,5],[2920,250,5],[2893,245,5],[2743,101,13],[3595,101,13],[4985,483,-134],[5107,498,-134],[6111,426,-59],[6105,715,-59],[6234,699,-59],[6232,457,-59],[6252,578,-129],[6121,574,-129],[5119,668,-56],[5142,355,-56],[5005,363,-54],[4993,629,-54],[6109,575,5],[5114,500,32],[6247,579,11],[4971,477,36]];
	var polysrc = [[14,13,12,155,11,10,9,8,7,6,5,156,157,4,3,2,1],[22,21,20,19,18,17,16,15],[48,161,47,160,46,45,71,44,43,50,72,49],[32,75,68,67,66,65,64,73,58,57,56,27,26,25,51,24,23,31,52,30,29,28,55,54,53,74,63,62,61,60,59,76,42,41,40,70,39,38,159,37,158,36,35,69,34,33],[79,78,77,80],[81,82,83,84,153,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,154,100,101,102],[103,143,142,104,105,106,107,108,109,110,111,112],[121,120,119,118,117,116],[127,126,125,124,123,122],[128,129,130,131,132,133],[151,141,140,139,138,137,150,136,135,134],[113,114,115,152,149,148,147,146,145,144],[166,165,164,163,162,167,168,170,169],[192,183,182,200,181,180,179,205,178,177,176,175,174,173,172,171,211,208,210,209,269,207,206,191,190,189,212,248,188,187,201,186,185,184,202,204,199,198,197,196,195,203,194,193],[216,224,220,250,219,218,222,217,223,213,221,214,215,249],[236,225,241,240,239,238,237,242,243,244,245,246,226,227,228,229,230,231,232,233,247,234,235],[255,256,282,251,283,252,257,261,253,258,259,260,254,262],[264,268,266,263,267,265],[272,271,270],[275,274,273],[278,277,276],[281,280,279],[287,288,290,289,286,291],[288,298,289,290],[291,286,296,287],[294,299,295,284],[285,292,297,293],[292,285,293,294,284,295]];
	var matsrc = [{material:mat_b,vIDs:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},{material:mat_b,vIDs:[18,19,20,21,22,23,24,25]},{material:mat_b,vIDs:[26,27,28,29,30,31,32,33,34,35,36,37]},{material:mat_b,vIDs:[38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83]},{material:mat_b,vIDs:[84,85,86,87]},{material:mat_b,vIDs:[88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111]},{material:mat_b,vIDs:[112,113,114,115,116,117,118,119,120,121,122,123]},{material:mat_b,vIDs:[124,125,126,127,128,129]},{material:mat_b,vIDs:[130,131,132,133,134,135]},{material:mat_b,vIDs:[136,137,138,139,140,141]},{material:mat_b,vIDs:[142,143,144,145,146,147,148,149,150,151]},{material:mat_b,vIDs:[152,153,154,155,156,157,158,159,160,161]},{material:mat_body2,vIDs:[162,163,164,165,166,167,168,169,170]},{material:mat_body,vIDs:[171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214]},{material:mat_body2,vIDs:[215,216,217,218,219,220,221,222,223,224,225,226,227,228]},{material:mat_body,vIDs:[229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251]},{material:mat_b,vIDs:[252,253,254,255,256,257,258,259,260,261,262,263,264,265]},{material:mat_b,vIDs:[266,267,268,269,270,271]},{material:mat_w,vIDs:[272,273,274]},{material:mat_w,vIDs:[275,276,277]},{material:mat_w,vIDs:[278,279,280]},{material:mat_w,vIDs:[281,282,283]},{material:mat_b,vIDs:[284,285,286,287,288,289]},{material:mat_b,vIDs:[290,291,292,293]},{material:mat_b,vIDs:[294,295,296,297]},{material:mat_b,vIDs:[298,299,300,301]},{material:mat_b,vIDs:[302,303,304,305]},{material:mat_b,vIDs:[306,307,308,309,310,311]}];
	var weightsrc = [
	 {name:"arm0",vertices:[33,34,35,36,38,39,40,41,43,44,45,46,48,49,50,69,70,71,72,160,161,185,186,187,188,201,213,214,215,217,218,219,221,222,223,248,250]},
	 {name:"arm1",vertices:[32,36,37,38,42,47,158,159,160,161,184,202,212,215,216,248,249,250]},
	 {name:"cable0",vertices:[]},
	 {name:"earL0",vertices:[114,115,144,145]},
	 {name:"earL1",vertices:[113,114,144]},
	 {name:"earR0",vertices:[105,106,108,109,110,111,112,142,143,237,238,239,240,241]},
	 {name:"earR1",vertices:[104,105,109,110,111,142,238,239,240]},
	 {name:"face",vertices:[116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,150,151,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299]},
	 {name:"head",vertices:[81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,106,107,108,112,115,143,145,146,147,148,149,152,153,154,225,226,227,228,229,230,231,232,233,234,235,236,237,241,242,243,244,245,246,247]},
	 {name:"hip",vertices:[15,23,162,167,171,179,205,211,262,263,264,265,266,267,268]},
	 {name:"leg0",vertices:[17,18,19,20,21,25,26,27,28,29,30,51,52,54,55,56,57,164,165,166,169,170,181,182,183,192,193,200]},
	 {name:"leg1",vertices:[16,22,24,31,53,54,57,58,163,168,180,193,194]},
	 {name:"neck",vertices:[37,47,77,78,79,80,189,190,191,212,216,220,224]},
	 {name:"rib0",vertices:[73,74,203]},
	 {name:"rib1",vertices:[63,64,195]},
	 {name:"rib2",vertices:[62,65,196]},
	 {name:"rib3",vertices:[61,66,197]},
	 {name:"rib4",vertices:[60,67,198]},
	 {name:"rib5",vertices:[59,68,199]},
	 {name:"rib6",vertices:[75,76,204]},
	 {name:"spine0",vertices:[211,262,264,265]},
	 {name:"spine1",vertices:[208,254,255]},
	 {name:"spine2",vertices:[210,256,260,282]},
	 {name:"spine3",vertices:[209,251,259,270,271,272,273,274,275,276,277,278,279,280,281,282,283]},
	 {name:"spine4",vertices:[252,258,269,283]},
	 {name:"spine5",vertices:[207,253,257]},
	 {name:"spine6",vertices:[206,261]},
	 {name:"tail0",vertices:[1,2,7,8,9,14,172,178]},
	 {name:"tail1",vertices:[2,7,9,14,178]},
	 {name:"tail2",vertices:[3,4,5,6,10,11,12,13,155,156,157,173,174,175,176,177]}
	];

	this.makeBody( verticesrc, polysrc, matsrc );
	this.makeBone( weightsrc, bone_src );
	
	var me = this;
	for ( var i = 0; i < me.bones.length; ++i ) { me[ me.bones[i].name ] = me.bones[i]; }
	this.spines = [ this.spine0, this.spine1, this.spine2, this.spine3, this.spine4, this.spine5, this.spine6 ];
	this.ribs = [ this.rib0, this.rib1, this.rib2, this.rib3, this.rib4, this.rib5, this.rib6 ];
	this.spcV0 = this.vertices[ 250 ];
	this.spcV1 = this.vertices[ 281 ];
	this.spcV2 = this.vertices[ 282 ];
	
	this.rrr = 0;
	this.rrr2 = 0;
	this.rrr3 = Math.random() * 10;
	this.rrr4 = Math.random() * 10;
	this.rrr5 = Math.random() * 10;
	this.rrr6 = Math.random() * 10;
	this.rrr7 = Math.random() * 10;
	this.rrr8 = Math.random() * 10;
	this.rrr9 = Math.random() * 10;
	this.rrr10 = Math.random() * 10;
	
	this.eyeVL0 = this.vertices[ 116 ];
	this.eyeVR0 = this.vertices[ 122 ];
	this.eyes = [
		this.vertices[ 115 ],
		this.vertices[ 120 ],
		this.vertices[ 117 ],
		this.vertices[ 118 ] ,
		this.vertices[ 121 ],
		this.vertices[ 126 ],
		this.vertices[ 123 ],
		this.vertices[ 124 ]
	];
	
	this.blinkcc = 28;
	this.blinklimit = 30;
};

Cat.prototype.blink = function() {
	this.blinkcc += timespeed;
	if( this.blinkcc > this.blinklimit + 4.5 ){
		this.blinkcc = 0;
		this.blinklimit = Math.random() * 60 + 2;
	}else if( this.blinkcc > this.blinklimit ){
		this.doBlink();
	}else{
		this.doBlink2();
	}
};

Cat.prototype.doBlink = function() {
	var gby = this.eyeVL0.by;
	var b, s = 0.65 * timespeed;
	var len = 4, eyes = this.eyes;
	for( var i=0; i<len; ++i ){ b = eyes[i]; b.by += ( gby - b.by ) * s; }
	gby = this.eyeVR0.by;
	len = 8;
	for( i=4; i<len; ++i ){ b = eyes[i]; b.by += ( gby - b.by ) * s; }
};

Cat.prototype.doBlink2 = function() {
	var b, s = 0.65 * timespeed;
	var len = 8, eyes = this.eyes;
	for( var i=0; i<len; ++i ){
		b = eyes[i]; b.by += ( b.iniby - b.by ) * s;
	}
};

Cat.prototype.opening = function() {
	this.arm1.dy = this.leg1.dy = 
	this.rib6.dy = this.spine6.dy = 
	this.rib0.dy = this.spine0.dy = this.gy = -worldH + 3000 >> 1;
	this.head.orz = this.head.orz2 = 0;
	this.arm1.rsa = 0;
	this.cc = 0;
	this.animate = this.standM;
};

Cat.prototype.standM = function() {
	var ts = timespeed;
	var b, b1, per;
	var s = 0.6;
	var per2;
	var per = ts;
	this.rrr += 0.13 * per;
	this.rrr2 += 0.112 * per;
	this.rrr6 += 0.063 * per;
	this.rrr7 += 0.0956 * per;
	this.rrr3 += 0.103 * per;
	this.rrr4 += 0.12 * per;
	this.rrr5 += 0.15 * per;
	this.rrr8 += 0.123 * per;
	this.rrr9 += 0.0753 * per;
	this.rrr10 += 0.83 * per;
	
	var wx = worldX >> 1;
	
	this.blink();
	
	this.cc += ts;
	if( this.cc > 4 ) this.gy -= 240 * ts;
	if( this.gy < 0 ){this.gy = 0;}
	this.arm1.dy += this.arm1.rsa = ( this.gy - this.arm1.dy ) * 0.024 + this.arm1.rsa * 0.85;
	this.leg1.dy = this.arm1.dy;
	
	this.arm1.dx = wx - 180;
	this.arm1.rz = Math.cos( this.rrr ) * 0.3;
	this.leg1.rz = Math.cos( this.rrr2 ) * -0.3;
	
	if( state == 1 && closeper > 0.85 ){
		per2 = Math.min( 0.4, Math.max( 0, closeper - 0.85 ) * 5 );
		per = 1 - per2;
		this.arm1.rz *= per;
		this.leg1.rz *= per;
		per2 *= ts;
		this.rrr += 1 * per2;
		this.rrr2 += 1.3 * per2;
	}
	this.arm0.rz = -this.arm1.rz;
	this.neck.rz = -this.arm1.rz * 0.7;
	
	this.leg1.dx = -wx + 180;
	this.leg0.rz = this.leg1.rz * -1;
	this.hip.rz = this.leg1.rz * -1.5;
	
	b = this.head;
	b.orz2 = b.orz;
	b.orz = b.rz;
	b.grz = Math.cos( this.rrr3 ) * 0.55;
	if( state == 1 && closeper > 0.3 ){
		this.rrr3 += Math.min( 1, closeper - 0.3 ) * 0.8 * ts;
		if( closeper > 0.85 ){
			this.rrr3 += Math.min( 1, closeper - 0.8 ) * 1 * ts;
		}
	}
	b.rz += ( b.grz - b.rz ) * s;
	
	b = this.face;
	b.grx = Math.cos( this.rrr7 ) * 0.4;
	b.gry = Math.cos( this.rrr9 ) * 0.4 + 0.2;
	if( state == 1 && closeper > 0.4 ){
		per = 1 - Math.min( 0.7, Math.max( 0, closeper - 0.4 ) * 2 );
		b.grx *= per;
		b.gry *= per;
		b.gry += 0.3 * ( 1 - per );
	}
	b.rx += ( b.grx - b.rx ) * s;
	b.ry += ( b.gry - b.ry ) * s;
	b.rz = this.head.rz;
	
	
	this.head.bx = Math.max( 0, closeperR ) * -200;
	this.head.scale = this.face.scale = Math.max( 1, closeperR + 0.5 );
	
	this.earR0.rz = ( this.head.orz2 - this.head.orz ) * 4;
	this.earR1.rz = this.earR0.rz * 2;
	if( state == 1 && closeper > 0.5 ){
		per2 = Math.min( 0.8, Math.max( 0, closeper - 0.5 ) * 3 );
		per = 1 - per2;
		this.earR0.rz *= per;
		this.earR1.rz *= per;
	}
	this.earL0.rz = this.earR0.rz;
	this.earL1.rz = this.earR1.rz;
	
	this.tail0.rz = Math.cos( this.rrr5 ) * 0.4;
	this.tail1.rz = this.tail0.rz * 0.5;
	this.tail2.rz = this.tail0.rz * 1.5;
	this.tail0.rz -= 0.2;
	
	if( state == 0 ){
		per = 0.06;
	}else{
		per = Math.max( 0.06, Math.min( 1, ( closeper - 0.45 ) * 2.3 ));
	}
	this.spcV0.by = this.spcV0.iniby * per;
	this.spcV1.by = this.spcV1.iniby * per;
	this.spcV2.by = this.spcV2.iniby * per;
	this.spcV1.by1 = this.spcV1.iniby1 * per;
	this.spcV2.by1 = this.spcV2.iniby1 * per;
	
	this.updateChain();
};


Cat.prototype.finish = function() {
	this.faceScl = 1;
	this.faceScl2 = 1;
	this.faceScl_sa = 0;
	this.faceScl2_sa = 0;
	this.r3p = 2;
	this.headRscl = 1.6;
	this.earSpd = 0;
	this.toBtm = false;
	this.arm1.vy = -100;
	
	this.animate = this.finishM;
};

Cat.prototype.finishM = function() {
	var ts = timespeed;
	var b, b1, per;
	var s = 0.6;
	var s2 = 0.3 * ts;
	var per2;
	var per = ts;
	this.rrr += 0.13 * per;
	this.rrr2 += 0.162 * per;
	this.rrr6 += 0.063 * per;
	this.rrr7 += 0.0656 * per;
	this.rrr3 += 0.0803 * per;
	this.rrr4 += 0.12 * per;
	this.rrr5 += 0.715 * per;
	this.rrr8 += 0.123 * per;
	this.rrr9 += 0.0453 * per;
	this.rrr10 += 0.83 * per;
	
	this.blink();
	
	var scl = this.faceScl;
	this.face.slim( scl );
	this.head.slim( scl );
	this.earL0.slim( scl );
	this.earL1.slim( scl );
	this.earR0.slim( scl );
	this.earR1.slim( scl );
	hphone.cableR0.bx =  hphone.cableR0.inibx * scl;
	hphone.cableL0.bx =  hphone.cableL0.inibx * scl;
	
	var wx = worldX >> 1;
	
	this.arm1.dx += this.arm1.xsa = ( 450 - this.arm1.dx ) * 0.2 + this.arm1.xsa * 0.65;
	
	var ss0 = 0.04 * ts;
	if( this.arm1.dx < 600 ){
		this.faceScl2 += ( 1.6 - this.faceScl2 ) * ss0;
		this.faceScl +=( 2.1 - this.faceScl ) * ss0;
	}else{
		
	}
	
	if( this.toBtm || this.arm1.dx < 700 ){
		this.toBtm = true;
		this.arm1.dy += ( -800 - this.arm1.dy ) * s2;
		
		this.arm1.grz = Math.cos( this.rrr ) * 0.15 - 1.2;
		this.leg1.grz = Math.cos( this.rrr ) * 0.13 + 1.2;
		this.arm0.grz = -this.arm1.grz - pi05;
		this.leg0.grz = -this.leg1.grz + pi05;
		this.rrr3 += this.r3p * ts;
		this.r3p += ( 0 - this.r3p ) * 0.05 * ts;
		this.headRscl += ( 0.25 - this.headRscl ) * 0.07 * ts;
		this.earSpd += ( 2.5 - this.earSpd ) * 0.01 * ts;
	}else{
		this.arm1.dy += ( 500 - this.arm1.dy ) * s2;
		this.arm1.grz = Math.cos( this.rrr ) * 0.15;
		this.leg1.grz = Math.cos( this.rrr ) * 0.13;
		this.arm0.grz = -this.arm1.grz;
		this.leg0.grz = -this.leg1.grz;
	}
	
	this.arm1.rz += ( this.arm1.grz - this.arm1.rz ) * s;
	this.leg1.rz += ( this.leg1.grz - this.leg1.rz ) * s;
	
	this.arm0.rz += ( this.arm0.grz - this.arm0.rz ) * s;
	this.leg0.rz += ( this.leg0.grz - this.leg0.rz ) * s;
	
	this.neck.rz = -this.arm1.rz * 1;
	
	this.leg1.dx += this.leg1.xsa = ( -700 - this.leg1.dx ) * 0.2 + this.leg1.xsa * 0.65;
	this.leg1.dy += ( this.arm1.dy - this.leg1.dy ) * 0.8;
	this.hip.rz = this.leg1.rz * -1;
	
	b = this.head;
	b.orz2 = b.orz;
	b.orz = b.rz;
	b.grz = Math.cos( this.rrr3 ) * this.headRscl;
	b.rz = b.grz;
	
	b = this.face;
	b.grx = Math.cos( this.rrr7 ) * 0.13;
	b.gry = Math.cos( this.rrr9 ) * 0.35;
	b.rx += ( b.grx - b.rx ) * s;
	b.ry += ( b.gry - b.ry ) * s;
	b.rz = this.head.rz;
	
	this.head.bx = 50;
	this.head.by = 500;
	this.head.scale = this.face.scale += ( this.faceScl2 - this.face.scale ) * s2;
	
	this.earR0.rz = ( this.head.orz2 - this.head.orz ) * this.earSpd;
	this.earR1.rz = this.earR0.rz * 4;
	this.earL0.rz = this.earR0.rz;
	this.earL1.rz = this.earR1.rz;
	
	this.tail0.rz = Math.cos( this.rrr5 ) * 0.4;
	this.tail1.rz = this.tail0.rz * 0.5;
	this.tail2.rz = this.tail0.rz * 1.5;
	this.tail0.rz += 0.4;
	
	per = 0.06;
	this.spcV0.by = this.spcV0.iniby * per;
	this.spcV1.by = this.spcV1.iniby * per;
	this.spcV2.by = this.spcV2.iniby * per;
	this.spcV1.by1 = this.spcV1.iniby1 * per;
	this.spcV2.by1 = this.spcV2.iniby1 * per;
	
	this.updateChain();
};


Cat.prototype.updateChain = function() {
	var ts = timespeed;
	var i, b, b1, r, cos, sin, l, lsa, ddx, ddy;
	var spines = this.spines;
	var len = spines.length - 1;
	
	var g = -20 * ts;
	var f = 0.8;
	var stf = 0.5;
	var s = 0.4 * ts;
	
	b = spines[0];
	b1 = spines[6];
	var xx = b.dx;
	var yy = b.dy;
	var xp = ( b1.dx - xx ) / len;
	var yp = ( b1.dy - yy ) / len;
	var rp = pi / len;
	var per = Math.min( 10, Math.max( -0.4, closeperR * 1.5 ));
	if( closeper < 0.3 ){
		per += ( 1 - closeper / 0.3 ) * 1.5;
		
	}
	if( per > 2 ) per = 2;
	
	var fat = per * 250;
	var r = 0;
	var r2 = 0, r2p = 0;
	
	var blurp;
	if( state == 1 ){
		blurp = Math.min( 1, Math.max( 0, ( closeper - 0.75 ) * 2 )) * 80;
		r2p = 1;
		r2 = this.rrr;
	}else if( state == 2 ){
		blurp = 0;
		fat = 0;
	}
	else{
		blurp = 0;
	}
	
	for( i=1; i<len; ++i ){
		xx += xp;
		yy += yp;
		r += rp;
		b1 = spines[i];
		b1.dx = xx;
		b1.dy = yy + Math.sin( r ) * fat;
		b1.dy += Math.cos( ( r2 += r2p ) ) * blurp;
	}
	
	var ribs = this.ribs;
	len = ribs.length - 1;
	b = ribs[0];
	b1 = ribs[6];
	xx = b.dx;
	yy = b.dy;
	xp = ( b1.dx - xx ) / len;
	yp = ( b1.dy - yy ) / len;
	
	r = 0;
	fat = per * 300;
	
	if( state == 1 ){
		r2 = this.rrr;
	}else if( state == 2 ){
		fat = 50;
	}
	
	for( i=1; i<len; ++i ){
		xx += xp;
		yy += yp;
		r += rp;
		b1 = ribs[i];
		b1.dx = xx;
		b1.dy = yy + Math.sin( r ) * -fat;
		b1.dy += Math.cos( ( r2 += r2p ) ) * blurp;
	}
};

Cat.prototype.updateBone = function() {
	
	this.leg1.updateMtx();
	this.leg0.multMtx();
	this.hip.multMtx();
	
	this.arm1.updateMtx();
	this.arm0.multMtx();
	this.neck.multMtx();
	
	this.head.multMtx();
	this.face.toPpos();
	this.face.updateMtx2();
	
	this.earR0.multMtx();
	this.earR1.multMtx();
	this.earL0.multMtx();
	this.earL1.multMtx();
	
	this.tail0.multMtx();
	this.tail1.multMtx();
	this.tail2.multMtx();
	
	this.spine0.multMtx();
	this.spine1.updateMtx();
	this.spine2.updateMtx();
	this.spine3.updateMtx();
	this.spine4.updateMtx();
	this.spine5.updateMtx();
	this.spine6.multMtx();
	
	this.rib0.multMtx();
	this.rib1.updateMtx();
	this.rib2.updateMtx();
	this.rib3.updateMtx();
	this.rib4.updateMtx();
	this.rib5.updateMtx();
	this.rib6.multMtx();
};


