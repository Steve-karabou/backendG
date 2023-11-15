import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import { v4 as uuidv4 } from 'uuid';

let deliverySchema = new mongoose.Schema({
    delivery_id: {type: String, default: uuidv4()},
    package_id: {type: String},
    pickup_time:{type: Date },
    start_time: { type: Date },
    end_time: {type: Date },
    location: {
        lat: {type: Number},
        lng: {type: Number}
     },
    status: {type: String, enum: ["open", "picked-up", "in-transit", "delivered", "failed"]}

})
deliverySchema.index({ _id: 1, package_id: 1 }, { unique: true })

deliverySchema.plugin(mongoosePaginate);

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;

