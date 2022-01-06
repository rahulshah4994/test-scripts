const keytar = require("keytar");

keytar
	.findCredentials("test")
	.then((res) =>
		console.log("Trying to get password using findCredentials('test')", res)
	)
	.catch(console.log);

keytar
	.findPassword("test")
	.then((res) =>
		console.log("Trying to get password using findPassword('test')", res)
	)
	.catch(console.log);

keytar
	.getPassword("test", "user")
	.then((res) =>
		console.log("Trying to get password using getPassword('test','user')", res)
	)
	.catch(console.log);
