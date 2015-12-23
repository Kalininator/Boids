var c, ctx;
var WIDTH, HEIGHT;
var swarm, walls;

var MIN_DISTANCE = 20;
var MIN_WALL_DISTANCE = 25;
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
	for(var i = 0; i < 50; i ++)
	{
		swarm.addBoid(new boid(new vec2(Math.random()*WIDTH,Math.random()*HEIGHT),new vec2(getRandom(-1,1),getRandom(-1,1)), swarm));
	}
	//swarm.setTarget(new vec2(WIDTH/2, HEIGHT/2));
	
	walls.push(new wall(new vec2(WIDTH/2-150,HEIGHT/2-150),new vec2(WIDTH/2-150,HEIGHT/2 + 150)));
	walls.push(new wall(new vec2(WIDTH/2-150,HEIGHT/2-150),new vec2(WIDTH/2+150,HEIGHT/2 - 150)));
	walls.push(new wall(new vec2(WIDTH/2-150,HEIGHT/2+150),new vec2(WIDTH/2+150,HEIGHT/2 + 150)));
	
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
	var out = {boids: [],walls: []};
	
	for(var i = 0; i < swarm.boids.length; i ++)
	{
		if(swarm.boids[i] != boid && swarm.boids[i].canSee(boid))
		{
			out.boids.push(swarm.boids[i].position);
		}
	}
	for(var i = 0; i < walls.length; i ++)
	{
		out.walls.push(walls[i].closestPositionToPoint(boid.position));
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

function line_intersects(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {

    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;
    s2_y = p3_y - p2_y;

    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        return true;
    }

    return false; // No collision
}

function drawVec(v, pos)
{
	
	ctx.beginPath();
	ctx.moveTo(pos.x,pos.y);
	ctx.lineTo((pos.x)+v.x,(pos.y)+v.y);
	ctx.stroke();
	ctx.closePath();
}