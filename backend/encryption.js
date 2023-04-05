const crypto = require("crypto");

exports.encrypt = function (text) {
	const algorithm = "aes-256-cbc";

	// generate a random salt & password
	const password = crypto.randomBytes(32).toString("hex");
	const salt = crypto.randomBytes(16);

	// create a key using the password and salt
	const key = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");

	// generate a random initialization vector
	const iv = crypto.randomBytes(16);

	// create a cipher using the key and initialization vector
	const cipher = crypto.createCipheriv(algorithm, key, iv);

	// encrypt the text and get the output as a buffer
	const encrypted = cipher.update(text);
	const finalBuffer = Buffer.concat([encrypted, cipher.final()]);

	// return an object with the encrypted data, salt, and initialization vector
	return {
		encryptedData: finalBuffer.toString("hex"),
		salt: salt.toString("hex"),
		iv: iv.toString("hex"),
		password: password
	};
};

exports.decrypt = function (data) {
	const algorithm = "aes-256-cbc";

	// convert the salt, initialization vector, and encrypted data from hex to buffers
	const encryptedData = Buffer.from(data.encryptedData, "hex");

	// create a key using the password and salt
	const key = crypto.pbkdf2Sync(
		data.password,
		Buffer.from(data.salt, "hex"),
		100000,
		32,
		"sha256"
	);

	// create a decipher using the key and initialization vector
	const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(data.iv, "hex"));

	// decrypt the data and get the output as a buffer
	const decrypted = decipher.update(encryptedData);
	const finalBuffer = Buffer.concat([decrypted, decipher.final()]);

	// return the decrypted text as a string
	return finalBuffer.toString();
};
