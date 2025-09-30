import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { createEstoque } from './Api';  // Certifique-se que está importando a função correta

export default function Cadastro({ navigation }) {
  const [form, setForm] = useState({
    nome: '',
    marca: '',
    preco: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.marca) {
      Alert.alert('Erro', 'Preencha pelo menos o Nome e a Marca.');
      return;
    }

    // Converte preço para número (float), trata vírgula e vazio
    const precoNumerico = parseFloat(form.preco.replace(',', '.')) || 0;

    const dadosParaEnviar = {
      nome: form.nome.trim(),
      marca: form.marca.trim(),
      preco: precoNumerico,
    };

    console.log('Dados a enviar:', dadosParaEnviar);

    await createEstoque(dadosParaEnviar);

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={form.nome}
        onChangeText={(value) => handleChange('nome', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={form.marca}
        onChangeText={(value) => handleChange('marca', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={form.preco}
        onChangeText={(value) => handleChange('preco', value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
