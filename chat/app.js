import { getMessages, refreshMessages } from "./getMessages.js";
import { baseUrl } from "./constants.js";

//TODO body customizations
const style = document.createElement("style");

style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Turret+Road&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');

    *,
    *::before,
    *::after {
    box-sizing: border-box;
    }
    
    div::-webkit-scrollbar,
    textarea::-webkit-scrollbar,
    ul::-webkit-scrollbar {
        width: 15px;
    }


    div::-webkit-scrollbar-track,
    textarea::-webkit-scrollbar-track,
    ul::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 0px #0e0c1d;
    }
    
    div::-webkit-scrollbar-thumb, 
    textarea::-webkit-scrollbar-thumb,
    ul::-webkit-scrollbar-thumb {
        background-color: #16122b;
        border-radius: 1%;
    }
    
    li:hover {
        box-shadow:  0px 0px 10px 1px #3a3172;
    }

    textarea::placeholder, textarea {        
        font-family: 'Inconsolata', monospace;
        font-size: 18px;
    }

    input::placeholder {        
        font-family: 'Inconsolata', monospace;
        font-size: 18px;
    }

    textarea:focus, input:focus {
        outline: none !important;
    }

    .flip::placeholder {
      text-align: left;
      transform: rotate(180deg);
    }

`;
document.head.appendChild(style);

document.body.style.cssText = `
    background-color: #0e0c1d;
    margin: 0;
`;

//TODO add titleContainerStyle
const titleContainer = document.createElement("div");
//titleContainer.append("Conversea");
titleContainer.style.cssText = `
    line-height: 1.4;
    height: 6%;
    color: white;
    font-family: 'Turret Road', cursive;
    font-size: 40px;
    margin: 0;
    padding: 0px 8px;
    text-align: center;
    text-justify: center;
    opacity: 0.8;
    overflow-x: auto;
    scroll-behavior: smooth;
`;

//TODO add messagesContainerStyle
//TODO decide scroll-behavior
const messagesContainer = document.createElement("ul");
messagesContainer.style.cssText = `
    color: #fff;
    list-style: none;
    padding: 10px 40px; 
    width: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 78%;
    margin: 0;
    overflow-wrap: break-word;
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;

    display: flex;
    flex-direction: column;
`;

//TODO add inputStyle
const inputMessage = document.createElement("textarea");
inputMessage.required = true;
inputMessage.maxLength = 140;
inputMessage.placeholder = "Your message... (140 characters max)";
inputMessage.style.cssText = `
    padding: 10px 20px;
    color: white;
    flex-grow: 1;
    background-color: #16122b;
    border: 0px solid transparent;

    resize: none;
`;

//TODO add submitStyle
const submitMessage = document.createElement("input");
submitMessage.type = "submit";
submitMessage.value = "➤";
submitMessage.style.cssText = `
    height: 50%;
    width: fit-content;
    background-color: transparent;    
    border:0 none;
    color: #714daf;
    font-size: 35px;   
    cursor: pointer;
    padding-right: 10px;
    align-self: flex-end;
`;

const inputMyUser = document.createElement("input");
inputMyUser.maxLength = 140;
inputMyUser.placeholder = "YOUR USER";
inputMyUser.style.cssText = `
    height: 50%;
    padding: 10px 20px;
    color: white;
    flex-grow: 1;
    background-color: #16122b;
    border: 0px solid transparent;
    text-align: right;
    resize: none;    
    font-family: 'Inconsolata', monospace;
    font-size: 18px;
`;

const verticalDiv = document.createElement("div");
verticalDiv.style.cssText = `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

//TODO add formStyle
const messageForm = document.createElement("form");
messageForm.append(inputMessage);
verticalDiv.append(submitMessage);
verticalDiv.append(inputMyUser);
messageForm.append(verticalDiv);
messageForm.style.cssText = ` 
    height: 10%;
    box-sizing: border-box;
    width: 100%;
    margin:0;
    background-color: #16122b;

    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    border-top: 1px solid #3a31724d;
`;

//TODO add inputStyle
const inputUser = document.createElement("input");
inputUser.required = true;
inputUser.maxLength = 140;
inputUser.placeholder = "Who are there? lol... (type an username)";
inputUser.style.cssText = `
    padding: 10px 20px;
    color: white;
    flex-grow: 1;
    background-color: #16122b;
    border: 0px solid transparent;
    resize: none;    
    font-family: 'Inconsolata', monospace;
    font-size: 18px;
`;

//TODO add submitStyle
const submitUser = document.createElement("input");
submitUser.type = "submit";
submitUser.value = "🔎︎";
submitUser.style.cssText = `
    height: 90%;
    width: fit-content;
    background-color: transparent;    
    border:0 none;
    color: #714daf;
    font-size: 30px;   
    cursor: pointer;
    padding-right: 14px;
`;

//TODO add formStyle
const userForm = document.createElement("form");
userForm.append(inputUser);
userForm.append(submitUser);
userForm.style.cssText = ` 
    height: 6%;
    box-sizing: border-box;
    width: 100%;
    margin:0;
    background-color: #16122b;

    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    border-top: 1px solid #3a31724d;
    border-bottom: 1px solid #3a31724d;
`;

const rightChild = (name) => {
  let found = false;
  for (const child of messagesContainer.children) {
    if (child.getAttribute("name").toLowerCase() == name.toLowerCase()) {
      child.style.alignSelf = "flex-end";
      found = true;
    } else {
      child.style.alignSelf = "flex-start";
    }
  }
  inputUser.value = "";
  console.log(found);
  if (found == false) {
    inputUser.placeholder = "User not found :(";
  } else if (found == true) {
    inputUser.placeholder = "Found!";
  }

  setTimeout(function () {
    inputUser.placeholder = "Who are there? lol... (type an username)";
  }, 5000);
};

const postMessage = async (text, user) => {
  const haveUser = (user) => {
    if (user == "") {
      return "Anonymouse";
    } else {
      return user;
    }
  };
  const body = {
    text,
    user: haveUser(user),
  };
  const response = await fetch(baseUrl + "/messages", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response;
};

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  rightChild(inputUser.value);
});

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await postMessage(inputMessage.value, inputMyUser.value);
  inputMessage.value = "";
  getMessages(messagesContainer);
});

const init = async (messageContainer) => {
  await getMessages(messageContainer);
};

init(messagesContainer);

document.body.append(titleContainer);
document.body.append(userForm);
document.body.append(messagesContainer);
document.body.append(messageForm);

const autoRefresh = setInterval(function () {
  console.log("auto refresh");
  refreshMessages(messagesContainer);
}, 5000);

const autoScrollDown = setInterval(function () {
  console.log("auto scroll down");
  titleContainer.scrollTop = titleContainer.scrollHeight;
}, 1000);

const permanentTypingAnimation = (titleContainer, num) => {
  const min = 50;
  const max = 300;

  const titlesArray = [
    "Chatster (just an idea)",
    "Chatbox!",
    "Chatify? :(",
    "Chatly (too generic)",
    "Chatzen...",
    "BabelChat ",
    "Chatnik (I'm not good with names...)",
    "Blabber (already taken T-T)",
    "Conversea (tooooo long)",
    "Talkbox",
    "Chat + Wave = Chatwave",
    "Chatty McChatface?",
    "Disclaimer: so you know, this is not a real chat app, it's just a test.",
  ];

  const title = titlesArray[num];
  let index = 0;
  let index_inverse = 1;
  const interval = setInterval(() => {
    if (index < title.length) {
      titleContainer.append(title[index]);
      index++;
    } else {
      if (index_inverse < title.length) {
        titleContainer.innerHTML = title.slice(0, -index_inverse);
        index_inverse++;
      } else {
        clearInterval(interval);
        if (num < 12) {
          permanentTypingAnimation(titleContainer, num + 1);
        } else {
          permanentTypingAnimation(titleContainer, 0);
        }
        titleContainer.innerHTML = "";
      }
    }
  }, Math.random() * (max - min) + min);
};
setTimeout(function () {
  permanentTypingAnimation(titleContainer, 11);
}, 1000);
autoScrollDown;
autoRefresh;
