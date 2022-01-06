const keytar = require("keytar");

keytar
	.setPassword("test", "rahul", "Josh@1234!")
	.then((data) => {
		console.log("Password set successfully", data);
	})
	.catch(console.log);

keytar
	.getPassword("test", "rahul")
	.then((res) => console.log("Password fetched successfully", res))
	.catch(console.log);
