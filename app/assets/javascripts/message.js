$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
       ` <div class="Main-chat__message-list__message-info">
          <div class="Main-chat__message-list__message-info__name">
          ${message.user_name}
          </div>
          <div class="Main-chat__message-list__message-info__daytime">
          ${message.created_at}
          </div>
        </div>
        <div class="Main-chat__message-list__message-text">
          <p class="Message__content">
          ${message.content}
          </p>
          <img class="Message__image" src="${message.image}"></img>
        </div>`
      return html
    } else {
      let html = 
        `<div class="Main-chat__message-list__message-info">
          <div class="Main-chat__message-list__message-info__name">
          ${message.user_name}
          </div>
          <div class="Main-chat__message-list__message-info__daytime">
          ${message.created_at}
          </div>
        </div>
        <div class="Main-chat__message-list__message-text">
          <p class="Message__content">
          ${message.content}
          </p>
        </div>`
      return html
    }   
  }
  $(".new-message").on('submit', function(e){
    e.preventDefault()
    let url = $(this).attr('action');
    let formData = new FormData(this);
    console.log(this);
    $.ajax({
      url: url,
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Main-chat__message-list').append(html).animate({ scrollTop: $('.Main-chat__message-list')[0].scrollHeight});
      $('Form')[0].reset();
      $('.Form__submit').prop('disabled', false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});