const { User, Thought } = require("../models");

module.exports = {
	async getThoughts(req, res) {
		try {
			const thoughts = await Thought.find().select("-__v");

			if (!thoughts.length) {
				return res.status(404).json({
					message: "No thoughts found",
				});
			};

			return res.status(200).json({
				message: "thoughts successfully retrieved",
				data: thoughts,
			});
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			});
		}
	},

	async getThought(req, res) {
		try {
			const thought = await Thought.findOne({
				_id: req.params.thoughtId,
			}).select("-__v");

			if (!thought) {
				return res.status(404).json({
					message: "No thought found with that ID",
				});
			};

			return res.status(200).json({
				message: "Thought successfully retrieved",
				data: thought,
			});
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			});
		}
	},

	async createThought(req, res) {
		try {
			const user = await User.findOne({ username: req.body.username });

			if (!user) {
				return res.status(404).json({
					message: "No user found with that username. Aborting thought creation.",
				});
			};

			const createdThought = await Thought.create(req.body);

			if (!createdThought) {
				return res.status(404).json({
					message: "Could not create thought",
				});
			};

			await User.findOneAndUpdate(
				{ username: req.body.username },
				{ $addToSet: { thoughts: createdThought._id } },
				{ runValidators: true, new: true }
			);

			return res.status(200).json({
				message: "Thought successfully created",
				data: createdThought,
			});
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			});
		}
	},

	async updateThought(req, res) {
		try {
			const updatedThought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);

			if (!updatedThought) {
				return res.status(404).json({
					message: "Could not update thought",
				});
			};

			return res.status(200).json({
				message: "Thought successfully updated",
				data: updatedThought,
			});
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			});
		}
	},

	async deleteThought(req, res) {
		try {
			const deletedThought = await Thought.findOneAndDelete({
				_id: req.params.thoughtId,
			});

			if (!deletedThought) {
				return res.status(404).json({
					message: "Could not delete thought",
				});
			};

			return res.status(200).json({
				message: "Thought successfully deleted",
				data: deletedThought,
			});
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			});
		}
	},

	async addReaction(req, res) {
		try {
			const user = await User.findOne({ username: req.body.username });

			if (!user) {
				return res.status(404).json({
					message: "No user found with that username. Aborting reaction creation.",
				});
			};

			const updatedThought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
				{ runValidators: true, new: true }
			);

			if (!updatedThought) {
				return res.status(404).json({
					message: "Could not add reaction to thought",
				});
			};

			return res.status(200).json({
				message: "Reaction successfully added",
				data: updatedThought,
			});
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			});
		}
	},

	async deleteReaction(req, res) {
		try {
			const updatedThought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: { reactionId: req.params.reactionId } } },
				{ runValidators: true, new: true }
			);

			if (!updatedThought) {
				return res.status(404).json({
					message: "Could not remove reaction from thought",
				});
			}

			return res.status(200).json({
				message: "Reaction successfully removed",
				data: updatedThought,
			});
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			});
		}
	},
};
