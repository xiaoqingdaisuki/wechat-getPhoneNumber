import express from 'express';
import { getPhoneNumber } from './../services/wechat.js';

const router = express.Router();

// 请求路由
router.get('/', (req, res) => {
  res.status(200).send(`server is running, ${new Date()}`);
});
router.get('/getPhoneNumber', getPhoneNumber);

export default router;
