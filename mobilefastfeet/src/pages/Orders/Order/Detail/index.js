import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';

import {
  Container,
  Content,
  OrderDiv,
  Card,
  CardButtons,
  TitleOrder,
  TitleText,
  OrderLabel,
  OrderText,
  OrderDate,
  Buttons,
  ButtonContent,
  ButtonText,
} from './styles';

export default function Detail({ route, navigation }) {
  const [startDate, setStartDate] = useState('-- / -- / --');
  const [endDate, setEndDate] = useState('-- / -- / --');

  const { order } = route.params;
  useEffect(() => {
    if (!order.canceled_at) {
      if (order.end_date) {
        setEndDate(format(parseISO(order.end_date), 'dd/MM/yy'));
      }
      if (order.start_date) {
        setStartDate(format(parseISO(order.start_date), 'dd/MM/yy'));
      }
    }
  }, [order]);
  const handleFinish = () => {
    if (order && !order.canceled_at) {
      if (!order.start_date) {
        Alert.alert(
          'Retirada de Entrega',
          'Você ainda não retirou a entrega, deseja retirar esta entrega?',
          [
            {
              text: 'Sim',
              onPress: async () => {
                try {
                  const response = await api.put(`/order/${order.id}/collect`);
                  if (response.data) {
                    setStartDate(
                      format(parseISO(response.data.start_date), 'dd/MM/yy')
                    );
                    Alert.alert('Sucesso', 'Retirada finalizada com sucesso');
                    // //
                    //                     navigation.goBack();
                  }
                } catch (error) {
                  Alert.alert('Erro', 'Erro na Retirada da entrega');
                }
              },
            },
            {
              text: 'Não',
              onPress: async () => {},
            },
          ]
        );
      } else {
        navigation.navigate('Finish', { order });
      }
    } else {
      Alert.alert(
        'Critica',
        'Esta entrega esta cancelada! Operação não permitida.',
        [
          {
            text: 'OK',
            onPress: async () => {},
          },
        ]
      );
    }
  };

  const handleProblems = () => {
    navigation.navigate('Problems', { orderId: order.id });
  };
  const handleAddProblem = () => {
    if (order && !order.canceled_at) {
      navigation.navigate('AddProblem', { orderId: order.id });
    } else {
      Alert.alert(
        'Critica',
        'Esta entrega esta cancelada! Operação não permitida.',
        [
          {
            text: 'OK',
            onPress: async () => {},
          },
        ]
      );
    }
  };

  return (
    <Container>
      <Content>
        <Card>
          <TitleOrder>
            <Icon name="local-shipping" size={22} color="#7d3fe7" />
            <TitleText>Informações da entrega</TitleText>
          </TitleOrder>
          <OrderLabel>DESTINATÁRIO</OrderLabel>
          <OrderText>{order.recipient.name}</OrderText>
          <OrderLabel space="6px">ENDEREÇO DE ENTREGA</OrderLabel>
          <OrderText>{`${order.recipient.address}, ${order.recipient.number} ${order.recipient.complement},${order.recipient.city} ${order.recipient.state} ${order.recipient.zipcode}`}</OrderText>
          <OrderLabel space="6px">PRODUTO</OrderLabel>
          <OrderText>{order.product}</OrderText>
        </Card>
        <Card>
          <TitleOrder>
            <Icon name="event" size={18} color="#7d3fe7" />
            <TitleText>Situação da entrega</TitleText>
          </TitleOrder>
          <OrderLabel>STATUS</OrderLabel>
          <OrderText canceled={order.status === 'CANCELADO'}>
            {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
          </OrderText>
          <OrderDate>
            <OrderDiv>
              <OrderLabel>DATA DE RETIRADA</OrderLabel>
              <OrderText>{startDate}</OrderText>
            </OrderDiv>
            <OrderDiv>
              <OrderLabel>DATA DE ENTREGA</OrderLabel>
              <OrderText>{endDate}</OrderText>
            </OrderDiv>
          </OrderDate>
        </Card>
        <CardButtons>
          <Buttons>
            <ButtonContent onPress={handleAddProblem}>
              <Icon name="highlight-off" size={23} color="#DE3B3B" />
              <ButtonText>Informar Problema</ButtonText>
            </ButtonContent>
            <ButtonContent onPress={handleProblems}>
              <Icon
                name="error-outline"
                size={23}
                color="#E7BA40"
                style={{
                  transform: [{ rotateX: '180deg' }],
                }}
              />
              <ButtonText>Visualizar Problemas</ButtonText>
            </ButtonContent>
            <ButtonContent onPress={handleFinish}>
              <IconMC name="check-circle-outline" size={23} color="#795CE1" />
              <ButtonText>
                {order.start_date ? 'Confirmar Entrega' : 'Confirmar Retirada'}
              </ButtonText>
            </ButtonContent>
          </Buttons>
        </CardButtons>
      </Content>
    </Container>
  );
}
