document.addEventListener('DOMContentLoaded', () => {

  const socket = io();

  let messageButton = document.getElementById('messager');
  let commentContent = document.getElementById('content');
  let content = commentContent.value;
  let newComment = {};
  let messagesContainer = document.getElementById('messages-container');

  console.log(messageButton.innerText)
    
  document.getElementById('messager').addEventListener("click", e => {

    if( !content ) return;

    if ( e.target.dataset.role === 'Doctor' ){
      newComment = {
        consultation_id: e.target.dataset.consultation,
        provider_id: e.target.dataset.user,
        creator_role: e.target.dataset.role,
        content: content
      }
    } else {
      newComment = {
        consultation_id: e.target.dataset.consultation,
        patient_id: e.target.dataset.user,
        creator_role: e.target.dataset.role,
        content: content
      }
    }

    socket.emit('newComment', newComment)
  });
    
  socket.on('newComment', function(comment) {
    let pElement = document.createElement('p')
    pElement.innerHTML = `${comment.creator_role} ${comment.provider_id ? comment.provider_id : comment.patient_id } comenta: ${comment.content}`;
    messagesContainer.appendChild(pElement)
  });
}, true);