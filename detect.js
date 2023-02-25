import { createA, createImg } from "./detectedElements.js";

const metaElementExists = (http, regex) => {
  try {
    return http.responseText.match(regex)[1];
  } catch (e) {
    return null;
  }
};

const sitePreview = (url) => {
  const titleRegex = /<title>(.*?)<\/title>/;
  const descriptionRegex = /<meta.*?name="description".*?content="(.*?)".*?>/;
  const imageRegex = /<meta.*?property="og:image".*?content="(.*?)".*?>/;
  // TODO override with fetch
  const http = new XMLHttpRequest();
  http.open("GET", url, false);
  http.send();

  const title = metaElementExists(http, titleRegex);
  const description = metaElementExists(http, descriptionRegex);
  const image = metaElementExists(http, imageRegex);

  return [title, description, image];
};

const urlExists = (url) => {
  // TODO override with fetch
  const http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  return http.status != 404;
};

const detectUrlAndImage = (text) => {
  console.log("XXX");
  const textSplitted = text.split(" ");
  return textSplitted.map((word) => {
    console.log(word);
    const urlRegex =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))/;
    const imageRegex = /(\.(jpeg|jpg|gif|png)$)/;
    if (word.match(urlRegex) != null && word.match(imageRegex != null)) {
      const imageUrl = word;
      return createImg(imageUrl);
    } else if (word.match(urlRegex) != null && urlExists(word)) {
      const url = word;
      const [title, description, image] = sitePreview(url);
      return createA(title, description, image, url);
    } else if (word.trim() == "<br>") {
      return document.createElement("br");
    } else {
      return word + " ";
    }
  });
};

export { detectUrlAndImage };
