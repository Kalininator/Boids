function swarm()
{
	this.boids = [];
	this.target = null;
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
	setTarget: function(target)
	{
		this.target = target;
	},
	removeTarget: function()
	{
		this.target = null;
	},
	getBoidsInSight: function(boid)
	{
		var output = [];
		for(var i = 0; i < this.boids.length; i ++)
		{
			if(boid.canSee(this.boids[i]) && (!boid.equals(this.boids[i])))
			{
				output[output.length] = this.boids[i];
			}
		}
		return output;
	},
	getObstaclesInSight: function(boid)
	{
		var output = [];
		var all = getObstacles();
		
		for(var i = 0; i < all.length; i ++)
		{
			
		}
	}
}









