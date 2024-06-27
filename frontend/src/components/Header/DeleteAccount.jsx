import React from "react";

export default function DeleteAccount({ setShowCofirmDeletion }) {
  return (
    <button
    className='bg-red-500 text-white'
    onClick={() => setShowCofirmDeletion(true)}
    >
      Delete Account
    </button>
  );
}