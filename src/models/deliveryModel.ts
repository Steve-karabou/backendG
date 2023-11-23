import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let deliverySchema = new mongoose.Schema({
    package_id: {type: mongoose.Schema.Types.ObjectId,},
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

