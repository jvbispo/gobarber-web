/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background, AnimationContainer } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/authContext';
import { useToast } from '../../hooks/toastContext';
import { api } from '../../services/api';

interface FormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, signIn } = useAuth();
  const handleSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('password is required'),
          // eslint-disable-next-line @typescript-eslint/camelcase
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null])
            .required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // api
        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
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
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Link to="/">
            <img src={Logo} alt="goBarber" />
          </Link>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Resete sua senha</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="nova senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="confirme sua senha"
            />

            <Button type="submit">Resetar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
