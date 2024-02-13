const {
    Module,
    getBuffer,
    lang,
    isPublic,
    config
} = require('../lib');
Module({
    pattern: "ttp",
    type: "misc",
    fromMe: isPublic,
    desc: lang.TTP.DESC
}, async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.send(lang.BASE.TEXT);
    const res = `${config.BASE_URL}api/ttp?text=${match}`
    return await message.send({url: res}, {},'image');
});
Module({
    pattern: "attp",
    type: "misc",
    fromMe: isPublic, 
    desc: lang.TTP.DESC
}, async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.send(lang.BASE.TEXT);
    const res = await getBuffer(`${config.BASE_URL}api/attp?text=${match}`);
    return await message.send(res,{},'sticker');
});
