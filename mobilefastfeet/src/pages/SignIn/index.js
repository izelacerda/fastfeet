import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Background, Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [deliveryManId, setDeliveryMan] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(deliveryManId));
  }

  return (
    <Background>
      <Container>
        <Image
          source={logo}
          style={{
            tintColor: 'white',
          }}
        />

        <Form>
          <FormInput
            // icon="mail-outline"
            keyboardType="numeric"
            // autoCorrect={false}
            // autoCapitalize="none"
            placeholder="Informe seu ID de cadastro"
            // returnKeyType="done"
            onSubmitEditing={handleSubmit}
            value={deliveryManId}
            onChangeText={setDeliveryMan}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
