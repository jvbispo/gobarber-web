/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  NextAppointment,
  Content,
  Schedule,
  Calendar,
} from './styles';
import { useAuth } from '../../hooks/authContext';
import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="Go Barber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <strong> {user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={() => signOut()}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horário agendados</h1>
          <p>
            <span>Hoje</span>
            <span>dia 6</span>
            <span>segunda</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir:</strong>
            <div>
              <img
                src="https://skylab.rocketseat.com.br/api/users/avatar/profile-dcb1b7ca-0688-4170-ab8a-8f0e470066a3.jpg"
                alt=""
              />
              <strong> João Victor</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
