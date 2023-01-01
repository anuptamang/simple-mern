import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginSection from '../../components/Auth/LoginSection';
import { authSelector } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginFormSchema } from '../../utils/validationSchema';
import loginBanner from '../../assets/images/img-login.jpg';
import { login } from '../../redux/auth/authAction';

type IFormInput = {
  email: string;
  password: string;
};

const AuthLogin = () => {
  const { loading } = useAppSelector(authSelector);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch(login({ email: data.email, password: data.password }, reset));
  };

  // function handleSubmit(event: { preventDefault: () => void }) {
  //   event.preventDefault()
  //   dispatch(login({ username: 'kminchelle', password: '0lelplR' }, navigate))
  // }

  return (
    <>
      <LoginSection
        bannerUrl={loginBanner}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loading}
      />
    </>
  );
};

export default AuthLogin;
