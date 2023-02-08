import { yupResolver } from '@hookform/resolvers/yup';
import ForgotSection from 'components/Auth/ForgotSection';
import { SubmitHandler, useForm } from 'react-hook-form';
import loginBanner from '../../assets/images/img-login.jpg';
import { login } from '../../redux/auth/authAction';
import { authSelector } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginFormSchema } from '../../utils/validationSchema';
import { useNavigate } from 'react-router-dom';

type IFormInput = {
  email: string;
  password: string;
};

const AuthForgotPassword = () => {
  const { loading } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    dispatch(
      login({ email: data.email, password: data.password }, reset, navigate)
    );
  };

  return (
    <>
      <ForgotSection
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

export default AuthForgotPassword;
