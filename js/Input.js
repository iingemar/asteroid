var Input = function() {
	var that = {};

	// Arrays for holding all key input
	that.buttons = [false, false, false, false, false];
	that.oldButtons = [false, false, false, false, false];
	
	// System keys. 
	var KEY_W = 87;
	var KEY_A = 65;
	var KEY_S = 83;
	var KEY_D = 68;
	var KEY_ESCAPE = 27;
	var KEY_ENTER = 13;
	var KEY_SPACE = 32;

	// Game buttons.
    that.BUTTON_UP = 0;
    that.BUTTON_DOWN = 1;
	that.BUTTON_LEFT = 2;
	that.BUTTON_RIGHT = 3;
	that.BUTTON_SHOOT = 4;
	
    // Sets button pressed or not pressed
	var set = function(keynr, pressed) {
		var button = -1;
		
        if(keynr === KEY_W) { button = that.BUTTON_UP; }
		if(keynr === KEY_S) { button = that.BUTTON_DOWN; }
		if(keynr === KEY_A) { button = that.BUTTON_LEFT; }
		if(keynr === KEY_D) { button = that.BUTTON_RIGHT; }
		if(keynr === KEY_ENTER) { button = that.BUTTON_SHOOT; }
		if(keynr === KEY_SPACE) { button = that.BUTTON_SHOOT; }
	
		if(button != -1) {
			that.buttons[button] = pressed;
		}
	}

    // Listener for key down
	document.onkeydown = function(event){
		var keynr = event.which;
		set(keynr, true);
	}

    // Listener for key up
	document.onkeyup = function(event){
		var keynr = event.which;
		set(keynr, false);
	}
	
	that.update = function() {
        for (var i=0; i<that.buttons.length; i++) {
            oldButtons[i] = that.buttons[i];
        }
	}

	return that;
}