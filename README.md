# Test technique NestJS — Domaine de la santé

## Objectif

Faire passer tous les tests unitaires **sans modifier les fichiers `*.spec.ts`**.

Les tests décrivent le comportement attendu. Votre rôle est d'implémenter le code correspondant dans les fichiers marqués `TODO`.

**Durée estimée : 1 heure**

---

## Mise en place

```bash
npm install
npm test
```

Vous devriez voir tous les tests échouer. Votre objectif est de les faire tous passer.

Pour lancer les tests en mode watch :

```bash
npm run test:watch
```

---

## Fichiers à compléter

### `src/patient/patient.entity.ts`

La classe `Patient` est définie avec ses propriétés. Vous devez implémenter les méthodes et getters suivants :

| Méthode / Getter       | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `fullname`             | Prénom en title case + nom en majuscules. Ex : `"Jean Michel COBAYE"`       |
| `ageAtDate(date)`      | Âge du patient à une date donnée. Retourne `'unborn'` si antérieure à sa naissance |
| `age`                  | Âge actuel du patient                                                        |
| `hasMajority`          | `true` si le patient a 18 ans ou plus                                        |
| `birthdateFormatted`   | Date de naissance au format `"DD/MM YYYY"`. Ex : `"27/12 1950"`             |
| `isWounded()`          | `true` si le patient a une blessure                                          |
| `breakHisLeg()`        | Assigne la blessure `LEG_FRACTURE` et marque le patient comme urgence        |
| `canWalk()`            | `true` si la blessure du patient ne l'empêche pas de marcher                 |

Les blessures qui empêchent de marcher sont listées dans `CANT_WALK_WOUNDS`.

---

### `src/patient/patient.service.ts`

Le service `PatientService` gère une liste interne de patients. Vous devez implémenter :

| Méthode          | Description                                                                                   |
|------------------|-----------------------------------------------------------------------------------------------|
| `getPatients()`  | Retourne les patients triés : urgences en premier, puis par date de naissance croissante. Limité à `MAX_PATIENTS` entrées |
| `getWoundStats()`| Retourne le nombre de patients par type de blessure, calculé sur le résultat de `getPatients()`. Les patients sans blessure sont ignorés |

---

## Règles

- **Ne pas modifier** les fichiers `*.spec.ts`
- **Ne pas modifier** les énumérations `Wound` ni la constante `CANT_WALK_WOUNDS` dans `patient.entity.ts`
- Vous pouvez ajouter des méthodes privées si nécessaire
