
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCreateCandidateMutation } from "../redux/candidateSlice";
import CandidateTable from '../components/CandidateTable';
const Candidates = () => {
      const [newCandidate, setNewCandidate] = useState({
        name: "",
        image: "",
        position: "",
        acedemicYear: "",
      });
    
      // Hook should be called at the top level
      const [createCandidate, { isLoading }] = useCreateCandidateMutation();
    
      const notifySuccess = () => toast.success("User created successfully");
      const notifyError = () => toast.error("Error creating user");
    
      const handleCandidate = async (e) => {
        e.preventDefault();
        const { name, image, position, acedemicYear } = newCandidate;
        if (!name || !image || !position || !acedemicYear) {
          notifyError("All fields are required");
          return;
        }
    
        // try {
          const response = await createCandidate({name,image,position,acedemicYear})
          console.log(response);
          if (response) {
            notifySuccess();
            setNewUser({ name: "", image: "", position: "", acedemicYear: "" });
          }
        // } catch (error) {
        //   notifyError( "Failed to create candidate");
        // }
        
      };
    
  return (
   <div className="flex flex-col justify-center items-center">
              <div className="justify-center items-center">
                <div className="w-120 border-2 border-gray-400 rounded-3xl shadow-xl p-6">
                  <h1 className="text-2xl font-bold text-center mb-6">Add New Candidate</h1>
                  <form onSubmit={handleCandidate} className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={newCandidate.name}
                      onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                      className="w-full border-b-2 outline-none p-2"
                      required
                    />
                    
                    <input
                      type="file"
                      placeholder="Enter image"
                      value={newCandidate.image}
                      onChange={(e) => setNewCandidate({ ...newCandidate, image: e.target.value })}
                      className="w-full border-b-2 outline-none p-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Enter position"
                      value={newCandidate.position}
                      onChange={(e) => setNewCandidate({ ...newCandidate, position: e.target.value })}
                      className="w-full border-b-2 outline-none p-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Enter acedemicYear"
                      value={newCandidate.acedemicYear}
                      onChange={(e) => setNewCandidate({ ...newCandidate, acedemicYear: e.target.value })}
                      className="w-full border-b-2 outline-none p-2"
                      required
                    />
                    <button
                      type="submit"
                      className={`w-full text-white text-xl p-2 rounded-2xl transition-all ${
                        isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-600"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </form>
                  <ToastContainer position="top-right" autoClose={3000} />
                </div>
                </div>
    <div className="">
     <CandidateTable/>
    </div>
   </div>
  )
}

export default Candidates