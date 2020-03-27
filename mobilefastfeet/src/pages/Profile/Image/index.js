import React, { useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import {
  Container,
  Content,
  Card,
  Camera,
  TakePicture,
  SendButton,
} from './styles';
import api from '~/services/api';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Image({ route, navigation }) {
  const { profile } = route.params;
  const [camera, setCamera] = useState();
  const [picture, setPicture] = useState();
  const dispatch = useDispatch();

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
        uri:
          Platform.OS === 'android' ? picture : picture.replace('file://', ''),
        name: picture.split('/')[9],
      });
      const response = await api.post('files', data);
      const { id } = response.data;
      const update = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        avatar_id: id,
      };
      dispatch(updateProfileRequest(update));
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
      navigation.pop();
      // }
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
          <SendButton onPress={handleSend}>Atualizar foto</SendButton>
        </Card>
      </Content>
    </Container>
  );
}
