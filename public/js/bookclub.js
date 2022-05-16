var socket = io();

var messages = document.getElementById('messages');
var chatApp = document.getElementById('chatApp');
var sentMessage = document.getElementById('sentMessage');
var chatMessage = document.getElementById('chat-message');

var senderID;
var senderName;

var currentUser = document.getElementById('name').getAttribute('data-value');
console.log(currentUser)

window.addEventListener('beforeunload', function() {
  socket.emit('disconnect')
})

//takes the message written in the form input inside bookclub.handlebars to send through socket.io
chatApp.addEventListener('submit', function(e) {
  e.preventDefault();
  if (sentMessage.value) {
    socket.emit('chat message', {sentMessage:sentMessage.value, userName:currentUser, time: moment().format('h:mm:ss a') });
    sentMessage.value = '';
  }
});

//interacts with server.js and calls myMessage function
socket.on('chat message', function(msg) {
  console.log(msg)
  myMessage(msg.msg)
  window.scrollTo(0, document.body.scrollHeight);
});

//constructs the message in a container and stylize it by creating html tags.
function myMessage(msg) {
  //create initial container for the message
  const chatBubble = document.createElement('div')
  chatBubble.setAttribute('class', 'card w-100')
  chatBubble.setAttribute('id', 'chat-message')

  //create and stylize the card header
  const cardHeader = document.createElement('div')
  cardHeader.setAttribute('class', 'card-header d-flex justify-content-between p-3')
  cardHeader.setAttribute('style', 'background: #99C3AA;')
  chatBubble.appendChild(cardHeader)
  
  //retrieve the first name from the session and append it to card header
  const firstName = document.createElement('p')
  firstName.setAttribute('class', 'fw-bold mb-0')
  firstName.textContent = msg.userName
  cardHeader.appendChild(firstName)

  //display current time of the message created to the card header
  const time = document.createElement('p')
  time.setAttribute('class', 'fw-bold mb-0')
  time.textContent = msg.time
  cardHeader.appendChild(time)

  //create the container body for the message
  const chatBody = document.createElement('div')
  chatBody.setAttribute('class', 'card-body')
  chatBody.setAttribute('style', 'overflow-y: scroll')
  chatBubble.appendChild(chatBody)

  //retrieve the message input to the container body
  const chatBodyText = document.createElement('p')
  chatBodyText.setAttribute('class', 'mb-0')
  chatBodyText.textContent = msg.sentMessage
  chatBody.appendChild(chatBodyText)

  //attach an image to every message container
  const imageContainer = document.createElement('div')
  imageContainer.setAttribute('class', 'style', 'display: flex; justify-content: end;')
  const imageIcon = document.createElement('img')
  imageIcon.setAttribute('src', '/images/onebook.png')
  imageIcon.setAttribute('width', '60')
  imageIcon.setAttribute('alt', 'avatar')
  imageIcon.setAttribute('class', 'rounded-circle d-flex align-self-start ms-3 shadow-1-strong p-1')
  imageContainer.appendChild(imageIcon)

  //stylize the container to make every message uniform in dimensions
  const chatBubbleContainer = document.createElement('div')
  chatBubbleContainer.setAttribute('style', 'width: 95%; height: auto;')
  chatBubbleContainer.appendChild(imageContainer)
  chatBubbleContainer.appendChild(chatBubble)

  //make each message container a list to append to unordered list
  const chatBubbleSpace = document.createElement('li')
  chatBubbleSpace.setAttribute('class', 'd-flex justify-content-center mb-4')
  chatBubbleSpace.appendChild(chatBubbleContainer)

  chatMessage.appendChild(chatBubbleSpace)
}