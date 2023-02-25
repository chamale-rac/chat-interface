import { getMessages, postMessage } from "./message.js";
import { messagesContainerStyle } from "./style.js";

const messagesContainer = document.createElement("ul");
messagesContainer.style.cssText = messagesContainerStyle;

const input = document.createElement("input");
input.required = true;
input.maxLength = 140;
input.placeholder = "Your message...";

const submit = document.createElement("input");
submit.type = "submit";
submit.value = "SEND";

const form = document.createElement("form");
form.append(input);
form.append(submit);

const sendRefresh = () => {
  const savedScrollTop = messagesContainer.scrollTop;
  input.value = "";
  getMessages(messagesContainer, savedScrollTop);
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await postMessage(input.value);
  sendRefresh();
});

const autoRefresh = () => {
  console.log("autoRefresh");
  const savedScrollTop = messagesContainer.scrollTop;
  getMessages(messagesContainer, savedScrollTop);
  setTimeout(autoRefresh, 60000);
};

const init = async () => {
  await getMessages(messagesContainer, null);
  autoRefresh();
};

init();
document.body.append(messagesContainer);
document.body.append(form);
