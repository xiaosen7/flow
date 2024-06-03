import chokidar from "chokidar";
import { join } from "path";

const listenDir = join(__dirname, "..");

(async () => {
  const watcher = chokidar.watch(listenDir, {
    ignored: [/\..*$/, /\_.*$/, /node_modules/],
  });

  watcher
    .on("all", console.log.bind(console, "all"))
    .on("add", (path, stats) => {
      console.log("add", path);
    })
    .on("addDir", (path, stats) => {
      watcher.add(path);
      console.log("addDir", path);
    })
    .on("unlink", (path) => {
      console.log("unlink", path);
    })
    .on("unlinkDir", (path) => {
      console.log("unlinkDir", path);
    });
})();
