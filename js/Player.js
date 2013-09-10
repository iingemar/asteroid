var Player = function() {
    var that = {};

	// !TODO Setup up these at one place
    var canvas = document.getElementById('canvas');
    var width = canvas.width;
    var height = canvas.height;    
    var context = canvas.getContext('2d');
	
    var image = new Image();
    image.src = "images/ship.png";
    var x = width / 2;
    var y = height / 2;
	var spriteW = 25;
	var spriteH = 40;
	var degrees = 0;
	var speed = 0;
	var MAX_SPEED = 10;
	var shots = [];
	var gravity = 1;
	
	// Creates a colorful shot!
	var shoot = function() {
		var shot = {};
		shot.x = x;
		shot.y = y;
		shot.vx = 4;
		shot.vy = Math.random() * 1;
		shot.radius = Math.random() * 10;
		shot.color = getRandomColor();
		shots.push(shot);
	}
	
	// Random color as RGB string
	var getRandomColor = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb("+r+","+g+","+b+")";
    }
    	
    that.update = function(input) {
        if(input.buttons[input.BUTTON_RIGHT]) {
            degrees = degrees + 7;
        } else if(input.buttons[input.BUTTON_LEFT]) {
			degrees = degrees - 7;
        }
		if(input.buttons[input.BUTTON_UP]) {
			speed = speed + 0.3;
			if(speed > MAX_SPEED) {
				speed = MAX_SPEED;
			}
		} else if(input.buttons[input.BUTTON_DOWN]) {
			speed = 0;
        }
		if(input.buttons[input.BUTTON_SHOOT]) {
			// pew pew
			shoot();
		}
		
		x = x + speed * Math.cos((degrees-90) * Math.PI/180);
		y = y + speed * Math.sin((degrees-90) * Math.PI/180);
		
		// Check bounds. 
		// Continue on other side of screen!
		if(x > width) {
			x = 0;
		} else if(x < 0) {
			x = width;
		} else if(y > height) {
			y = 0;
		} else if(y < 0) {
			y = height;
		}
		
		var shot;
		var len = shots.length;
		// Update shots
        for(var i=0; i<len; i++) {
            shot = shots[i];
			shot.vy += gravity;
			shot.y += shot.vy;
			if(shot.y > height) {
                shot.vy *= -1;
            }
		}
    };
	
    that.draw = function() {
		// Print debug output
		$('#output').html('pos (' + Math.round(x) + ', ' + Math.round(y) + ')' + ' deg: ' + degrees);
		$('#output-shots').html('shots: ' + shots.length);
		
		var shot;
        var len = shots.length;
        // Draw each shot
        for(var i=0; i<len; i++) {
            shot = shots[i];
            context.fillStyle = shot.color;
            context.beginPath();
            context.arc(shot.x, shot.y, shot.radius, 0, Math.PI*2, false);
            // filled
            context.fill();
        }
		
		// Rotate ship
		context.save();
		// Transform the context to the point on the canvas that the object should rotate about
		context.translate(x+spriteW/2, y+spriteH/2);
		// Rotate the context
		context.rotate(degrees * Math.PI / 180);  // takes radians as arg
        context.drawImage(image, -spriteW/2, -spriteH/2, spriteW, spriteH);
		context.restore();
    }
    
    return that;
};