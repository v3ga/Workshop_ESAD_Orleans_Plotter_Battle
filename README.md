# Plotter Battle

## Mises à jour 18/11/2025
Télécharger l'archive [Workshop_ESAD_Orleans_Plotter_Battle_updates_18_nov_bis.zip](https://github.com/v3ga/Workshop_ESAD_Orleans_Plotter_Battle/raw/refs/heads/main/archives/Workshop_ESAD_Orleans_Plotter_Battle_updates_18_nov_bis.zip) et remplacer les dossiers concernés dans votre installation.

## Mises à jour 19/11/2025
### Installation pour AxiDraw
Suivre le tutoriel ici pour votre plateforme : https://wiki.evilmadscientist.com/Axidraw_Software_Installation

### Installation pour iDraw
Suivre le tutoriel ici pour votre plateforme : https://drive.google.com/drive/folders/1mDPv3P24jBe4Dkz6jCn9UlGHwQM1bb9V

## Présentation 
*Plotter Battle* est un atelier de création collective où les étudiant·es vont travailler par groupe sur des dessins collectifs à travers des machines à tracer. Par le biais du code ou de dispositifs programmés de captures de mouvement (hand / head tracking par exemple), chaque groupe concevra des formes, motifs et gestes graphiques qui dialoguent et se combinent sur la feuille de dessin.<br />
Cet atelier est aussi un espace d’apprentissage de la programmation créative : les participant·es découvrent comment le code peut devenir un médium visuel, expressif et collaboratif.<br />
Entre performance et expérimentation, *Plotter Battle* interroge la frontière entre geste humain et écriture algorithmique, entre art génératif et dessin mécanique.Un moment collectif où la machine devient partenaire, instrument et terrain de jeu partagé.

## Déroulé
### Journée 01
- Présentation Julien + présentation de l'atelier.
- Installation des outils.
- Découvertes des concepts de base de la programmation au travers d'exemples simples : 
    - Dupliquer le projet template, description de l'environnement de code.
    - Anatomie d'un programme p5.js avec les fonctions setup() & draw()
        - dessin simple sans « boucle de dessin ».
        - dessin continu. 
    - Variables, boucles, conditions, utilisation de nombres aléatoires, utilisation du 
    - Environnement propre à cet atelier : 
        - contraintes liées au plotter, uniquement des dessins de ligne. 
        - export des dessins au format SVG
        - Unités de mesure dans le programme : pixels ou centimètres.
- Test d'impression à plusieurs sur une machine (AxiDraw v3), puis iDraw (ne connaissant pas ces machines, il faudra que je les prenne en main).

### Journée 02
- Révision des concepts de la veille.
- Utilisation de librairies additionnelles.
- Idéations, discussions autour des idées. 

### Journée 03
- Plotting.

### Journée 04
- Plotting.
- Exposition des dessins.

## Installation des outils
### VSCode
Visual Studio Code est une application gratuite éditée par Microsoft qui permet d’écrire et d’organiser du code de manière simple et visuelle. C’est un outil pratique pour créer des sites web, expérimenter sur des projets numériques par exemple. Il est léger, personnalisable et offre de nombreuses extensions pour adapter l’interface à vos besoins artistiques.

https://code.visualstudio.com/

### p5.vscode
p5.vscode est une extension pour Visual Studio Code qui facilite la création de projets artistiques interactifs avec la bibliothèque [p5.js](https://p5js.org/). <br />
Pour installer cette extension de code, vous pouvez vous référer à cette vidéo : [
How to use p5.js with Visual Studio Code / Tim Rodenbröker](https://youtu.be/vj9nDja8ZdQ?si=d5z4wxoc5rB0aYqG&t=136)

### p5.js
[p5.js](https://p5js.org/) est un outil convivial pour apprendre à coder et créer des programmes interactifs pour les arts visuels, directement dans le navigateur. C'est une bibliothèque JavaScript libre et open source, développée par une communauté inclusive et bienveillante.<br /><br />Ce projet est soutenu par [la fondation Processing](https://processingfoundation.org/), dont le but est est de promouvoir l'apprentissage des logiciels dans le domaine des arts, l'apprentissage artistique dans les domaines liés à la technologie, et de célébrer la diversité des communautés qui rendent ces domaines dynamiques, émancipateurs et innovants.

### p5.js : libraries additionnelles
En plus de la librairie [p5.js](https://p5js.org/), nous allons utiliser d'autres librairies annexes qui viennent ajouter des fonctionnalités complémentaires comme par exemple : 
- [p5.plotSVG.js](https://github.com/golanlevin/p5.plotSvg)<br />Librairie qui permet d'exporter des dessins au format svg en respectant la simplicité d'utilisation et d'écriture de [p5.js](https://p5js.org/).
- [p5.sound.js](https://p5js.org/reference/p5.sound/)<br />Librairie qui permet de traiter le son. 
- [ml5.js](https://ml5js.org/)<br />Librairie qui permet (entre autres) : 
    - détection de visages (face detection)
    - détection de mains (hand tracking)

## Installation du dossier de travail

### Téléchargement
Vous pouvez télécharger cette archive en cliquant sur le bouton **Code > Download ZIP** en haut à droit de la liste de fichiers.

### Créer un nouveau projet
1. Dupliquer le dossier *exemples/_template_*
2. Le renommer
3. Il doit être visible dans votre éditeur de code. Vous pouvez travailler dans le fichier *sketch.js*, qui est « le point d'entrée ».

## Dessins réalisés
<img src="/images/251119_Plots_workshop_ESAD_01-1920w.jpg" height="500" width="auto" /><img src="/images/251119_Plots_workshop_ESAD_02-1920w.jpg" height="500" width="auto" /><img src="/images/251119_Plots_workshop_ESAD_03-1920w.jpg" height="500" width="auto" /><img src="/images/251119_Plots_workshop_ESAD_04-1920w.jpg" height="500" width="auto" /><img src="/images/251119_Plots_workshop_ESAD_05-1920w.jpg" height="500" width="auto" /><img src="/images/251119_Plots_workshop_ESAD_06-1920w.jpg" height="500" width="auto" /><img src="/images/251119_Plots_workshop_ESAD_07-1920w.jpg" height="500" width="auto" /><img src="/images/251119_Plots_workshop_ESAD_08-1920w.jpg" height="500" width="auto" />
