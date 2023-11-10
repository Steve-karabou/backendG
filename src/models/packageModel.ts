import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let packageSchema = new mongoose.Schema({
    active_delivery_id: {type: String},
    description: {type: String},
    weight : {type: Number},
    width : {type: Number},
    height : {type: Number},
    depth : {type: Number},
    from_name : {type: String},
    from_address : {type: String},
    from_location : {
        lat: {type: String},
        lng: {type: String}
    },
    to_name : {type: String},
    to_address : {type: String},
    to_location : {
        lat: {type: String},
        lng: {type: String}
     }
})

packageSchema.plugin(mongoosePaginate);

const Package = mongoose.model("Delivery", packageSchema);

export default Package;

