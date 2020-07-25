const fs = require("fs");
const path = require("path");
var f5stego = require("f5stegojs");

it("stego sanity", () => {
  const image = fs.readFileSync(path.resolve(__dirname, "./image.jpg"));
  const message = fs.readFileSync(path.resolve(__dirname, "./message.txt"));
  var stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var stegger = new f5stego(stegKey);
  var secretImage = stegger.embed(
    new Uint8Array(image),
    new Uint8Array(message)
  );
  var extractedMessage = stegger.extract(secretImage);
  expect(Buffer.from(extractedMessage)).toEqual(message);
});
