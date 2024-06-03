// DeletePopup.jsx

import React from "react";
import useDeleteForEveryone from "../../hooks/useDeleteForEveryone";

const DeletePopup = ({ onDelete, onClose }) => {
    const handleDelete = async () => {
        try {
            await onDelete(); // Call the onDelete function (which sends the DELETE request)
            onClose(); // Close the popup after successful deletion
        } catch (error) {
            console.error("Error deleting message:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <p>Are you sure you want to delete this message for everyone?</p>
                <div className="flex justify-between mt-2">
                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                        Delete for Everyone
                    </button>
                    <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;
