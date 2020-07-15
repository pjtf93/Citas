import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setMostrarForm}) => {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    hideDatePicker();
    setFecha(date.toLocaleDateString('es-ES', opciones));
  };

  // Muestra u oculta el Time Picker

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const confirmarHora = (time) => {
    const opciones = {hour: 'numeric', minute: '2-digit'};
    hideTimePicker();
    setHora(time.toLocaleString('en-US', opciones));
  };

  const createNewDate = () => {
    //validar
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      // falla la validacion
      mostrarAlerta();
      return;
    }

    // Crear una nueva cita

    const cita = {paciente, propietario, telefono, fecha, hora, sintomas};

    cita.id = shortid.generate();

    // console.log(cita);
    // agregar al state
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    // Ocultar el formulario
    setMostrarForm(false);

    // Resetear el formulario
  };

  // Muestra la alerta si falla la validcacion

  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'Todos los campos son obligatorios', //  mensaje
      [
        {
          text: 'Ok', // arreglo de botones
        },
      ],
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueno:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPropietario(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Telefono Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setTelefono(texto)}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}> Fecha:</Text>

          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}> Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            is24Hour
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(texto) => setSintomas(texto)}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => createNewDate()}
            style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}> Crear Nueva Cita </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Formulario;
