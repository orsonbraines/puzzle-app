(function(){
  //w1 and h1 are the height of the src
  //w and h are the width of the dest
  var copyPixels = function(src,dest,x,y,w,h,w1,h1){
    for(var px = 0; px<w ; px ++){
      for(var py = 0; py<h ; py ++){
        dest.data[(py * w + px) * 4] = src.data[((y + py)*w1 + (x+px))*4]; 
        dest.data[(py * w + px) * 4 + 1] = src.data[((y + py)*w1 + (x+px))*4 + 1]; 
        dest.data[(py * w + px) * 4 + 2] = src.data[((y + py)*w1 + (x+px))*4 + 2]; 
        dest.data[(py * w + px) * 4 + 3] = src.data[((y + py)*w1 + (x+px))*4 + 3]; 
      }
    }
  }
  
  var canvas = document.getElementById('canvas');
  var unicornImage = document.getElementById('unicorn');
  var imageWidth = 260;
  var imageHeight = 280;
  var gridSize = 4;
  var g = canvas.getContext('2d');
  g.drawImage(unicornImage,0,0,imageWidth,imageHeight);
  var imageData = g.getImageData(0,0,imageWidth,imageHeight);
  var grid = new Array(gridSize);
  for(var i=0;i<gridSize;i++) grid[i]=new Array(gridSize);

  for(var x=0;x<gridSize;x++){
    for(var y=0;y<gridSize;y++){
      grid[x][y] = g.getImageData(0, 0, imageWidth/gridSize, imageHeight/gridSize);
      copyPixels(imageData,grid[x][y],x * grid[x][y].width, y * grid[x][y].height, grid[x][y].width, grid[x][y].height,
        imageWidth, imageHeight);
    }
  }
  
  var pieces = new Array(gridSize);
  for(var i=0;i<gridSize;i++) pieces[i]=new Array(gridSize);
  for(var x=0;x<gridSize;x++){
    for(var y=0;y<gridSize;y++){
      var p = {};
      pieces[x][y] = p;
      p.imageData = grid[x][y];
      p.size = {x: grid[x][y].width, y: grid[x][y].height};
      p.pos = {x: (p.size.x+10)*x, y: (p.size.x+10)*y};
    }
  }
  
  //move piece 1,1 out of grid formation
  pieces[1][1].pos = {x: 300,y: 300};
  
  g.fillStyle = '#fff';
  g.fillRect(0,0,canvas.width,canvas.height);
  
  for(var x=0;x<gridSize;x++){
    for(var y=0;y<gridSize;y++){
      g.putImageData(pieces[x][y].imageData, pieces[x][y].pos.x, pieces[x][y].pos.y);
    }
  }
   
  //console.log(imageData.data);
})();