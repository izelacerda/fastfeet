import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  TitleOrder,
  TitleText,
  StatusOrder,
  StatusPoint,
  StatusText,
  DataOrder,
  DataColumn,
  DataCabec,
  DataText,
  Details,
} from './styles';

export default function Order({ navigation, order }) {
  const [createdAt, setCreatedAt] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (order) {
      setCreatedAt(format(parseISO(order.createdAt), 'dd/MM/yyyy'));
      setOrderNumber(
        new Intl.NumberFormat('pr-BR', {
          style: 'decimal',
          minimumIntegerDigits: '2',
        }).format(order.id)
      );
    }
  }, [order]);

  const handleOrderDetail = order => {
    navigation.navigate('Detail', { order });
  };

  return (
    <Container>
      <TitleOrder>
        <Icon name="local-shipping" size={25} color="#7d3fe7" />
        <TitleText>Encomenda {orderNumber}</TitleText>
      </TitleOrder>
      <StatusOrder canceled={order.status === 'CANCELADO'}>
        <StatusPoint
          canceled={order.status === 'CANCELADO'}
          active={
            order.status === 'PENDENTE' ||
            order.status === 'RETIRADO' ||
            order.status === 'ENTREGUE'
          }
        >
          <StatusText>Aguardando Retirada</StatusText>
        </StatusPoint>
        <StatusPoint
          canceled={order.status === 'CANCELADO'}
          active={order.status === 'RETIRADO' || order.status === 'ENTREGUE'}
        >
          <StatusText>Retirada</StatusText>
        </StatusPoint>
        <StatusPoint
          canceled={order.status === 'CANCELADO'}
          active={order.status === 'ENTREGUE'}
        >
          <StatusText>Entregue</StatusText>
        </StatusPoint>
      </StatusOrder>
      <DataOrder>
        <DataColumn>
          <DataCabec>Data</DataCabec>
          <DataText>{createdAt}</DataText>
        </DataColumn>
        <DataColumn>
          <DataCabec>Cidade</DataCabec>
          <DataText>{order.recipient.city}</DataText>
        </DataColumn>
        <TouchableOpacity onPress={() => handleOrderDetail(order)}>
          <Details canceled={order.status === 'CANCELADO'}>
            Ver Detalhes
          </Details>
        </TouchableOpacity>
      </DataOrder>
    </Container>
  );
}
