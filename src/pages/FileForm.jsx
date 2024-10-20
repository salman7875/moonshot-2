import React, { useRef, useState } from "react";
import { localURL } from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";

const FileForm = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file before submitting.");
      return;
    }
    try {
      const formData = new FormData(formRef.current);
      const res = await fetch(`${localURL}/upload-file`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  return (
    <>
      {error ? <p className="text-center text-red-500">{error}</p> : null}
      <form
        ref={formRef}
        onSubmit={handleUploadFile}
        className="p-8 flex flex-col space-y-4"
      >
        <label
          htmlFor="file"
          className="py-2 text-center bg-slate-300 font-semibold rounded-lg cursor-pointer hover:opacity-80"
        >
          Upload Your File:
        </label>
        <input
          type="file"
          name="file"
          id="file"
          hidden={true}
          onChange={handleChange}
        />
        <div className="flex w-full space-x-8">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="flex-1 py-2 text-lg bg-teal-500 text-white font-semibold"
          >
            Back to Home
          </button>
          <button
            type="submit"
            className="flex-1 py-2 text-lg bg-teal-500 text-white font-semibold"
          >
            Upload File
          </button>
        </div>
      </form>
    </>
  );
};

export default FileForm;
