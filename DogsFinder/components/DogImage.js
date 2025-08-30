import React from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import { styles } from './DogImageStyles';

const DogImage = ({ imageUrl, isLoading, error }) => {
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando imagem...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );
  }

  if (!imageUrl) {
    return (
      <View style={[styles.container, styles.placeholderContainer]}>
        <Text style={styles.placeholderText}>Clique no botão para ver um doguinho!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image}
        resizeMode="contain"
        onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
      />
    </View>
  );
};

export default DogImage;