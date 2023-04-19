const app = require("./app")
const config = require("./app/config");
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.set('strictPopulate', false);

async function startServer(){
    try{
        await mongoose.set('strictQuery', true).connect(config.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected database on ${config.db.url}`);

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    }catch(error){
        console.log("Cannot connect to the database!",error);
        process.exit();
    }
}

startServer();

