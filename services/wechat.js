import axios from 'axios';

// 微信后台配置
const APP_ID = '在此输入你的appid';
const APP_SECRET = '在此输入微信公众平台后台申请的appsecret';
const BASE_URL = 'https://api.weixin.qq.com';

// 获取AccessToken小程序全局唯一后台接口调用凭据，token有效期为7200s，开发者需要进行妥善保存。
const getAccessToken = async () => {
  try {
    const tokenRes = await axios.post(`${BASE_URL}/cgi-bin/stable_token`, {
      grant_type: 'client_credential',
      appid: APP_ID,
      secret: APP_SECRET,
      force_refresh: false, // false有效期内不会更新token, true会强制使之前token失效并返回新token
    });
    return tokenRes.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to fetch access token');
  }
};

// 获取手机号
export async function getPhoneNumber(req, res) {
  const code = req.query?.code || '';
  const accessToken = await getAccessToken();

  if (!code) {
    res.status(400).send('error: missing code param');
    return;
  }

  try {
    const phoneNumberRes = await axios.post(
      `${BASE_URL}/wxa/business/getuserphonenumber?access_token=${accessToken}`,
      {
        code: code, // 前端传递手机号获取凭证
      },
    );
    const phoneNumberData = phoneNumberRes.data;
    res.status(200).send(phoneNumberData);
  } catch (error) {
    console.error('Error fetching phone number:', error);
    res.status(500).send('Failed to fetch phone number');
    throw new Error('Failed to fetch phone number');
  }
}
