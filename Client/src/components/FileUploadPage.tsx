import { Button } from "@mui/material";
import { ChangeEvent } from "react";

interface FileUploadProp {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  uploadFile: () => void;
}

const FileUploadPage: React.FC<FileUploadProp> = ({
  handleFileChange,
  uploadFile,
}) => {
  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={uploadFile}>
        Upload Flights
      </Button>
    </>
  );
};

export default FileUploadPage;

