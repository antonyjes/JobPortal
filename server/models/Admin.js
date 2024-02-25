import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {type: String, unique: true},
        password: String,
        role: String,
        picturePath: {type: String, default: ""},
    },
    {timestamps: true}
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;