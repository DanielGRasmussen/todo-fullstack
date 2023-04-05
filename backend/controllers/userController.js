const User = require("../models/user");
const { decrypt } = require("../encryption");

exports.getCurrentUser = async function (req, res) {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		const decryptedUser = {
			googleId: user.googleId,
			_id: user._id,
			name: decrypt(user.name),
			email: decrypt(user.email),
			picture: user.picture
		};
		res.json(decryptedUser);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
};
