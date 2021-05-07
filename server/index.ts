import express from 'express';
// import Sandbox from 'sandbox';

// const sandBox : Sandbox  = new Sandbox();
// import socketIO from "socket.io";


import sandbox from './sandbox/index'

const app = express();

export default (app, http) => {
  app.use(express.json());


  app.post('/test/js/:id', (req: express.Request, res: express.Response) => {
    const answer = sandbox.StartTest(req.params.id, req.body.code);
    res.json(answer);
  });
  //
  // app.get('/foo', (req, res) => {
  //   res.json({msg: 'foo'});
  // });
  //
  // app.post('/bar', (req, res) => {
  //   res.json(req.body);
  // });
  // 
  // optional support for socket.io
  // 
  // let io = socketIO(http);
  // io.on("connection", client => {
  //   client.on("message", function(data) {
  //     // do something
  //   });
  //   client.emit("message", "Welcome");
  // });
}
