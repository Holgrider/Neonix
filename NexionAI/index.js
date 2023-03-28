const log = require("../manager/util.js").log;
const fetch = require("node-fetch");
const tf = require("@tensorflow/tfjs");
const MODEL_URL =
  "https://generousprofitableadmins.melon234.repl.co/tfjs/model.json";
const { Readable } = require("stream");
const PImage = require("pureimage");
const parseDataUrl = require("parse-data-url");
const pokes = require("../data/pokemons.json");
const { green } = require("colors");

class Nexion {
  constructor() {
    this.model = null;
  }
  async loadModel() {
    try {
      log(`Loading model... This may take a moment...`, `green`, true);
      let t1 = new Date();
      this.model = await tf.loadLayersModel(MODEL_URL);
      await this.model.summary();
      let t2 = new Date();
      let dif = `Loaded model in ${((t2 - t1) / 1000).toFixed(2)}s`;
      log(dif, `green`, true);
    } catch (error) {
      log(`An error occured while loading model!\n${error.stack}\n${error.stack}`, `red`, true);
    }
  }

  async inference(imageUrl) {
    try {
      let data;
      let buffer;
      let contentType;

      if (imageUrl.startsWith("data:image/")) {
        data = parseDataUrl(imageUrl);

        contentType = data.contentType;
        buffer = data.toBuffer();
      } else {
        data = await fetch(imageUrl);

        contentType = data.headers.get("Content-Type");
        buffer = await data.buffer();
      }

      const stream = bufferToStream(buffer);
      let imageBitmap;

      if (/png/.test(contentType)) {
        imageBitmap = await PImage.decodePNGFromStream(stream);
      }

      if (/jpe?g/.test(contentType)) {
        imageBitmap = await PImage.decodeJPEGFromStream(stream);
      }
      const predictions = await predict(imageBitmap, this.model);
      return predictions == `error` ? `Invalid` : predictions;
    } catch (error) {
      log(
        `An error occured while resolving Image Bitmap!\n ${error.stack}`,
        `red`,
        true
      );
      return `error`;
    }
    function bufferToStream(binary) {
      const readableInstanceStream = new Readable({
        read() {
          this.push(binary);
          this.push(null);
        },
      });
      return readableInstanceStream;
    }
    
    async function predict(img, model) {
      //ImageBitmap, model
      try {
        const tensor = tf.browser
          .fromPixels(img)
          .resizeNearestNeighbor([125, 200])
          .toFloat()
          .expandDims();
        let t1 = new Date();
  
        log(`Predicting Pokemon...`, `cyan`, true);
        const mean = tf.tensor([0.485, 0.456, 0.406]);
        const std = tf.tensor([0.229, 0.224, 0.225]);
        const normalized = tensor.div(tf.scalar(255)).sub(mean).div(std);
        const reshaped = normalized.reshape([-1, 125, 200, 3]);
  
        const prediction = await model.predict(reshaped).data();
  
        const classNames = pokes;
        const classIndex = tf.argMax(prediction).dataSync()[0];
        const className = classNames[classIndex];
        let t2 = new Date();
        let dif = `Predicted in ${((t2 - t1) / 1000).toFixed(2)}s`;
        log(dif, `blue`, true);
        // Display the prediction
        log(`Predicted Pokemon: ${className}`, `green`, true);
        return className;
      } catch (error) {
        log(`An error occured while resolving tensor!\n ${error.stack}`, `red`, true);
        return `error`;
      }
    }
  }
}

module.exports = { Nexion }