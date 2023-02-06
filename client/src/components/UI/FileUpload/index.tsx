import ImageIcon from '@mui/icons-material/Image';
import { Box, Input, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const FileUpload = ({ setThumbnail, thumbnail }: any) => {
  const [previewUrl, setPreviewUrl] = useState<null | string>(null);

  const handleChange = (file: any) => {
    console.log(file);
    setThumbnail(file);
    setPreviewUrl(URL.createObjectURL(file[0]));
  };

  useEffect(() => {
    thumbnail && setPreviewUrl(thumbnail);
  }, []);

  return (
    <>
      <Typography sx={{ marginBottom: '10px' }}>Choose Thumbnail:</Typography>
      <Box sx={{ position: 'relative', width: '150px' }}>
        {previewUrl ? (
          <img
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src={previewUrl}
            alt="thumbnail"
          />
        ) : (
          <ImageIcon sx={{ fontSize: '80px' }} />
        )}

        <Input
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100% !important',
            height: '100% !important',
            opacity: 0,
            zIndex: '88',
            cursor: 'pointer',
            '& input': {
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100% !important',
              height: '100% !important',
              opacity: 0,
              zIndex: '88',
              cursor: 'pointer',
            },
          }}
          type="file"
          onChange={(e: any) => {
            handleChange(e.target.files);
          }}
          required
        />
      </Box>
    </>
  );
};

export default FileUpload;
