import React from 'react';
import { useGetCandidatesQuery, useDeleteCandidateMutation} from '../redux/candidateSlice';
import { Edit, Trash } from 'lucide-react';

const CandidateTable = () => {
    const { data, isLoading, isError } = useGetCandidatesQuery();
    const [deleteCandidate] = useDeleteCandidateMutation()

    // Extract users array correctly
    const candidates = Array.isArray(data?.data) ? data.data : [];

    if (isLoading) return <p className="text-center mt-5">Loading...</p>;
    if (isError) return <p className="text-center mt-5 text-red-500">Error fetching users.</p>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border-b-2 border-gray-400 m-auto mt-5">
                <thead>
                    <tr>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">Names</th>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">Images</th>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">Position</th>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">AcedemicYear</th>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">No. of Votes</th>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((candidate) => (
                        <tr key={candidate._id} className="border">
                            <td className="border p-2 text-center">{candidate.name}</td>
                            <td className="border p-2 text-center">{candidate.image}</td>
                            <td className="border p-2 text-center">{candidate.position}</td>
                            <td className="border p-2 text-center">{candidate.academicYear}</td>
                            <td className="border p-2 text-center">{candidate.votes}</td>
                            <td className="border p-2 text-center">
                                <button className=" text-green-800 hover:text-green-500 px-3 py-1 rounded"><Edit/></button>
                                <button className=" text-red-800 hover:text-red-500 px-3 py-1 rounded ml-2" onClick={()=>deleteCandidate(candidate._id)}><Trash/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateTable;
