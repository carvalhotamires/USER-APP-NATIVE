import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '../components/SearchBar';
import { UserCard } from '../components/UserCard';
import { User } from '../types/User';
import { getUsers } from '../services/userService';

export const UsersScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsersData = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredUsers(users);
    } else {
      const term = text.toLowerCase();
      const filtered = users.filter((user) => {
        const compName = typeof user.company === 'string' ? user.company : user.company?.name || '';
        return (
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          compName.toLowerCase().includes(term)
        );
      });
      setFilteredUsers(filtered);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsersData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0814" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Usuários</Text>
      </View>

      <SearchBar
        value={search}
        onChangeText={handleSearch}
        onClear={() => handleSearch('')}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A855F7" />
        </View>
      ) : (
       <FlatList<User>
  data={filteredUsers}
  keyExtractor={(item: User) => item.id.toString()}
  renderItem={({ item }: { item: User }) => <UserCard user={item} />}
  contentContainerStyle={styles.listContent}
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#A855F7"
      colors={['#A855F7']}
    />
  }
  ListEmptyComponent={
    <View style={styles.emptyContainer}>
      <Ionicons name="person-remove-outline" size={48} color="#6B7280" />
      <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
    </View>
  }
/>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0814',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#9CA3AF',
    marginTop: 10,
    fontSize: 15,
  },
});