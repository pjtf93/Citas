import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Cita from './src/components/Cita';
import Formulario from './src/components/Formulario';

const App = () => {
  // definir el state d citas
  const [mostrarForm, setMostrarForm] = useState(false);

  const [citas, setCitas] = useState([
    {
      id: '1 ',
      paciente: 'Hook',
      propietario: 'Juan',
      sintomas: 'No come',
    },
    {id: '2 ', paciente: 'Redux', propietario: 'Andres', sintomas: 'No duerme'},
    {
      id: '3 ',
      paciente: 'Native',
      propietario: 'Rodriguz',
      sintomas: 'No canta',
    },
  ]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };
  // Mostrar u ocultar formulario
  const mostarFormulario = () => {
    setMostrarForm(!mostrarForm);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Administrador de citas</Text>
      <View>
        <TouchableHighlight
          onPress={() => mostarFormulario()}
          style={styles.btnMostrar}>
          <Text style={styles.textoMostrar}> Crear Nueva Cita </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.content}>
        {mostrarForm ? (
          <>
            <Text style={styles.header}>Crear Nueva Cita</Text>
            <Formulario
              citas={citas}
              setCitas={setCitas}
              setMostrarForm={setMostrarForm}
            />
          </>
        ) : (
          <>
            <Text style={styles.header}>
              {citas.length > 0
                ? 'Administra tus citas'
                : 'No hay citas, agrega una'}
            </Text>
            <FlatList
              style={styles.list}
              data={citas}
              renderItem={({item}) => (
                <Cita item={item} eliminarPaciente={eliminarPaciente} />
              )}
              keyExtractor={(cita) => cita.id}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  header: {
    color: '#FFF',
    textAlign: 'center',
    marginVertical: Platform.OS === 'ios' ? 40 : 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  list: {
    flex: 1,
  },
  btnMostrar: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoMostrar: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
