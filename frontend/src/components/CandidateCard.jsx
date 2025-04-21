import React, { useState } from 'react';
import { useVoteCandidateMutation } from '../redux/candidateSlice';
import { useNavigate } from 'react-router-dom'; 

const CandidateCard = ({ candidate , candidateId}) => { 
  const [voteCandidate, { isLoading }] = useVoteCandidateMutation();
  const [voted, setVoted] = useState(false); 
  const navigate = useNavigate();

  const handleVote = async () => {
    // console.log("Candidate ID:", candidate?._id || candidateId);
    try {
        await voteCandidate(candidate?._id || candidateId);
        setVoted(true); 
        alert("Thank you for voting, your vote has been counted!");

        navigate('/login');
    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
};

  return (
    <div className="w-64 h-120 border-2 p-2 border-gray-600 bg-gray-200 rounded-2xl">
      <img src={candidate.image} alt="passportpicture" className='h-60 mx-auto shadow-lg'/>
      <h3 className='text-3xl text-center text-gray-900 font-bold p-2'>{candidate.name}</h3>
      <p className='text-xl text-center text-gray-900 font-bold pb-2'>{candidate.position}</p>
      <p className='text-lg text-center text-gray-900 font-bold'>{candidate.academicYear}</p>
      
      <button 
        className='bg-green-800 transition delay-110 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 h-16 w-full rounded-2xl cursor-pointer text-2xl text-center text-white font-bold' 
        onClick={handleVote} 
        disabled={voted || isLoading}
      >
        {voted ? "Voted" : "Vote"}
      </button>
    </div>
  );
};

export default CandidateCard;
