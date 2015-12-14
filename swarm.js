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
	}
}