import React, { useState } from 'react';
import { useVoteCandidateMutation } from '../redux/candidateSlice';
import { useNavigate } from 'react-router-dom'; 

const CandidateVotes = ({ candidate , candidateId}) => { 
  const [voteCandidate, { isLoading }] = useVoteCandidateMutation();
  const [voted, setVoted] = useState(false); 
  const navigate = useNavigate();

  const handleVote = async () => {
    // // console.log("Candidate ID:", candidate?._id || candidateId);
    // try {
    //     await voteCandidate(candidate?._id || candidateId);
    //     setVoted(true); 
    //     alert("Thank you for voting, your vote has been counted!");

    //     navigate('/login');
    // } catch (error) {
    //     alert("Something went wrong. Please try again.");
    // }
};

  return (
    <div className="w-70 h-120 border-2 p-2 border-gray-600 bg-gray-200 rounded-2xl">
      <img src={candidate.image} alt="passportpicture" className='h-60 mx-auto shadow-lg'/>
      <h3 className='text-3xl text-center font-bold p-2'>{candidate.name}</h3>
      <p className='text-xl text-center font-bold'>{candidate.position}</p>
      <p className='text-lg text-center font-bold'>{candidate.academicYear}</p>
      
        <div className='flex flex-col justify-center items-center bg-white'>
          <p className='text-lg text-cent'>NUMBER VOTES: </p>
          <h1 className='text-5xl font-bold text-purple-800'>{candidate.votes}</h1>
          </div>
    </div>
  );
};

export default CandidateVotes;
