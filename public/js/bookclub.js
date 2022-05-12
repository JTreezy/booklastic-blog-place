var socket = io();

var messages = document.getElementById('messages');
var chatApp = document.getElementById('chatApp');
var sentMessage = document.getElementById('sentMessage');
var sendit = document.getElementById('sendit');
var chatMessage = document.getElementById('chat-message');

var senderID;
var senderName;

var currentUser = document.getElementById('name').getAttribute('data-value');
console.log(currentUser)

sendit.addEventListener('click', function(e) {
  e.preventDefault();
  if (sentMessage.value) {
    socket.emit('chat message', {sentMessage:sentMessage.value, userName:currentUser, time: moment().format('HH:mm:ss') });
    sentMessage.value = '';
  }
});

//socket id, giving them a value of the session.first_name
socket.on('chat message', function(msg) {
  console.log(msg)
  myMessage(msg.msg)
  window.scrollTo(0, document.body.scrollHeight);
});

function myMessage(msg) {
  const chatBubble = document.createElement('div')
  chatBubble.setAttribute('class', 'card w-100')
  chatBubble.setAttribute('id', 'chat-message')

  const cardHeader = document.createElement('div')
  cardHeader.setAttribute('class', 'card-header d-flex justify-content-between p-3')
  cardHeader.setAttribute('style', 'background: #99C3AA;')
  chatBubble.appendChild(cardHeader)
  
  const firstName = document.createElement('p')
  firstName.setAttribute('class', 'fw-bold mb-0')
  firstName.textContent = msg.userName
  cardHeader.appendChild(firstName)

  const time = document.createElement('p')
  time.setAttribute('class', 'fw-bold mb-0')
  time.textContent = msg.time
  cardHeader.appendChild(time)

  const chatBody = document.createElement('div')
  chatBody.setAttribute('class', 'card-body')
  chatBubble.appendChild(chatBody)

  const chatBodyText = document.createElement('p')
  chatBodyText.setAttribute('class', 'mb-0')
  chatBodyText.textContent = msg.sentMessage
  chatBody.appendChild(chatBodyText)

  const imageContainer = document.createElement('div')
  imageContainer.setAttribute('class', 'style', 'display: flex; justify-content: end;')
  const imageIcon = document.createElement('img')
  imageIcon.setAttribute('src', '/images/onebook.png')
  imageIcon.setAttribute('width', '60')
  imageIcon.setAttribute('alt', 'avatar')
  imageIcon.setAttribute('class', 'rounded-circle d-flex align-self-start ms-3 shadow-1-strong p-1')
  imageContainer.appendChild(imageIcon)

  const chatBubbleContainer = document.createElement('div')
  chatBubbleContainer.setAttribute('class', 'chatBubbleContainer')
  chatBubbleContainer.appendChild(imageContainer)
  chatBubbleContainer.appendChild(chatBubble)

  const chatBubbleSpace = document.createElement('li')
  chatBubbleSpace.setAttribute('class', 'd-flex justify-content-end mb-4')
  chatBubbleSpace.appendChild(chatBubbleContainer)

  chatMessage.appendChild(chatBubbleSpace)
}