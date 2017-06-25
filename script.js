var WIDTH = document.body.clientWidth;
var HEIGHT = window.innerHeight;
var skipNframes = WIDTH * HEIGHT * 0.005;

function Vector2D(x, y){
	this.x = x;
	this.y = y;
}

function Vector3D(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
}

function Node(x, y, z,positionX, positionY){
	this.color = new Vector3D(x, y, z);
	this.visited = false;
	this.drawed = false;
	this.position = new Vector2D(positionX, positionY);
	this.parent = null;
}

var graph;
var stack = [];

function setup() {
  createCanvas(WIDTH , HEIGHT);
	graph = new Array(HEIGHT)

 	for(var i = 0; i < HEIGHT;i++){
	 	graph[i] = new Array(WIDTH)
 	}

	for(var i = 0; i < HEIGHT; i++){
		for(var j = 0; j < WIDTH; j++){
			graph[i][j] = new Node(255,255,255, j , i);
		}
	}

	var startX = random(0, WIDTH);
	var startY = random(0, HEIGHT);
	startX = Math.floor(startX);
	startY = Math.floor(startY);

	graph[startY][startX].color = new Vector3D(random(0,255), random(0,255), random(0,255)); /* startowy kolor */
	stack.push(graph[startY][startX]); 	/* Miejsce startowe */
	background(255);
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

function DFS_NEXT(){
	if(stack.length == 0) return false;
	var node = stack.pop();
	node.visited = true;

	/* Kolorowanie wierzchołka */
	if(node.parent != null){
		if(random() < 0.2){
		 node.color.x = node.parent.color.x * 0.99999;
		 node.color.y = node.parent.color.y * 0.99999;
		 node.color.z = node.parent.color.z * 0.99999;
	 }else{
		 node.color.x = node.parent.color.x;
		 node.color.y = node.parent.color.y;
		 node.color.z = node.parent.color.z;
	 }
	}
	var tmp; /* Tymczasowa zmienna do wyznaczania sąsiadów wierzchołka*/
	var arr = [0,1,2,3,4,5,6,7];
	arr = shuffle(arr);
	for(var i = 0; i < arr.length;i++){
		switch (arr[i]) {
			case 0:
				tmp = new Vector2D(node.position.x+1, node.position.y);
				break;
			case 1:
				tmp = new Vector2D(node.position.x+1, node.position.y+1);
				break;
			case 2:
				tmp = new Vector2D(node.position.x+1, node.position.y-1);
				break;
			case 3:
				tmp = new Vector2D(node.position.x-1, node.position.y);
				break;
			case 4:
				tmp = new Vector2D(node.position.x-1, node.position.y+1);
				break;
			case 5:
				tmp = new Vector2D(node.position.x-1, node.position.y-1);
				break;
			case 6:
				tmp = new Vector2D(node.position.x, node.position.y+1);
				break;
			case 7:
				tmp = new Vector2D(node.position.x, node.position.y-1);
				break;
		}
		if(CheckBounds(tmp)){
			if(!graph[tmp.y][tmp.x].visited){
					graph[tmp.y][tmp.x].parent = node;
					stack.push(graph[tmp.y][tmp.x]);
			}
		}
	}
	return true;
}
function draw(){
	for(var k = 0; k < skipNframes;k++){
		DFS_NEXT();
	}

	for(var i = 0; i < HEIGHT; i++){
		for(var j = 0; j < WIDTH; j++){
			if(graph[i][j].visited && !graph[i][j].drawed){
				graph[i][j].drawed = true;
				stroke(graph[i][j].color.x, graph[i][j].color.y, graph[i][j].color.z);
				point(j ,i);
			}
		}
	}
}
