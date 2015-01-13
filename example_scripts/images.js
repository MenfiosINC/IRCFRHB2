setName('images');
setDescription('displays a image when one is linked');

send('hook_message', 'privmsg');
send('hook_command', 'toggleimages');

var showImages= true;

this.onMessage = function(e) {
  propagate(e);
  if (e.type == 'command' && e.name == 'toggleimages'){
    showImages = !showImages;
    return;
  }
  var imageRegex = /(https?:\/\/)?\S*(jpeg|jpg|png|gif|bmp)(\?\S*)?/i;
  var message = e.args[1];
  var matches = message.match(imageRegex);
  if (matches) {
    send(e.context, 'command', 'image', matches[0]);
  }
};
