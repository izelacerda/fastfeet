import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import {
  Container,
  Head,
  TitleOrder,
  TitleText,
  List,
  Card,
  ProblemText,
  CreatedText,
} from './styles';
import api from '~/services/api';

export default function Problems({ route }) {
  const orderId = new Intl.NumberFormat('pr-BR', {
    style: 'decimal',
    minimumIntegerDigits: '2',
  }).format(route.params.orderId);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`/order/${orderId}/problems`);
      if (response.data.length > 0) {
        const list = response.data.map(p => ({
          ...p,
          created_date: format(parseISO(p.created_at), 'dd/MM/yyyy'),
        }));
        setProblems([...list]);
      }
    }
    if (orderId) {
      loadProblems();
    }
  }, [orderId]);

  return (
    <Container>
      <TitleOrder>
        <TitleText>Encomenda {orderId}</TitleText>
      </TitleOrder>
      <Head />
      <List
        data={problems}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Card>
            <ProblemText>{item.description}</ProblemText>
            <CreatedText>{item.created_date}</CreatedText>
          </Card>
        )}
      />
    </Container>
  );
}
