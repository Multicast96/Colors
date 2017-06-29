function BFS(startNode, skipNframes, startColor, graph) {
  this.stack = [];
  this.stack.push(startNode);
  this.skipNframes = skipNframes;
  this.startColor = startColor; // po co ?
  this.graph = graph;
  startNode.color = startColor;

  this.nextStep = function(){
    if(this.stack.length == 0) return;
    var node = this.stack.shift();
    node.visited = true;

    /* Kolorowanie wierzchołka */
    if(node.parent != null){
      if(random() < 0.5){
       node.color.x = node.parent.color.x * random(0.99 , 1);
       node.color.y = node.parent.color.y * random(0.99, 1);
       node.color.z = node.parent.color.z * random(0.99 , 1);
     }else{
       node.color.x = node.parent.color.x;
       node.color.y = node.parent.color.y;
       node.color.z = node.parent.color.z;
     }
    }

    var tmp; /* Tymczasowa zmienna do wyznaczania sąsiadów wierzchołka*/
    var arr = [1,3,6,7];
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
        if(!this.graph[tmp.y][tmp.x].visited && !this.graph[tmp.y][tmp.x].processing){
            this.graph[tmp.y][tmp.x].parent = node;
            this.graph[tmp.y][tmp.x].processing = true;
            this.stack.push(this.graph[tmp.y][tmp.x]);
        }
      }
    }
  };
}
