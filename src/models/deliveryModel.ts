import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let deliverySchema = new mongoose.Schema({
    package_id: [{type: String}],
    pickup_time:{type:  Date},
    start_time: { type:  Date },
    end_time: {type:  Date},
    location: {
        lat: {type: String},
        lng: {type: String}
     },
    status: {}

})

deliverySchema.plugin(mongoosePaginate);

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;

