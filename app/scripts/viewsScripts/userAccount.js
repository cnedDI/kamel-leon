var userAccountHtml = '<!-- Header -->'+
'<!-- End Header -->'+
'<div class="compte_details">'+
  '<div data-ng-init="initial()" document-methodes="">'+
    '<h2>'+
      '<span>{{compte.prenom}} {{compte.nom}} </span><br /><span class="blue-subtitle">Bienvenue sur votre compte</span>'+
    '</h2>'+
    '<!-- <div>'+
      '<ul>'+
        '<li>'+
          '{{compte.email}}'+
        '</li>'+
        '<li>'+
          '{{compte.nom}} {{compte.prenom}}'+
        '</li>'+
      '</ul>'+
    '</div> -->'+
    '<div>'+
      '<div id="addForm" name="addForm">'+
        '<div id="succes" class="alert alert-success" style="display:none" >Compte modifié avec succès !</div>'+
       
        '<form name="testForm" id="testForm" class="form_container">'+
          '<fieldset class="globalFieldStyle">'+
            '<div ng-show="affichage" class="alert alert-danger">'+
             '<ul ng-repeat="error in addErrorField">'+
                '<li>Le champ <strong>{{error}}</strong> est invalide</li>'+
             '</ul>'+
            '</div>'+
            '<p class="control_group">'+
              '<label for="prenom" id="label_fname_etap-one"><span>Prénom  </span></label>'+
              '<input type="text" class="" name="prenom" placeholder="Prénom" ng-model="compte.prenom" required>'+
            '</p>'+
            '<p class="control_group">'+
              '<label for="nom" id="label_name_etap-one"><span>Nom  </span></label>'+
              '<input type="text" class="" name="nom" placeholder="Nom" ng-model="compte.nom" required>'+
            '</p>'+
            '<p class="control_group">'+
              '<label for="email" id="label_email_etap-one"><span>Email</span></label>'+
              '<input type="text" class="" placeholder="Email" name="email" ng-model="compte.email" required disabled>'+
            '</p>'+
            '<a href="" class="green_link" data-toggle="modal" data-target="#confirmation_pw" title="{{\'Changer le mot de passe\' | translate}}" >Changer le mot de passe</a>'+
          '</fieldset>'+
          '<p class="centering">'+
            '<button type="button" class="btn_simple light_blue ng-scope" ng-click="modifierCompte()" title="{{\'Enregistrer\' | translate}}">Enregistrer</button>'+
          '</p>'+
        '</form>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div class="modal fade bs-example-modal-lg in" id="confirmation_pw" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false" >'+
    '<div class="modal-dialog modal-lg">'+
      '<div class="modal-content">'+
        '<div class="modal-header">'+
          '<button type="button" ng-click="cancelModification()" class="close" ng-click="" data-dismiss="modal" aria-hidden="true">&times;</button>'+
          '<h4 class="modal-title modal-title light_bluehead">Changer le mot de passe</h4>'+
        '</div>'+
        '<div class="modal-body adjust-modal-body">'+
           '<div id="errorPassword" class="alert alert-danger" style="display:none" >Ancien mot de passe erroné</div>'+
        '<div id="erreur" class="alert alert-danger" style="display:none" >Ces mots de passe ne correspondent pas.</div>'+
        '<div id="erreurPattern" class="alert alert-danger" style="display:none" >Le nouveau mot de passe doit contenir de 6 à 20 caractères</div>'+
          '<div class="">'+
            '<div class="tab-content">'+
              '<div class="tab-pane active" ng-form="AjoutformValidation" >'+
                '<form name="passwordForm" id="passwordForm" class="form_container">'+
                  '<fieldset class="globalFieldStyle">'+
                    '<div ng-show="modifierPasswordDisplay" class="alert alert-danger">'+
                       '<ul ng-repeat="error in passwordErrorField">'+
                          '<li>Le champ <strong>{{error}}</strong> est invalide</li>'+
                       '</ul>'+
                      '</div>'+
                    '<p class="control_group">'+

                      '<label for="oldpassword" class="label_keys-icn">Ancien mot de passe</label>'+
                      '<input type="password" name="oldPassword" class="" placeholder="Ancien mot de passe" ng-model="compte.oldPassword" required>'+
                    '</p>'+
                    '<p class="control_group">'+
                      '<label for="newPassword" class="label_keys-icn">Nouveau mot de passe</label>'+
                      '<input type="password" name="newPassword" class="" placeholder="Nouveau mot de passe" ng-model="compte.newPassword" required>'+
                    '</p>'+
                    '<p class="control_group">'+
                      '<label for="reNewPassword" class="label_keys-icn">Resaisir le nouveau mot de passe</label>'+
                      '<input type="password" name="reNewPassword" class="" placeholder="Resaisir le nouveau mot de passe" ng-model="compte.reNewPassword" required>'+
                    '</p>'+
                  '</fieldset>'+
                  '<p class="centering">'+
                    '<button data-dismiss="modal" ng-click="cancelModification()" class="reset_btn" type="button" title="Annuler">Annuler</button>'+
                    '<button type="button" class="btn_simple light_blue" ng-click="modifierPassword()" title="Modifier">Modifier</button>'+
                  '</p>'+
                '</form>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<!-- /.modal-content -->'+
      '</div>'+
      '<!-- /.modal-dialog -->'+
    '</div><!-- /.modal -->'+
  '</div>'+
'</div>'


