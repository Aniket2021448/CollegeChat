// // Message.jsx

// import React, { useState } from "react";
// import axios from "axios"; // Import Axios
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";
// import DeletePopup from "./DeletePopup";

// const Message = ({ message }) => {
//     const { authUser } = useAuthContext();
//     const { selectedConversation } = useConversation();
//     const fromMe = message.senderId === authUser._id;
//     const formattedTime = extractTime(message.createdAt);
//     const chatClassName = fromMe ? "chat-end" : "chat-start";
//     const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
//     const bubbleBgColor = fromMe ? "bg-blue-500" : "";

//     const [showDeletePopup, setShowDeletePopup] = useState(false);

//     const handleRightClick = (e) => {
//         e.preventDefault();
//         setShowDeletePopup(true);
//     };

//     const handleDeleteForEveryone = async () => {
//         try {
//             // Send DELETE request to backend API
//             await axios.delete(`/api/messages/deleteForEveryone/${message._id}`);

//             // For demo purposes, log success message
//             console.log("From frontend Message deleted for everyone");

//             // Close the popup after successful deletion
//             setShowDeletePopup(false);
//         } catch (error) {
//             console.error("Error deleting message:", error);
//             // Handle error (e.g., show error message to user)
//         }
//     };

//     return (
//         <div className={`chat ${chatClassName}`} onContextMenu={handleRightClick}>
//             <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                     <img alt="Profile" src={profilePic} />
//                 </div>
//             </div>
//             <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
//             <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
//             {showDeletePopup && <DeletePopup onDelete={handleDeleteForEveryone} />}
//         </div>
//     );
// };

// export default Message;





// Working code below


import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";


	


	return (
		<div className={`chat ${chatClassName}`} >
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;