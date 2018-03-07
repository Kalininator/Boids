function wall(start,end)
{
	this.start = start;
	this.end = end;
}
wall.prototype = {
	
	closestPositionToPoint: function(point)
	{
		return GetClosestPoint(this.start,this.end,point);
	},
	draw: function()
	{
		ctx.beginPath();
		ctx.moveTo(this.start.x,this.start.y);
		ctx.lineTo(this.end.x,this.end.y);
		ctx.closePath();
		ctx.stroke();
	}
}

function GetClosestPoint(a,b,p)
{
    var ap = p.subtract(a);
    var ab = b.subtract(a);
    var ab2 = ab.dot(ab);
    var ap_ab = ap.dot(ab);
    var t = ap_ab / ab2;
	if (t < 0) t = 0;
	else if (t > 1) t = 1;
	var Closest = a.add(ab.multiply(t));
    return Closest;
}