// ============================================================
// tp2-catalogue/produits.js
// ============================================================

// 1. Données de départ
const produits = [
  { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
  { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
  { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
  { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 },
];

// ------------------------------------------------------------
// Défi : validation
// ------------------------------------------------------------
function estValide(product) {
  const { prix, stock } = product;
  return (
    Number.isFinite(prix) &&
    prix >= 0 &&
    Number.isFinite(stock) &&
    stock >= 0
  );
}

// ------------------------------------------------------------
// 1. Affichage du catalogue
// ------------------------------------------------------------
function afficherCatalogue(liste) {
  console.log("=== Catalogue ===");
  liste.forEach(({ nom, prix }) => {
    console.log(`${nom} - ${prix} MAD`);
  });
}

// ------------------------------------------------------------
// 2. Disponibilité
// ------------------------------------------------------------
function produitsDisponibles(liste) {
  return liste.filter((p) => p.stock > 0);
}

// ------------------------------------------------------------
// 3. Valeur du stock
// ------------------------------------------------------------
function valeurStock(liste) {
  return liste.reduce((total, p) => total + p.prix * p.stock, 0);
}

// ------------------------------------------------------------
// 4. Produit disponible le moins cher
// ------------------------------------------------------------
function trouverProduitMoinsCher(listeDisponibles) {
  if (listeDisponibles.length === 0) {
    console.log("Aucun produit disponible.");
    return null;
  }
  return listeDisponibles.reduce((min, p) => (p.prix < min.prix ? p : min));
}

// ------------------------------------------------------------
// 5. Résumé avec map()
// ------------------------------------------------------------
function resume(liste) {
  return liste.map(
    ({ nom, prix, stock }) => `${nom} - ${prix} MAD - ${stock} unités`
  );
}

// ============================================================
// Programme principal
// ============================================================
function main() {
  // Vérification des données
  const tousValides = produits.every(estValide);
  console.log("Données valides :", tousValides);

  // 1. Catalogue
  afficherCatalogue(produits);

  // 2. Disponibilité
  const dispo = produitsDisponibles(produits);
  console.log(`\nProduits disponibles : ${dispo.length}`);

  // 3. Valeur du stock
  const valeur = valeurStock(produits);
  console.log(`Valeur du stock : ${valeur} MAD`);

  // 4. Produit le moins cher (déstructuration)
  const moinsCher = trouverProduitMoinsCher(dispo);
  if (moinsCher) {
    const { nom, prix } = moinsCher;
    console.log(`Produit disponible le moins cher : ${nom} (${prix} MAD)`);
  }

  // 5. Résumé
  console.log("\n=== Résumé ===");
  resume(produits).forEach((ligne) => console.log(ligne));
}

main();