var WIDTH = document.body.clientWidth;
var HEIGHT = window.innerHeight;
var skipNframes = WIDTH * HEIGHT * 0.001;

function Vector2D(x, y){
	this.x = x;
	this.y = y;
}

function Vector3D(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
}

Vector3D.random = function(){
  return new Vector3D(random(255), random(255), random(255));
}

function Node(x, y, z,positionX, positionY){
	this.color = new Vector3D(x, y, z);
	this.visited = false;
	this.drawed = false;
	this.position = new Vector2D(positionX, positionY);
	this.parent = null;
}

function CheckBounds(vector2D){
	if(vector2D.x < 0 || vector2D.y < 0) return false;
	if(vector2D.x >= WIDTH || vector2D.y >= HEIGHT) return false;
	return true;
}

/*Mieszanie z neta */
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
