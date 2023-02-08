import mongoose from "mongoose";
const { Schema, model } = mongoose;

const patientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,

        },
        age: {
            type: String,
            required: true,

        },
        NIC: {
            type: String,
            required: true,

        },
        address: {
            type: String,
            required: true,

        },
        mobileNumber: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("Patient", patientSchema);