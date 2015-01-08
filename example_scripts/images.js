setName('images');
setDescription('displays a image when one is linked');

send('hook_message', 'privmsg');
this.onMessage = function(e) {
  propagate(e);
  var imageRegex = /(https?:\/\/)?\S*(jpeg|jpg|png|gif|bmp)(\?\S*)?/i;
  var message = e.args[1];
  var matches = message.match(imageRegex);
  if (matches) {
    send(e.context, 'command', 'image', matches[0]);
  }
};
