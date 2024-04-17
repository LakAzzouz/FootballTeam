import 'dotenv/config'
import express from "express";
import {router} from "./app/routes/user";
import {footballManagerRouter} from "./app/routes/footballManager";
import {soccerPlayerRouter} from './app/routes/soccerPlayer';
import {footballTeamRouter} from './app/routes/footballTeam';

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());

app.use("/users", router)
app.use("/users", footballManagerRouter)
app.use("/users", soccerPlayerRouter)
app.use("/users", footballTeamRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})