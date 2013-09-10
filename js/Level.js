var Level = function() {
    var that = {};

    // !TODO Setup up these at one place
    var canvas = document.getElementById('canvas');
    var width = canvas.width;
    var height = canvas.height;    
    var context = canvas.getContext('2d');
	var angle = 0.05;

    // Draws a 16x16 grid system
    var drawGrid = function() {
        var gridSize = 16;
        context.beginPath();
        // vertical lines
        for(var x=0; x<width; x=x+gridSize) {
            context.moveTo(x, 0);
            context.lineTo(x, height);           
        }
        // horizontal lines
        for(var y=0; y<height; y=y+gridSize) {
            context.moveTo(0, y);
            context.lineTo(width, y);           
        }        
        context.strokeStyle = "#ccc";            
        context.stroke();       
    }
	
	// Random color as RGB string
	var getRandomColor = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb("+r+","+g+","+b+")";
    }
	
	// Draws 10 circles with rotating circles
	var drawCircles = function() {
		for (var i=1;i<10;i++){ // Loop through rings (from inside to out)
			context.save();
			context.translate(560,75);
			context.rotate(angle);
			angle = angle + 0.01;
			context.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';
			for (var j=0;j<i*6;j++){ // draw individual dots
				if(i==9) {
					// DISCO DOTS!
					context.fillStyle = getRandomColor();
				}
				context.rotate(Math.PI*2/(i*6));
   			    context.beginPath();
			    context.arc(0,i*12.5,5,0,Math.PI*2,true);
			    context.fill();
			}
			context.restore();
		}
	}
	
    // Public function for updating this level
    that.update = function(input) {
		
    }
    
    // Public function for drawing this level
    that.draw = function() {
        drawGrid();
		drawCircles();
    }
    
    return that;
}