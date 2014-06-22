cssMatrix = function(obj) {
    matrix = null;
    
    var radians = function(deg) {
        return deg * (Math.PI/180);
    }

	var multiply = function(_m) {
        if(matrix == null) {
            matrix = _m;
            return;
        }
		// Go through each row against each current matrix's column
		_n = [
			[],
			[],
			[]
		];
		matrix.forEach(function(ele, i) {
			_n[i][0] = ele[0] * _m[0][0] + ele[1] * _m[1][0] + ele[2] * _m[2][0];
			_n[i][1] = ele[0] * _m[0][1] + ele[1] * _m[1][1] + ele[2] * _m[2][1];
			_n[i][2] = ele[0] * _m[0][2] + ele[1] * _m[1][2] + ele[2] * _m[2][2];
		});
		matrix = _n;
	};

	var translateX = function(val) {
		var _m = [
			[1, 0, val],
			[0, 1, 0],
			[0, 0, 1]
		];
		multiply(_m);
	};

	var translateY = function(val) {
		var _m = [
			[1, 0, 0],
			[0, 1, val],
			[0, 0, 1]
		];
		multiply(_m);
	};

	var scale = function(x, y) {
		var _m = [
			[x, 0, 0],
			[0, y, 0],
			[0, 0, 1]
		];
		multiply(_m);
	};

	var scaleX = function(val) {
		var _m = [
			[val, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];
		multiply(_m);
	};

	var scaleY = function(val) {
		var _m = [
			[1, 0, 0],
			[0, val, 0],
			[0, 0, 1]
		];
		multiply(_m);
	};

	var skew = function(x, y) {
		var _m = [
			[1, Math.tan(radians(x)), 0],
			[Math.tan(radians(y)), 1, 0],
			[0, 0, 1]
		];
		multiply(_m);
	};

	var skewX = function(val) {
		var _m = [
			[1, Math.tan(radians(val)), 0],
			[0, 1, 0],
			[0, 0, 1]
		];
		multiply(_m);
	};

	var skewY = function(val) {
		var _m = [
			[1, 0, 0],
			[Math.tan(radians(val)), 1, 0],
			[0, 0, 1]
		];
		multiply(_m);
	};

	var rotate = function(val) {
		var _m = [
			[Math.cos(radians(val)), -Math.sin(radians(val)), 0],
			[Math.sin(radians(val)), Math.cos(radians(val)), 0],
			[0, 0, 1]
		];
		multiply(_m);
	};

	for (var i in obj) {
		switch (i) {
			case 'translateX':
				translateX(obj[i]);
				break;
			case 'translateY':
				translateY(obj[i]);
				break;
			case 'scale':
				scale(obj[i][0], obj[i][1]);
				break;
			case 'scaleX':
				scaleX(obj[i]);
				break;
			case 'scaleY':
				scaleY(obj[i]);
				break;
			case 'skew':
				skew(obj[i][0], obj[i][1]);
				break;
			case 'skewX':
				skewX(obj[i]);
				break;
			case 'skewY':
				skewY(obj[i]);
				break;
			case 'rotate':
				rotate(obj[i]);
				break;
		}
	}
	return [self.matrix[0][0], self.matrix[1][0], self.matrix[0][1], self.matrix[1][1], self.matrix[0][2], self.matrix[1][2]];
}