
var screenWidth, 
	screenHeight,
	canvas, 
	ctx, 
	particles = []; 

// set up automatically called on load by creativejs.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	
	//window.addEventListener("mousedown", onMouseDown); 

}

function onMouseDown(e) { 
	makeParticle(100, mouseX, mouseY); 
}

// MAIN GAME LOOP
// draw automatically called by creativejs.js
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	//makeParticle(2, mouseX, mouseY); 
	
	// while(particles.length>100) { 
	// 	particles.shift();
	// }
	
	for(var i = 0; i<particles.length; i++ ) { 
		var p = particles[i]; 
		p.update(); 
		p.render();

		if( p.size > 1000 )
			particles.shift();
	}
	
	
}	

function makeParticle(numParticles, x, y) { 
	
	for(var i = 0; i<numParticles; i++) { 
		var p = new Particle(x, y); 
		p.vel.reset(random(0,5),0);
		p.vel.rotate(random(360));
		particles.push(p); 
	}
	
	
}

function initObjects() { 

}

function initVars() { 
	screenWidth = window.innerWidth; 
	screenHeight = window.innerHeight; 	
}

function initCanvas() { 

	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas); 
	canvas.width = screenWidth; 
	canvas.height = screenHeight;
}

//----------------------- PARTICLE -------------------------

function Particle(x, y) { 
	
	var pos = this.pos = new Vector2(x,y); 
	var vel = this.vel = new Vector2(); 
	this.size 	= random(8,15); 
	this.drag 	= 0.99; 
	this.shrink = 0.97; 
	this.grow 	= random(1,1.1);
	this.colour = hsl(0,100,random(50,100)); 
	
	this.update = function() { 
		// vel.multiplyEq(this.drag);
		// pos.plusEq(vel); 
		this.size*=this.grow;
	}
	
	this.render = function() { 
		// ctx.fillStyle = this.colour; 
		// ctx.fillCircle(pos.x, pos.y, this.size);

		ctx.strokeStyle = this.colour;
		ctx.lineWidth 	= 2;
		ctx.strokeCircle(this.pos.x, this.pos.y, this.size);
	}
	
}

