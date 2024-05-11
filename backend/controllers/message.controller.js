// // import Conversation from "../models/Conversation.model.js";
// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";

// const sendMessage = async (req, res) => {
//     // console.log("Message send");
//     try{
//         const {message} = req.body;
//         const {id: receiverId} = req.params;

//         const senderId = req.user._id;  // This user sends the message to the reciever user whose id is tagged in the params
        
//         // If any previous conversation found between the sender and receiver
//         // then load this one as well. ahead of it
//         let conversation = await Conversation.findOne({ 
//             members: { $all: [senderId, receiverId] }
//         })

//         if(!conversation){
//             // sending message for the first time
//             // set the new converstaion variable
//             conversation = new Conversation({
//                 members : [senderId, receiverId],
//             })
//         }
        
//         // If the conversation is not found, then a new conversation is created, and the message from the req body
//         // is fetched and pushed in thier conversation.
//         // and if the previous conversation was there, then skipping the above if condition, 
//         // the message id is pushed in the conversation directly, to keep track of what they are talking about.
//         const newMessage = new Message({ // creating the new message saving in the database
//             senderId,
//             receiverId,
//             message,
//         })

        // await newMessage.save(); // saving it
        
        // if(newMessage){ // if the message is saved successfully, then push it in the conversation, what message is sent 
        //     // after the conversation is created.
        //     conversation.messages.push(newMessage._id);
        // }
        
        
//         // SOCKET IO IMPLEMENTATION WILL BE DONE HERE
        
        
//         await conversation.save(); // saving the conversation

        
//         res.status(200).json({message: "Message sent successfully"});

//     }

//     catch(err){
//         console.log("Error in message send controller");
//         res.status(500).json({error: "Internal server error"});
//     }

// }

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

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
		// const receiverSocketId = getReceiverSocketId(receiverId);
		// if (receiverSocketId) {
		// 	// io.to(<socket_id>).emit() used to send events to specific client
		// 	io.to(receiverSocketId).emit("newMessage", newMessage);
		// }

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


export { sendMessage, getMessage }; // Exporting both functions