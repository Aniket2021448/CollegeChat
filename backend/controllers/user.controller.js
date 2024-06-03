// user.controller.js

import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const getUserForSearch = async (req, res) => {
    try {
        const loggedInUserID = req.user._id; // details coming from protectRoute middleware

        const allUsers = await User.find({ _id: { $ne: loggedInUserID } }).select("-password");
        
        res.status(200).json(allUsers); // send all users to the frontend
    } catch (error) {
        console.log("Error in getUserForSearch controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserID = req.user._id; // details coming from protectRoute middleware
    
        // Find all conversations where the logged-in user is a participant
        const conversations = await Conversation.find({ participants: loggedInUserID });
    
        if (!conversations || conversations.length === 0) {
            return res.status(200).json([]); // If no conversations found, return an empty array
        }
    
        // Extract all participant IDs from these conversations, excluding the logged-in user
        const participantIDs = [];
        conversations.forEach(conversation => {
            conversation.participants.forEach(participantID => {
                if (participantID.toString() !== loggedInUserID.toString()) {
                    participantIDs.push(participantID.toString());
                }
            });
        });
    
        const userFriends = await User.find({ _id: { $in: participantIDs } }).select("-password");
    
        res.status(200).json(userFriends); // send user friends to the frontend
    } catch (error) {
        console.log("Error in getUserForSidebar controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
