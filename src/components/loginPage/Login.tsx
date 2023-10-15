'use client';

// import { sencondaryColor } from '@/constants/colors';
// import { useUserLoginMutation } from '@/redux/api/authApi';
// import { storeUserInfo } from '@/services/auth.service';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import Form from '../ui/Form/Form';
import FormInput from '../ui/Form/FormInput';

type FormValues = {
  id: string;
  password: string;
};

function Login() {
  //   const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log(data);
      //   const res = await userLogin({ ...data }).unwrap();

      //   if (res?.accessToken) {
      //     router.push('/profile');
      //     message.success('User logged in successfully');
      //   }

      //   storeUserInfo({ accessToken: res?.accessToken });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row justify="center" align="middle" className="h-screen">
      <Col
        sm={16}
        md={14}
        lg={10}
        style={{ marginTop: '-96px' }}
        className=" bg-teal-50 p-8 rounded-md"
      >
        <h1 className=" text-center text-2xl text-teal-900 font-bold mb-8 capitalize">
          Login first before decorate your house
        </h1>
        <div>
          <Form submitHandler={onSubmit} isReset={false}>
            <div>
              <FormInput
                type="text"
                size="large"
                name="id"
                label="Your Email"
                required
              />
            </div>
            <div
              style={{
                margin: '15px 0px',
              }}
            >
              <FormInput
                type="password"
                size="large"
                name="password"
                label="Your Password"
                required
              />
            </div>
            <button
              type="submit"
              className=" w-full py-2 rounded-md text-white text-lg bg-hcOrange-base"
            >
              Login
            </button>
          </Form>
          <p className="mt-1">
            Do not have an account? <Link href="/register">Signup first</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
