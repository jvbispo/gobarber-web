import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FiMail } from 'react-icons/fi';
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
import { api } from '../../services/api';

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user } = useAuth();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('enter a valid email')
            .required('email is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'recuperação de senha',
          description:
            'Em instantes enviaremos um email com os passos para recuperar sua senha',
        });

        history.push('abs');
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
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Link to="/">
            <img src={Logo} alt="goBarber" />
          </Link>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Recuperar senha</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
