const mongoose = require('mongoose');
module.exports = async() => {
    const mongoUri = 'mongodb+srv://kasturidakshatha:fDjiqmEud9mL4tcU@cluster0.av5prs4.mongodb.net/?retryWrites=true&w=majority';

    try{
        const connect = await mongoose.connect(mongoUri, {
             useNewUrlParser: true, useUnifiedTopology: true,
            //   serverApi: ServerApiVersion.v1 
       });

       console.log(`MongoDB Connected: ${connect.connection.host}`);
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
    
};