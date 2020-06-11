
import { KnightTrapWeave } from "./knight_trap_weave/controller";
import { ColorLibrary } from "./color/controller";

import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 8080; 

app.use(bodyParser.json());
// app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post( "/knight_trap_weave", async ( req: any, res:any ) => {
  console.log('KTW request', req.body)
    const ktw = new KnightTrapWeave(req.body);
    const svg = ktw.generate()
    // const { convert } = require('convert-svg-to-png');
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

app.get( "/color_library",( req: any, res:any ) => {
    const color_library = new ColorLibrary();
    const lib = color_library.getColorLibrary();
    res.send(JSON.stringify(lib)); 
} );

app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
});