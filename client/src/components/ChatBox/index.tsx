import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { BtnLoading } from 'components/UI/BtnLoading';
import { InputForm } from 'components/UI/InputForm';
import { CommentProps } from 'features/SinglePostSection';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import socketIO from 'socket.io-client';
import { commentSchema } from 'utils/validationSchema';
import { useAuth } from 'hooks/useAuth';
import SendIcon from '@mui/icons-material/Send';
import Messages from './Messages';
import sentTone from 'assets/sound/sent.mp3';
import receiveTone from 'assets/sound/receive.mp3';

let socket: any;
const BASE_URL = 'http://localhost:2000';

type Props = {};

export type ChatProps = {
  text: string;
};

const ChatBox = (props: Props) => {
  const auth = useAuth();
  const user = auth?.result;
  const [userid, setId] = useState<string>('');
  const [messages, setMessages] = useState<any>([]);

  const audioSent = new Audio(sentTone);
  const audioReceive = new Audio(receiveTone);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChatProps>({
    defaultValues: {
      text: '',
    },
    resolver: yupResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<ChatProps> = async (data: ChatProps) => {
    const { text } = data;
    socket.emit('message', { message: text, userid });
    audioSent.play();
    reset();
  };

  useEffect(() => {
    socket = socketIO(BASE_URL, { transports: ['websocket'] });

    socket.on('connect', () => {
      setId(socket.id);
    });

    socket.emit('joined', { user });

    socket.on('welcome', (data: any) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('sendMsg', (data: any) => {
      setMessages([...messages, data]);
      audioReceive.play();
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Chat Area
      </Typography>
      <Box
        sx={{
          marginBottom: '20px',
          position: 'relative',
          background: '#3d4d65',
          borderRadius: '10px',
          overflow: 'hidden',
          '&::before': {
            content: "''",
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background:
              'linear-gradient(to bottom, rgba(61,77,101,0) 0%,rgba(61,77,101,1) 100%)',
          },
        }}
      >
        <Box sx={{ maxHeight: '400px', padding: '20px 20px 80px', overflowY: 'auto' }}>
          {messages.map((item: any, key: any) => (
            <Messages
              key={key}
              message={item.message}
              user={item.userid === userid ? '' : item.user}
              className={
                item.userid === userid
                  ? 'right'
                  : item.user === 'Admin'
                  ? 'admin'
                  : 'left'
              }
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Controller
          rules={{ required: true }}
          name="text"
          control={control}
          render={({ field }) => (
            <InputForm
              sx={{
                '& .MuiInputBase-input': {
                  paddingRight: '100px',
                },
              }}
              fullWidth
              label={'Write a message..'}
              {...field}
            />
          )}
        />
        {/* <p>{errors.text?.message}</p> */}
        <BtnLoading
          variant="contained"
          loading={false}
          loadingPosition="center"
          type="submit"
          sx={{
            position: 'absolute',
            right: '15px',
            top: '13px',
            zIndex: '10',
          }}
        >
          <SendIcon
            sx={{
              transform: 'rotate(-30deg)',
              position: 'relative',
              top: '-3px',
              color: '#0377d6',
            }}
          />
        </BtnLoading>
      </Box>
    </Box>
  );
};

export default ChatBox;
