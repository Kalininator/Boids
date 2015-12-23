var c, ctx;
var WIDTH, HEIGHT;
var swarm, walls;

var MIN_DISTANCE = 20;
var MIN_WALL_DISTANCE = 40;
var VIEW_DISTANCE = 100;
var MAX_SPEED = 2.5;

$(function(){//init
	
	c = $("#canvas")[0];
	ctx = c.getContext("2d");
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	WIDTH = c.width;
	HEIGHT = c.height;
	walls = [];
	swarm = new swarm();
	for(var i = 0; i < 100; i ++)
	{
		swarm.addBoid(new boid(new vec2(Math.random()*WIDTH,Math.random()*HEIGHT),new vec2(getRandom(-1,1),getRandom(-1,1)), swarm));
	}
	//swarm.setTarget(new vec2(WIDTH/2, HEIGHT/2));
	
	walls.push(new wall(new vec2(WIDTH/2-100,HEIGHT/2-100),new vec2(WIDTH/2-100,HEIGHT/2 + 100)));
	
	c.addEventListener('click', function(evt) {
        var mousePos = getMousePos(c, evt);
		//console.log(mousePos.x + "," + mousePos.y);
		swarm.setTarget(new vec2(mousePos.x,mousePos.y));
    }, false);
	setInterval(loop, 1000/60);
});

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function loop()
{
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	swarm.draw();
	swarm.update();
	
	for(var i = 0; i < walls.length; i ++)
	{
		walls[i].draw();
	}
}

function getObstacles(boid)
{
	var out = [];
	
	for(var i = 0; i < swarm.boids.length; i ++)
	{
		if(swarm.boids[i] != boid && swarm.boids[i].canSee(boid))
		{
			out.push(swarm.boids[i].position);
		}
	}
	for(var i = 0; i < walls.length; i ++)
	{
		
			out.push(walls[i].closestPositionToPoint(boid.position));
	}
	return out;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawVec(v, pos)
{
	
	ctx.beginPath();
	ctx.moveTo(pos.x,pos.y);
	ctx.lineTo((pos.x)+v.x,(pos.y)+v.y);
	ctx.stroke();
	ctx.closePath();
}