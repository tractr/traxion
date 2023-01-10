---
id: how-to-write-this-documentation
title: Documentation
sidebar_label: Documentation
---

# Documentation guidelines

## Overview

Ce document a pour but de définir guide de rédaction afin d'harmoniser la documentation.
Il se focalise principalement sur la mise en forme, mais aussi sur la sémantique.

### Markdown engine

This documentation supports the [GitHub-flavored Markdown syntax](https://github.github.com/gfm/).

## Découpage du contenu

### Longueur du document

Il n'y a pas de limite ferme de taille d'un document, mais si celui-ci devient trop pénible à lire en entier, il faut le séparer en plusieurs documents hiérarchisés.
Selon la nature du document, la taille acceptable peut varier.

Un document de référence d'API par exemple, peut être relativement long car il n'a pas vocation à être lu d'un trait, ni dans un ordre precis.
C'est plutôt une liste détaillée de fonctions qu'un texte à lire de bout en bout.

À l'inverse une procédure ou un document d'onboarding doivent rester lisible d'un coup. Ce genre de documents ne peuvent pas être lu partiellement.

### En-têtes

Les en-têtes permettent de séparer correctement les parties du texte et de structurer visuellement le document.
Si un bloc de texte fait plus de 3 paragraphes, alors il faut le découper en sous-blocs en ajouter des en-têtes de niveau inférieur.

Les tailles d'en-têtes doivent se suivre. On ne saute pas d'un `H2` à un `H4`.

#### `H1`

Un document ne doit contenir qu'un seul titre `H1`, en début de page, qui reprend le titre du document.
Il peut être plus explicite que le titre du menu.

#### `H2`

Il est utilisé pour séparer les différentes parties du document.
Si un document possède trop de `H2`, il faut alors repenser la structure du document et utiliser des sous-sections `H3`.

#### `H3` à `H6`

Ces en-têtes permettent de sous-découper et hiérarchiser les blocs `H2`.

## Mise en forme

Seuls les styles de mise en forme qui sont mentionnés dans ce document sont autorisés.
La quantité de styles est volontairement restreinte pour simplifier la lecture d'un document.

Les styles ne doivent pas être mélangés entre eux.

### Text en gras

#### Utilisation

Un texte en gras doit être utilisé pour souligner le nom d'une entité (un nom propre, un bouton sur une interface, le nom d'un page dans fil d'ariane, etc.) ou bien une valeur clé (par exemple **70%**).

:::success Exemples

Se rendre dans son compte GitHub, dans **Settings** → **Developer settings** → **Personal access tokens** et cliquer sur **Generate new token**... <br />
Si vous utiliser **macOS** ou **Linux**, utiliser la commande suivante: ...

:::

#### Restrictions

Le gras ne doit pas être utilisé pour mettre en avant une phrase complête, ni pour appuyer une conjonction (et, ou, etc.).
Il ne doit pas être utilisé dans une en-tête.

:::danger Exemples

**Lancer la commande npm install pour installer les packages.**

:::

### Inline code

#### Utilisation

Cette mise en forme permet de mettre en avant un nom pouvant être assimilé à une variable.
Par exemple: le nom d'une fonction, le nom ou la valeur d'une variable, nom de fichier, la valeur d'un champ à saisir dans un formulaire, une adresse email, etc.

Elle peut aussi être utilisée pour mettre en avant une ligne de commande.
Si cette commande est trop longue il est préférable d'utiliser un bloc de code.

Cette mise en forme aide le lecteur à copier le texte si besoin car le début et la fin (espaces inclus) sont clairement définis.

Elle peut être utilisée dans une en-tête.

:::success Exemples

Connectez-vous avec le compte par défaut : `admin@exemple.com` et entrez le mot de passe `demo`... <br />
Lancer la commande `npm install` pour installer les packages... <br />
Si on regarde de plus près la méthode `onModeuleInit()` du fichier `api/src/app.module.ts` ...

:::

#### Restrictions

Le code inline ne doit pas être utilisé pour mettre en avant une phrase complête, ni pour appuyer une conjonction (et, ou, etc.).

:::danger Exemples

`Lancer la commande npm install pour installer les packages.` <br />
Cliquer sur le bouton `ou` lancer la commande start.

:::

### Liens

#### Utilisation

Les liens peuvent être utiliser pour pointer vers une resource externe ou autre page de la documentation.

Si le lien est cours il peut être affiché tel quel, sinon il est mieux de l'intégrer au texte.

:::success Exemples

Pour plus d'informations aller sur https://docs.hapify.io/ <br />
Cliquer [ici](https://docs.hapify.io/) pour voir la documentation.

:::

#### Restrictions

Si un lien est vraiment long et contient des tokens dans l'URL il faut impérativement l'intégrer au texte.

:::danger Exemples

Se reporter à la documentation : https://longurlmaker.com/go?id=Metamark401Ne1kTightURLGetShorty11904remote16030107enduring0j0wenlargedstringy4continuedNanoRef0911011SimURLYepItspreadZoutfarawayc1towering01Shorl7b06ShortURL5ganglingcDecentURL1Xil0remote1highffarZreachingm104towering218prolongedfarZoffstretchingexpanded51stretchstretching11a21stretchedlShredURL2eprotracted22zvShredURL804prolongedcganglingg8076436sustainedr9b7spunZoutde10lnkZin230FhURLShrinkr1URLCutterj8prolong

:::

## Blocs

### Code

Les blocs de code doivent être utilisés pour afficher du code (même une seule ligne) ou bien une commande dès lors qu'elle fait plus de 50 caractères.
Ces blocs peuvent être facilement copiés.

:::note Exemples

```ts {3}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
```

```shell
nx g @nrwl/react:component my-component --project=my-app
```

:::

### Admonitions

Les admonitions permettent d'ajouter des informations utiles mais qui ne font pas partie de l'information principale.
Le document ne doit pas perde son sens si on les supprime.
Les admonitions doivent rester courts.

#### Exemples

:::note En savoir plus

Pour plus d'informations aller sur https://docs.hapify.io/

:::

:::tip Astuce

Débranchez le courant pour éteindre plus vite votre ordinateur !

:::

:::caution

Si ce document vous ennuie, allez jouer à Quake III.

:::

### Listes

Les listes doivent être utilisées pour lister des éléments courts uniquement (une seule phrase, quelques mots).

Il ne faut pas les utiliser pour lister les étapes d'une procédure par exemple.
Dans ce cas, il est mieux d'avoir différents paragraphes séparés par des en-têtes.
Pour cette raison, les listes numérotées ne devrait pas être utilisées.

:::note Exemples

Voici les principaux outils permettant d'écrire de la documentation :

- [Docusaurus](https://docusaurus.io/)
- [Sphinx](https://www.sphinx-doc.org/)
- [Mkdocs](https://www.mkdocs.org/)

:::

### Tables

Les tables ne sont pas fluides à lire mais permette d'afficher un grande quantité d'information qui n'a pas besoin d'être expliqué.

Pour cette raison, les tables doivent seulement être utiliser pour afficher des données à comparer en un coup d'oeil.
Elle ne doivent pas remplacer une liste devenue trop détaillée.

:::note Exemple

| Compose file format | Docker Engine release | Supported |
| -------- | --------- | --------- |
| 3.8  | 19.03.0+ | yes |
| 3.7  | 18.06.0+ | yes |
| 3.6  | 18.02.0+ | yes |
| 3.5  | 17.12.0+ | no |
| 3.4  | 17.09.0+ | no |
| 3.3  | 17.06.0+ | no |

:::

### Images

Une image vient illustrer un processus (avec un schéma) ou bien une étape d'une procédure (avec une capture d'écran).

Elle ne vient pas remplacer un texte mais l'accompagne.
Ne pas utiliser les images inline car elles déforment la mise en page du texte. 
Ne pas intégrer des mèmes ou des gifs.

:::danger

Ne jamais utiliser une image pour afficher du texte: une erreur en console par exemple. Le texte ne sera ni indexable ni copiable.

:::

#### Taille de l'image

L'image ne doit pas gêner la lecture. Pour cette raison, elle ne doit pas prendre la hauteur complète de la page.
Si une capture d'écran est trop haute, il faut alors contraindre sa largeur et la centrer pour réduire son empreinte.

### Blockquotes

Les citations ne doivent être utilisées pour notifier au lecteur que le texte vient d'une autre source.
Avant d'ajouter une citation, il faut nommer la source.

:::note Exemple

Comme indiqué dans la documentation de NPM, `npm uninstall` permet de supprimer un package: 

> This uninstalls a package, completely removing everything npm installed on its behalf.
> In global mode (ie, with `-g` or `--global` appended to the command), it uninstalls the current package context as a global package.

:::

### HTML

Le seul tag HTML autorisé est `<br />` qui permet de faire un retour à la ligne sans créer un nouveau paragraphe.
Il est très utile dans les admonitions que l'on veut garder court.

## Interdits

### Italic & Underline

Il ne faut pas utiliser l'italic ou le soulignement pour appuyer un mot. On utilise seulement le texte gras ou le code inline pour cela.

### Séparateur de texte

Il ne faut pas utiliser les séparateurs de texte (`---`).
Si un bloc doit être scindé en deux visuellement, il faut le faire avec des en-têtes.

Les séparateurs de texte ne doivent pas être utilisé pour faire de la mise en forme (souligné un texte par exemple).
On se fie à la mise en forme proposé par le thème de la documentation.

### Emoticon

La signification des emoticon est subjective.
Cette documentation ne doit pas laisser place à l'interprétation.
Pour cette raison les emoticon sont interdites.
