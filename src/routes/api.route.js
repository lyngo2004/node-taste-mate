const express = require('express');
const auth = require('../middlewares/auth');
const routerAPI = express.Router();
const courseItemRoutes = require('./courseItem.route');
const onboardingRoutes = require('./onboarding.route');
const userRoutes = require('../routes/user.route');
const imageProxyRoutes = require('./imageProxy.route');

routerAPI.get('/', (req, res) => {
    return res.status(200).json({ message: 'API is working!' });
});

routerAPI.use('/user', userRoutes);
routerAPI.use('/image-proxy', imageProxyRoutes);

routerAPI.use(auth);
routerAPI.use('/course', courseItemRoutes);
routerAPI.use('/onboarding', onboardingRoutes);

module.exports = routerAPI;
