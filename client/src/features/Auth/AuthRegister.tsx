import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { register } from 'redux/auth/authAction';
import loginBanner from '../../assets/images/img-login.jpg';
import RegisterSection from '../../components/Auth/RegisterSection';
import { authSelector } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registerFormSchema } from '../../utils/validationSchema';

type IFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const AuthRegister = () => {
  const { loading } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch(register(data, reset));
  };

  return (
    <>
      <RegisterSection
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

export default AuthRegister;
