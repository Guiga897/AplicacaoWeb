import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    maxHeight: 400,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    padding: 10,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    minHeight: 280,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  loadingText: {
    marginTop: 10,
    color: '#6c757d',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#856404',
    fontSize: 16,
    textAlign: 'center',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  placeholderText: {
    color: '#6c757d',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});