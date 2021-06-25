import md5 from 'md5';
const VERCEL_URL = process.env.VERCEL_URL;
const TCKEY = process.env.TCKEY;
const OWNER_ID = process.env.OWNER_ID;

const replyToMessage = (ctx: any, messageId: string, string: string) =>
	ctx.reply(string, {
		reply_to_message_id: messageId,
	});

const sendkey = () => (ctx: any) => {
	const messageId = ctx.message.message_id;

	if (OWNER_ID != ctx.from.id) {
		replyToMessage(ctx, messageId, `Sorry!\nYou are not the owner of the robot and are not allowed to use this API !!!`)
	}

	const userName = ctx.from.last_name ? `${ctx.from.first_name} ${ctx.from.last_name}` : ctx.from.first_name;
	const chatId = ctx.message.chat.id;
	const sendkey = chatId+ 'T' + md5(TCKEY+chatId);

	const site_url = String(VERCEL_URL).split("-")[0] + '.vercel.app';

	ctx.telegram.sendMessage(ctx.from.id,`${userName} , Your sendkey is 🔑 ${sendkey} \n 
	🚀 Use follow url to send message to the chat of ${chatId} : \n 
	${site_url}/api/send?sendkey=<sendkey>&text=<text>`);

	replyToMessage(ctx, messageId, `${userName} , Your sendkey is 🔑 ${sendkey} \n 
  🚀 Use follow url to send message to the chat of ${chatId} : \n 
  ${site_url}/api/send?sendkey=<sendkey>&text=<text>`);
	// replyToMessage(ctx, messageId, `Hello, ${userName} (user_id: ${ctx.from.id})! \n Your Message id is: ${messageId}`);
};

export { sendkey, replyToMessage };
