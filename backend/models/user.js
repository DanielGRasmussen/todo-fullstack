const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		googleId: { $type: String, required: true },
		name: {
			$type: {
				encryptedData: String,
				salt: String,
				iv: String,
				password: String
			},
			required: true
		},
		email: {
			$type: {
				encryptedData: String,
				salt: String,
				iv: String,
				password: String
			},
			required: true
		},
		picture: { $type: String, required: true },
		todoList: [
			{
				created: { $type: String, required: true },
				proposedStartDate: { $type: String, required: false },
				actualStartDate: { $type: String, required: false },
				proposedEndDate: { $type: String, required: false },
				actualEndDate: { $type: String, required: false },
				title: {
					$type: {
						encryptedData: String,
						salt: String,
						iv: String,
						password: String
					},
					required: true
				},
				description: {
					$type: {
						encryptedData: String,
						salt: String,
						iv: String,
						password: String
					},
					required: true
				},
				type: {
					$type: {
						encryptedData: String,
						salt: String,
						iv: String,
						password: String
					},
					required: true
				},
				subTasks: {
					$type: [
						{
							name: {
								$type: {
									encryptedData: String,
									salt: String,
									iv: String,
									password: String
								},
								required: true
							},
							link: { $type: Boolean, required: true },
							id: { $type: String, required: false }
						}
					],
					required: true
				},
				parentTask: { $type: String, required: false },
				recurring: {
					$type: {
						isRecurring: { $type: Boolean, required: true },
						frequencyAmount: { $type: Number, required: false },
						frequencyUnit: { $type: String, required: false },
						duration: {
							$type: {
								start: { $type: String, required: true },
								end: { $type: String, required: true }
							},
							required: false
						},
						timeTaken: { $type: Number, required: false },
						completionStatus: {
							$type: [
								{
									$type: {
										status: { $type: String, required: true },
										actualStart: { $type: String, required: false },
										actualEnd: { $type: String, required: false }
									},
									required: false
								}
							],
							required: false
						}
					},
					required: true
				},
				priority: { $type: String, required: true },
				status: { $type: String, required: true },
				lastUpdated: { $type: String, required: true }
			}
		]
	},
	{ typeKey: "$type" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
