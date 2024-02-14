const {
       Module,
       lang,
       isPublic 
} = require('../lib');


Module({
    pattern: 'ping ?(.*)',
    desc: lang.PING_DESC,
    react: "💯",
    fromMe: isPublic,
    type: 'info'
}, async (message, match) => {
    const start = new Date().getTime()
    const msg = await message.send('*Testing Bot Speed*')
    const end = new Date().getTime()
    return await msg.edit('*︎︎⟪ Response in " + (end - start) + " ms︎ec ⟫');
});
