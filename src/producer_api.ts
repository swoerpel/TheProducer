import express from "express";
import { KnightTrapWeave } from "./knight_trap_weave/controller";
import cors from "cors";
import bodyParser from "body-parser";
const { convert } = require('convert-svg-to-png');
const app = express();
const port = 8080; 

app.use(bodyParser.json());
app.use(cors());

app.post( "/knight_trap_weave", async ( req: any, res:any ) => {
  console.log('KTW request', req.body)
    const ktw = new KnightTrapWeave(req.body);
    const svg = ktw.generate()
    // const png = await convert(svg,
    // { 
    //     width: req.body.canvas.width, 
    //     height: req.body.canvas.width 
    // });
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml',
      'Content-Length': svg.length
    });
    res.end(svg); 
} );

app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
});