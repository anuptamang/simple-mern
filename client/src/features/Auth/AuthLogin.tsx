import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import loginBanner from '../../assets/images/img-login.jpg';
import LoginSection from '../../components/Auth/LoginSection';
import { login } from '../../redux/auth/authAction';
import { authSelector } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginFormSchema } from '../../utils/validationSchema';

type IFormInput = {
  email: string;
  password: string;
};

const AuthLogin = () => {
  const { loading } = useAppSelector(authSelector);
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
