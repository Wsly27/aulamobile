import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Animated } from 'react-native';
import { useState } from 'react';

// Define the type for a name item
type NameItem = {
  id: number;
  nome: string;
  concluido: boolean;
};

const nomesIniciais: NameItem[] = [
  { id: 1, nome: "Luis", concluido: false },
  { id: 2, nome: "Fernando", concluido: false },
  { id: 3, nome: "José", concluido: false },
];

export default function App() {
  const [nomes, setNomes] = useState<NameItem[]>(nomesIniciais);
  const [novoNome, setNovoNome] = useState<string>('');
  const [nextId, setNextId] = useState<number>(4);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const adicionarNome = (): void => {
    if (novoNome.trim() !== '') {
      setNomes([...nomes, { id: nextId, nome: novoNome.trim(), concluido: false }]);
      setNovoNome('');
      setNextId(nextId + 1);
    }
  };

  const deletarNome = (id: number): void => {
    setDeletingId(id);
    setTimeout(() => {
      setNomes(nomes.filter(item => item.id !== id));
      setDeletingId(null);
    }, 300);
  };

  const toggleConcluido = (id: number): void => {
    setNomes(nomes.map(item => 
      item.id === id ? { ...item, concluido: !item.concluido } : item
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksContainer}>
        {nomes.map((item: NameItem) => (
          <View key={item.id} style={styles.taskRow}>
            <Animated.View 
              style={[
                styles.elemtentos, 
                item.concluido && styles.elemtentosConcluido,
                deletingId === item.id && styles.deletingItem
              ]}
            >
              <Text style={styles.itens}>
                {item.nome}
              </Text>
            </Animated.View>
            
            <View style={styles.buttonsContainer}>
              <Pressable 
                onPress={() => toggleConcluido(item.id)} 
                style={({ pressed }) => [
                  styles.checkbox,
                  pressed && styles.buttonPressed
                ]}
                android_ripple={{ color: 'rgba(255,255,255,0.2)', radius: 20 }}
              >
                <Text style={styles.checkboxText}>
                  {item.concluido ? '✓' : '○'}
                </Text>
              </Pressable>
              
              <Pressable 
                onPress={() => deletarNome(item.id)} 
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed && styles.deleteButtonPressed
                ]}
                android_ripple={{ color: 'rgba(255,255,255,0.3)', radius: 20 }}
              >
                <Text style={styles.deleteText}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Digite um novo nome'
          placeholderTextColor='#fff'
          value={novoNome}
          onChangeText={setNovoNome}
          onSubmitEditing={adicionarNome}
        />
        <Pressable 
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressed
          ]} 
          onPress={adicionarNome}
          android_ripple={{ color: 'rgba(255,255,255,0.3)', borderRadius: 12 }}
        >
          <Text style={styles.textoBotao}>ADICIONAR</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#c81ecb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botaoPressed: {
    backgroundColor: '#9e14a0',
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tasksContainer: {
    alignItems: 'center',
    width: '100%',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 12,
  },
  elemtentos: {
    backgroundColor: '#c81ecb',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  elemtentosConcluido: {
    backgroundColor: '#334155',
    opacity: 0.7,
  },
  deletingItem: {
    opacity: 0,
    transform: [{ scale: 0.8 }],
  },
  itens: {
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonPressed: {
    backgroundColor: '#ff4444',
    transform: [{ scale: 0.9 }],
  },
  deleteText: {
    fontSize: 18,
  },
  checkbox: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ scale: 0.9 }],
  },
  checkboxText: {
    fontSize: 20,
    color: '#f5f5f5',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});