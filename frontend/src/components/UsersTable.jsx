import React from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../redux/apiSlice';
import { Edit, Trash } from 'lucide-react';

const UsersTable = () => {
    const { data, isLoading, isError } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation()

    // Extract users array correctly
    const users = Array.isArray(data?.data) ? data.data : [];

    if (isLoading) return <p className="text-center mt-5">Loading...</p>;
    if (isError) return <p className="text-center mt-5 text-red-500">Error fetching users.</p>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border-b-2 border-gray-400 m-auto mt-5">
                <thead>
                    <tr>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">Username</th>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">Email</th>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">Role</th>
                        <th className="border p-2 text-center text-2xl bg-gray-500 text-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border">
                            <td className="border p-2 text-center">{user.name}</td>
                            <td className="border p-2 text-center">{user.email}</td>
                            <td className="border p-2 text-center">{user.role || 'N/A'}</td>
                            <td className="border p-2 text-center">
                                <button className=" text-green-800 hover:text-green-500 px-3 py-1 rounded"><Edit/></button>
                                <button className=" text-red-800 hover:text-red-500 px-3 py-1 rounded ml-2" onClick={()=>deleteUser(user._id)}><Trash/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
