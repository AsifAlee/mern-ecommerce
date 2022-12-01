const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect(process.env.Db_URI,{useNewURLParser:true,useUnifiedTopology:true}).then(data => {
        console.log('Connected to :',data.connection.host)       
    })
}

module.exports = connectToDb;