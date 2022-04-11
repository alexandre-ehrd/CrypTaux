const img = document.getElementById("bitcoin");

img.onload = function(){
   const imgWidth = this.width;
   const imgHeight = this.height;
   
   var r = 0;
   var g = 0;
   var b = 0;
   
   for (var x = 0; x < imgWidth; x++) {
      for (var y = 0; y < imgHeight; y++) {
         var index = (x + y * imgWidth) * 4;
         r += img.data[index + 0];
         g += img.data[index + 1];
         b += img.data[index + 2];
      }
   }
   console.log(r, g, b);
}
