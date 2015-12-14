var c, ctx;
var WIDTH = 800;
var HEIGHT = 600;
var swarm;
$(function(){//init
	
	c = $("#canvas")[0];
	ctx = c.getContext("2d");
	c.width = WIDTH;
	c.height = HEIGHT;
	$("#canvas").css("border","1px solid black");
	
	swarm = new swarm(10);
	swarm.addBoid(new boid(new vec2(WIDTH/2,HEIGHT/2),new vec2(0,0), swarm));
	swarm.addBoid(new boid(new vec2(WIDTH/2 -50,HEIGHT/2),new vec2(0,0), swarm));
	swarm.addBoid(new boid(new vec2(WIDTH/2 +50,HEIGHT/2 - 100),new vec2(0,0), swarm));
	swarm.addBoid(new boid(new vec2(WIDTH/2 +50,HEIGHT/2 - 300),new vec2(0,0), swarm));
	swarm.addBoid(new boid(new vec2(WIDTH/2 +50,HEIGHT/2 + 100),new vec2(0,0), swarm));
	setInterval(loop, 1000/60);
});

function loop()
{
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	swarm.draw();
	swarm.update();
}

function swarm()
{
	this.boids = [];
}
swarm.prototype = {
	
	addBoid: function(boid){
		this.boids[this.boids.length] = boid;
	},
	draw: function()
	{
		for(i = 0; i < this.boids.length; i++)
		{
			this.boids[i].draw();
		}
	},
	update: function()
	{
		for (var i = 0; i < this.boids.length; i ++)
		{
			this.boids[i].update();
		}
	},
	getCofM: function()
	{
		var pos = new vec2(0,0);
		for(i = 0; i < this.boids.length; i ++)
		{
			pos = pos.add(this.boids[i].position);
		}
		return pos.divide(this.boids.length);
	}
}

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
		this.velocity = this.velocity.add(this.boundPosition());
		this.position = this.position.add(this.velocity);
	},
	rule1: function()
	{
		var cofm = this.swarm.getCofM();
		return cofm.subtract(this.position).divide(100);
	},
	rule2: function()
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
	rule3: function()
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
	}
	
}

function drawVec(v)
{
	
	ctx.beginPath();
	ctx.moveTo(WIDTH/2,HEIGHT/2);
	ctx.lineTo((WIDTH/2)+v.x,(HEIGHT/2)+v.y);
	ctx.stroke();
	ctx.closePath();
}