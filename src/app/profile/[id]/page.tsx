// app/profile/[id]/page.tsx
export default async function UserProfile({ params }: { params: { id: string } }) {
    // Here, you can perform async operations if needed, such as fetching user data.
    
    // For example:
    // const userData = await fetchUserData(params.id);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full text-center transform transition duration-500 hover:scale-105">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">User Profile</h1>
                <hr className="border-gray-300 mb-6" />
                
                <p className="text-2xl text-gray-700 mb-4">
                    Welcome to the profile page, 
                    <span className="p-2 ml-2 rounded bg-orange-500 text-black font-semibold">{params.id}</span>
                </p>
                
                <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
