import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';

import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';
import { dicalogin } from '~/utils/geral';

import Order from './Order';
import Background from '~/components/Background';

import {
  Container,
  Header,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  HeaderList,
  Title,
  Filter,
  FilterView,
  FilterText,
  List,
  Avatar,
  AvatarName,
  AvatarText,
  Label,
  Info,
} from './styles';

export default function Orders({ navigation }) {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);
  const isFocused = useIsFocused();

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState(0);

  function handleLogout() {
    dispatch(signOut());
  }
  const handleFilter = option => {
    setFilter(option);
  };
  useEffect(() => {
    async function loadOrders() {
      let search = '';
      let params = null;
      if (filter === 0) {
        search = `/deliveryMan/${profile.id}/orders`;
        params = {
          params: { status: 'PENDENTE' },
        };
      } else if (filter === 1) {
        search = `/deliveryMan/${profile.id}/orders`;
        params = {
          params: { status: 'ENTREGUE' },
        };
      } else if (filter === 2) {
        search = `/deliveryMan/${profile.id}/orders`;
        params = {
          params: { status: 'CANCELADO' },
        };
      }
      const response = await api.get(search, params);
      setOrders(response.data);
    }
    if (isFocused && profile && filter >= 0) {
      loadOrders();
    }
  }, [filter, isFocused, profile]);

  return (
    <Background>
      <Container>
        <Header>
          <HeaderLeft>
            {profile ? (
              profile.avatar ? (
                <Avatar source={{ uri: profile.avatar.url }} />
              ) : (
                <AvatarName>
                  <AvatarText>{dicalogin(profile.name)}</AvatarText>
                </AvatarName>
              )
            ) : null}
          </HeaderLeft>
          <HeaderCenter>
            <Label>Bem vindo de volta,</Label>
            <Info>{profile ? profile.name : null}</Info>
          </HeaderCenter>
          <HeaderRight>
            <TouchableOpacity onPress={handleLogout}>
              <Icon name="exit-to-app" size={25} color="red" />
            </TouchableOpacity>
          </HeaderRight>
        </Header>
        <HeaderList>
          <Title>Entregas</Title>
          <Filter>
            <TouchableOpacity onPress={() => handleFilter(0)}>
              <FilterView filter={filter === 0}>
                <FilterText filter={filter === 0}>Pendentes</FilterText>
              </FilterView>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter(1)}>
              <FilterView filter={filter === 1}>
                <FilterText filter={filter === 1}>Entregues</FilterText>
              </FilterView>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter(2)}>
              <FilterView filter={filter === 2}>
                <FilterText filter={filter === 2} canceled>
                  Cancelados
                </FilterText>
              </FilterView>
            </TouchableOpacity>
          </Filter>
        </HeaderList>
        <List
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Order order={item} navigation={navigation} />
          )}
        />
      </Container>
    </Background>
  );
}

Orders.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
