import { Server } from "http";

import app from "./app";

const PORT = 8000;

let server: Server;
async function bootStrap() {
  server = app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}
bootStrap();
