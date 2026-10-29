import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const produits = [
  { id: 1, nom: 'Clavier', categorie: 'Accessoires', prix: 120, stock: 5 },
  { id: 2, nom: 'Souris', categorie: 'Accessoires', prix: 80, stock: 8 },
  { id: 3, nom: 'Écran', categorie: 'Informatique', prix: 900, stock: 0 },
  { id: 4, nom: 'Casque', categorie: 'Accessoires', prix: 240, stock: 3 },
];

export default function CatalogueScreen() {
  const produitsDisponibles = produits.filter((p) => p.stock > 0);

  const valeurStock = produits.reduce(
    (total, p) => total + p.prix * p.stock,
    0
  );

  const produitMoinsCher =
    produitsDisponibles.length > 0
      ? produitsDisponibles.reduce((min, p) => (p.prix < min.prix ? p : min))
      : null;

  const renderProduitItem = ({ item }) => {
    const enStock = item.stock > 0;
    return (
      <View style={[styles.card, !enStock && styles.cardRupture]}>
        <View style={styles.cardHeader}>
          <Text style={styles.nomProduit}>{item.nom}</Text>
          <Text style={styles.prixProduit}>{item.prix} MAD</Text>
        </View>
        <Text style={styles.categorieProduit}>Catégorie : {item.categorie}</Text>
        <View
          style={[
            styles.badge,
            enStock ? styles.badgeDisponible : styles.badgeRupture,
          ]}
        >
          <Text style={styles.badgeText}>
            {enStock ? `En stock : ${item.stock}` : 'Rupture de stock'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.statusContainer}>
        <Text style={styles.statusValeur}>
          Valeur Stock : {valeurStock} MAD
        </Text>
        <Text style={styles.statusValeur}>
          Disponibles : {produitsDisponibles.length}
        </Text>
      </View>

      <FlatList
        data={produits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduitItem}
        contentContainerStyle={styles.liste}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    paddingHorizontal: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0B2A6B',
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
  },
  statusValeur: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  liste: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardRupture: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nomProduit: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B2A6B',
  },
  prixProduit: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E8590C',
  },
  categorieProduit: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeDisponible: {
    backgroundColor: '#D3F9D8',
  },
  badgeRupture: {
    backgroundColor: '#FFE3E3',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
  },
});