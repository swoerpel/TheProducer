import express from "express";
import { KnightTrapWeave } from "./knight_trap_weave";
const { convert } = require('convert-svg-to-png');

const app = express();
const port = 8080; 

app.get( "/knight_trap_weave", async ( req: any, res:any ) => {
    const ktw = new KnightTrapWeave();
    const svg = ktw.generate()
    const png = await convert(svg,{ width: 640, height: 640 });
    res.set('Content-Type', 'image/png');
    res.send(png);
} );

app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
});