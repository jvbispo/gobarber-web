import React, { useCallback, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background, AnimationContainer } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/authContext';
import { useToast } from '../../hooks/toastContext';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { user, signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        console.log('error');
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('enter a valid email')
            .required('email is required'),
          password: Yup.string().required('password is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErros = getValidationErrors(err);

          formRef.current?.setErrors(validationErros);

          addToast({
            type: 'error',
            title: 'erro na autenticação',
            description: 'ocorreu um erro, cheque suas credenciais',
          });
        }
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="goBarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu login</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar minha conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
