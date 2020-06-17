var fgimage;
var bgimage;
var bg="false";
function doColor() {
  var can = document.getElementById("div3");
  var colorInput = document.getElementById("clr");
  var c=colorInput.value;
  can.style.backgroundColor=c;
}
function doSquare(){
  var can = document.getElementById("div3");
  var sizeInput = document.getElementById("sld");
  var size=sizeInput.value;
  var smallSquare=can.getContext("2d");
  smallSquare.clearRect(0,0,can.width,can.height);
  smallSquare.fillStyle="purple";
  smallSquare.fillRect(10,10,size,size);
}

function upload(id,cc){
  var can = document.getElementById(cc);
  var file = document.getElementById(id);
  if(cc==="div1"){
  fgimage =new SimpleImage(file);
  fgimage.drawTo(can);
  }
  else {
     var bgDiv = document.getElementById("bg");
  bgDiv.classList.remove("hidden");
  bgimage =new SimpleImage(file);
  bgimage.drawTo(can);  
  }
}

function makeGrayScale(){
  if(check()){
  var can = document.getElementById("div3");
  for (var pixel of fgimage.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  fgimage.drawTo(can);
  }
}

function merge(){
  bg="true";
  if(check()){
  var output =new SimpleImage(fgimage.getWidth(),fgimage.getHeight());
  var can = document.getElementById("div3");
  for (var pixel of fgimage.values()){
    var x=pixel.getX();
    var y=pixel.getY();
    if(pixel.getGreen()>240){
      var bgPixel=bgimage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else{
      output.setPixel(x,y,pixel);
    }
  }
  output.drawTo(can);
  }

}
  function clearCanvas() {
  doClear(document.getElementById("div1"));
  doClear(document.getElementById("div2"));
    doClear(document.getElementById("div3"));
     var bgDiv = document.getElementById("bg");
  bgDiv.classList.add("hidden");
    bg="false";
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

function check(){
  var c=1;
  if (fgimage == null  || ! fgimage.complete()) {
    c=0
    alert("Foreground image not loaded");
  }
  if ((bgimage == null || ! bgimage.complete())&&bg==
"true") {
    alert("Background image not loaded");
    c=0;
  }
  return c;
}

function red(){
  if(check()){
  var can = document.getElementById("div3");
  for (var pixel of fgimage.values()){
    pixel.setRed(255);
  }
  fgimage.drawTo(can);
  }
}
function rainbow(){
  if(check()){
  var can = document.getElementById("div3");
  var w=fgimage.getWidth();
  for (var pixel of fgimage.values()){
    var x=pixel.getX();
     var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if(avg<128){
      if(x<w/7){
    pixel.setRed(2*avg);
      pixel.setBlue(0);
    pixel.setGreen(0)
    }
    else if(x>w/7&&x<2*w/7){
       pixel.setRed(2*avg);
       pixel.setGreen(0.8*avg)
       pixel.setBlue(0);
    }
    else if(x>2*w/7&&x<3*w/7){
       pixel.setRed(2*avg);
       pixel.setGreen(2*avg)
       pixel.setBlue(0);
    }
    else if(x>3*w/7&&x<4*w/7){
       pixel.setRed(0);
       pixel.setGreen(2*avg)
       pixel.setBlue(0);
    }
    else if(x>4*w/7&&x<5*w/7){
       pixel.setRed(0);
       pixel.setGreen(0)
       pixel.setBlue(2*avg);
    }
     else if(x>5*w/7&&x<6*w/7){
      pixel.setRed(0.8*avg);
       pixel.setGreen(0)
       pixel.setBlue(2*avg);
    }
     else if(x>6*w/7&&x<w){
      pixel.setRed(1.6*avg);
       pixel.setGreen(0)
       pixel.setBlue(1.6*avg);
    }
    }
    else{
  if(x<w/7){
   pixel.setRed(255);
      pixel.setBlue(2*avg-255);
    pixel.setGreen(2*avg-255)
    }
    else if(x>w/7&&x<2*w/7){
      pixel.setRed(255);
       pixel.setGreen(1.2*avg-51)
       pixel.setBlue(2*avg-255);
    }
    else if(x>2*w/7&&x<3*w/7){
     pixel.setRed(255);
       pixel.setGreen(255)
       pixel.setBlue(2*avg-255);
    }
    else if(x>3*w/7&&x<4*w/7){
      pixel.setRed(2*avg-255);
       pixel.setGreen(255)
       pixel.setBlue(2*avg-255);
    }
    else if(x>4*w/7&&x<5*w/7){
      pixel.setRed(2*avg-255);
       pixel.setGreen(2*avg-255);
       pixel.setBlue(255);
    }
     else if(x>5*w/7&&x<6*w/7){
      pixel.setRed(1.2*avg-51);
       pixel.setGreen(2*avg-255)
       pixel.setBlue(255);
    }
     else if(x>6*w/7&&x<w){
      pixel.setRed(0.4*avg+153);
       pixel.setGreen(2*avg-255)
       pixel.setBlue(0.4*avg+153);
    }
    }
  }
  fgimage.drawTo(can);
  }
}

function win(){
 if(check()){
  var can = document.getElementById("div3");
  var w=fgimage.getWidth();
   var h=fgimage.getHeight();
  var thickness=20;
  for (var pixel of fgimage.values()){
    var x=pixel.getX();
    var y=pixel.getY();
    if(x<thickness||y<thickness||x>=w-thickness||y>=h-thickness||(x>=(w-thickness)/2&&x<=(w+thickness)/2)||(y>=(h-thickness)/2&&y<=(h+thickness)/2)){
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
  }
   fgimage.drawTo(can);
 }
}

function pixelate(){
 
  if(check()){
   var output =new SimpleImage(fgimage.getWidth(),fgimage.getHeight());
  var can = document.getElementById("div3");
  for (var pixel of fgimage.values()){
   var r= Math.random();
    var x=pixel.getX();
    var y=pixel.getY();
    if(r>0.5&&(x-5>0&&y-3>0)){
      var bgPixel=fgimage.getPixel(x-5,y-3);
      output.setPixel(x,y,bgPixel);
    }
    else{
      output.setPixel(x,y,pixel);
    }
  }
  output.drawTo(can);
  }
}

function hide(){
  // bg="true"
  if(check()){
  var can = document.getElementById("div3");
  var fi=skipbits(fgimage);
  var bi=cutdata(bgimage);
   
    var output =new    SimpleImage(fi.getWidth(),fi.getHeight());
    
    
    for (var pixel of output.values()){
       var x=pixel.getX();
    var y=pixel.getY();
      var fgPixel=fi.getPixel(x,y);
   
      var bgPixel=bi.getPixel(x,y);
   
      pixel.setRed(fgPixel.getRed() + bgPixel.getRed());
      pixel.setGreen(fgPixel.getGreen() + bgPixel.getGreen());
      pixel.setBlue(fgPixel.getBlue() + bgPixel.getBlue());
  }
    output.drawTo(can);
  }
}

function getData(){
  if(check){
    var can = document.getElementById("div3");
  for (var pixel of fgimage.values()){
     var red=pixel.getRed();
     var green=pixel.getGreen();
     var blue=pixel.getBlue();
    pixel.setRed(Math.floor(red%4)*64);
      pixel.setBlue(Math.floor(blue%4)*64);
    pixel.setGreen(Math.floor(green%4)*64);    
  }
    fgimage.drawTo(can);
  }
}

function skipbits(image){
  for (var pixel of image.values()){
     var red=pixel.getRed();
     var green=pixel.getGreen();
     var blue=pixel.getBlue();
    pixel.setRed(Math.floor(red/4)*4);
      pixel.setBlue(Math.floor(blue/4)*4);
    pixel.setGreen(Math.floor(green/4)*4);    
  }
  return image;
}

function cutdata(image){
  for (var pixel of image.values()){
     var red=pixel.getRed();
     var green=pixel.getGreen();
     var blue=pixel.getBlue();
    pixel.setRed(Math.floor(red/64));
      pixel.setBlue(Math.floor(blue/64));
    pixel.setGreen(Math.floor(green/64));    
  }
  return image;
}