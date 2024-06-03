


import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations, friends } = useGetConversations();
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{friends.map((friend, idx) => (
                <Conversation
                    key={friend._id}
                    conversation={friend}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === friends.length - 1}
                />
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;