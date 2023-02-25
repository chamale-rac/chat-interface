import {
  detectedAStyle,
  detectedATitleStyle,
  detectedAImgStyle,
  detectedADescriptionStyle,
  detectedImgStyle,
} from "./style.js";

const multipleAppend = (fatherElement, elementsArray) => {
  elementsArray.forEach((element) => {
    if (element.value != null) {
      const elementToAppend = document.createElement(element.type);
      elementToAppend.style.cssText = element.style;
      elementToAppend.append(element.value);
      fatherElement.append(elementToAppend);
    }
  });
  return fatherElement;
};

const createA = (title, description, image, url) => {
  const a = document.createElement("a");
  a.style.cssText = detectedAStyle;
  a.href = url;
  var elementsArray = [
    { value: title, type: "h1", style: detectedATitleStyle },
    { value: image, type: "img", style: detectedAImgStyle },
    { value: description, type: "p", style: detectedADescriptionStyle },
  ];
  return multipleAppend(a, elementsArray);
};

const createImg = (url) => {
  img = document.createElement("img");
  img.style.cssText = detectedImgStyle;
  img.src = url;
  return img;
};

export { createA, createImg };
