
const {
	System,
	isPrivate,
	tiny,
	sendMenu,
	runtime,
	take,
	sendSticker,
	takeExif,
	sendList,
	getvv,
	sendPlugin,
	Remove,
	sendUrl
} = require("../lib/");

System({
	pattern: "ping",
	fromMe: isPrivate,
	desc: "To check ping",
	type: "user",
}, async (message) => {
	const start = new Date().getTime();
	const ping = await message.send(tiny("*𝆺𝅥 running 𝆺𝅥*"));
	const end = new Date().getTime();
	return await ping.edit("*☇ ꜱᴩᷨᴇͦᴇͭᴅ ☁ :* " + (end - start) + " *ᴍꜱ* ");
});

