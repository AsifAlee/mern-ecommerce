const app = require('./app');
const dotenv = require('dotenv');
const connectToDb = require('./config/connectdb');

dotenv.config({path:'./backend/config/config.env'})
connectToDb();

app.listen(process.env.PORT,() => {
    console.log(`app listening on ${process.env.PORT}` )
})
