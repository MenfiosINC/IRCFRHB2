setName('auto_rejoin');
setDescription('auto rejoin channels');

send('hook_command', 'auto_rejoin');
//send('hook_server', 'command');
send('hook_message', 'kick');

var auto_rejoin= true;

this.onMessage = function(e) {
    console.log(e);
    propagate(e);
    if(e.type == 'command' && e.name == 'auto_rejoin'){
        auto_rejoin = !auto_rejoin;
        send(e.context, 'message', 'notice', "Auto rejoin: " + (auto_rejoin?"on":"off"));
    } else if(e.type == 'message' && e.name == 'kick'){
        if(auto_rejoin){
            send(e.context, 'command', 'join', e.context.channel);
        }
    }
    return;
};
