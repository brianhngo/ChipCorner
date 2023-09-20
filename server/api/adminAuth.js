// const { models: { User } } = require('../db')

// const requireToken = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization
//         const user = await User.findByToken(token)
//         console.log(user)
//         req.user = user
//         next()
//     } catch (error) {
//         next (error)
//     }
// }

// const isAdmin = (req, res, next) => {
//     console.log (req.body.isAdmin)
//     if (!req.user.isAdmin) {
//         return res.status(403).send('not Admin, requires Admin status')
//       } else {
//         next()
//       }
// }

// module.exports = {
//     requireToken,
//     isAdmin
// }