var http = require('http')
var Discordie = require("discordie");
var client = new Discordie();

http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
}).listen(process.env.PORT);

setInterval(function () {
    http.get("http://protected-oasis-47786.herokuapp.com");
}, 60000);

client.connect({
  // replace this sample token
  // token: "MjQxOTU2ODE2MjY5ODY5MDYw.CvZoJg.jD6EDX9hlQohb24cp-7NHNGsGv4"
  token: "MjQwOTA3OTU0NTI0NjUxNTI4.CvKQJw.fQ5xpXponFT9khlLsloPX-Sy_8U"
});

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on("MESSAGE_CREATE", e => {
  if (e.message.content == "!ping")
    e.message.channel.sendMessage("pong");
  // =====================================================
  if (e.message.content == "!bn")
    e.message.channel.sendMessage("Boa noite, anon-kun");
// =====================================================
  if (e.message.content == "!verdade")
      e.message.reply("Kaede best loli");
  // =====================================================
  if (e.message.content == "!cute")
      e.message.channel.sendMessage("https://aww.moe/fy95x9.gif");
  // =====================================================
  if (e.message.content == "Sofia")
      e.message.delete();
  // =====================================================
  if (e.message.content == ":3")
      e.message.reply(":3");
  // =====================================================
  if (e.message.content == "!cookie")
      e.message.reply(" ganhou um cookie de chocolate");
  // =====================================================
  if (e.message.content == "!comandos")
      e.message.reply("cookie, roll, ping, bn, verdade, cute");
  // =====================================================
  if (e.message.content == "!roll"){
      e.message.channel.sendMessage("**##### Hora de checar! #####**");
      var numero1 = Math.floor((Math.random() * 10) + 1)
      var numero2 = Math.floor((Math.random() * 10) + 1)
      var numero3 = Math.floor((Math.random() * 10) + 1)
      e.message.channel.sendMessage("Seus numeros foram: "+ numero1 +" - "+ numero2 +" - "+ numero3);
      if (numero1 == numero2 || numero2 == numero3 || numero1 == numero3) {
      e.message.channel.sendMessage("##### Duplos, Parábens! #####")
      e.message.reply(" ganhou: 45 lolis")
      }
      else {
      e.message.reply("##### Não foi dessa vez, tente de novo! #####")
      }
      if (numero1 == numero2 && numero2 == numero3 ) {
      e.message.channel.sendMessage("##### GET #####")
      e.message.reply(" ganhou: 100 lolis")
      }
    }
});
