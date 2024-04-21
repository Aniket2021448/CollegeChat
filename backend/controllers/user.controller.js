// Get user data for sidebar

import User from "../models/user.model.js";

const getUserForSidebar = async(req, res) => {

    try {

        const loggedInUserID = req.user._id; // details coming from protectRoute middleware
        // Get all users, except the currently logged in user, using $ne;
        const allUsers = await User.find({_id: {$ne: loggedInUserID}}).select("-password")
        
        res.status(200).json(allUsers); // send all users to the frontend
        

    } catch (error) {
        console.log("Erorr in getUserForSidebar controller", error.message)
        res.status(500).json({error: `Internal server error`})
    }
}

export default getUserForSidebar; // Exporting the function
