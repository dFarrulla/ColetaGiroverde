// Importação de bibliotecas e componentes necessários do React Native
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, Text, TextInput, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';

// Componente principal do aplicativo
// ... (Início do código do gps)
export default function App() {
   // Estado para armazenar a região do mapa
  const [region, setRegion] = useState({
    latitude: -22.9296,
    longitude: -43.17205,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  });

// Localizações de exemplo para marcadores no mapa
  const urcaLocation = {
    latitude: -22.9519,
    longitude: -43.1658,
  };

  const senacSantaLuziaLocation = {
    latitude: -22.9065,
    longitude: -43.1783,
  };

// Efeito colateral para solicitar permissão de localização ao carregar o componente
  useEffect(() => {
    requestLocationPermission();
  }, []);

// Função para solicitar permissão de localização
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRegion({ ...region, latitude, longitude });
          },
          (error) => console.error(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        console.log('Permissão de localização negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // ... (fim do código do gps)

  /* ========================Começa Aqui======================

export default function App() { 
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Função para chamar a API ao selecionar uma categoria
  const fetchCategoryData = async () => {
    try {
      // Utilize a biblioteca 'fetch' ou uma biblioteca de requisições HTTP como Axios
      const response = await fetch(`https://sua-api.com/select-category/${selectedCategory}`);
      const data = await response.json();
      console.log('Dados da categoria selecionada:', data);
      // Faça o que for necessário com os dados da categoria
    } catch (error) {
      console.error('Erro ao buscar dados da categoria:', error);
    }
  };

  return ... (código existente)
    
  );

export default function App() {
  const [sortByOption, setSortByOption] = useState(null);
  
  // Função para chamar a API ao selecionar uma opção de ordenação
  const fetchSortedData = async () => {
    try {
      const response = await fetch(`https://sua-api.com/sort-by/${sortByOption}`);
      const data = await response.json();
      console.log('Dados ordenados por:', data);
      // Faça o que for necessário com os dados ordenados
    } catch (error) {
      console.error('Erro ao buscar dados ordenados:', error);
    }
  };

  return ... (código existente)
   
  );
}

export default function App() {
  const [filterOption, setFilterOption] = useState(null);

  // Função para chamar a API ao selecionar uma opção de filtro
  const fetchFilteredData = async () => {
    try {
      const response = await fetch(`https://sua-api.com/filter/${filterOption}`);
      const data = await response.json();
      console.log('Dados filtrados por:', data);
      // Faça o que for necessário com os dados filtrados
    } catch (error) {
      console.error('Erro ao buscar dados filtrados:', error);
    }
  };

  return ... (código existente)
    
  );
}
========================Termina aqui===========================*/

  // Retorno do componente
return (
   // Imagem de fundo
  <ImageBackground source={require('./images/back.png')} style={styles.backgroundImage}>
    <SafeAreaView style={styles.container}>
      {/* Área 1: Seta para esquerda e título  */}
      <View style={styles.header}>
        {/* Seta para voltar */}
        <TouchableOpacity onPress={() => console.log('Voltar')} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#1E3305" />
        </TouchableOpacity>
        {/* Título "Mapa de Coletas" */}
        <Text style={[styles.title, { color: '#1E3305' }]}>Mapa de Coletas</Text>
      </View>
        {/* Dropdown Picker -1- */}
         <View style={styles.pickerContainer1}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            items={[
              { label: 'Plástico', value: 'plastico' },
              { label: 'Papel', value: 'papel' },
              { label: 'Metal', value: 'metal' },
              { label: 'Vidro', value: 'vidro' },
            ]}
            
            placeholder={{ label: 'Selecione uma categoria', value: null }}
            style={{
              inputAndroid: {
                textAlign: 'center',
                backgroundColor: '#fff',
                fontSize: 16,
                color: '#1E3305',
                borderWidth: 2,  // Adiciona borda
                borderColor: "#1E3305",  // Cor da borda
                borderRadius: 36,  // Borda arredondada
                
              },
              iconContainer: {
                top: 20,
                right: 12,
              },
            }}
            useNativeAndroidPickerStyle={false}
          />
        </View>
         {/* Text View abaixo do Dropdown Picker */}
      <View style={styles.textViewContainer}>
        <Text style={styles.textViewDrop}>Resultados para “Plástico"</Text>
        <Text style={styles.textViewDrop}>10 resulatos encontardos</Text>
      </View>
         {/* Dropdown Picker -2- e -3- na mesma linha */}
         <View style={styles.pickerContainer2And3}>
             {/* Dropdown Picker -2-*/}
             <View style={styles.pickerContainer2}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            items={[
              { label: 'Relevância', value: 'Relevância' },
              { label: 'Maior valor da coleta', value: 'Maior valor da coleta' },
              { label: 'Menor valor da coleta ', value: 'Menor valor da coleta l' },
              { label: 'Favoritos', value: 'Favoritos' },
              { label: 'Ordem: Proximidade', value: 'Ordem: Proximidade' },
              { label: 'Ordem: Por quantidade', value: 'Ordem: Por quantidade' },
            ]}
            
            placeholder={{ label: 'Ordenar por', value: null }}
            style={{
              inputAndroid: {
                textAlign: 'center',
                backgroundColor: '#fff',
                fontSize: 16,
                color: '#1E3305',
                borderWidth: 2,  // Adiciona borda
                borderColor: "#1E3305",  // Cor da borda
                borderRadius: 36,  // Borda arredondada
                
              },
              iconContainer: {
                top: 20,
                right: 12,
              },
            }}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        {/* Dropdown Picker -3-*/}
        <View style={styles.pickerContainer3}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            items={[
              { label: 'Relevância', value: 'Relevância' },
              { label: 'Maior valor da coleta', value: 'Maior valor da coleta' },
              { label: 'Menor valor da coleta ', value: 'Menor valor da coleta l' },
              { label: 'Favoritos', value: 'Favoritos' },
              { label: 'Ordem: Proximidade', value: 'Ordem: Proximidade' },
              { label: 'Ordem: Por quantidade', value: 'Ordem: Por quantidade' },
            ]}
            
            placeholder={{ label: 'Filtrar', value: null }}
            style={{
              inputAndroid: {
                textAlign: 'center',
                backgroundColor: '#fff',
                fontSize: 16,
                color: '#1E3305',
                borderWidth: 2,  // Adiciona borda
                borderColor: "#1E3305",  // Cor da borda
                borderRadius: 36,  // Borda arredondada
                
              },
              iconContainer: {
                top: 20,
                right: 12,
              },
            }}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      </View>

      {/* Área 2: Mapa */}
      <MapView style={styles.map} region={region}>
        {/* Marcadores */}
        <Marker coordinate={urcaLocation} title="Sua localização" />
        <Marker coordinate={senacSantaLuziaLocation} title="Senac Santa Luzia Centro" pinColor="green" />
      </MapView>

      {/* Área 3: Ícones na parte inferior com fundo #f4f1e9 */}
      <ImageBackground source={require('./images/back.png')} style={styles.bottomIconsContainer}>
        <Icon name="user" size={30} color="#1E3305" />
        <Icon name="recycle" size={30} color="#1E3305" />
        <Icon name="bell" size={30} color="#1E3305" />
        <Icon name="search" size={30} color="#1E3305" />
        <Icon name="bars" size={30} color="#1E3305" />
      </ImageBackground>
    </SafeAreaView>
  </ImageBackground>
);

}
// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flex: 1,
    width: '100%',
    height: '10%',
  },
  backButton: {
    padding: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',  // Adicionado para centralizar o título
  },
 
  map: {
    flex: 3,
    width: '100%',
    height: '70%',
  },
  bottomIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%', // Define a largura para cobrir toda a largura da tela
    height: 60, // Define a altura desejada
  },
  pickerContainer1: {
     width: '90%',
     paddingStart: 30,
     paddingVertical: 10,
    },
    pickerContainer2: {
      width: '50%',
      paddingStart: 30,
      paddingVertical: 10,
     },
     pickerContainer3: {
      width: '30%',
      paddingStart: 30,
      paddingVertical: 10,
     },
    textViewDrop: {
      paddingStart: 10,
    }
});
