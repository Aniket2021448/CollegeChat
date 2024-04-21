// import Conversation from "../models/Conversation.model.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const sendMessage = async (req, res) => {
    // console.log("Message send");
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;

        const senderId = req.user._id;  // This user sends the message to the reciever user whose id is tagged in the params
        
        // If any previous conversation found between the sender and receiver
        // then load this one as well. ahead of it
        let conversation = await Conversation.findOne({ 
            members: { $all: [senderId, receiverId] }
        })

        if(!conversation){
            // sending message for the first time
            // set the new converstaion variable
            conversation = new Conversation({
                members : [senderId, receiverId],
            })
        }
        
        // If the conversation is not found, then a new conversation is created, and the message from the req body
        // is fetched and pushed in thier conversation.
        // and if the previous conversation was there, then skipping the above if condition, 
        // the message id is pushed in the conversation directly, to keep track of what they are talking about.
        const newMessage = new Message({ // creating the new message saving in the database
            senderId,
            receiverId,
            message,
        })

        await newMessage.save(); // saving it
        
        if(newMessage){ // if the message is saved successfully, then push it in the conversation, what message is sent 
            // after the conversation is created.
            conversation.messages.push(newMessage._id);
        }
        
        
        // SOCKET IO IMPLEMENTATION WILL BE DONE HERE
        
        
        await conversation.save(); // saving the conversation

        
        res.status(200).json({message: "Message sent successfully"});

    }

    catch(err){
        console.log("Error in message send controller");
        res.status(500).json({error: "Internal server error"});
    }

}

const getMessage = async(req, res) => {

    try {
  
        const {id} = req.params; // get conversation between the current user and the user whose id is tagged in the params
        const currUser = req.user._id; // current user id coming from protectRoute middleware function

        const conversation = await Conversation.findOne({
            members: { $all: [currUser, id] }
        })
        
        if(!conversation){
            return res.status(200).send({messages: []});
        }

        const messages = await Message.find({
            _id: { $in: conversation.messages }
        })
        res.status(200).json(messages);
        
          
    } catch (error) {
        console.log("Error in getMessage controller");
        res.status(500).json({error: "Internal server error"});
    }
}


export { sendMessage, getMessage }; // Exporting both functions