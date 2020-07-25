// const fs = require("fs");
// const path = require("path");
// var f5stego = require("f5stegojs");

// // const { createCanvas } = require("canvas");
// const message = fs.readFileSync(path.resolve(__dirname, "./message.txt"));
// var stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// var stegger = new f5stego(stegKey);

// // it("stego write", () => {
// //   const image = fs.readFileSync(path.resolve(__dirname, "./download.jpg"));
// //   var secretImage = stegger.embed(
// //     new Uint8Array(image),
// //     new Uint8Array(message)
// //   );
// //   fs.writeFileSync(path.resolve(__dirname, "./secretImage.jpg"), secretImage);
// // });

// it("stego read", () => {
//   const secretImage = fs.readFileSync(
//     path.resolve(__dirname, "./download.jpeg")
//   );
//   var extractedMessage = stegger.extract(secretImage);
//   console.log(Buffer.from(extractedMessage).toString());
//   // expect().toEqual(message);
// });

// // it("decode from app", async () => {
// //   const png = fs.readFileSync(path.resolve(__dirname, "./download.png"));
// //   const jpg = await pngToJpeg({ quality: 100 })(png);
// //   fs.writeFileSync(path.resolve(__dirname, "./download.jpg"), jpg);
// // });

// // it("stego sanity", () => {
// //   const image = fs.readFileSync(path.resolve(__dirname, "./download.jpg"));
// //   var stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// //   var stegger = new f5stego(stegKey);
// //   var extractedMessage = stegger.extract(image);
// //   console.log(Buffer.from(extractedMessage).toString());
// // });
