import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AnimationContainer, AvatarInput } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { api } from '../../services/api';
import { useToast } from '../../hooks/toastContext';
import profileSVG from '../../assets/profile.svg';
import { useAuth } from '../../hooks/authContext';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: object) => {
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
          title: 'alteções feitas com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErros = getValidationErrors(err);

          formRef.current?.setErrors(validationErros);

          addToast({
            type: 'error',
            title: 'erro na alteração de dados',
            description: 'ocorreu um erro, cheque seus dados e tente novamente',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <AvatarInput>
            <img
              style={{ color: '#666' }}
              src={user.avatar_url === null ? profileSVG : user.avatar_url}
              alt={user.name}
            />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Meu perfil</h1>

            <Input
              icon={FiUser}
              name="name"
              placeholder="name"
              autoCapitalize="words"
            />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              style={{ marginTop: 15 }}
              icon={FiLock}
              name="old_password"
              type="password"
              placeholder="senha atual"
            />
            <Input
              icon={FiLock}
              name="new_password"
              type="password"
              placeholder="Nova senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmar Senha"
            />
            <Button type="submit">Confirmar mudanças</Button>

            <Link to="/">
              <FiArrowLeft />
              Voltar para Dashboard
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Profile;
