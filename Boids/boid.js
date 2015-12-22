function boid(position,velocity, swarm)
{
	this.position = position;
	this.velocity = velocity;
	this.swarm = swarm;
}
boid.prototype = {
	
	draw: function()
	{
		/*ctx.beginPath();
		ctx.rect(this.position.x-3,this.position.y-3,6,6);
		ctx.closePath();
		ctx.fill();
		drawVec(this.velocity.multiply(3),this.position);*/
		var tip = this.position.add(this.velocity.setLength(8));
		var left = this.position.add(this.velocity.setLength(6).setAngle(this.velocity.angle()-(Math.PI * 0.75)));
		var right = this.position.add(this.velocity.setLength(6).setAngle(this.velocity.angle()-(Math.PI + 0.75)));
		ctx.beginPath();
			ctx.moveTo(tip.x,tip.y);
			ctx.lineTo(left.x,left.y);
			ctx.lineTo(this.position.x,this.position.y);
			ctx.lineTo(right.x,right.y);
		ctx.closePath();
		ctx.fill();
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
		this.velocity = this.limitSpeed(MAX_SPEED);
		this.position = this.position.add(this.velocity);
	},
	rule1: function() //move towards the center of mass
	{
		//get all boids in sight
		var insight = this.swarm.getBoidsInSight(this);
		
		if(insight.length == 0)
		{
			return new vec2(0,0);
		}
		
		var cofm = new vec2(0,0);
		for(var i = 0; i < insight.length; i ++)
		{
			cofm = cofm.add(insight[i].position);
		}
		cofm = cofm.divide(insight.length);
		return cofm.subtract(this.position).divide(500);
	},
	rule2: function()//avoid collisions
	{
		var v = new vec2(0,0);
		for(var i = 0; i < this.swarm.boids.length; i ++)
		{
			if((!this.swarm.boids[i].equals(this)) && this.canSee(this.swarm.boids[i]))
			{
				if(this.swarm.boids[i].position.subtract(this.position).length() < MIN_DISTANCE)
				{
					v = v.subtract(this.swarm.boids[i].position.subtract(this.position).divide(2));
				}
			}
		}
		return v;
	},
	rule3: function()//aim towards the average velocity
	{
		var insight = this.swarm.getBoidsInSight(this);
		
		if(insight.length == 0)
		{
			return new vec2(0,0);
		}
		
		var vec = new vec2(0,0);
		for(var i = 0; i < insight.length; i ++)
		{
			vec = vec.add(insight[i].velocity);
		}
		vec = vec.divide(insight.length);
		return vec.subtract(this.velocity).divide(16);
	},
	rule4: function()//aim towards target if one exists
	{
		if(this.swarm.target != null)
		{
			var target = this.swarm.target;
			
			return target.subtract(this.position).divide(500);
			
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
	},
	canSee: function(boid)
	{
		return this.position.subtract(boid.position).length() < VIEW_DISTANCE;
	}
	
}