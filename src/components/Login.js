import React, { useRef, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";

import { useKeys } from "../data/AirtableDB";
import { language } from "../utils/constants";

const Login = ({ setIsLoggedIn }) => {
  const inputText = useRef();
  const [showError, setShowError] = useState(false);
  const [isLoading, keys] = useKeys();

  const renderPageName = () => {
    return (
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {language.siteName}
        </h2>
      </div>
    );
  };

  const renderLoginForm = () => {
    return (
      <form className="mt-8 space-y-6" action="#" onSubmit={submitHandler}>
        {renderInput()}
        {renderError()}
        {renderLogInButton()}
      </form>
    );
  };

  const submitHandler = e => {
    e.preventDefault();
    if (keys.some(k => k === inputText.current.value)) {
      setIsLoggedIn(true);
    } else {
      setShowError(true);
    }
  };

  const renderInput = () => {
    return (
      <div className="shadow-sm -space-y-px">
        <label htmlFor="password" className="sr-only">
          {language.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
          placeholder={language.password}
          ref={inputText}
          onFocus={() => setShowError(false)}
        />
      </div>
    );
  };

  const renderError = () => {
    return showError ? (
      <p className="p-2 text-center text-red-900 bg-red-100 rounded-md">
        {language.passwordError}
      </p>
    ) : null;
  };

  const renderLogInButton = () => {
    return (
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        onSubmit={submitHandler}
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon
            className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
            aria-hidden="true"
          />
        </span>
        {language.logIn}
      </button>
    );
  };

  return !isLoading ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {renderPageName()}
        {renderLoginForm()}
      </div>
    </div>
  ) : (
    <h1 className="min-h-screen flex items-center justify-center text-center bg-gray-50">
      {language.loading}
    </h1>
  );
};

export default Login;
