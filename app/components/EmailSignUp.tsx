import React from "react";

const EmailSignUp = () => {
  return (
    <form className="flex flex-col items-start space-y-2">
      <label htmlFor="email" className="mb-2 font-bold text-lg">
        Sign up
      </label>
      <div className="flex">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default EmailSignUp;
