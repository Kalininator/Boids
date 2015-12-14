function boid(position,velocity, swarm)
{
	this.position = position;
	this.velocity = velocity;
	this.swarm = swarm;
}
boid.prototype = {
	
	draw: function()
	{
		ctx.beginPath();
		ctx.rect(this.position.x-3,this.position.y-3,6,6);
		ctx.closePath();
		ctx.fill();
		drawVec(this.velocity.multiply(5),this.position);
	},
	equals: function(boid)
	{
		return this.position.equals(boid.position) && this.velocity.equals(boid.velocity);
	},
	update: function()
	{
		this.velocity = this.velocity.add(this.rule1());
		this.velocity = this.velocity.add(this.rule2());
		this.velocity = this.velocity.add(this.rule3());
		this.velocity = this.velocity.add(this.rule4());
		this.velocity = this.velocity.add(this.boundPosition());
		this.velocity = this.limitSpeed(3);
		this.position = this.position.add(this.velocity);
	},
	rule1: function() //move towards the center of mass
	{
		var cofm = new vec2(0,0);
		for(var i = 0; i < this.swarm.boids.length; i ++)
		{
			if(!this.swarm.boids[i].equals(this))
			{
				cofm = cofm.add(this.swarm.boids[i].position);
			}
		}
		cofm = cofm.divide(this.swarm.boids.length);
		return cofm.subtract(this.position).divide(100);
	},
	rule2: function()//avoid collisions
	{
		var v = new vec2(0,0);
		for(var i = 0; i < this.swarm.boids.length; i ++)
		{
			if(!this.swarm.boids[i].equals(this))
			{
				if(this.swarm.boids[i].position.subtract(this.position).length() < 20)
				{
					v = v.subtract(this.swarm.boids[i].position.subtract(this.position).divide(20));
				}
			}
		}
		return v;
	},
	rule3: function()//aim towards the average velocity
	{
		var vec = new vec2(0,0);
		for(var i = 0; i < this.swarm.boids.length; i ++)
		{
			if(!this.swarm.boids[i].equals(this))
			{
				vec = vec.add(this.swarm.boids[i].velocity);
			}
		}
		vec = vec.divide(this.swarm.boids.length);
		return vec.subtract(this.velocity).divide(8);
	},
	rule4: function()//aim towards target if one exists
	{
		if(this.swarm.target != null)
		{
			var target = this.swarm.target;
			
			return target.subtract(this.position).divide(100);
			
		}else{
			return new vec2(0,0);
		}
	},
	boundPosition: function()
	{
		var xmin = 0;
		var xmax = WIDTH;
		var ymin = 0;
		var ymax = HEIGHT;
		var c = 0.5;
		var vec = new vec2(0,0);
		
		if(this.position.x < xmin)
		{
			vec.x = c;
		}else if(this.position.x > xmax)
		{
			vec.x = -c;
		}
		
		if(this.position.y < ymin)
		{
			vec.y = c;
		}else if(this.position.y > ymax)
		{
			vec.y = -c;
		}
		
		return vec;
	},
	limitSpeed: function(max)
	{
		if(this.velocity.length() > max)
		{
			return this.velocity.setLength(max);
		}else{
			return this.velocity;
		}
	}
	
}