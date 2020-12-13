const mongo = require('mongoose');


mongo.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:true
})