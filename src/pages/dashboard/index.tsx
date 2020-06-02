/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useCallback } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  NextAppointment,
  Content,
  Schedule,
  Calendar,
  Section,
  Appointment,
} from './styles';
import { useAuth } from '../../hooks/authContext';
import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);
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

          <Section>
            <strong>Manhã:</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://skylab.rocketseat.com.br/api/users/avatar/profile-dcb1b7ca-0688-4170-ab8a-8f0e470066a3.jpg"
                  alt=""
                />
                <strong> João Victor</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>
              <div>
                <img
                  src="https://skylab.rocketseat.com.br/api/users/avatar/profile-dcb1b7ca-0688-4170-ab8a-8f0e470066a3.jpg"
                  alt=""
                />
                <strong> João Victor</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>
              <div>
                <img
                  src="https://skylab.rocketseat.com.br/api/users/avatar/profile-dcb1b7ca-0688-4170-ab8a-8f0e470066a3.jpg"
                  alt=""
                />
                <strong> João Victor</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde:</strong>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDayChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
