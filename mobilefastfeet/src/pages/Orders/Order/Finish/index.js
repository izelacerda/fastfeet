import React, { useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Content,
  Card,
  Camera,
  TakePicture,
  SendButton,
} from './styles';
import api from '~/services/api';

export default function Finish({ route, navigation }) {
  const { order } = route.params;
  const [camera, setCamera] = useState();
  const [picture, setPicture] = useState();

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setPicture(data.uri);
    }
  };
  const handleSend = async () => {
    try {
      const data = new FormData();

      data.append('file', {
        type: 'image/jpeg',
        uri: picture.replace('file://', ''),
        name: picture.split('/')[9],
      });
      const response = await api.post(`/order/${order.id}/alterfinish`, data);
      if (response.data) {
        Alert.alert('Sucesso', 'Entrega finalizada com sucesso');
        navigation.push('Dashboard');
      }
    } catch (error) {
      console.tron.warn(`Erro = ${error}`);
    }
  };

  return (
    <Container>
      <Content>
        <Card>
          <Camera
            ref={ref => {
              setCamera(ref);
            }}
            captureAudio={false}
            type={Camera.Constants.Type.back}
            flashMode={Camera.Constants.FlashMode.auto}
          >
            <TakePicture onPress={takePicture}>
              <Icon name="camera-alt" size={30} color="white" />
            </TakePicture>
          </Camera>
          <SendButton onPress={handleSend}>Enviar</SendButton>
        </Card>
      </Content>
    </Container>
  );
}
