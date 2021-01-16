const mongo = require('mongoose');
const tableSchema = mongo.Schema({
    MAINURL:{
        type:String,
        required : true
    },
    KeyValue:{
        type: String,
        required:true,
        index:{
            unique:true
        }
    }

})
tableSchema.statics.CheckTheCode = async (code)=>{
    
const validCode = await data1.findOne({KeyValue:code});
if(!validCode){
    throw new Error('This URL IS NOT VALID')
}
return validCode;
}
tableSchema.statics.checktheURL = async (URL)=>{
    const vaildurl = await data1.findOne({MAINURL:URL});
    if(vaildurl !== null){
        return vaildurl.KeyValue
    }
    return null  // check the url is already present or not
}
const data1 = mongo.model('Data',tableSchema);
module.exports = data1;