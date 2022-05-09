<!DOCTYPE html>
<html lang="fr">
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- Polices d'écritures -->
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <!-- Icônes Bootstrap -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
      <title>Cryptaux - Inscription</title>
      <link rel="stylesheet" href="src/styles/style.css">
      <link rel="stylesheet" href="src/styles/Connexion.css">
      <link rel="stylesheet" media="screen and (max-width: 1024px)" href="src/styles/mobile/connexion_mobile.css"/>
      <?php session_start();?>
   </head>
   <body>
      <?php require('src/backend/connect_database.php');?>
      <aside>
         <p id="logo" class="logo-mobile">Cryp<span id="logo-orange">Taux</span></p>
         <section class="form-container">
            <form method="post">
               <h1 id="form-title">Inscription</h1>
               <div class="form-input">
                  <input class="user-input" type="text" name="username" value="" required="required" autocomplete="email" autofocus>
                  <label for="username">Nom d’utilisateur</label>
               </div>
               <div class="form-input">
                  <input class="user-input" type="mail" name="mail" value="" required="required" autocomplete="email">
                  <label for="mail">Adresse mail</label>
               </div>
               <div class="form-input" id="password-input">   
                  <input class="user-input" type="password" name="password" value=""  required="required">
                  <label for="password">Mot de passe</label>
                  <i id="icon-eye-show" class="bi bi-eye"></i>
                  <i id="icon-eye-hide" class="bi bi-eye-slash"></i>
               </div>
               <?php
               // Le formulaire a été envoyé
               if (!empty($_POST)) {
                  
                  // Récupérer les données du formulaire
                  $mail_user = $_POST["mail"];
                  $username_user = $_POST["username"];
                  $password_user = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hashage du mot de passe
                  
                  // L'adresse mail possède le bon format
                  if(filter_var($mail_user, FILTER_VALIDATE_EMAIL)){
                     $result = $db->query("SELECT count(mail) FROM cryptaux WHERE mail='$mail_user'");
                     $count = $result->fetchColumn();

                     // L'adresse mail ne se trouve pas encore dans la BDD
                     if ($count == 0) {
                        $favs_cryptocurrency_start = "bitcoin,btc/ethereum,eth/cardano,ada/shiba-inu,shib";
                        $db->query("INSERT INTO cryptaux VALUES ('$mail_user', '$username_user', '$password_user', '$favs_cryptocurrency_start')");
                        
                        $_SESSION['username'] = $username_user;
                        $_SESSION['mail'] = $mail_user;
                        $_SESSION['favs'] = '';

                        // Changer de page
                        header("Location: index.php");
                     } else {
                        // Rediriger l'utilisateur vers la page de connexion
                        header("Location: connexion.php");
                     }
                  } else{
                     echo "<p class='error-message'>Le format de l'adresse e-mail n'est pas valide.</p>";
                  }
               }
               ?>
               <div class="form-input">
                  <input class="submit-disabled" type="submit" value="S'inscrire">
                  <p class="have-account-redirection">Vous avez déjà un compte ? <a href="connexion.php">Connectez-vous</a></p>
               </div>
            </form>
            
            <p class="text-bottom-creator-logo">EHRHARD Alexandre & ECKSTEIN Théo</p>
         </section>
      </aside>
      <div id="hero-banner">
         <div class="hero-banner-container">
            <h2 id="hero-banner-slogan">L’outil idéal<br>pour les<br>crypto-monnaies.</h2>
            <p id="hero-banner-text">Consultez en temps réel le cours, la capitalisation boursière et les graphiques de plus de 13000 crypto-monnaies. Rejoignez-nous pour suivre leurs fluctuations ou en apprendre plus sur elles.</p>
         </div>
         <p id="logo" class="text-bottom-creator-logo">Cryp<span id="logo-orange">Taux</span></p>
      </div>
      <script src="src/scripts/Connexion.js"></script>
   </body>
</html>