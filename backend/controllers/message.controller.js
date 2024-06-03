
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        // await newMessage.save(); // saving it
        
        await Promise.all([newMessage.save(), conversation.save()]);
        

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


const getMessage = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


// message.controller.js



// Adding delete functionality,if does not work delete it
const deleteMessage = async (req, res) => {
    const messageId = req.params.id;
    const userId = req.user.id;

    try {
        // Find the message
        const message = await Message.findById(messageId);


        // Check if the message exists and if the current user is authorized to delete it
        if (!message || message.senderId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this message" });
        }

        // // Delete the message from the sender's conversation
        // await Conversation.findOneAndUpdate(
        //     { participants: userId, messages: messageId },
        //     { $pull: { messages: messageId } }
        // );

        // // Delete the message from the receiver's conversation
        // await Conversation.findOneAndUpdate(
        //     { participants: message.receiverId, messages: messageId },
        //     { $pull: { messages: messageId } }
        // );

        // // Finally, delete the message
        // await Message.findByIdAndDelete(messageId);

        return res.status(200).json({ message: "Message deleted for everyone" });
    } catch (error) {
        console.error("Error deleting message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export { sendMessage, getMessage, deleteMessage }; // Exporting both functions