import { baseUrl } from "./http.js";
import { detectUrlAndImage } from "./detect.js";
import {
  liMessageStyle,
  summaryMessageStyle,
  detailsMessageStyle,
  spanMessageStyle,
} from "./style.js";

const createSingleMessage = (text, user, created_on) => {
  const li = document.createElement("li");
  li.style.cssText = liMessageStyle;

  const span = document.createElement("span");
  li.style.cssText = spanMessageStyle;

  const details = document.createElement("details");
  details.style.cssText = detailsMessageStyle;

  const summary = document.createElement("summary");
  summary.style.cssText = summaryMessageStyle;

  const formattedText = detectUrlAndImage(text);
  formattedText.forEach((item) => summary.append(item));

  details.append(summary);
  details.append(created_on);

  span.append(`${user}:`);

  li.appendChild(span);
  li.append(details);

  return li;
};

const getMessages = async (messagesContainer, savedScrollTop) => {
  const messagesResponseLength = messagesContainer.children.length;
  const response = await fetch(baseUrl + "/messages");
  const messages = await response.json();

  const newMessagesList = messages.slice(messagesResponseLength);

  newMessagesList.forEach((message) => {
    const newMessage = createSingleMessage(
      message.text,
      message.user,
      message.created_on
    );
    messagesContainer.append(newMessage);
  });

  switch (savedScrollTop) {
    case null:
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      break;
    default:
      messagesContainer.scrollTop = savedScrollTop;
      break;
  }

  return messagesContainer;
};

const postMessage = async (text) => {
  const body = {
    text,
    user: "SuperCorrelatedHypedRobot",
  };
  const response = await fetch(baseUrl + "/messages", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export { getMessages, postMessage };
