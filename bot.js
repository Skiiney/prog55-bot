var http = require('http')
var Discordie = require("discordie");
var pg = require('pg');
var client = new Discordie();


var db = new pg.Client(process.env.DATABASE_URL);

// var db = new pg.Client({
//     user: "lumyglcinhestk",
//     password: "JHYY9CRLa1e37x37iG9gmqFUnV",
//     host: "ec2-54-243-208-3.compute-1.amazonaws.com",
//     port: 5432,
//     database: "d59j6tu10sr4r",
//     ssl: true
// });

//cria a tabela caso não exista
db.connect(function(err) {
    if (err) throw err;

    db.query("CREATE TABLE IF NOT EXISTS bank (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, loli INT NOT NULL)", function(err, result) {
        if (err) throw err;
    })
});

http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
}).listen(process.env.PORT);

setInterval(function () {
    http.get("http://prog55-bot.herokuapp.com");
}, 60000);

client.connect({
    // replace this sample token
    // token: "MjQxOTU2ODE2MjY5ODY5MDYw.CvZoJg.jD6EDX9hlQohb24cp-7NHNGsGv4"
    token: "MjQwOTA3OTU0NTI0NjUxNTI4.CvKQJw.fQ5xpXponFT9khlLsloPX-Sy_8U"
    // token: "MjQxOTU2ODE2MjY5ODY5MDYw.CvflYw.26LJOS5s3nHoOWGTN7wHNn0k3j4"
});

client.Dispatcher.on("GATEWAY_READY", e => {
    console.log("Connected as: " + client.User.username);
});

var prefix = '!'
const commands = {
    'comandos': (message, args) => message.channel.sendMessage(':computer: Codigos de hacker (Adicione o "!" antes deles): ```\n ping \n bd \n bn \n cookie \n verdade \n cute \n carteira``` '),
    'ping': (message, args) => message.channel.sendMessage('pong'),
    'bd': (message, args) => message.channel.sendMessage('Ohayo :3, @everyone'),
    'bn': (message, args) => message.channel.sendMessage('Boa noite, anon-kun'),
    'cute': (message, args) => message.channel.sendMessage('https://aww.moe/fy95x9.gif'),
    'verdade': (message, args) => message.channel.sendMessage('Homem de verdade não fapa pra trap!'),
    'roll': (message, args) => roleta(),
    'cookie': (message, args) => biscoitos(),
    'carteira': dindin,
}

client.Dispatcher.on("MESSAGE_CREATE", e => {
    member = e.message.member;
    guild = e.message.guild;
    channel = e.message.channel;
    nome = e.message.content.substr(7)
    let args = e.message.content.replace(prefix, '').trim().split(' ');
    const command = args.shift();
    if (command in commands) commands[command](e.message, args.join(' '));
    // =====================================================
    if (e.message.content == ':3')
        e.message.channel.sendMessage('>:3');
    if (e.message.content == 'Bu')
        e.message.channel.sendMessage('Que susto :ghost:');
});

function roleta(e) {
    const channel = guild.textChannels.find(c => c.name == "casino");
    var numero1 = Math.floor((Math.random() * 10) + 1)
    var numero2 = Math.floor((Math.random() * 10) + 1)
    var numero3 = Math.floor((Math.random() * 10) + 1)
    if (numero1 == numero2 && numero2 == numero3) {
      channel.sendMessage("Seus numeros foram: " + numero1 + " - " + numero2 + " - " + numero3 + "\n ##### GET! ##### \n" + member.mention + ", você ganhou: 100 lolis");
      save(member.mention, 100);
  }else if (numero1 == numero2 || numero2 == numero3 || numero1 == numero3) {
      channel.sendMessage("Seus numeros foram: " + numero1 + " - " + numero2 + " - " + numero3 + " \n ##### Duplos, Parábens! ##### \n" + member.mention + ", você ganhou: 45 lolis");
      save(member.mention, 45);
  }else {
      channel.sendMessage("Seus numeros foram: " + numero1 + " - " + numero2 + " - " + numero3 + "\n" + member.mention + ", Não foi dessa vez, tente de novo!");
    }
}

function biscoitos(e) {
    var bis = Math.floor((Math.random() * 10) + 1)
    if (bis <= 3) {
        channel.sendMessage(nome + ", " + member.mention + " dividiu um biscoito de chocolate com você");
    }
    if (bis >= 4 && bis <= 6) {
        channel.sendMessage(nome + ", " + member.mention + " comeu o biscoito sozinho e não te deu nada");
    }
    if (bis > 6) {
        channel.sendMessage(nome + ", " + member.mention + " te deu um biscoito caseiro de aveia");
    }
}

function dindin(message, args) {
    db.query("SELECT loli FROM bank WHERE name = $1", [member.mention], function (e, r) {
        if(e) throw e;

        if(r.rows.length == 0){
            var loli = 0;
        }else{
            var loli = r.rows[0].loli
        }

        channel.sendMessage(member.mention+", **você tem "+loli+" lolis**");
    });
}

function save(name, value) {
    db.query("SELECT loli FROM bank WHERE name = $1", [name], function (err, result) {
        if(err) throw err;

        if (result.rows.length == 0) {
            db.query("INSERT INTO bank(name, loli) VALUES($1, $2)", [name, value], function (err, result) {
                if (err) throw err;
                console.log(result);
            });
        }else{
            var loli = result.rows[0].loli;
            loli += value;
            db.query("UPDATE bank SET loli = $1 WHERE name = $2", [loli, name], function (err, result) {
                if (err) throw err;
                console.log(result);
            });
        }
    });
}
