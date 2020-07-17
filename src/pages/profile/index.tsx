import React, { useCallback, useRef, ChangeEvent } from 'react';
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

interface ProfileFormData {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('name is required'),
          email: Yup.string()
            .email('enter a valid email')
            .required('email is required'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: (val) => !!val.length,
            then: Yup.string().required().min(6),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: (val) => !!val.length,
              then: Yup.string().required().min(6),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null])
            .required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password, oldPassword, confirmPassword } = data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                oldPassword,
                password,
                confirmPassword,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);
        console.log(response.data);
        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'alterações feitas com sucesso',
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

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(() => {
          addToast({
            type: 'success',
            title: 'avatar atualizado',
          });
        });
      }
    },
    [addToast],
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
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
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
              name="oldPassword"
              type="password"
              placeholder="senha atual"
            />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova senha"
            />
            <Input
              icon={FiLock}
              name="confirmPassword"
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
