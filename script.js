var graph;
var algorithms = [];
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
	background(255);
}

function mousePressed() {
  if(random() < 1){
    algorithms.push(new DFS(graph[mouseY][mouseX] , skipNframes, Vector3D.random(), graph));
  }else{
    algorithms.push(new BFS(graph[mouseY][mouseX] , skipNframes, Vector3D.random(), graph));
  }
  return false;
}

function draw(){
	for(var j = 0; j < algorithms.length;j++){
		for(var i = 0; i < algorithms[j].skipNframes;i++){
			algorithms[j].nextStep();
		}
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
