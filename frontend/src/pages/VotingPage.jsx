
import { useGetCandidatesQuery } from "../redux/candidateSlice"
import CandidateCard from "../components/CandidateCard";


const VotingPage = () => {


  const { data, isLoading, error } = useGetCandidatesQuery();

  console.log("Candidates Data:", data); // Debugging

  if (isLoading) return <p>Loading candidates...</p>;
  if (error) return <p>Error fetching candidates</p>;
  if (!data || !Array.isArray(data.data)) return <p>No candidates found</p>;


  return (
    <div className="w-screen h-screen">
   {data.length === 0 && (
      
      <div className="flex flex-wrap items-center justify-center px-8 bg-orange-500">
      <h1 className='text-5xl sm:text-7xl md:text-8xl  font-bold text-center text-gray-700 '>No voting list Today </h1>
  
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-makes-candidate-registration-illustration-download-in-svg-png-gif-file-formats--ballot-box-voting-day-election-container-business-and-finance-pack-illustrations-10957163.png?f=webp" alt="" className='h-70 mx-auto' />
  </div>
   )}
    
        <div className="my-10">
<h1 className='text-5xl sm:text-7xl md:text-8xl  font-bold text-center text-gray-700 mt-8 '>Voting list Today </h1>
<div className=" flex flex-wrap my-10 items-center justify-center gap-5">
</div>
        <div className="flex flex-wrap justify-center items-center gap-6">
            {data.data.map((candidate) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
            ))}
        </div>

</div>
  
  
      


</div>
  );
};

export default VotingPage;



//bg-linear-to-bl from-violet-500 to-fuchsia-500

// https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202410/MIT-Polarization-Models-01-press_0.jpg?itok=Ldlc9WF1

{/* <div className="w-screen h-screen">
<div className="flex flex-wrap items-center justify-center px-8 bg-orange-500">
    <h1 className='text-5xl sm:text-7xl md:text-8xl  font-bold text-center text-white '>No voting list Today </h1>

    <img src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-makes-candidate-registration-illustration-download-in-svg-png-gif-file-formats--ballot-box-voting-day-election-container-business-and-finance-pack-illustrations-10957163.png?f=webp" alt="" className='h-70 mx-auto' />
</div>
<div className="">
<h1 className='text-5xl sm:text-7xl md:text-8xl  font-bold text-center text-green-700 mt-8 text-upper-ca'>Voting list Today </h1>
</div>
<div className="flex flex-wrap gap-3 justify-center items-center my-16">
{candidates.map((candidate) => (
<CandidateCard key={candidate._id} candidate={candidate} /> // ✅ Pass the candidate prop
))}
</div>
</div>
)
} */}