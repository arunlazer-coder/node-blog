const { bodyParse, app, express, port } = require("./util/import"); //middleware
const router = require("./routes/blog");
var cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use("/api/blog", router);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
