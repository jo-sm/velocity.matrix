var Matrix = {
	add: function(_m1, _m2) {
		// Add each row to the other row
		_n = [];
		// _m1 num rows must equal _m2 num rows
		if(_m1.length !== _m2.length) {
			return false;
		}
		
		_m1.forEach(function(ele, i) {
			// Each row needs to be the same size
			// TODO: Case when row is length 1
			if(!(ele.length == _m2[i].length)) {
				if(ele.length > _m2[i].length) {
					_i = ele.length - _m2[i].length;
					for(var j = 0; j < _i; j++) {
						_m2[j].push(0);
					}
				} else {
					_i = _m2[i].length - ele.length;
					for(var j = 0; j < _i; j++) {
						ele.push(0);
					}
				}
			}
			
			// Add each row
			_k = [];
			for(var j = 0; j < ele.length; j++) {
				_k.push(ele[j] + _m2[i][j]);
			}
			_n.push(_k);
		});
		return _n;
	},

	multiply: function(_m1, _m2) {
		// _m1 is generally var matrix
		// _m2 is the matrix multiplying against matrix
		// _m1 row size must equal m2 column size (num elements)
		_n = [];
		
		if(_m1[0].length !== _m2.length) {
			return false;
		}
		
		_m1.forEach(function(ele, i) {
			_k = [];
			ele.forEach(function(_e, j) {
                sum = 0;
				for(var k = 0; k < ele.length; k++) {
					sum += ele[k] * _m2[k][j];
				}
				_k.push(sum);
			});
			_n.push(_k);
		});
		return _n;
	}
};

var cssMatrix2D = function(obj) {
	// CSS 2d matrix transformations
	var _matrix = [
		[1,0,0],
		[0,1,0],
		[0,0,1]
	];
    
    // Translates a CSS angle into radians
    // Returns 0 if unable to parse (is this desired, or should it return an error?)
    var translateAngle = function(angle) {
        if(typeof angle == "number") {
            // Assume that the value is a degree
             return angle * (Math.PI/180);
        } else if(typeof angle == "string") {
            _a = angle.match(/^[0-9]*/);
            if(angle.match(/^[0-9]*deg$/)) {
                return _a * (Math.PI/180);
            } else if(angle.match(/^[0-9]*grad$/)) {
                return _a * (Math.PI/200);
            } else if(angle.match(/^[0-9]*rad$/)) {
                return _a;
            } else if(angle.match(/^[0-9]*turn$/)) {
                return _a * 2 * Math.PI;
            } else {
                return 0;   
            }
        } else {
            return 0;
        }
    };
	
	var translateX = function(val) {
		var _m = [
			[0,0,val],
			[0,0,0],
			[0,0,1]
		];
		_matrix = Matrix.add(_matrix, _m);
	};

	var translateY = function(val) {
		var _m = [
			[0,0,0],
			[0,0,val],
			[0,0,1]
		];
		_matrix = Matrix.add(_matrix, _m);
	};

	var scale = function(x, y) {
		var _m = [
			[x, 0, 0],
			[0, y, 0],
			[0, 0, 1]
		];
		_matrix = Matrix.multiply(_matrix, _m);
	};

	var scaleX = function(val) {
		var _m = [
			[val],
			[0],
			[0]
		];
		_matrix = Matrix.multiply(_matrix, _m);
	};

	var scaleY = function(val) {
		var _m = [
			[1, 0, 0],
			[0, val, 0],
			[0, 0, 1]
		];
		_matrix = Matrix.multiply(_matrix, _m);
	};

	var skew = function(x, y) {
		var _m = [
			[1, Math.tan(translateAngle(x)), 0],
			[Math.tan(translateAngle(y)), 1, 0],
			[0, 0, 1]
		];
		_matrix = Matrix.multiply(_matrix, _m);
	};

	var skewX = function(val) {
		var _m = [
			[1, Math.tan(translateAngle(val)), 0],
			[0, 1, 0],
			[0, 0, 1]
		];
		_matrix = Matrix.multiply(_matrix, _m);
	};

	var skewY = function(val) {
		var _m = [
			[1, 0, 0],
			[Math.tan(translateAngle(val)), 1, 0],
			[0, 0, 1]
		];
		_matrix = Matrix.multiply(_matrix, _m);
	};

	var rotate = function(val) {
		var _m = [
			[Math.cos(translateAngle(val)), -Math.sin(translateAngle(val)), 0],
			[Math.sin(translateAngle(val)), Math.cos(translateAngle(val)), 0],
			[0, 0, 1]
		];
		_matrix = Matrix.multiply(_matrix, _m);
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
    
	return [_matrix[0][0], _matrix[1][0], _matrix[0][1], _matrix[1][1], _matrix[0][2], _matrix[1][2]];
};
