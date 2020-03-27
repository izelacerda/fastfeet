import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { signOut } from '~/store/modules/auth/actions';
import { dicalogin } from '~/utils/geral';

import {
  Container,
  Content,
  Avatar,
  AvatarName,
  AvatarText,
  Label,
  Info,
  LogoutButton,
} from './styles';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const [createdAt, setCreatedAt] = useState('');

  function handleLogout() {
    dispatch(signOut());
  }
  useEffect(() => {
    if (profile && profile.createdAt) {
      setCreatedAt(format(parseISO(profile.createdAt), 'dd/MM/yyyy'));
    }
  }, [profile]);
  const handleImage = () => {
    navigation.navigate('Image', { profile });
  };
  return (
    <Container>
      <TouchableOpacity onPress={handleImage}>
        {profile ? (
          profile.avatar ? (
            <Avatar source={{ uri: profile.avatar.url }} />
          ) : (
            <AvatarName>
              <AvatarText>{dicalogin(profile.name)}</AvatarText>
            </AvatarName>
          )
        ) : null}
      </TouchableOpacity>

      <Content>
        <Label>Nome completo</Label>
        <Info>{profile ? profile.name : null}</Info>
        <Label>Email</Label>
        <Info>{profile ? profile.email : null}</Info>
        <Label>Data do cadastro</Label>
        <Info>{createdAt}</Info>
        <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
      </Content>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
