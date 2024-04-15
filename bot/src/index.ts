require('dotenv').config();
import App from './app';
const app = new App({
  port: process.env.PORT,
  token: process.env.TG_BOT_TOKEN,
  chatID: process.env.TG_CHAT_ID,
  apiPrefix: process.env.API_PREFIX
});
app.launch();
