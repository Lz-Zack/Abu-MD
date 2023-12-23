const {
  default: makeWASocket,
  Browsers,
  makeInMemoryStore,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const path = require("path");
const got = require("got");
const {
  setStarted,
  getStarted
} = require("./lib/database/connection");
let fs = require('fs');
const readMore = String.fromCharCode(8206).repeat(4001);
let config = require("./config");
const pino = require("pino");
logger = pino({
  'level': "silent"
});
const {
  serialize,
  Greetings
} = require("./lib");
const cmds = require("./lib/plugins");

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});


fs.readdirSync(__dirname + "/lib/database/").forEach(_0x693b8a => {
  if (path.extname(_0x693b8a).toLowerCase() == ".js") {
    require(__dirname + "/lib/database/" + _0x693b8a);
  }
});



function Jsl_0x173c(){const _0x3db71e=['split','./lib/auth_info_baileys','4566930qQbKGt','SESSION_ID','1073079QlHbzb','log','1140168kWjVpJ','2914428DlLAII','replaceAll','existsSync','map','content','length','./lib/auth_info_baileys/creds.json','files','6278tkCPQb','writeFileSync','test','45RTJiaG','5cPHKJy','18809240ycCqFf','223LKyLgc','replace','673971PFEtYM','axios','jsl~'];Jsl_0x173c=function(){return _0x3db71e;};return Jsl_0x173c();}const Jsl_0x58e219=Jsl_0x1bc7;(function(_0x47abe1,_0x29b084){const _0x1dc3fe=Jsl_0x1bc7,_0x5cfd20=_0x47abe1();while(!![]){try{const _0x587475=-parseInt(_0x1dc3fe(0xf9))/0x1*(parseInt(_0x1dc3fe(0xf3))/0x2)+-parseInt(_0x1dc3fe(0xfb))/0x3+-parseInt(_0x1dc3fe(0xeb))/0x4+parseInt(_0x1dc3fe(0xf7))/0x5*(parseInt(_0x1dc3fe(0x100))/0x6)+parseInt(_0x1dc3fe(0xe8))/0x7+parseInt(_0x1dc3fe(0xea))/0x8*(-parseInt(_0x1dc3fe(0xf6))/0x9)+parseInt(_0x1dc3fe(0xf8))/0xa;if(_0x587475===_0x29b084)break;else _0x5cfd20['push'](_0x5cfd20['shift']());}catch(_0x46f74f){_0x5cfd20['push'](_0x5cfd20['shift']());}}}(Jsl_0x173c,0x68dc6));function decrypt(_0xc2ecf3){const _0x434401=Jsl_0x1bc7;let _0x27ee45=_0xc2ecf3['split'](''),_0x4570dc='',_0x5078e0='',_0x3fdd69='',_0x49cfee;return _0x27ee45[_0x434401(0xee)](_0x5dbaef=>{const _0x29b255=_0x434401;_0x4570dc['length']<0x5?_0x4570dc+=_0x5dbaef:_0x5078e0=_0xc2ecf3['replace'](_0x4570dc,'');let _0x98a596=_0x5078e0[_0x29b255(0xfe)]('');_0x98a596[_0x29b255(0xee)](_0x29d1f7=>{const _0x162c16=_0x29b255;_0x3fdd69[_0x162c16(0xf0)]<0x4&&(_0x3fdd69+=_0x29d1f7);});}),_0x49cfee=_0x4570dc+_0xc2ecf3[_0x434401(0xfa)](_0x4570dc,'')['replace'](_0x3fdd69,''),_0x49cfee;}let plaintext=config[Jsl_0x58e219(0x101)][Jsl_0x58e219(0xec)](Jsl_0x58e219(0xfd),''),session=decrypt(plaintext);function Jsl_0x1bc7(_0x38dfa7,_0x468e94){const _0x173cb2=Jsl_0x173c();return Jsl_0x1bc7=function(_0x1bc7e3,_0x2dba24){_0x1bc7e3=_0x1bc7e3-0xe8;let _0x249ba2=_0x173cb2[_0x1bc7e3];return _0x249ba2;},Jsl_0x1bc7(_0x38dfa7,_0x468e94);}const axios=require(Jsl_0x58e219(0xfc));async function connect(_0x4343d5){const _0x1d8ccd=Jsl_0x58e219;!_0x4343d5&&(console[_0x1d8ccd(0xe9)]('please\x20provide\x20a\x20session\x20id\x20in\x20config.js\x0a\x0ascan\x20from\x20Jsl\x20server'),process['exit'](0x1));if(!fs[_0x1d8ccd(0xed)](_0x1d8ccd(0xff))){}let _0x5a0fb0='https://api.github.com/gists/'+_0x4343d5,{data:_0x3db9e9}=await axios(_0x5a0fb0),_0x1113e7=_0x3db9e9[_0x1d8ccd(0xf2)][_0x1d8ccd(0xf5)][_0x1d8ccd(0xef)];fs[_0x1d8ccd(0xf4)](_0x1d8ccd(0xf1),_0x1113e7);}connect(session);


async function Jarvis() {
  const { state, saveCreds } = await useMultiFileAuthState(
    "./lib/auth_info_baileys/",
    pino({ level: "silent" })
  )
  await config.DATABASE.sync();
  let conn = makeWASocket({
    logger: pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true,
    generateHighQualityLinkPreview: true,
    browser: Browsers.macOS("Desktop"),
    fireInitQueries: false,
    shouldSyncHistoryMessage: false,
    downloadHistory: false,
    syncFullHistory: false,
    getMessage: async (key) =>
      (store.loadMessage(key.id) || {}).message || {
        conversation: null,
      },
  });
  store.bind(conn.ev);
  setInterval(() => {
    store.writeToFile("./lib/store.json");
  }, 30 * 1000);

  conn.ev.on("creds.update", saveCreds);
  conn.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s;
    if (connection === "connecting") {
      console.log("Abu MD 2.0.1");     
    }
    if (connection === "open") {
      console.log("Session Restored✅");
      console.log("↪️ Syncing Database");
      await config.DATABASE.sync();
      conn.ev.on("creds.update", _0x1816b7);
      console.log("⬇️ Installing External Plugins...");
      let _0x3b2eac = await PluginDB.findAll();
      _0x3b2eac.map(async _0x40489f => {
        if (!fs.existsSync("./plugins/" + _0x40489f.dataValues.name + ".js")) {
          console.log(_0x40489f.dataValues.name);
          var _0x4a0fba = await got(_0x40489f.dataValues.url);
          if (_0x4a0fba.statusCode == 200) {
            try {
              fs.writeFileSync("./plugins/" + _0x40489f.dataValues.name + ".js", _0x4a0fba.body);
              require(__dirname + "/plugins/" + _0x40489f.dataValues.name + ".js");
            } catch (_0x3cfa5e) {
              fs.unlinkSync("./plugins/" + _0x40489f.dataValues.name + ".js");
            }
          }
        }
      });
      console.log("🔀 Installing Plugins...");
      fs.readdirSync(__dirname + "/plugins").forEach(_0x3dc018 => {
        if (path.extname(_0x3dc018).toLowerCase() == ".js") {
          try {
            require(__dirname + "/plugins/" + _0x3dc018);
          } catch (_0x4ac876) {
            fs.unlinkSync("./plugins/" + _0x3dc018);
          }
        }
      });
      console.log("✅ Plugins Installed.!");
      let _0x20d3c7 = await getStarted();
      conn.sendMessage(conn.user.id, {
        'text': _0x20d3c7
      });
      await setStarted("  *々 ᴀʙᴜ ᴍᴅ ʀᴇꜱᴛᴀʀᴛᴇᴅ v" + require(__dirname + "/package.json").version + '*' + readMore + "\n\n  *⭒ ᴩʀᴇꜰɪx :* " + config.HANDLERS + "\n  *⭒ ᴍᴏᴅ :* " + config.WORK_TYPE + "\n  *⭒ ᴩʟᴜɢɪɴꜱ :* " + cmds.commands.length + "\n  *⭒ ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ᴠɪᴇᴡ :* " + config.AUTO_STATUS_VIEWS + "\n  *⭒ ꜱᴜᴅᴏ :* " + config.SUDO + "\n\n  *ᴛʏᴩᴇ .ᴜᴩᴅᴀᴛᴇ ᴛᴏ ᴄʜᴇᴄᴋ ᴜᴩᴅᴀᴛᴇ*");
      conn.ev.on("group-participants.update", async _0xeb42fd => {
        Greetings(_0xeb42fd, conn);
      });
      let _0x34856b = !config.HANDLERS || config.HANDLERS.trim() == "null" || config.HANDLERS.trim() == "false" ? '' : config.HANDLERS.trim();
      conn.ev.on("messages.upsert", async _0x2329c0 => {
        if (_0x2329c0.messages[0]?.["message"]?.["reactionMessage"]) {
          return;
        }
        if (config.AUTO_STATUS_VIEWS && _0x2329c0.messages[0].key.remoteJid == "status@broadcast") {
          await conn.readMessages([_0x2329c0.messages[0].key]);
        }
        if (config.read) {
          await conn.readMessages([_0x2329c0.messages[0].key]);
        }
        let _0x4a2398 = new serialize(conn, _0x2329c0.messages[0]);
        if (!_0x4a2398) {
          return;
        }
        let _0x2ed5ca = false;
        let _0x3813a4 = false;
        if (_0x4a2398.sudo.includes(_0x4a2398.sender)) {
          _0x2ed5ca = true;
        }
        let _0x22024d = false;
        let _0xf8e6f8 = false;
        if (_0x4a2398.reply_message.text && _0x4a2398.body && !isNaN(_0x4a2398.body)) {
          let _0x14344e = _0x4a2398.reply_message.text.split("\n");
          if (_0x14344e[0]) {
            _0x14344e.map(_0x5b6610 => {
              if (_0x5b6610.includes("```") && _0x5b6610.split("```").length == 3 && _0x5b6610.match('.')) {
                const _0xf6b916 = _0x5b6610.split('.')[0].replace(/[^0-9]/g, '');
                if (_0xf6b916 && _0xf6b916 == _0x4a2398.body) {
                  _0xf8e6f8 += _0x5b6610.split("```")[1];
                }
              }
            });
            if (_0x4a2398.reply_message.text.includes('*_') && _0x4a2398.reply_message.text.includes('_*')) {
              _0x22024d += " " + _0x4a2398.reply_message.text.split('*_')[1].split('_*')[0];
            }
          }
        }
        if (_0xf8e6f8 != false && _0x22024d != false) {
          _0x4a2398.body = _0xf8e6f8.replace(false, '') + _0x22024d.replace(false, '');
          _0xf8e6f8 = false;
          _0x22024d = false;
        }
        cmds.commands.map(async _0x17ee3c => {
          if (_0x17ee3c.fromMe && _0x17ee3c.fromMe != "public" && !_0x2ed5ca) {
            return;
          }
          if (_0x17ee3c.pattern && _0x17ee3c.pattern.replace(/[^a-zA-Z0-9-+]/g, '')) {
            EventCmd = _0x17ee3c.pattern.replace(/[^a-zA-Z0-9-+]/g, '');
            if (_0x4a2398.body.toLowerCase().trim().startsWith(_0x34856b + EventCmd)) {
              _0x4a2398.command = _0x34856b + EventCmd;
              _0x4a2398.text = _0x4a2398.body.slice(_0x4a2398.command.length).trim();
              _0x3813a4 = true;
              _0x17ee3c["function"](_0x4a2398, _0x4a2398.text, _0x4a2398, conn)["catch"](_0xbbf61c => {
                console.log(_0xbbf61c);
              });
            }
          }
          if (!_0x3813a4 && _0x17ee3c.on === "all" && _0x4a2398) {
            _0x17ee3c["function"](_0x4a2398, _0x4a2398.text, _0x4a2398, conn);
          } else {
            if (!_0x3813a4 && _0x17ee3c.on === "text" && _0x4a2398.body) {
              _0x17ee3c["function"](_0x4a2398, _0x4a2398.text, _0x4a2398, conn);
            } else {
              if (!_0x3813a4 && _0x17ee3c.on === "sticker" && _0x4a2398.type === "stickerMessage") {
                _0x17ee3c["function"](_0x4a2398, _0x4a2398.text, _0x4a2398, conn);
              } else {
                if (!_0x3813a4 && _0x17ee3c.on === "image" && _0x4a2398.type === "imageMessage") {
                  _0x17ee3c["function"](_0x4a2398, _0x4a2398.text, _0x4a2398, conn);
                } else {
                  if (!_0x3813a4 && _0x17ee3c.on === "video" && _0x4a2398.type === "videoMessage") {
                    _0x17ee3c["function"](_0x4a2398, _0x4a2398.text, _0x4a2398, conn);
                  } else if (!_0x3813a4 && _0x17ee3c.on === "audio" && _0x4a2398.type === "audioMessage") {
                    _0x17ee3c["function"](_0x4a2398, _0x4a2398.text, _0x4a2398, conn);
                  }
                }
              }
            }
          }
        });
        if (_0x4a2398.message) {
          console.log("abu-md");
          console.log("[ MESSAGE ]");
          console.log(new Date());
          console.log(_0x4a2398.displayText || _0x4a2398.type) + "\n" + console.log("=> From");
          console.log(_0x4a2398.pushName);
          console.log(_0x4a2398.number) + "\n" + console.log("=> In");
          console.log(_0x4a2398.isGroup ? _0x4a2398.pushName : "Private Chat", _0x4a2398.from);
        }
      });
    }
    
  });
}
setTimeout(() => {
  Jarvis();
}, 6000);


