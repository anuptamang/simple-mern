import { Input } from '@mui/material';

const FileUpload = ({ setThumbnail }: any) => {
  return (
    <Input
      type="file"
      onChange={(e: any) => {
        setThumbnail(e.target.files);
      }}
      required
    />
  );
};

export default FileUpload;
