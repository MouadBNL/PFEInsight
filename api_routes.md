# Liste des routes de l'api

La route de base de tous les routes ici est `/api/v1/`

## Authentification
`POST` `auth/login`<br/>
`POST` `auth/me`<br/>
`POST` `auth/logout`<br/>


## Etudiant

### Profil
`PUT`       `etudiant/profil` Modifer le profile de l'etudiant connecter<br/>

### Stage
`POST`      `etudiant/stage` Creerer un Stage pour l'etudiant connecter<br/>
`PUT`       `etudiant/stage` Modifier le stage pour l'etudiant connecter<br/>
`DELETE`    `etudiant/stage` Supprimer le stage pour l'etudiant connecter<br/>

`POST`      `etudiant/stage/{internship_id}/invite/{user_id}` Envoyer une invitation a un autre etudiant pour rejoindre le stage<br/>

## Enseignant

### Profil
`PUT`       `enseignant/profil` Modifier le profil de l'enseignant connecter<br/>

### Stage
`POST`      `enseignant/stage/{stage_id}` Encadrer un stage pour l'enseignant connecter<br/>
`DELETE`    `enseignant/stage/{stage_id}` Ne plus encadrer le stage pour l'enseignant connecter<br/>


## Admin
`GET`       `etudiant` Voir la liste des etudiants<br/>

`POST`      `etudiant` Ajouter un etudiant<br/>
`DELETE`    `etudiant` Supprimer un etudiant<br/>

`POST`      `enseignant` Ajouter un enseignant<br/>
`DELETE`    `enseignant` Supprimer un enseignant<br/>

`POST`      `admin` Ajouter un admin<br/>
`DELETE`    `admin` Supprimer un admin<br/>

<!-- ! to search about excel importation -->
`POST`      `etudiant/importation` Importation des etudiants depuis un fichier excel<br/>
`POST`      `enseignant/importation` Importation des enseignants depuis un fichier excel<br/>


## Enreprise
`POST`      `entreprise` Creer une entreprise `admin` `etudiant`<br/>
`PUT`       `entreprise` Modifier une entreprise `admin` `etudiant`<br/>
`DELETE`    `entreprise` Suprimer une entreprise `admin`, l'etudiant peut seulement change d'entreprise<br/>

## Technologies
`POST`      `technologie` Ajouter une technologie `etudiant`<br/>
`PUT`       `technologie/{tech_id}` Modifier une technologie `admin`<br/>
`DELETE`    `technologie{tech_id}` Suprimer une technologie `admin`<br/>

