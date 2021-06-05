import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

import { Button } from '../components/Button';

interface Skill {
  id: string;
  name: string;
}

export function Home() {
  const [gretting, setGretting] = useState('');
  const [newSkill, setNewskill] = useState('');
  const [mySkills, setMySkills] = useState<Skill[]>([]);

  function handleAddNewSkill() {
    if (!newSkill) return;

    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(prevState => [...prevState, data]);
    setNewskill('');
  }

  function handleRemoveSkill(id: string) {
    setMySkills(prevState =>
      prevState.filter(skill => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting('Good Afternoon');
    } else {
      setGretting('Good Night');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Ally</Text>
      <Text style={{ color: '#FFF' }}>{gretting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewskill}
        value={newSkill}
      />

      <Button
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.text, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList
        keyExtractor={(item) => item.id}
        data={mySkills}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.buttonSkill, {  marginBottom: 20 }]}
            activeOpacity={0.7}
            onPress={() => handleRemoveSkill(item.id)}
          >
            <Text style={styles.textSkill}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={[styles.textSkill, { alignSelf: 'center' }]}>
            Nenhuma skill cadastrada
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  text: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  buttonSkill: {
    backgroundColor: '#1F1E25',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center'
  },
  textSkill: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold'
  }
})
