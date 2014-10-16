_satellite.pushAsyncScript(function(event, target, $variables){
  function registerSuccess(){
  try {
    var process = require('process');
    process.on('register.success', function(item){
      _satellite.setCookie('register_success','true');
      _satellite.notify('register success emitter',1);
    });
  }
  catch(e){}
}

if(typeof requre == 'undefined'){
  _satellite.domReady(function(){
    registerSuccess();
  });
}
else {
  registerSuccess();
}
});
