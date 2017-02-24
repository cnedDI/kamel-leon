/* File: profiles.js
 *
 * Copyright (c) 2013-2016
 * Centre National d’Enseignement à Distance (Cned), Boulevard Nicephore Niepce, 86360 CHASSENEUIL-DU-POITOU, France
 * (direction-innovation@cned.fr)
 *
 * GNU Affero General Public License (AGPL) version 3.0 or later version
 *
 * This file is part of a program which is free software: you can
 * redistribute it and/or modify it under the terms of the
 * GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 *
 */
'use strict';
/* global $:false */
/* jshint loopfunc:true */

var FB = FB;
var gapi = gapi;

angular.module('cnedApp')
    .controller('ProfilesCtrl', function ($scope, $http, $rootScope, removeStringsUppercaseSpaces,
                                          configuration, $location, serviceCheck, verifyEmail, $window,
                                          profilsService, $modal, $timeout, $interval, tagsService, $log, _) {

        /* Initializations */
        $scope.successMod = 'Profil Modifie avec succes !';
        $scope.successAdd = 'Profil Ajoute avec succes !';
        $scope.successDefault = 'defaultProfileSelection';
        $scope.displayText = '<p>AccessiDys facilite la lecture des documents, livres et pages web. AccessiDys vise les personnes en situation de handicap mais aussi toute personne ayant des difficultés pour lire des documents longs ou complexes. Depuis les élèves et étudiants avec une dyslexie jusqu’aux cadres supérieurs trop pressés jusqu’aux personnes âgées, AccessiDys facilite la compréhension des documents administratifs ou juridiques, des manuels scolaires traditionnels, des magazines ou journaux à la mise en page complexe, avec des petits caractères ou sans synthèse vocale. AccessiDys est une plateforme Web avec deux fonctions principales. Les pages Web ou documents à lire sont affichées en utilisant un profil de lecture sur mesure qui comprend un large choix de paramètres d’affichage adaptés aux besoins individuels de chaque lecteur. AccessiDys vise les lecteurs qui ont trop peu de temps ou d’attention, qui ont une dyslexie, une dyspraxie, un autisme ou des déficiences visuelles. AccessiDys sait également lire les pages Web à haute voix. AccessiDys rend vos documents ou pages accessibles aux lecteurs en les important de manière simple et rapide quel que soit le format du fichier d’origine. Qu’il s’agisse d’un fichier PDF numérisé, d’un document Office, d’un livre électronique au format ePub ou d’une page Web traditionnelle, AccessiDys vous permet de transformer votre document pour que les lecteurs bénéficient d’une expérience de lecture totalement personnalisée.</p>';
        $scope.displayTextSimple = 'AccessiDys facilite la lecture des documents, livres et pages web. AccessiDys vise les personnes en situation de handicap mais aussi toute personne ayant des difficultés pour lire des documents longs ou complexes. Depuis les élèves et étudiants avec une dyslexie jusqu’aux cadres supérieurs trop pressés jusqu’aux personnes âgées, AccessiDys facilite la compréhension des documents administratifs ou juridiques, des manuels scolaires traditionnels, des magazines ou journaux à la mise en page complexe, avec des petits caractères ou sans synthèse vocale. AccessiDys est une plateforme Web avec deux fonctions principales. Les pages Web ou documents à lire sont affichées en utilisant un profil de lecture sur mesure qui comprend un large choix de paramètres d’affichage adaptés aux besoins individuels de chaque lecteur. AccessiDys vise les lecteurs qui ont trop peu de temps ou d’attention, qui ont une dyslexie, une dyspraxie, un autisme ou des déficiences visuelles. AccessiDys sait également lire les pages Web à haute voix. AccessiDys rend vos documents ou pages accessibles aux lecteurs en les important de manière simple et rapide quel que soit le format du fichier d’origine. Qu’il s’agisse d’un fichier PDF numérisé, d’un document Office, d’un livre électronique au format ePub ou d’une page Web traditionnelle, AccessiDys vous permet de transformer votre document pour que les lecteurs bénéficient d’une expérience de lecture totalement personnalisée.';
        $scope.cancelDefault = 'cancelDefault';
        $scope.flag = false;
        $scope.colorLists = ['Pas de coloration', 'Colorer les mots', 'Colorer les syllabes', 'Colorer les lignes RBV', 'Colorer les lignes RVJ', 'Colorer les lignes RBVJ', 'Surligner les mots', 'Surligner les lignes RBV', 'Surligner les lignes RVJ', 'Surligner les lignes RBVJ'];
        $scope.weightLists = ['Gras', 'Normal'];
        $scope.headers = ['Nom', 'Descriptif', 'Action'];
        $scope.profilTag = {};
        $scope.profil = {};
        $scope.listTag = {};
        $scope.editTag = null;
        $scope.colorList = null;
        $scope.tagStyles = [];
        $scope.deletedParams = [];
        $scope.tagProfilInfos = [];
        $scope.variableFlag = false;
        $scope.trashFlag = false;
        $scope.admin = $rootScope.admin;
        $scope.displayDestination = false;
        $scope.testEnv = false;
        $scope.loader = false;
        $scope.loaderMsg = '';
        $scope.tagStylesToDelete = [];
        $scope.applyRules = false;
        $scope.forceApplyRules = true;
        $scope.demoBaseText = 'AccessiDys facilite la lecture des documents, livres et pages web. AccessiDys vise les personnes en situation de handicap mais aussi toute personne ayant des difficultés pour lire des documents longs ou complexes. Depuis les élèves et étudiants avec une dyslexie jusqu’aux cadres supérieurs trop pressés jusqu’aux personnes âgées, AccessiDys facilite la compréhension des documents administratifs ou juridiques, des manuels scolaires traditionnels, des magazines ou journaux à la mise en page complexe, avec des petits caractères ou sans synthèse vocale. AccessiDys est une plateforme Web avec deux fonctions principales. Les pages Web ou documents à lire sont affichées en utilisant un profil de lecture sur mesure qui comprend un large choix de paramètres d’affichage adaptés aux besoins individuels de chaque lecteur. AccessiDys vise les lecteurs qui ont trop peu de temps ou d’attention, qui ont une dyslexie, une dyspraxie, un autisme ou des déficiences visuelles. AccessiDys sait également lire les pages Web à haute voix. AccessiDys rend vos documents ou pages accessibles aux lecteurs en les important de manière simple et rapide quel que soit le format du fichier d’origine. Qu’il s’agisse d’un fichier PDF numérisé, d’un document Office, d’un livre électronique au format ePub ou d’une page Web traditionnelle, AccessiDys vous permet de transformer votre document pour que les lecteurs bénéficient d’une expérience de lecture totalement personnalisée.';
        $scope.policeLists = ['Arial', 'opendyslexicregular', 'Times New Roman', 'LDFComicSans',
            'HKGrotesk-Regular', 'SignikaNegative-Regular', 'Century Gothic', 'OpenSans-CondensedLight', 'CodeNewRoman',
            'FiraSansCondensed', 'AnonymousPro-Bold', 'AndikaNewBasic', 'TiresiasInfofontItalic'
        ];
        $scope.tailleLists = [{
            number: '8',
            label: 'eight'
        }, {
            number: '9',
            label: 'nine'
        }, {
            number: '10',
            label: 'ten'
        }, {
            number: '11',
            label: 'eleven'
        }, {
            number: '12',
            label: 'twelve'
        }, {
            number: '14',
            label: 'fourteen'
        }, {
            number: '16',
            label: 'sixteen'
        }, {
            number: '18',
            label: 'eighteen'
        }, {
            number: '22',
            label: 'twenty two'
        }, {
            number: '24',
            label: 'twenty four'
        }, {
            number: '26',
            label: 'twenty six'
        }, {
            number: '28',
            label: 'twenty eight'
        }, {
            number: '36',
            label: 'thirty six'
        }, {
            number: '48',
            label: 'fourty eight'
        }, {
            number: '72',
            label: 'seventy two'
        },];

        $scope.spaceLists = [{
            number: '1',
            label: 'one'
        }, {
            number: '2',
            label: 'two'
        }, {
            number: '3',
            label: 'three'
        }, {
            number: '4',
            label: 'four'
        }, {
            number: '5',
            label: 'five'
        }, {
            number: '6',
            label: 'six'
        }, {
            number: '7',
            label: 'seven'
        }, {
            number: '8',
            label: 'eight'
        }, {
            number: '9',
            label: 'nine'
        }, {
            number: '10',
            label: 'ten'
        }];
        $scope.spaceCharLists = [{
            number: '1',
            label: 'one'
        }, {
            number: '2',
            label: 'two'
        }, {
            number: '3',
            label: 'three'
        }, {
            number: '4',
            label: 'four'
        }, {
            number: '5',
            label: 'five'
        }, {
            number: '6',
            label: 'six'
        }, {
            number: '7',
            label: 'seven'
        }, {
            number: '8',
            label: 'eight'
        }, {
            number: '9',
            label: 'nine'
        }, {
            number: '10',
            label: 'ten'
        }];
        $scope.interligneLists = [{
            number: '1',
            label: 'one'
        }, {
            number: '2',
            label: 'two'
        }, {
            number: '3',
            label: 'three'
        }, {
            number: '4',
            label: 'four'
        }, {
            number: '5',
            label: 'five'
        }, {
            number: '6',
            label: 'six'
        }, {
            number: '7',
            label: 'seven'
        }, {
            number: '8',
            label: 'eight'
        }, {
            number: '9',
            label: 'nine'
        }, {
            number: '10',
            label: 'ten'
        }];
        $scope.defaultStyle = {};
        $scope.profiles = [];
        $scope.defaultSystemProfile = {};
        $scope.configuration = configuration;
        $scope.sortType = 'updated';
        $scope.sortReverse = true;

        $rootScope.$watch('admin', function () {
            $scope.admin = $rootScope.admin;
            $scope.apply; // jshint ignore:line
        });

        $scope.initProfil = function () {
            $scope.verifProfil();
            $scope.getProfiles(); // Initialize profile list
            $scope.token = {
                id: localStorage.getItem('compteId')
            };
        };

        /**
         * Open a modal to alert the user that sharing is unavailable  in disconnected mode.
         *
         * @method $partageInfoDeconnecte
         */
        $scope.partageInfoDeconnecte = function () {
            $modal.open({
                templateUrl: 'views/common/informationModal.html',
                controller: 'InformationModalCtrl',
                size: 'sm',
                resolve: {
                    title: function () {
                        return 'Pas d\'accès internet';
                    },
                    content: function () {
                        return 'La fonctionnalité de partage de profil nécessite un accès à internet';
                    },
                    reason: function () {
                        return null;
                    },
                    forceClose: function () {
                        return null;
                    }
                }
            });
        };


        /**
         * Open a modal to indicate to the user that the display of profile
         * is unavailable in disconnected mode
         *
         * @method $partageInfoDeconnecte
         */
        $scope.affichageInfoDeconnecte = function () {
            $modal.open({
                templateUrl: 'views/common/informationModal.html',
                controller: 'InformationModalCtrl',
                size: 'sm',
                resolve: {
                    title: function () {
                        return 'Pas d\'accès internet';
                    },
                    content: function () {
                        return 'L\'affichage de ce profil nécessite au moins un affichage préalable via internet.';
                    },
                    reason: function () {
                        return '/profiles';
                    },
                    forceClose: function () {
                        return null;
                    }
                }
            });
        };


        /**
         * Open a modal with selected detail profile
         *
         * @param template
         * @param profile
         *
         * @method $openProfileModal
         */
        $scope.openProfileModal = function (template, profile) {
            var modalInstance = $modal.open({
                templateUrl: 'views/profiles/profilAffichageModal.html',
                controller: 'profilesAffichageModalCtrl',
                windowClass: 'profil-lg',
                backdrop: true,
                scope: $scope,
                resolve: {
                    template: function () {
                        return template;
                    },
                    profile: function () {
                        return profile;
                    }
                }
            });

            modalInstance.result.then(function (params) {
                // Modal closed

                if (params.operation === 'edit-tag') {

                    $scope.openTagEditModal(params.profile, params.index).then(function (tagEditParams) {
                        // Modal closed
                        $scope.openProfileModal(params.template, tagEditParams.profile);
                    }, function () {
                        // Modal dismissed
                        $scope.openProfileModal(params.template, params.profile);
                    });

                } else if (params.operation === 'rename') {
                    $scope.openRenameProfilModal(params.profile).then(function (renameParams) {
                        // Modal closed
                        $scope.openProfileModal(params.template, renameParams.profile);
                    }, function () {
                        // Modal dismissed
                        $scope.openProfileModal(params.template, params.profile);
                    });
                }

            }, function (params) {
                // Modal dismissed
                if (params.operation && params.operation === 'save') {
                    if ($location.absUrl().lastIndexOf('detailProfil') <= -1) {
                        $scope.initProfil();
                        if (params.template === 'update') {
                            $scope.showSuccessToaster('#editPanel');
                        } else {
                            $scope.showSuccessToaster('#addPanel');
                        }
                    }
                }
            });
        };

        /**
         * Open edit tag modal for a specific profileTag
         *
         * @param profile
         * @param profileTagIndex
         *
         * @method $openTagEditModal
         */
        $scope.openTagEditModal = function (profile, profileTagIndex) {
            return $modal.open({
                templateUrl: 'views/profiles/editProfilStyleModal.html',
                controller: 'styleEditModalCtrl',
                windowClass: 'profil-lg',
                backdrop: true,
                scope: $scope,
                resolve: {
                    profile: function () {
                        return profile;
                    },
                    profileTagIndex: function () {
                        return profileTagIndex;
                    }
                }
            }).result;
        };

        /**
         * Open rename modal of a profile
         *
         * @param profile
         *
         * @method $openRenameProfilModal
         */
        $scope.openRenameProfilModal = function (profile) {
            return $modal.open({
                templateUrl: 'views/profiles/renameProfilModal.html',
                controller: 'profilesRenommageModalCtrl',
                scope: $scope,
                backdrop: true,
                resolve: {
                    profile: function () {
                        return profile;
                    }
                }
            }).result;
        };

        /**
         * Open a modal to alert the user that the delegation
         * is unavailable in disconnected mode
         *
         * @method $delegationInfoDeconnecte
         */
        $scope.delegationInfoDeconnecte = function () {
            $modal.open({
                templateUrl: 'views/common/informationModal.html',
                controller: 'InformationModalCtrl',
                size: 'sm',
                resolve: {
                    title: function () {
                        return 'Pas d\'accès internet';
                    },
                    content: function () {
                        return 'La fonctionnalité de délégation de profil nécessite un accès à internet';
                    },
                    reason: function () {
                        return null;
                    },
                    forceClose: function () {
                        return null;
                    }
                }
            });
        };

        $scope.displayOwner = function (param) {
            if (param.state === 'mine' || ($rootScope.currentUser.local.role === 'admin' && $rootScope.currentUser._id === param.owner)) {
                return 'Moi-même';
            } else if (param.state === 'favoris') {
                return 'Favoris';
            } else if (param.state === 'delegated') {
                return 'Délégué';
            } else if (param.state === 'default') {
                return 'Accessidys';
            }
        };

        // TODO To be review
        $scope.verifProfil = function () {
            if (!localStorage.getItem('listTagsByProfil')) {
                if (!$scope.token && localStorage.getItem('compteId')) {
                    $scope.token = {
                        id: localStorage.getItem('compteId')
                    };
                }
                $http.post(configuration.URL_REQUEST + '/chercherProfilActuel', $scope.token)
                    .success(function (dataActuel) {
                        $scope.chercherProfilActuelFlag = dataActuel;
                        $scope.varToSend = {
                            profilID: $scope.chercherProfilActuelFlag.profilID
                        };
                        $http.post(configuration.URL_REQUEST + '/chercherTagsParProfil', {
                            idProfil: $scope.chercherProfilActuelFlag.profilID
                        }).success(function (data) {
                            $scope.chercherTagsParProfilFlag = data;
                            localStorage.setItem('listTagsByProfil', JSON.stringify($scope.chercherTagsParProfilFlag));

                        });
                    });
            }
        };

        // gets the user that is connected
        $scope.currentUser = function () {
            $scope.afficherProfilsParUser();
        };


        $scope.showLoader = function () {
            console.log('loader show');
            $scope.loader = true;
            $scope.loaderMsg = 'Affichage de la liste des profils en cours ...';
        };

        $scope.hideLoader = function () {
            console.log('loader hide');
            $scope.loader = false;
            $scope.loaderMsg = '';
        };


        $scope.showLoaderFromLoop = function (indexLoop) {
            //check if first element of the loop
            if (indexLoop <= 0) {
                $scope.showLoader();
            }
        };
        $scope.showProfilLoaderFromLoop = function (indexLoop) {
            //check if first element of the loop
            if (indexLoop <= 0) {
                $scope.loader = true;
                $scope.loaderMsg = 'Affichage du profil en cours ...';
            }
        };

        $scope.hideLoaderFromLoop = function (indexLoop, max) {
            //Get nb listProfilTags length to check if last element of the loop
            if (indexLoop >= (max - 1)) {
                $scope.hideLoader();
            }
        };

        $scope.tests = {};
        // Load user profiles
        $scope.afficherProfilsParUser = function () {

            $log.debug('afficherProfilsParUser ==> ');
            profilsService.getProfilsByUser($rootScope.isAppOnline)
                .then(function (data) {
                    if (data) {

                        $log.debug('getProfilsByUser - data :', data);
                        /* Filter Profiles of the Admin */
                        if ($rootScope.currentUser.local.role === 'admin') {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].type === 'profile' && data[i].state === 'mine') {
                                    for (var j = 0; j < data.length; j++) {
                                        if (data[i]._id === data[j]._id && data[j].state === 'default' && data[j].owner === $rootScope.currentUser._id) {
                                            data[i].stateDefault = true;
                                            data.splice(j, 2);
                                        }
                                    }
                                }
                            }
                        }
                        $rootScope.$emit('refreshProfilAcutel', data);
                        tagsService.getTags().then(function (tags) {
                            $scope.listTags = tags;

                            var tagText = {};

                            for (var i = data.length - 1; i >= 0; i--) {
                                // jshint ignore:line
                                if (data[i].type === 'tags') {

                                    var tagShow = [];
                                    var nivTag = 0;
                                    var nivTagTmp = 0;
                                    var texteTag;
                                    // Tags order
                                    for (var j = 0; j < data[i].tags.length; j++) {
                                        // jshint ignore:line
                                        for (var k = 0; k < $scope.listTags.length; k++) {
                                            if (data[i].tags[j].tag === $scope.listTags[k]._id) {
                                                data[i].tags[j].position = $scope.listTags[k].position;
                                            }
                                        }
                                    }
                                    data[i].tags.sort(function (a, b) {
                                        return a.position - b.position;
                                    });

                                    for (var j = 0; j < data[i].tags.length; j++) { // jshint ignore:line
                                        nivTagTmp = nivTag;
                                        for (var k = 0; k < $scope.listTags.length; k++) { // jshint ignore:line
                                            if (data[i].tags[j].tag === $scope.listTags[k]._id) {
                                                var tmpText = {};
                                                tmpText.spaceSelected = 0 + (data[i].tags[j].spaceSelected - 1) * 0.18;
                                                tmpText.spaceCharSelected = 0 + (data[i].tags[j].spaceCharSelected - 1) * 0.12;
                                                tmpText.interligneList = 1.286 + (data[i].tags[j].interligne - 1) * 0.18;
                                                tmpText.tailleList = 1 + (data[i].tags[j].taille - 1) * 0.18;

                                                if ($scope.listTags[k].niveau && parseInt($scope.listTags[k].niveau) > 0) {
                                                    nivTag = parseInt($scope.listTags[k].niveau);
                                                    nivTagTmp = nivTag;
                                                    nivTag++;
                                                }

                                                if (nivTagTmp === 0) {
                                                    tagText.niveau = 0;
                                                    tagText.width = 1055;
                                                } else {
                                                    tagText.niveau = (nivTagTmp - 1) * 30;
                                                    var calculatedWidth = (1055 - tagText.niveau);
                                                    tagText.width = calculatedWidth;
                                                }

                                                // génération of the style
                                                var fontstyle = 'Normal';
                                                if (data[i].tags[j].styleValue === 'Gras') {
                                                    fontstyle = 'Bold';
                                                }
                                                // Transformation appropriate to the application.
                                                var style = 'font-family: ' + data[i].tags[j].police + ';' +
                                                    'font-size: ' + (data[i].tags[j].taille / 12) + 'em; ' +
                                                    'line-height: ' + (1.286 + (data[i].tags[j].interligne - 1) * 0.18) + 'em;' +
                                                    'font-weight: ' + fontstyle + ';  ' +
                                                    'word-spacing: ' + (0 + (data[i].tags[j].spaceSelected - 1) * 0.18) + 'em;' +
                                                    'letter-spacing: ' + (0 + (data[i].tags[j].spaceCharSelected - 1) * 0.12) + 'em;';

                                                if ($scope.listTags[k].balise !== 'div') {
                                                    texteTag = '<' + $scope.listTags[k].balise + ' style="' + style + '" data-margin-left="' + tagText.niveau + '" >' + $scope.listTags[k].libelle;
                                                } else {
                                                    texteTag = '<' + $scope.listTags[k].balise + ' style="' + style + '" data-margin-left="' + tagText.niveau + '" class="' + removeStringsUppercaseSpaces($scope.listTags[k].libelle) + '">' + $scope.listTags[k].libelle;
                                                }
                                                texteTag += (': ' + $scope.demoBaseText + '</' + $scope.listTags[k].balise + '>');

                                                tagText = {
                                                    texte: texteTag
                                                };

                                                tagShow.push(tagText);
                                                break;
                                            }
                                        }

                                    }
                                    data[i].tagsText = tagShow;

                                }
                                data[i].showed = true;
                            }
                        });

                        $scope.tests = data;
                        $log.debug('$scope.tests', $scope.tests);
                        if (!$scope.$$phase) {
                            $scope.$digest();
                        }
                        $log.debug('$scope.tests - ', $scope.tests);
                        // Force the re-application of colorations.
                        $scope.forceRulesApply();
                    }
                });

        };


        $scope.isDeletable = function (param) {
            if (param.favourite && param.delete) {
                return true;
            }
            if (param.favourite && !param.delete) {
                return false;
            }
        };

        // Add a profile TODO To be delete
        $scope.erreurAfficher = false;
        $scope.errorAffiche = [];
        $scope.erreurNomExistant = false;

        // Delete the profile
        $scope.supprimerProfil = function () {
            $scope.loader = true;
            $scope.loaderMsg = 'Suppression du profil en cours ...';
            profilsService.deleteProfil($rootScope.isAppOnline, $rootScope.currentUser._id, $scope.sup._id).then(function (data) {
                $scope.profilFlag = data;
                $('#deleteModal').modal('hide');
                $scope.loader = false;
                $scope.loaderMsg = '';

                $scope.tagStyles = [];
                $scope.removeUserProfileFlag = data;
                if ($scope.sup.nom === $('#headerSelect + .customSelect .customSelectInner').text()) {
                    $scope.token.defaultProfile = $scope.removeVar;
                    $http.post(configuration.URL_REQUEST + '/setProfilParDefautActuel', $scope.token)
                        .success(function () {
                            localStorage.removeItem('profilActuel');
                            localStorage.remoremoveItemveItem('listTags');
                            localStorage.removeItem('listTagsByProfil');
                            $window.location.reload();
                        });
                } else {
                    $rootScope.updateListProfile = !$rootScope.updateListProfile;
                    $scope.init();
                }
            });
        };

        // Pre-deleting profile
        $scope.preSupprimerProfil = function (profil) {
            $scope.sup = profil;
            $scope.profilName = profil.nom;
        };

        $scope.forceRulesApply = function () {
            $scope.forceApplyRules = false;
            $timeout(function () {
                $scope.forceApplyRules = true;
            });
        };

        // Diplaying the tags
        $scope.afficherTags = function (force, popup) {

            if (localStorage.getItem('listTags')) {
                $scope.listTags = JSON.parse(localStorage.getItem('listTags'));
                // Set disabled tags
                for (var i = $scope.tagStyles.length - 1; i >= 0; i--) {
                    for (var j = $scope.listTags.length - 1; j >= 0; j--) {
                        if ($scope.listTags[j]._id === $scope.tagStyles[i].tag) {
                            $scope.listTags[j].disabled = true;
                            $scope.tagStyles[i].tagLibelle = $scope.listTags[j].libelle;
                        }
                    }
                }
                if (force) {
                    $scope.openProfileModal(popup);
                }

            } else {
                tagsService.getTags().then(function (data) {
                    $scope.listTags = data;
                    // Set disabled tags
                    for (var i = $scope.tagStyles.length - 1; i >= 0; i--) {
                        for (var j = $scope.listTags.length - 1; j >= 0; j--) {
                            if ($scope.listTags[j]._id === $scope.tagStyles[i].tag) {
                                $scope.listTags[j].disabled = true;
                                $scope.tagStyles[i].tagLibelle = $scope.listTags[j].libelle;
                            }
                        }
                    }
                    if (force) {
                        $scope.openProfileModal(popup);
                    }
                });
            }

        };

        /**
         * This function allows to initialize the styles of a profile
         * to be created by the default one of the application.
         */
        $scope.initAddProfilTags = function (tags) {
            var listTagsMaps = {};
            angular.forEach($scope.listTags, function (item) {
                listTagsMaps[item._id] = item;
            });
            // Format the tags data by what is expected by the server
            angular.forEach(tags, function (item) {
                $scope.tagStyles.push({
                    tag: item.tag,
                    id_tag: item.tag,
                    style: item.texte,
                    label: listTagsMaps[item.tag].libelle,
                    police: item.police,
                    taille: item.taille,
                    interligne: item.interligne,
                    styleValue: item.styleValue,
                    coloration: item.coloration,
                    spaceSelected: item.spaceSelected,
                    spaceCharSelected: item.spaceCharSelected
                });
            });
            $scope.afficherTags(true, 'ajout');
        };

        /**
         * This function generates the name of the profile
         */
        $scope.generateProfileName = function (actualPrenom, numeroPrenom, i) {
            if ($scope.profiles[i].type === 'profile' && $scope.profiles[i].nom.indexOf(actualPrenom) > -1 && $scope.profiles[i].nom.length === actualPrenom.length) {
                numeroPrenom++;
                actualPrenom = $rootScope.currentUser.local.prenom + ' ' + numeroPrenom;
                if ((i + 1) < $scope.profiles.length) {
                    return $scope.generateProfileName(actualPrenom, numeroPrenom, 0);
                } else {
                    return actualPrenom;
                }
            } else if ((i + 1) < $scope.profiles.length) {
                return $scope.generateProfileName(actualPrenom, numeroPrenom, (i + 1));
            } else {
                return actualPrenom;
            }
        };

        /* Update the list of TagsParProfil */
        $scope.updateProfilActual = function () {
            var profilActual = JSON.parse(localStorage.getItem('profilActuel'));

            /* Update the overview of the list of the profiles.*/
            if ($location.absUrl().lastIndexOf('detailProfil') > -1) {
                $scope.initDetailProfil();
            } else {
                $scope.afficherProfilsParUser();
            }
            if (profilActual && $scope.profMod._id === profilActual._id) {
                profilsService.getProfilTags($scope.profilFlag._id).then(function (data) {
                    localStorage.setItem('listTagsByProfil', JSON.stringify(data));
                });
            }
        };

        // save the profileTag during the edition
        $scope.editionAddProfilTag = function () {
            var profilTagsResult = [];

            if (!$scope.token || !$scope.token.id) {
                $scope.token = {
                    id: localStorage.getItem('compteId')
                };
            }

            $scope.tagStyles.forEach(function (item) {
                var profilTag = {
                    id_tag: item.tag,
                    style: item.texte,
                    police: item.police,
                    taille: item.taille,
                    interligne: item.interligne,
                    styleValue: item.styleValue,
                    coloration: item.coloration,
                    spaceSelected: item.spaceSelected,
                    spaceCharSelected: item.spaceCharSelected
                };
                if (item.state !== 'deleted') {
                    profilTagsResult.push(profilTag);
                }
            });

            $scope.resetEditProfilModal();

            console.log('new tags : ');
            console.log(profilTagsResult);

            profilsService.updateProfilTags($rootScope.isAppOnline, $scope.profMod, profilTagsResult).then(function () {
                if ($location.absUrl().lastIndexOf('detailProfil') > -1) {
                    $scope.initDetailProfil();
                    $('#profilAffichageModal').modal('hide');
                } else {
                    $('#profilAffichageModal').modal('hide');
                    $scope.afficherProfilsParUser();
                }
                $scope.updateProfilActual();
                $('#editPanel').fadeIn('fast').delay(1000).fadeOut('fast');

            });

        };

        $scope.resetEditProfilModal = function () {
            $scope.tagStyles = [];
            $scope.tagList = {};
            $scope.policeList = null;
            $scope.tailleList = null;
            $scope.interligneList = null;
            $scope.weightList = null;
            $scope.listeProfils = {};
            $scope.editTag = null;
            $scope.colorList = null;
            $scope.spaceSelected = null;
            $scope.spaceCharSelected = null;
            $('.shown-text-edit').text($scope.displayTextSimple);
            $('.shown-text-edit').css('font-family', '');
            $('.shown-text-edit').css('font-size', '');
            $('.shown-text-edit').css('line-height', '');
            $('.shown-text-edit').css('font-weight', '');
            $('.shown-text-edit').removeAttr('style');

            $('select[data-ng-model="editTag"] + .customSelect .customSelectInner').text('');
            $('select[data-ng-model="policeList"] + .customSelect .customSelectInner').text('');
            $('select[data-ng-model="tailleList"] + .customSelect .customSelectInner').text('');
            $('select[data-ng-model="interligneList"] + .customSelect .customSelectInner').text('');
            $('select[data-ng-model="weightList"] + .customSelect .customSelectInner').text('');
            $('select[data-ng-model="colorList"] + .customSelect .customSelectInner').text('');
            $('select[data-ng-model="spaceSelected"] + .customSelect .customSelectInner').text('');
            $('select[data-ng-model="spaceCharSelected"] + .customSelect .customSelectInner').text('');
        };

        // Deactivate the button  'select' after the validation.
        $scope.affectDisabled = function (param) {
            if (param) {
                return true;
            } else {
                return false;
            }
        };

        // Check of fields before validation during the addition
        $scope.beforeValidationAdd = function () {
            $scope.addFieldError = [];
            $scope.affichage = false;

            if ($scope.profil.nom == null) { // jshint ignore:line
                $scope.addFieldError.push(' Nom ');
                $scope.affichage = true;
            }
            if ($scope.tagList == null) { // jshint ignore:line
                $scope.addFieldError.push(' Style ');
                $scope.affichage = true;
            }
            if ($scope.policeList == null) { // jshint ignore:line
                $scope.addFieldError.push(' Police ');
                $scope.affichage = true;
            }
            if ($scope.tailleList == null) { // jshint ignore:line
                $scope.addFieldError.push(' Taille ');
                $scope.affichage = true;
            }
            if ($scope.interligneList == null) { // jshint ignore:line
                $scope.addFieldError.push(' Interligne ');
                $scope.affichage = true;
            }
            if ($scope.colorList == null) { // jshint ignore:line
                $scope.addFieldError.push(' Coloration ');
                $scope.affichage = true;
            }
            if ($scope.weightList == null) { // jshint ignore:line
                $scope.addFieldError.push(' Graisse ');
                $scope.affichage = true;
            }
            if ($scope.spaceSelected == null) { // jshint ignore:line
                $scope.addFieldError.push(' espace entre les mots ');
                $scope.affichage = true;
            }
            if ($scope.spaceCharSelected == null) { // jshint ignore:line
                $scope.addFieldError.push(' Espace entre Les caractères ');
                $scope.affichage = true;
            }

            if ($scope.addFieldError.length === 0) {
                $scope.validerStyleTag();
                $scope.addFieldError.state = true;
                $scope.affichage = false;
                $scope.erreurAfficher = false;
                $scope.errorAffiche = [];
                $scope.colorationCount = 0;
                $scope.oldColoration = null;
                $scope.spaceSelected = null;
                $scope.spaceSelected = null;
            }
        };
        $scope.addFieldError = [];


        // Validate the attributes of a Tag
        $scope.validerStyleTag = function () {

            try {
                $scope.currentTag = JSON.parse($scope.tagList);
            } catch (ex) {
                console.log('Exception ==> ', ex);
                $scope.currentTag = $scope.tagList;
            }

            var fontstyle = 'Normal';
            if ($scope.weightList === 'Gras') {
                fontstyle = 'Bold';
            }
            var tmpText = {};
            tmpText.spaceSelected = 0 + ($scope.spaceSelected - 1) * 0.18;
            tmpText.spaceCharSelected = 0 + ($scope.spaceCharSelected - 1) * 0.12;
            tmpText.interligneList = 1.286 + ($scope.interligneList - 1) * 0.18;
            tmpText.tailleList = 1 + ($scope.tailleList - 1) * 0.18;

            var mytext = '<p data-font="' + $scope.policeList + '" data-size="' + tmpText.tailleList + '" data-lineheight="' + tmpText.interligneList + '" data-weight="' + fontstyle + '" data-coloration="' + $scope.colorList + '" data-word-spacing="' + tmpText.spaceSelected + '" data-letter-spacing="' + tmpText.spaceCharSelected + '" > </p>';

            var tagExist = false;
            for (var i = 0; i < $scope.tagStyles.length; i++) {
                if ($scope.tagStyles[i].id_tag === $scope.currentTag._id) {
                    $scope.tagStyles[i].style = mytext;
                    $scope.tagStyles[i].label = $scope.currentTag.libelle;
                    $scope.tagStyles[i].police = $scope.policeList;
                    $scope.tagStyles[i].taille = $scope.tailleList;
                    $scope.tagStyles[i].interligne = $scope.interligneList;
                    $scope.tagStyles[i].styleValue = $scope.weightList;
                    $scope.tagStyles[i].coloration = $scope.colorList;
                    $scope.tagStyles[i].spaceSelected = $scope.spaceSelected;
                    $scope.tagStyles[i].spaceCharSelected = $scope.spaceCharSelected;
                    tagExist = true;
                    if (!$scope.testEnv) {
                        var tagDescr = $scope.getTagsDescription($scope.currentTagProfil.id_tag);
                        $scope.defaultStyle.tagsText[i].texte = $scope.refreshEditStyleTextDemo(tagDescr, $scope.defaultStyle.tagsText[i].texte);
                    }
                    break;
                }
            }

            // If Tag does not exist already, add a new One
            if (!tagExist) {
                $scope.tagStyles.push({
                    id_tag: $scope.currentTag._id,
                    style: mytext,
                    label: $scope.currentTag.libelle,
                    police: $scope.policeList,
                    taille: $scope.tailleList,
                    interligne: $scope.interligneList,
                    styleValue: $scope.weightList,
                    coloration: $scope.colorList,
                    spaceSelected: $scope.spaceSelected,
                    spaceCharSelected: $scope.spaceCharSelected
                });
            }


            angular.element($('#style-affected-add').removeAttr('style'));
            $scope.editStyleChange('initialiseColoration', null);

            $scope.colorationCount = 0;
            $scope.tagList = null;
            $scope.policeList = null;
            $scope.tailleList = null;
            $scope.interligneList = null;
            $scope.weightList = null;
            $scope.colorList = null;
            $scope.spaceSelected = null;
            $scope.spaceCharSelected = null;
            $scope.editTag = null;

            // Disable Already Selected Tags
            for (var i = $scope.listTags.length - 1; i >= 0; i--) { // jshint ignore:line
                for (var j = 0; j < $scope.tagStyles.length; j++) {
                    if ($scope.listTags[i]._id === $scope.tagStyles[j].id_tag) {
                        $scope.listTags[i].disabled = true;
                    }
                }
            }
        };


        // Modify the attributes of a Tag
        $scope.editStyleTag = function (tagStyleParametre) {
            if (typeof tagStyleParametre !== 'object') {
                tagStyleParametre = $scope.tagStyles[tagStyleParametre];
            }
            $scope.currentTagProfil = tagStyleParametre;

            for (var i = 0; i < $scope.tagStyles.length; i++) {
                if (tagStyleParametre.id_tag === $scope.tagStyles[i].id_tag) {

                    // Show the name of the tag in the 'Select'
                    $scope.tagStyles[i].disabled = true;


                    // Set the parameters to be displayed
                    $scope.tagList = {
                        _id: tagStyleParametre.id_tag,
                        libelle: tagStyleParametre.label
                    };
                    $scope.policeList = tagStyleParametre.police;
                    $scope.tailleList = tagStyleParametre.taille;
                    $scope.interligneList = tagStyleParametre.interligne;
                    $scope.weightList = tagStyleParametre.styleValue;
                    $scope.colorList = tagStyleParametre.coloration;
                    $scope.spaceSelected = tagStyleParametre.spaceSelected;
                    $scope.spaceCharSelected = tagStyleParametre.spaceCharSelected;
                    $scope.openTagEditModal('ajout');
                }
            }
        };

        $scope.checkStyleTag = function () {
            if ($scope.tagStyles.length > 0) {
                return false;
            }
            if ($scope.tagStyles.length === 0 && $scope.trashFlag) {
                return false;
            }
            return true;
        };

        $scope.editStyleChange = function (operation, value) {
            $rootScope.$emit('reglesStyleChange', {
                'operation': operation,
                'element': 'shown-text-edit',
                'value': value
            });
        };

        $scope.mettreParDefaut = function (param) {
            $scope.defaultVar = {
                userID: param.owner,
                profilID: param._id,
                defaultVar: true
            };
            param.defautMark = true;
            param.defaut = true;
            $scope.token.addedDefaultProfile = $scope.defaultVar;
            $http.post(configuration.URL_REQUEST + '/setDefaultProfile', $scope.token)
                .success(function (data) {
                    $scope.defaultVarFlag = data;
                    $('#defaultProfile').fadeIn('fast').delay(5000).fadeOut('fast');
                    $('.action_btn').attr('data-shown', 'false');
                    $('.action_list').attr('style', 'display:none');
                    if ($scope.testEnv === false) {
                        $scope.getProfiles();
                    }
                });
        };

        $scope.retirerParDefaut = function (param) {
            $scope.defaultVar = {
                userID: param.owner,
                profilID: param._id,
                defaultVar: false
            };

            if ($scope.token && $scope.token.id) {
                $scope.token.cancelFavs = $scope.defaultVar;
            } else {
                $scope.token.id = localStorage.getItem('compteId');
                $scope.token.cancelFavs = $scope.defaultVar;
            }

            $http.post(configuration.URL_REQUEST + '/cancelDefaultProfile', $scope.token)
                .success(function (data) {
                    $scope.cancelDefaultProfileFlag = data;
                    $('#defaultProfileCancel').fadeIn('fast').delay(5000).fadeOut('fast');
                    $('.action_btn').attr('data-shown', 'false');
                    $('.action_list').attr('style', 'display:none');
                    if ($scope.testEnv === false) {
                        $scope.getProfiles();
                    }
                });
        };

        $scope.isDefault = function (param) {
            if (param && param.stateDefault || param.state === 'default') {
                return true;
            }
            return false;
        };

        $scope.isDelegated = function (param) {
            if (param && param.state === 'delegated') {
                return true;
            }
            return false;
        };

        $scope.isFavourite = function (param) {
            if (param && (param.state === 'favoris' || param.state === 'default')) {
                return true;
            }
            return false;
        };

        $scope.isProfil = function (param) {
            if (param && param.type === 'profile') {
                return true;
            }
            return false;
        };

        $scope.isOwnerDelagate = function (param) {
            if (param && param.delegated && param.owner === $rootScope.currentUser._id) {
                return true;
            }
            return false;
        };

        $scope.isAnnuleDelagate = function (param) {
            if (param && param.preDelegated && param.owner === $rootScope.currentUser._id) {
                return true;
            }
            return false;
        };

        $scope.isDelegatedOption = function (param) {
            if (param && !param.delegated && !param.preDelegated && param.owner === $rootScope.currentUser._id) {
                return true;
            }
            return false;
        };

        $scope.isDeletableIHM = function (param) {
            if (param.owner === $rootScope.currentUser._id) {
                return true;
            }
            return false;
        };

        $scope.preRemoveFavourite = function (param) {
            $scope.profilId = param._id;
        };

        $scope.removeFavourite = function () {
            $scope.sendVar = {
                profilID: $scope.profilId,
                userID: $rootScope.currentUser._id,
                favoris: true
            };

            if ($scope.token && $scope.token.id) {
                $scope.token.favProfile = $scope.sendVar;
            } else {
                $scope.token.id = localStorage.getItem('compteId');
                $scope.token.favProfile = $scope.sendVar;
            }
            $http.post(configuration.URL_REQUEST + '/removeUserProfileFavoris', $scope.token)
                .success(function (data) {
                    $scope.removeUserProfileFavorisFlag = data;
                    localStorage.removeItem('profilActuel');
                    localStorage.removeItem('listTagsByProfil');
                    $rootScope.$broadcast('initProfil');
                    if ($scope.testEnv === false) {
                        $scope.getProfiles();
                    }

                });

        };

        /* sending email when duplicating. */
        $scope.sendEmailDuplique = function () {
            $http.post(configuration.URL_REQUEST + '/findUserById', {
                idUser: $scope.oldProfil.owner
            }).success(function (data) {
                $scope.findUserByIdFlag = data;
                if (data && data.local) {
                    var fullName = $rootScope.currentUser.local.prenom + ' ' + $rootScope.currentUser.local.nom;
                    $scope.sendVar = {
                        emailTo: data.local.email,
                        content: '<span> ' + fullName + ' vient d\'utiliser Accessidys pour dupliquer votre profil : ' + $scope.oldProfil.nom + '. </span>',
                        subject: fullName + ' a dupliqué votre profil'
                    };
                    $http.post(configuration.URL_REQUEST + '/sendEmail', $scope.sendVar)
                        .success(function () {
                        });
                }
            }).error(function () {
                console.log('erreur lors de lenvoie du mail dupliquer');
            });
        };


        $scope.preDeleguerProfil = function (profil) {
            if (!$rootScope.isAppOnline) {
                $scope.delegationInfoDeconnecte();
            } else {
                $('#delegateModal').modal('show');
                $scope.profDelegue = profil;
                $scope.errorMsg = '';
                $scope.successMsg = '';
                $scope.delegateEmail = '';
            }
        };

        $scope.deleguerProfil = function () {
            $scope.errorMsg = '';
            $scope.successMsg = '';
            if (!$scope.delegateEmail || $scope.delegateEmail.length <= 0) {
                $scope.errorMsg = 'L\'email est obligatoire !';
                return;
            }
            if (!verifyEmail($scope.delegateEmail)) {
                $scope.errorMsg = 'L\'email est invalide !';
                return;
            }
            $http.post(configuration.URL_REQUEST + '/findUserByEmail', {
                email: $scope.delegateEmail
            })
                .success(function (data) {
                    if (data) {
                        $scope.findUserByEmailFlag = data;
                        var emailTo = data.local.email;

                        if (emailTo === $rootScope.currentUser.local.email) {
                            $scope.errorMsg = 'Vous ne pouvez pas déléguer votre profil à vous même !';
                            return;
                        }

                        $('#delegateModal').modal('hide');

                        var sendParam = {
                            idProfil: $scope.profDelegue._id,
                            idDelegue: data._id
                        };
                        $scope.loader = true;
                        $scope.loaderMsg = 'Délégation du profil en cours...';
                        $http.post(configuration.URL_REQUEST + '/delegateProfil', sendParam)
                            .success(function () {
                                var profilLink = $location.absUrl();
                                profilLink = profilLink.replace('#/profiles', '#/detailProfil?idProfil=' + $scope.profDelegue._id);
                                var fullName = $rootScope.currentUser.local.prenom + ' ' + $rootScope.currentUser.local.nom;
                                $scope.sendVar = {
                                    emailTo: emailTo,
                                    content: '<span> ' + fullName + ' vient d\'utiliser Accessidys pour vous déléguer son profil : <a href=' + profilLink + '>' + $scope.profDelegue.nom + '</a>. </span>',
                                    subject: 'Profil délégué'
                                };
                                $http.post(configuration.URL_REQUEST + '/sendEmail', $scope.sendVar, {
                                    timeout: 60000
                                }).success(function () {
                                    $('#msgSuccess').fadeIn('fast').delay(5000).fadeOut('fast');
                                    $scope.msgSuccess = 'La demande est envoyée avec succés.';
                                    $scope.errorMsg = '';
                                    $scope.delegateEmail = '';
                                    $scope.loader = false;
                                    $scope.afficherProfilsParUser();
                                }).error(function () {
                                    $('#msgError').fadeIn('fast').delay(5000).fadeOut('fast');
                                    $scope.msgError = 'Erreur lors de l\'envoi de la demande.';
                                    $scope.loader = false;
                                    $scope.afficherProfilsParUser();
                                });
                            });
                    } else {
                        $scope.errorMsg = 'L\'Email n\'est pas identifié dans Accessidys!';
                    }
                });
        };

        $scope.preRetirerDeleguerProfil = function (profil) {
            if (!$rootScope.isAppOnline) {
                $scope.delegationInfoDeconnecte();
            } else {
                $('#retirerDelegateModal').modal('show');
                $scope.profRetirDelegue = profil;
            }
        };

        $scope.retireDeleguerProfil = function () {
            var sendParam = {
                id: $rootScope.currentUser.local.token,
                sendedVars: {
                    idProfil: $scope.profRetirDelegue._id,
                    idUser: $rootScope.currentUser._id
                }
            };
            $scope.loader = true;
            $scope.loaderMsg = 'Retrait de la délégation du profil en cours...';
            $http.post(configuration.URL_REQUEST + '/retirerDelegateUserProfil', sendParam)
                .success(function (data) {
                    if (data) {
                        $scope.retirerDelegateUserProfilFlag = data;
                        $http.post(configuration.URL_REQUEST + '/findUserById', {
                            idUser: data.delegatedID
                        })
                            .success(function (data) {
                                if (data) {
                                    $scope.findUserByIdFlag2 = data;
                                    var emailTo = data.local.email;
                                    var fullName = $rootScope.currentUser.local.prenom + ' ' + $rootScope.currentUser.local.nom;
                                    $scope.sendVar = {
                                        emailTo: emailTo,
                                        content: '<span> ' + fullName + ' vient de vous retirer la délégation de son profil : ' + $scope.profRetirDelegue.nom + '. </span>',
                                        subject: 'Retirer la délégation'
                                    };
                                    $http.post(configuration.URL_REQUEST + '/sendEmail', $scope.sendVar, {
                                        timeout: 60000
                                    }).success(function () {
                                        $('#msgSuccess').fadeIn('fast').delay(5000).fadeOut('fast');
                                        $scope.msgSuccess = 'La demande est envoyée avec succés.';
                                        $scope.errorMsg = '';
                                        $scope.loader = false;
                                        $scope.afficherProfilsParUser();
                                    }).error(function () {
                                        $('#msgError').fadeIn('fast').delay(5000).fadeOut('fast');
                                        $scope.msgError = 'Erreur lors de l\'envoi de la demande.';
                                        $scope.loader = false;
                                        $scope.afficherProfilsParUser();
                                    });
                                }
                            });
                    }
                });
        };

        $scope.preAnnulerDeleguerProfil = function (profil) {
            if (!$rootScope.isAppOnline) {
                $scope.delegationInfoDeconnecte();
            } else {
                $('#annulerDelegateModal').modal('show');
                $scope.profAnnuleDelegue = profil;
            }
        };

        $scope.annuleDeleguerProfil = function () {
            var sendParam = {
                id: $rootScope.currentUser.local.token,
                sendedVars: {
                    idProfil: $scope.profAnnuleDelegue._id,
                    idUser: $rootScope.currentUser._id
                }
            };
            $scope.loader = true;
            $scope.loaderMsg = 'Annulation de la délégation du profil en cours...';
            $http.post(configuration.URL_REQUEST + '/annulerDelegateUserProfil', sendParam)
                .success(function (data) {
                    // $rootScope.updateListProfile = !$rootScope.updateListProfile;
                    if (data) {
                        $scope.annulerDelegateUserProfilFlag = data;
                        $http.post(configuration.URL_REQUEST + '/findUserById', {
                            idUser: $scope.profAnnuleDelegue.preDelegated
                        })
                            .success(function (data) {
                                if (data) {
                                    $scope.findUserByIdFlag2 = data;
                                    var emailTo = data.local.email;
                                    var fullName = $rootScope.currentUser.local.prenom + ' ' + $rootScope.currentUser.local.nom;
                                    $scope.sendVar = {
                                        emailTo: emailTo,
                                        content: '<span> ' + fullName + ' vient d\'annuler la demande de délégation de son profil : ' + $scope.profAnnuleDelegue.nom + '. </span>',
                                        subject: 'Annuler la délégation'
                                    };
                                    $http.post(configuration.URL_REQUEST + '/sendEmail', $scope.sendVar, {
                                        timeout: 60000
                                    }).success(function () {
                                        $('#msgSuccess').fadeIn('fast').delay(5000).fadeOut('fast');
                                        $scope.msgSuccess = 'La demande est envoyée avec succés.';
                                        $scope.errorMsg = '';
                                        $scope.loader = false;
                                        $scope.afficherProfilsParUser();
                                    }).error(function () {
                                        $('#msgError').fadeIn('fast').delay(5000).fadeOut('fast');
                                        $scope.msgError = 'Erreur lors de l\'envoi de la demande.';
                                        $scope.loader = false;
                                        $scope.afficherProfilsParUser();
                                    });
                                }
                            });
                    }
                });
        };


        $scope.profilApartager = function (param) {
            if (!$rootScope.isAppOnline) {
                $scope.partageInfoDeconnecte();
            } else {
                $('#shareModal').modal('show');
                $scope.profilPartage = param;
                $scope.currentUrl = $location.absUrl();
                $scope.socialShare();
            }
        };

        /* load email form */
        $scope.loadMail = function () {
            $scope.displayDestination = true;
        };

        $scope.clearSocialShare = function () {
            $scope.displayDestination = false;
            $scope.destinataire = '';
        };

        $scope.attachFacebook = function () {
            console.log(decodeURIComponent($scope.encodeURI));
            $('.facebook-share .fb-share-button').remove();
            $('.facebook-share span').before('<div class="fb-share-button" data-href="' + decodeURIComponent($scope.envoiUrl) + '" data-layout="button"></div>');
            try {
                FB.XFBML.parse();
            } catch (ex) {
                console.log('gotchaa ... ');
                console.log(ex);
            }
        };

        $scope.attachGoogle = function () {
            console.log('IN ==> ');
            var options = {
                contenturl: decodeURIComponent($scope.envoiUrl),
                contentdeeplinkid: '/pages',
                clientid: '807929328516-g7k70elo10dpf4jt37uh705g70vhjsej.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                prefilltext: '',
                calltoactionlabel: 'LEARN_MORE',
                calltoactionurl: decodeURIComponent($scope.envoiUrl),
                callback: function (result) {
                    console.log(result);
                    console.log('this is the callback');
                },
                onshare: function (response) {
                    console.log(response);
                    if (response.status === 'started') {
                        $scope.googleShareStatus++;
                        if ($scope.googleShareStatus > 1) {
                            $('#googleShareboxIframeDiv').remove();
                            // alert('some error in sharing');
                            $('#shareModal').modal('hide');
                            $('#informationModal').modal('show');
                            localStorage.setItem('googleShareLink', $scope.envoiUrl);
                        }
                    } else {
                        localStorage.removeItem('googleShareLink');
                        $scope.googleShareStatus = 0;
                        $('#shareModal').modal('hide');
                    }

                    // These are the objects returned by the platform
                    // When the sharing starts...
                    // Object {status: "started"}
                    // When sharing ends...
                    // Object {action: "shared", post_id: "xxx", status:
                    // "completed"}
                }
            };

            gapi.interactivepost.render('google-share', options);
        };

        $scope.socialShare = function () {
            $scope.shareMailInvalid = false;
            $scope.destination = $scope.destinataire;
            $scope.encodeURI = encodeURIComponent($location.absUrl());
            $scope.currentUrl = $location.absUrl();
            if ($scope.currentUrl.lastIndexOf('detailProfil') > -1) {
                $scope.envoiUrl = encodeURIComponent($scope.currentUrl);
                $scope.attachFacebook();
                $scope.attachGoogle();
            } else {
                $scope.envoiUrl = encodeURIComponent($scope.currentUrl.replace('profiles', 'detailProfil?idProfil=' + $scope.profilPartage._id));
                $scope.attachFacebook();
                $scope.attachGoogle();
            }
            if ($scope.verifyEmail($scope.destination) && $scope.destination.length > 0) {
                $('#confirmModal').modal('show');
                $('#shareModal').modal('hide');
            } else if ($scope.destination && $scope.destination.length > 0) {
                $scope.shareMailInvalid = true;
            }
        };

        /* regex email */
        $scope.verifyEmail = function (email) {
            var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (reg.test(email)) {
                return true;
            } else {
                return false;
            }
        };

        /* Sending of the email to the addressee. */
        $scope.sendMail = function () {
            $('#confirmModal').modal('hide');
            $scope.loaderMsg = 'Partage du profil en cours. Veuillez patienter ..';
            $scope.currentUrl = $location.absUrl();
            if ($location.absUrl().lastIndexOf('detailProfil') > -1) {
                $scope.envoiUrl = decodeURI($scope.currentUrl);
            } else {
                $scope.envoiUrl = decodeURI($scope.currentUrl.replace('profiles', 'detailProfil?idProfil=' + $scope.profilPartage._id));
            }
            $scope.destination = $scope.destinataire;
            $scope.loader = true;
            if ($scope.verifyEmail($scope.destination) && $scope.destination.length > 0) {
                if ($location.absUrl()) {
                    if ($rootScope.currentUser.dropbox.accessToken) {
                        if ($rootScope.currentUser) {
                            $scope.sendVar = {
                                to: $scope.destinataire,
                                content: ' vient de partager avec vous un profil sur l\'application Accessidys.  ' + $scope.envoiUrl,
                                encoded: '<span> vient de partager avec vous un profil sur l\'application Accessidys.   <a href=' + $scope.envoiUrl + '>Lien de ce profil</a> </span>',
                                prenom: $rootScope.currentUser.local.prenom,
                                fullName: $rootScope.currentUser.local.prenom + ' ' + $rootScope.currentUser.local.nom,
                                doc: $scope.envoiUrl
                            };
                            $http.post(configuration.URL_REQUEST + '/sendMail', $scope.sendVar)
                                .success(function (data) {
                                    $('#okEmail').fadeIn('fast').delay(5000).fadeOut('fast');
                                    $scope.sent = data;
                                    $scope.envoiMailOk = true;
                                    $scope.destinataire = '';
                                    $scope.loader = false;
                                    $scope.displayDestination = false;
                                    $scope.loaderMsg = '';
                                }).error(function () {
                                $scope.loader = false;
                                $scope.loaderMsg = '';
                            });
                        }
                    }
                }
            } else {
                $('.sendingMail').removeAttr('data-dismiss', 'modal');
                $('#erreurEmail').fadeIn('fast').delay(5000).fadeOut('fast');
            }
        };

        $scope.specificFilter = function () {

            // loop of Profiles
            for (var i = 0; i < $scope.profiles.length; i++) {
                if ($scope.profiles[i].type === 'profile') {
                    if ($scope.profiles[i].nom.toLowerCase().indexOf($scope.query.toLowerCase()) !== -1 || $scope.profiles[i].descriptif.toLowerCase().indexOf($scope.query.toLowerCase()) !== -1) {
                        // Query Found
                        $scope.profiles[i].showed = true;
                    } else {
                        // Query not Found
                        $scope.profiles[i].showed = false;
                    }
                }
            }
        };

        /** **** Begin of the profile detail***** */
        /*
         * Show the list of tags sorted out with management of the levels.
         */
        $scope.showTags = function () {
            if ($scope.listTags && $scope.listTags.length > 0) {
                /* Get the position of listTags in tagsByProfils */
                for (var i = $scope.tagsByProfils.length - 1; i >= 0; i--) {
                    for (var j = $scope.listTags.length - 1; j >= 0; j--) {
                        if ($scope.tagsByProfils[i].tag === $scope.listTags[j]._id) {
                            $scope.tagsByProfils[i].position = $scope.listTags[j].position;

                            $scope.regles[i].texte = '<' + $scope.listTags[j].balise + '>' + $scope.listTags[j].libelle + '</' + $scope.listTags[j].balise + '>';
                        }
                    }
                }
                /* Sort out tagsByProfils with position. */
                $scope.tagsByProfils.sort(function (a, b) {
                    return a.position - b.position;
                });
            }
        };

        /*
         * Manage the action buttons in the detail of the profile.
         */
        $scope.showProfilAndTags = function (idProfil) {
            if (!idProfil) {
                $scope.target = $location.search().idProfil;
            } else {
                $scope.target = idProfil;
            }

            // Get back the profile and the current userProfil
            profilsService.getUserProfil($scope.target)
                .then(function (data) {
                    if (data === null || !data) {
                        $scope.affichageInfoDeconnecte();
                    } else {
                        $scope.detailProfil = data;
                        if ($rootScope.currentUser) {
                            $scope.showPartager = true;
                            /* Not the owner of the profile */
                            if ($rootScope.currentUser._id !== $scope.detailProfil.owner) {
                                $scope.showDupliquer = true;
                            }
                            /* Owner of the profile  */
                            if ($rootScope.currentUser._id === $scope.detailProfil.owner && !$scope.detailProfil.delegated) {
                                $scope.showEditer = true;
                            }
                            /*
                             * Owner of the profile or the delegated profile or the default profile
                             */
                            if ($rootScope.currentUser._id === $scope.detailProfil.owner || $scope.detailProfil.delegated || $scope.detailProfil.default || $scope.detailProfil.preDelegated) {
                                $scope.showFavouri = false;
                            } else {
                                $scope.showFavouri = !$scope.detailProfil.favoris;
                            }
                            /* Profile delegated to the connected user. */
                            if ($scope.detailProfil.preDelegated && $rootScope.currentUser._id === $scope.detailProfil.preDelegated) {
                                $scope.showDeleguer = true;
                            }
                        }

                        profilsService.getProfilTags($scope.detailProfil.profilID).then(function (data) {
                            $scope.tagsByProfils = data;
                            $scope.regles = [];

                            if (localStorage.getItem('listTags')) {
                                $scope.listTags = JSON.parse(localStorage.getItem('listTags'));
                                $scope.showTags();
                            } else {
                                tagsService.getTags().then(function (data) {
                                    $scope.listTags = data;
                                    localStorage.setItem('listTags', JSON.stringify($scope.listTags));
                                    $scope.showTags();
                                });
                            }
                        });
                    }

                });
        };

        /*
         * Initialize the detail of the profile..
         */
        $scope.initDetailProfil = function () {
            $scope.showDupliquer = false;
            $scope.showEditer = false;
            $scope.showFavouri = false;
            $scope.showDeleguer = false;
            $scope.showPartager = false;


            if (localStorage.getItem('googleShareLink')) {
                // $scope.docApartager = {lienApercu:
                // localStorage.getItem('googleShareLink')}
                $scope.envoiUrl = localStorage.getItem('googleShareLink');
                $scope.attachFacebook();
                $scope.attachGoogle();
                $('#shareModal').modal('show');
                localStorage.removeItem('googleShareLink');
            }

            var dataProfile = {};
            if (localStorage.getItem('compteId')) {
                dataProfile = {
                    id: localStorage.getItem('compteId')
                };
            }
            $http.get(configuration.URL_REQUEST + '/profile', {
                params: dataProfile
            })
                .success(function (result) {
                    /* uthenticated */
                    $rootScope.currentUser = result;
                    $scope.showProfilAndTags();
                }).error(function () {
                /* unauthenticated */
                $scope.showFavouri = false;
                $scope.showProfilAndTags();
            });
        };

        /*
         * Add a profile to his favorites.
         */
        $scope.ajouterAmesFavoris = function () {
            if ($rootScope.currentUser && $scope.detailProfil) {
                var token = {
                    id: $rootScope.currentUser.local.token,
                    newFav: {
                        userID: $rootScope.currentUser._id,
                        profilID: $scope.detailProfil.profilID,
                        favoris: true,
                        actuel: false,
                        default: false
                    }
                };
                $http.post(configuration.URL_REQUEST + '/addUserProfilFavoris', token).success(function (data) {
                    $scope.favourite = data;
                    $scope.showFavouri = false;
                    $('#favoris').fadeIn('fast').delay(5000).fadeOut('fast');
                    $rootScope.$broadcast('initCommon');
                });
            }
        };

        /*
         * Accept the delegation of a profile.
         */
        $scope.deleguerUserProfil = function () {
            $scope.loader = true;
            $scope.varToSend = {
                profilID: $scope.detailProfil.profilID,
                userID: $scope.detailProfil.owner,
                delegatedID: $rootScope.currentUser._id
            };
            var tmpToSend = {
                id: $rootScope.currentUser.local.token,
                sendedVars: $scope.varToSend
            };
            $http.post(configuration.URL_REQUEST + '/delegateUserProfil', tmpToSend)
                .success(function (data) {
                    $scope.delegateUserProfilFlag = data;

                    $http.post(configuration.URL_REQUEST + '/findUserById', {
                        idUser: $scope.detailProfil.owner
                    })
                        .success(function (data) {
                            if (data) {
                                var emailTo = data.local.email;
                                var fullName = $rootScope.currentUser.local.prenom + ' ' + $rootScope.currentUser.local.nom;
                                $scope.sendVar = {
                                    emailTo: emailTo,
                                    content: '<span> ' + fullName + ' vient d\'utiliser Accessidys pour accepter la délégation de votre profil : ' + $scope.detailProfil.nom + '. </span>',
                                    subject: 'Confirmer la délégation'
                                };
                                $http.post(configuration.URL_REQUEST + '/sendEmail', $scope.sendVar)
                                    .success(function () {
                                        $scope.loader = false;
                                        $rootScope.updateListProfile = !$rootScope.updateListProfile;
                                        var profilLink = $location.absUrl();
                                        profilLink = profilLink.substring(0, profilLink.lastIndexOf('#/detailProfil?idProfil'));
                                        profilLink = profilLink + '#/profiles';
                                        $window.location.href = profilLink;
                                    }).error(function () {
                                    $scope.loader = false;
                                });
                            }
                        });
                });
        };

        // Details of the profile to be shared
        $scope.detailsProfilApartager = function () {
            if (!$rootScope.isAppOnline) {
                $scope.partageInfoDeconnecte();
            } else {
                $('#shareModal').modal('show');
                $scope.socialShare();
            }
        };

        /**
         * This function retrieves the label(description) of a tag.
         */
        $scope.getTagsDescription = function (tag) {
            if (!$scope.listTags || !$scope.listTags.length) {
                $scope.listTags = JSON.parse(localStorage.getItem('listTags'));
            }
            var listTagsMaps = {};
            angular.forEach($scope.listTags, function (item) {
                listTagsMaps[item._id] = item;
            });
            return listTagsMaps[tag];
        };


        $scope.getProfiles = function () {
            $log.debug('Getting profiles of current user');

            $scope.profiles = [];

            tagsService.getTags().then(function (tags) {
                profilsService.getProfilsByUser($rootScope.isAppOnline).then(function (data) {
                    if (data) {

                        _.each(data, function (profile) {

                            if (profile.type === 'profile') {

                                if ($rootScope.currentUser.local.role === 'admin' && profile.state === 'mine') {
                                    // Avoid duplicate profiles when the user is administrator
                                    for (var j = 0; j < data.length; j++) {
                                        if (profile._id === data[j]._id && data[j].state === 'default' && data[j].owner === $rootScope.currentUser._id) {
                                            profile.stateDefault = true;
                                            data.splice(j, 2);
                                        }
                                    }
                                }

                                profile.profileTags = _.find(data, function (profileTags) {

                                    var isReturned = false;

                                    if (profileTags.type === 'tags' && profile._id === profileTags.idProfil) {
                                        isReturned = true;

                                        _.each(profileTags.tags, function (item) {
                                            item.tagDetail = _.find(tags, function (tag) {
                                                return item.tag === tag._id;
                                            });


                                            if (typeof item.tagDetail === 'object') {
                                                item.texte = '<' + item.tagDetail.balise + '>' + $scope.displayTextSimple + '</' + item.tagDetail.balise + '>';
                                            }

                                            // Avoid mapping with backend
                                            item.id_tag = item.tag;
                                            item.style = item.texte;

                                        });


                                        delete profileTags.tagsText;
                                    }

                                    return isReturned;
                                });

                                /*profile.profileTags.tags.sort(function (a, b) {
                                 return a.tagDetail.position - b.tagDetail.position;
                                 });*/

                                /*if (profile.nom === 'Accessidys par défaut' || profile.owner === 'scripted') {
                                 $scope.defaultSystemProfile = profile;
                                 }*/
                                if (profile.nom === 'Corentin 2') {
                                    $scope.defaultSystemProfile = profile;
                                    profile.state = 'default';
                                }

                                profile.showed = true;
                                $scope.profiles.push(profile);
                            }
                        });

                        $log.debug('getProfiles.getProfilsByUser() - $scope.profiles :', $scope.profiles);

                        $rootScope.$emit('refreshProfilAcutel', data);
                    }
                });
            });
        };

        $scope.create = function () {

            var profileToCreate = angular.copy($scope.defaultSystemProfile);
            profileToCreate.nom = $scope.generateProfileName($rootScope.currentUser.local.prenom, 0, 0);

            $scope.openProfileModal('create', profileToCreate);

        };

        $scope.update = function (profile) {

            var profileToUpdate = angular.copy(profile);

            $scope.openProfileModal('update', profileToUpdate);

        };

        $scope.duplicate = function (profile) {

            var profileToDuplicate = angular.copy(profile);
            profileToDuplicate.nom += ' Copie';
            profileToDuplicate.descriptif += ' Copie';

            $scope.openProfileModal('duplicate', profileToDuplicate);

        };

        $scope.showSuccessToaster = function (id) {
            $(id).fadeIn('fast').delay(2000).fadeOut('fast');
        };


        /** **** end of the profile detail ***** */
    });