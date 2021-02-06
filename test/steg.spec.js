const fs = require("fs");
const path = require("path");
var f5stego = require("f5stegojs");

const message = fs.readFileSync(path.resolve(__dirname, "./message.txt"));
var stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var stegger = new f5stego(stegKey);

it("stego write", () => {
  const image = fs.readFileSync(path.resolve(__dirname, "./download.jpeg"));
  var secretImage = stegger.embed(
    new Uint8Array(image),
    new Uint8Array(message)
  );
  fs.writeFileSync(path.resolve(__dirname, "./secretImage.jpeg"), secretImage);
});

it("stego read", () => {
  const secretImage = fs.readFileSync(
    path.resolve(__dirname, "./secretImage.jpeg")
  );
  var extractedMessage = stegger.extract(secretImage);
  expect(Buffer.from(extractedMessage).toString()).toEqual(message.toString());
});
