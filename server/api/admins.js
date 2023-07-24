const router = require('express').Router();
const {
  models: { User },
} = require('../db');

const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
      const isAdmin = token ? true : false;
  
      if (isAdmin) {
       
        req.isAdmin = true;
        next();
      } else {
        res.status(403).send('Access forbidden');
      }
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  };
  
//   router.get('/checkAdminStatus', isAdmin, async (req, res, next) => {
//     try {
//       const isAdmin = req.isAdmin;
//       res.json({ isAdmin });
//     } catch (err) {
//       next(err);
//     }
//   });

  module.exports = router;