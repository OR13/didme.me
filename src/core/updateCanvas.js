export const updateCanvas = (file, text) => {
  const reader = new FileReader();
  reader.onload = async (e2) => {
    var canvas = document.getElementById("meme-canvas");
    var ctx = canvas.getContext("2d");

    var myImg = new Image();
    myImg.onload = function () {
      canvas.width = myImg.width * window.devicePixelRatio;
      canvas.height = myImg.height * window.devicePixelRatio;

      const lineHeightPx = 64;

      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.textAlign = "center";
      ctx.font = `${64}px Impact`;
      ctx.lineWidth = 2;
      function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(" ");
        var line = "";

        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + " ";
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            context.strokeText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
          } else {
            line = testLine;
          }
        }

        context.fillText(line, x, y);
        context.strokeText(line, x, y);
      }

      ctx.drawImage(
        myImg,
        0,
        0,
        myImg.width * window.devicePixelRatio,
        myImg.height * window.devicePixelRatio, // source rectangle
        0,
        0,
        canvas.width * window.devicePixelRatio,
        canvas.height * window.devicePixelRatio
      );

      wrapText(
        ctx,
        text.toUpperCase(),
        canvas.width / 2,
        canvas.height / 1.2,
        canvas.width,
        lineHeightPx
      );
    };

    var blob = new Blob([e2.target.result], { type: "image/jpeg" });
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);
    myImg.src = imageUrl;
  };

  reader.readAsArrayBuffer(file);
};
