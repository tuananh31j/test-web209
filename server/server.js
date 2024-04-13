const jsonServer = require("json-server");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("db.json"); // đường dẫn đến file db.json của bạn
const middlewares = jsonServer.defaults();

app.db = router.db;

app.use(middlewares);
app.use(auth);
app.use(router);
app.listen(3000, () => {
  console.log("JSON Server is running on: http://localhost:3000");
});
