import * as express from 'express';
import { Application, Router, Response, Request } from 'express';
import { Telegraf } from 'telegraf';
import { formatClientMsg } from './helpers/formatMsg';
import { IInitialParams } from './types/types';

export default class App {
  port: string;
  app: Application;
  bot: Telegraf;
  token: string;
  chatID: string;
  apiPrefix: string;
  router: Router;

  constructor({ port, token, chatID, apiPrefix }: IInitialParams) {
    this.port = port;
    this.token = token;
    this.chatID = chatID;
    this.apiPrefix = apiPrefix;
    this.bot = new Telegraf(token);
    this.startServer();
  }

  startServer() {
    this.app = express();
    this.app.use(express.json()); // функция для парсинга приходящих данных в json формате
    this.app.listen(this.port);
    this.addRoutes();
  }

  addRoutes() {
    this.router = express.Router();
    this.app.use(this.apiPrefix, this.router);
    this.router.post('/client', (req: Request, res: Response) => this.sendClient(req, res));
    this.app.use((req, res) => {
      // если запрос пришел по неверному урлу
      res.status(404).send('Not Found');
    });
  }

  sendClient(req: Request, res: Response) {
    const { model, entry } = req.body;
    console.log(model, entry);
    if (model !== 'feedback') {
      res.status(400).send('Bad request. It is not feedback');
      return;
    }
    this.bot.telegram.sendMessage(this.chatID, formatClientMsg(entry));
    res.sendStatus(200);
  }

  launch() {
    this.bot.launch();
  }
}
