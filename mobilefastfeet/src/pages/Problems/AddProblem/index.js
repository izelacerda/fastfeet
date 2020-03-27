import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
  Container,
  Content,
  Card,
  ProblemDiv,
  InputProblem,
  SendButton,
} from './styles';
import api from '~/services/api';

export default function AddProblem({ route, navigation }) {
  const { orderId } = route.params;
  const [description, setProblem] = useState();

  const handleSend = async () => {
    if (!description || description.length <= 0) {
      Alert.alert('Erro', 'Informe a Descrição do Problema');
    } else {
      try {
        await api.post(`/order/${orderId}/problems`, {
          description,
        });
        Alert.alert('Sucesso', 'Problema incluído com sucesso!');
        setProblem('');
      } catch (error) {
        Alert.alert('Erro', `Erro ao gravar o problema ${error}`);
      }
    }
  };
  return (
    <Container>
      <Content>
        <Card>
          <InputProblem
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            editable
            multiline
            returnKeyType="go"
            value={description}
            onChangeText={setProblem}
          />
        </Card>
        <ProblemDiv>
          <SendButton onPress={handleSend}>Enviar</SendButton>
        </ProblemDiv>
      </Content>
    </Container>
  );
}
