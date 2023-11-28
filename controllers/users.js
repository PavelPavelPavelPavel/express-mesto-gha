const {



	setServerError,



	setWrongData,



	setDataNotFound,



} = require("../errors/errors");



const userModel = require("../models/user");



function getAllUsers(req, res) {

	return userModel



		.find({})



		.then((users) => res.send(users))



		.catch((err) => setServerError(err, res));

}



function getUser(req, res) {

	return userModel



		.findById(`${req.params.userId}`)



		.then((user) => {

			if (user) {

				return res.send(user);

			}



			return setDataNotFound("Пользователь не найден", (err = ""), res);

		})



		.catch((err) => {

			if (err.name === "CastError") {

				return setWrongData(err, res);

			}



			return setServerError(err, res);

		});

}



function createUser(req, res) {

	const userData = req.body;



	return userModel



		.create(userData)



		.then((user) => {

			if (user) {

				return res.status(201).send(user);

			}

		})



		.catch((err) => {

			if (err.name === "ValidationError") {

				return setWrongData(err, res);

			}



			return setServerError(err, res);

		});

}



function updateInfo(req, res) {

	const userId = req.user._id;



	const { body } = req;



	return userModel



		.findByIdAndUpdate(



			userId,



			{



				$set: {



					...body,



				},



			},



			{ new: true, runValidators: true },



		)



		.then((user) => {

			if (user) {

				return res.send(user);

			}



			setDataNotFound("Пользователь не найден", (err = ""), res);

		})



		.catch((err) => {

			if (err.name === "ValidationError") {

				return setWrongData(err, res);

			}



			return setServerError(err, res);

		});

}



function updateUserInfo(req, res) {

	return updateInfo(req, res);

}



function updateUserAvatar(req, res) {

	return updateInfo(req, res);

}



module.exports = {



	getAllUsers,



	getUser,



	createUser,



	updateUserInfo,



	updateUserAvatar,



};

