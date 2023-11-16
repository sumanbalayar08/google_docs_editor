import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Editor = () => {

  const { iddocs: documentId } = useParams();
  const [value, setValue] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/doc/${documentId}`);
      // Set the value to the data received from the server
      //setValue(res.data);
      console.log(res);
    } catch (error) {
      console.log("Internal Server Error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // This function will be called after 5 seconds of inactivity
    console.log(documentId)
    const updateDocument = async () => {
      try {
        const res = await axios.put(
          `http://localhost:4000/update/${documentId}`,
          {
            content: value,
          }
        );
        console.log("Document updated:", value);
      } catch (error) {
        console.error("Error updating document:", error);
      }
    };

    // Set a timeout to call the updateDocument function after 5 seconds of inactivity
    const timeoutId = setTimeout(updateDocument, 5000);

    // Clean up the timeout on component unmount or when value changes
    return () => clearTimeout(timeoutId);
  }, [value, documentId]);


  const handleChange = (content) => {
    setValue(content);
  };

  return <ReactQuill theme="snow" value={value} onChange={handleChange} />;
};

export default Editor;
