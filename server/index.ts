import express from 'express';
// import Sandbox from 'sandbox';

// const sandBox : Sandbox  = new Sandbox();
// import socketIO from "socket.io";


import sandbox from './sandbox/index'

const app = express();

export default (app, http) => {
  app.use(express.json());

  app.post('/test/js/introduction/:id', (req: express.Request, res: express.Response) => {
    const answer = sandbox.Introduction(req.params.id, req.body.code);
    console.log(answer);
    res.json(answer);
  });

  app.post('/test/js/cycles_and_conditions/:id', (req: express.Request, res: express.Response) => {
    const answer = sandbox.CyclesAndConditions(req.params.id, req.body.code);
    console.log(answer);
    res.json(answer);
  });

  app.post('/test/js/function/:id', (req: express.Request, res: express.Response) => {
    const answer = sandbox.FunctionTest(req.params.id, req.body.code);
    console.log(answer);
    res.json(answer);
  });

  app.post('/test/js/error/:id', (req: express.Request, res: express.Response) => {
    const answer = sandbox.ErrorTest(req.params.id, req.body.code);
    console.log(answer);
    res.json(answer);
  });

  app.post('/test/js/object/:id', (req: express.Request, res: express.Response) => {
    const answer = sandbox.ObjectTest(req.params.id, req.body.code);
    console.log(answer);
    res.json(answer);
  });
  
}
