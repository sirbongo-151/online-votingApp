import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCreateCandidateMutation } from "../redux/candidateSlice";
import CandidateTable from "../components/CandidateTable";
import Loading from "../components/Loading";

const Candidates = () => {
  const [createCandidate, { isLoading }] = useCreateCandidateMutation();

  const [newCandidate, setNewCandidate] = useState({
    name: "",
    position: "",
    acedemicYear: "",
  });
  const [image, setImage] = useState(null);

  const notifySuccess = () => toast.success("Candidate created successfully");
  const notifyError = () => toast.error("Error creating candidate");

  const handleCandidate = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("name", newCandidate.name);
      formData.append("position", newCandidate.position);
      formData.append("acedemicYear", newCandidate.acedemicYear); // Consider fixing typo to "academicYear"
      formData.append("image", image);
  
      const response = await createCandidate(formData).unwrap();
  
      if (response) {
        notifySuccess();
        setNewCandidate({ name: "", position: "", acedemicYear: "" });
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      notifyError();
    }
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
              onChange={(e) => setImage(e.target.files[0])}
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
              placeholder="Enter academic year"
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
              {isLoading ? <Loading/> : "Save"}
            </button>
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
      <div className="">
        <CandidateTable />
      </div>
    </div>
  );
};

export default Candidates;
