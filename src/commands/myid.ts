const myid = () => (ctx: any) => {
	let id = ctx.from.id;
	ctx.reply(`your id is ${id}`);
};

export { myid };
