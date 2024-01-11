const app = require("./app");

const port = 4000;

app.listen(port, () =>
    console.log(`Server running on port ${port}, http://localhost:${port}`)
);
