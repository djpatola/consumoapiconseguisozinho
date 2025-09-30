import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { updateEstoque } from './Api';

export default function Alterar({ route, navigation }) {
  const { Estoque } = route.params;
  const [form, setForm] = useState({ ...Estoque });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.marca) {
      Alert.alert('Erro', 'Preencha pelo menos o Nome e a Marca.');
      return;
    }

    const precoNumerico = parseFloat(String(form.preco).replace(',', '.')) || 0;

    const dadosParaEnviar = {
      nome: form.nome.trim(),
      marca: form.marca.trim(),
      preco: precoNumerico,
    };

    console.log('Dados para atualizar:', dadosParaEnviar);

    // 🔥 aqui usamos "codigo" e não "id"
    await updateEstoque(form.codigo, dadosParaEnviar, navigation);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={String(form.nome || '')}
        onChangeText={(value) => handleChange('nome', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={String(form.marca || '')}
        onChangeText={(value) => handleChange('marca', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={String(form.preco || '')}
        onChangeText={(value) => handleChange('preco', value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
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
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
