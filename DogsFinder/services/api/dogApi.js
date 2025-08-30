import axios from 'axios';

const API_BASE_URL = 'https://dog.ceo/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getRandomDogImage = async () => {
  try {
    const response = await api.get('/breeds/image/random');
    
    if (response.data.status === 'success') {
      return {
        success: true,
        imageUrl: response.data.message,
        error: null
      };
    } else {
      return {
        success: false,
        imageUrl: null,
        error: 'Falha na resposta da API'
      };
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    
    let errorMessage = 'Erro desconhecido';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Tempo limite excedido. Verifique sua conexão.';
    } else if (error.response) {
      errorMessage = `Erro ${error.response.status}: ${error.response.data?.message || 'Erro no servidor'}`;
    } else if (error.request) {
      errorMessage = 'Sem resposta do servidor. Verifique sua conexão.';
    } else {
      errorMessage = error.message || 'Erro ao buscar imagem';
    }
    
    return {
      success: false,
      imageUrl: null,
      error: errorMessage
    };
  }
};

export default api;