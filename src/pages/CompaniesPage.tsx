import React from "react";
import coverImage from "../assets/images/Tirhalcover.jpg"; 
import profileImage from "../assets/images/tirhalLogo.jpg"; 
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const CompaniesPage = () => {
  return (
    <div className="font-sans max-w-[1800px] mx-auto p-5">
      {/* Shadow Container for Cover and Profile Section */}
      <div className="bg-white rounded-lg shadow-md mb-5 max-w-[1450px] mx-auto pt-12">
        {/* Cover Photo and Profile Section Container */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-72 overflow-hidden rounded-t-lg">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Section */}
          <div className="flex items-center mt-[-75px] px-10 pb-8 z-10 relative">
            {/* Profile Picture */}
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="ml-5">
              <h1 className="text-3xl font-bold text-orange-500 mt-20">Tirhal</h1>
              <p className="text-lg text-gray-600">Explore the world with us!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Container */}
      <div className="px-5">
        {/* Content Section */}
        <div className="flex gap-5 mt-5">
          {/* Left Column (Smaller) */}
          <div className="flex-1">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h2 className="text-xl font-bold mb-3">About</h2>
              <p>Email: company.maid@pml.com</p>
              <p>Phone: 0122222222</p>
              <p>Address: 2239 6 October City</p>
              <p>Website: www.i8gmol.com</p>
            </div>
          </div>

          {/* Center Column (Larger) */}
          <div className="flex-3">
            {/* Navigation Tabs */}
            <div className="flex justify-between border-b-2 border-gray-200 mb-5">
              <button className="pb-2 px-4 text-gray-600 font-semibold border-b-2 border-[#DF6951]">
                Posts
              </button>
              <button className="pb-2 px-4 text-gray-600 font-semibold hover:text-black">
                About
              </button>
              <button className="pb-2 px-4 text-gray-600 font-semibold hover:text-black">
                Photos
              </button>
              <button className="pb-2 px-4 text-gray-600 font-semibold hover:text-black">
                Videos
              </button>
              <button className="pb-2 px-4 text-gray-600 font-semibold hover:text-black">
                More
              </button>
            </div>

            {/* Feed */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <div className="flex items-center mb-3">
                <img
                  src={profileImage}
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold">User Name</h3>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <p className="text-gray-800">
                This is a sample post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <div className="flex items-center mb-3">
                <img
                  src={profileImage}
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold">Another User</h3>
                  <p className="text-sm text-gray-600">5 hours ago</p>
                </div>
              </div>
              <p className="text-gray-800">
                Another sample post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>

          {/* Right Column (Smaller) */}
          <div className="flex-1">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="font-semibold">All Trips</p>
              <p className="font-semibold">Trending</p>
              <p className="font-semibold">Similar Companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;