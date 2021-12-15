# Liste des routes de l'api

La route de base de tous les routes ici est `/api/v1/`

## Authentification
`POST` `auth/login`
`POST` `auth/me`
`POST` `auth/logout`


## Etudiant

### Profil
`PUT`       `etudiant/profil` Modifer le profile de l'etudiant connecter

### Stage
`POST`      `etudiant/stage` Creerer un Stage pour l'etudiant connecter
`PUT`       `etudiant/stage` Modifier le stage pour l'etudiant connecter
`DELETE`    `etudiant/stage` Supprimer le stage pour l'etudiant connecter

`POST`      `etudiant/stage/{internship_id}/invite/{user_id}` Envoyer une invitation a un autre etudiant pour rejoindre le stage

## Enseignant

### Profil
`PUT`       `enseignant/profil` Modifier le profil de l'enseignant connecter

### Stage
`POST`      `enseignant/stage/{stage_id}` Encadrer un stage pour l'enseignant connecter
`DELETE`    `enseignant/stage/{stage_id}` Ne plus encadrer le stage pour l'enseignant connecter


## Admin
`GET`       `etudiant` Voir la liste des etudiants

`POST`      `etudiant` Ajouter un etudiant
`DELETE`    `etudiant` Supprimer un etudiant

`POST`      `enseignant` Ajouter un enseignant
`DELETE`    `enseignant` Supprimer un enseignant

`POST`      `admin` Ajouter un admin
`DELETE`    `admin` Supprimer un admin

<!-- ! to search about excel importation -->
`POST`      `etudiant/importation` Importation des etudiants depuis un fichier excel
`POST`      `enseignant/importation` Importation des enseignants depuis un fichier excel


## Enreprise
`POST`      `entreprise` Creer une entreprise `admin` `etudiant`
`PUT`       `entreprise` Modifier une entreprise `admin` `etudiant`
`DELETE`    `entreprise` Suprimer une entreprise `admin`, l'etudiant peut seulement change d'entreprise.

## Technologies
`POST`      `technologie` Ajouter une technologie `etudiant`
`PUT`       `technologie/{tech_id}` Modifier une technologie `admin`
`DELETE`    `technologie{tech_id}` Suprimer une technologie `admin`

