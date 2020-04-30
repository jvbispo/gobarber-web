import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background, AnimationContainer } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { api } from '../../services/api';
import { useToast } from '../../hooks/toastContext';
import Logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('name is required'),
        email: Yup.string()
          .email('enter a valid email')
          .required('email is required'),
        password: Yup.string().min(6),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'cadastro criado com sucesso',
        description: 'voce ja pode fazer seu logon',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErros = getValidationErrors(err);

        formRef.current?.setErrors(validationErros);

        addToast({
          type: 'error',
          title: 'erro no cadastro',
          description: 'ocorreu um erro, cheque seus dados e tente novamente',
        });
      }
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="goBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input
              icon={FiUser}
              name="name"
              placeholder="name"
              autoCapitalize="words"
            />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Cadastrar</Button>

            <Link to="/">
              <FiArrowLeft />
              Voltar para Login
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
