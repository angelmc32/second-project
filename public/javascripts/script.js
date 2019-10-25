document.addEventListener('DOMContentLoaded', () => {

  const socket = io();
  const sockets = io();

  let messageButton = document.getElementById('messager');
  let commentContent = document.getElementById('content');
  let newComment = {};
  let messagesContainer = document.getElementById('new-messages');

  document.getElementById('messager').addEventListener("click", function(e) {
    
    console.log('Event triggered')
    
    if( !content ) return;

    if ( e.target.dataset.role === 'Doctor' ){
      let content = commentContent.value;
      newComment = {
        consultation_id: e.target.dataset.consultation,
        provider_id: e.target.dataset.user,
        creator_role: e.target.dataset.role,
        content: content
      }
    } else {
      let content = commentContent.value;
      newComment = {
        consultation_id: e.target.dataset.consultation,
        patient_id: e.target.dataset.user,
        creator_role: e.target.dataset.role,
        content: content
      }
    }

    sockets.emit('newComment', newComment);

    return false;
    
  });
    
  socket.on('addComment', function(comment) {
    console.log('adding comment to html was called');
    let pElement = document.createElement('p')
    pElement.innerHTML = `${comment.creator_role} comenta: ${comment.content}`;
    messagesContainer.appendChild(pElement)
  });
  
}, false);