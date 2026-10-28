import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// 1. Données du catalogue
const produits = [
  { id: 1, nom: 'Clavier', categorie: 'Accessoires', prix: 120, stock: 5 },
  { id: 2, nom: 'Souris', categorie: 'Accessoires', prix: 80, stock: 8 },
  { id: 3, nom: 'Écran', categorie: 'Informatique', prix: 900, stock: 0 },
  { id: 4, nom: 'Casque', categorie: 'Accessoires', prix: 240, stock: 3 },
];

export default function CatalogueScreen() {
  // Calculs issus du TP
  const produitsDisponibles = produits.filter((p) => p.stock > 0);
  const valeurStock = produits.reduce(
    (total, p) => total + p.prix * p.stock,
    0
  );

  const produitMoinsCher =
    produitsDisponibles.length > 0
      ? produitsDisponibles.reduce((min, p) => (p.prix < min.prix ? p : min))
      : null;

  // Composant d'affichage d'une carte produit
  const renderProduitItem = ({ item }) => {
    const enStock = item.stock > 0;
    return (
      <View style={[styles.card, !enStock && styles.cardRupture]}>
        <View style={styles.cardHeader}>
          <Text style={styles.nomProduit}>{item.nom}</Text>
          <Text style={styles.prixProduit}>{item.prix} MAD</Text>
        </View>

        <Text style={styles.categorieProduit}>Catégorie: {item.categorie}</Text>

        <View style={styles.cardFooter}>
          <View
            style={[
              styles.badge,
              enStock ? styles.badgeDisponible : styles.badgeRupture,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                enStock ? styles.badgeTextDisponible : styles.badgeTextRupture,
              ]}
            >
              {enStock ? `En stock : ${item.stock}` : 'Rupture de stock'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.titreHeader}>Gestion du Catalogue</Text>
        <Text style={styles.sousTitreHeader}>
          TP2 - React Native & JavaScript
        </Text>
      </View>

      {/* Cartes de statistiques / résumé */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValeur}>{valeurStock} MAD</Text>
          <Text style={styles.statLabel}>Valeur du Stock</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValeur}>{produitsDisponibles.length}</Text>
          <Text style={styles.statLabel}>En Stock</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValeur}>
            {produitMoinsCher ? `${produitMoinsCher.prix} MAD` : 'N/A'}
          </Text>
          <Text style={styles.statLabel}>Prix Min</Text>
        </View>
      </View>

      {/* Liste des produits */}
      <Text style={styles.titreSection}>
        Catalogue des Produits ({produits.length})
      </Text>

      <FlatList
        data={produits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduitItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  titreHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1D20',
  },
  sousTitreHeader: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValeur: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B6CB0',
  },
  statLabel: {
    fontSize: 11,
    color: '#718096',
    marginTop: 4,
  },
  titreSection: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardRupture: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nomProduit: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  prixProduit: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2B6CB0',
  },
  categorieProduit: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeDisponible: {
    backgroundColor: '#C6F6D5',
  },
  badgeRupture: {
    backgroundColor: '#FED7D7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextDisponible: {
    color: '#22543D',
  },
  badgeTextRupture: {
    color: '#742A2A',
  },
});
