function vec2(x,y)
{
	this.x = x;
	this.y = y;
}
vec2.prototype = {
	
	add: function(v)
	{
		if(v instanceof vec2)
		{
			return new vec2(this.x + v.x,this.y + v.y);
		}else{
			return new vec2(this.x + v, this.y + v);
		}
	},
	subtract: function(v)
	{
		if(v instanceof vec2)
		{
			return new vec2(this.x - v.x,this.y - v.y);
		}else{
			return new vec2(this.x - v, this.y - v);
		}
	},
	multiply: function(v)
	{
		if(v instanceof vec2)
		{
			return new vec2(this.x * v.x,this.y * v.y);
		}else{
			return new vec2(this.x * v,this.y * v);
		}
	},
	divide: function(v)
	{
		if(v instanceof vec2)
		{
			return new vec2(this.x / v.x,this.y / v.y);
		}else{
			return new vec2(this.x / v,this.y / v);
		}
	},
	negative: function()
	{
		return new vec2(-this.x,-this.y);
	},
	dot: function(v)
	{
		return (this.x*v.x + this.y*v.y);
	},
	length: function()
	{
		return Math.sqrt(this.dot(this));
	},
	equals: function(v)
	{
		return this.x == v.x && this.y == v.y;
	},
	unit: function()
	{
		return this.divide(this.length());
	},
	angle: function()
	{
		return Math.atan2(this.y,this.x);
	},
	setAngle: function(theta)
	{
		return new vec2(this.length()*Math.cos(theta),this.length()*Math.sin(theta));
	},
	rotate: function(theta)
	{
		return this.setAngle(this.angle()+theta);
	},
	setLength: function(length)
	{
		return this.divide(this.length()).multiply(length);
	},
	unit: function()
	{
		return this.setLength(1);
	}
	
}













