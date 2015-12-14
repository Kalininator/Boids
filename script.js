var c, ctx;
var WIDTH, HEIGHT;
var swarm;

var MIN_DISTANCE = 15;
var VIEW_DISTANCE = 50;
var MAX_SPEED = 2.5;

$(function(){//init
	
	c = $("#canvas")[0];
	ctx = c.getContext("2d");
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	WIDTH = c.width;
	HEIGHT = c.height;
	
	swarm = new swarm();
	for(var i = 0; i < 120; i ++)
	{
		swarm.addBoid(new boid(new vec2(Math.random()*WIDTH,Math.random()*HEIGHT),new vec2(0,0), swarm));
	}
	//swarm.setTarget(new vec2(WIDTH/2, HEIGHT/2));
	
	c.addEventListener('click', function(evt) {
        var mousePos = getMousePos(c, evt);
		//console.log(mousePos.x + "," + mousePos.y);
		swarm.setTarget(new vec2(mousePos.x,mousePos.y));
    }, false);
	
	setInterval(loop, 1000/60);
});

function loop()
{
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	swarm.draw();
	swarm.update();
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