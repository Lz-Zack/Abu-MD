const {
	Module,
	isPublic,
	config,
	getJson,
} = require('../lib');


Module({
	pattern: 'bard ?(.*)',
	type: "eva",
	fromMe: isPublic,
	desc: "bard ai",
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send("*please give me an query!*");
	const res = await getJson(`${config.BASE_URL}api/ai/bard?text=${match}&apikey=${config.Module_KEY}`);
	if (!res.status) return await message.send(`Please enter a new apikey, as the given apikey limit has been exceeded. Visit ${config.BASE_URL}api/signup for gettig a new apikey. setvar Module_key: your apikey`);
	return await message.send(res.result);
});
