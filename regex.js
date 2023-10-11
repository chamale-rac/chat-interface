const isUrl = (string) => {
  const urlRegex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return string.match(urlRegex) != null;
};

const isImage = (string) => {
  const imageRegex = /(\.(jpeg|jpg|gif|png)$)/;
  return string.match(imageRegex) != null;
};

const isUri = (string) => {
  const uriRegex = /(data:image).+/;
  return string.match(uriRegex) != null;
};

const createImg = (imageUrl) => {
  const img = document.createElement("img");
  img.src = imageUrl;
  img.style.cssText = `
    max-width: 100%; 
    max-height: 100%;`;
  return img;
};

const createIframe = (url) => {
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.cssText = `
    max-width: 100%; 
    max-height: 100%;`;
  return iframe;
};

const detectUrlAndImage = (paragraph) => {
  const textSplitted = paragraph.split(" ");
  return textSplitted.map((string) => {
    console.log(string);
    if (isUrl(string) && isImage(string)) {
      return createImg(string);
    } else if (isUrl(string)) {
      return createIframe(string);
    } else if (isUri(string)) {
      return createImg(string);
    } else if (string.trim() == "<br>") {
      return document.createElement("br");
    } else {
      return string + " ";
    }
  });
};

export { detectUrlAndImage };
