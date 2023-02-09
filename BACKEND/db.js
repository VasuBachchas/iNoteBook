const mongoose=require('mongoose');
const mongoUri='mongodb://localhost:27017/iNoteBook'

const connecttoMongo=()=>{
    mongoose.connect(mongoUri,()=>{
        console.log('successfully connected')
    })
}
module.exports=connecttoMongo;