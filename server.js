console.log("Server loading...")

const app = require("./backend/app.js");
const http = require("http");

const onError = err => {
    switch (err.code) {
        case "EADDRINUSE":
            console.log("ERROR: EADDRINUSE", err.code)
            process.exit(1);
    }
}

const onListening = () => {
    const address = server.address();
}

app.set("port", 3000);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(3000, () => {
    console.log("Server is on!")
});