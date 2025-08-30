import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { getRandomDogImage } from './services/api/dogApi';
import DogImage from './components/DogImage';
import { styles } from './styles/AppStyles';

export default function App() {
  const [numberOfImages, setNumberOfImages] = useState('1');
  const [dogImage, setDogImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchDogImage = async () => {
    Keyboard.dismiss();

    const num = parseInt(numberOfImages);
    if (isNaN(num) || num < 1) {
      Alert.alert('Erro', 'Por favor, digite um número válido (mínimo 1)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getRandomDogImage();
      
      if (result.success) {
        setDogImage(result.imageUrl);
      } else {
        setError(result.error);
        setDogImage(null);
      }
    } catch (err) {
      setError('Erro inesperado: ' + err.message);
      setDogImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setNumberOfImages(numericValue);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.title}>🐕 DogsFinder</Text>
          <Text style={styles.subtitle}>Encontre doguinhos fofos!</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Número de imagens:</Text>
            <TextInput
              style={styles.input}
              value={numberOfImages}
              onChangeText={handleInputChange}
              keyboardType="numeric"
              placeholder="1"
              maxLength={2}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleFetchDogImage}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Carregando...' : 'Buscar Doguinho 🐶'}
            </Text>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <DogImage 
              imageUrl={dogImage}
              isLoading={isLoading}
              error={error}
            />
          </View>

          {dogImage && !isLoading && (
            <Text style={styles.successText}>Doguinho encontrado! 🎉</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}