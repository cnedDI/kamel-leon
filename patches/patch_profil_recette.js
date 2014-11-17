/* File: patch_profil_recettej.js
 *
 * Copyright (c) 2014
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


var mongoose = require('mongoose'),
    ProfilTag = mongoose.model('ProfilTag');


function updateProfilTagToEm(ListProfilTag, counter) {
    var item = ListProfilTag[counter];
    ProfilTag.findById(item._id, function(err, foundItem) {
        if (item !== null && foundItem !== null) {

            var newSpaceSelected = 0 + (foundItem.spaceSelected - 1) * 0.18;
            var newSpaceCharSelected = 0 + (foundItem.spaceCharSelected - 1) * 0.12;

            var newTaille = 1 + (foundItem.taille - 1) * 0.18;
            var newInterLigne = 1.286 + (foundItem.interligne - 1) * 0.18;

            foundItem.texte = '<p data-font=\'' + foundItem.police + '\' data-size=\'' + newTaille + '\' data-lineheight=\'' + newInterLigne + '\' data-weight=\'' + foundItem.styleValue + '\' data-coloration=\'' + foundItem.coloration + '\' data-word-spacing=\'' + newSpaceSelected + '\' data-letter-spacing=\'' + newSpaceCharSelected + '\'> </p>';

            console.log(foundItem);

            foundItem.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    counter++;
                    if (counter < ListProfilTag.length) {
                        updateProfilTagToEm(ListProfilTag, counter);
                    } else {
                        console.log('update style unit from PX to EM Finished');
                    }
                }
            });
        }
    });
}


function changeStyleName(ListProfilTag, counter) {
    var item = ListProfilTag[counter];
    ProfilTag.findById(item._id, function(err, foundItem) {
        if (item !== null && foundItem !== null) {


            console.log(foundItem);
            switch (foundItem.coloration) {
                case 'Coloration des lignes RVB':
                    foundItem.coloration = 'Colorer les lignes RVB';
                    break;
                case 'Coloration des lignes RJV':
                    foundItem.coloration = 'Colorer les lignes RJV';
                    break;
                case 'Surligner les lignes RVB':
                    foundItem.coloration = 'Surligner les lignes RVB';
                    break;
                case 'Surligner les lignes RJV':
                    foundItem.coloration = 'Surligner les lignes RJV';
                    break;
            }

            var newTaille = 1 + (foundItem.taille - 1) * 0.18;
            var newInterLigne = 1.286 + (foundItem.interligne - 1) * 0.18;


            var newSpaceSelected = 0 + (foundItem.spaceSelected - 1) * 0.18;
            var newSpaceCharSelected = 0 + (foundItem.spaceCharSelected - 1) * 0.12;

            foundItem.texte = '<p data-font=\'' + foundItem.police + '\' data-size=\'' + newTaille + '\' data-lineheight=\'' + newInterLigne + '\' data-weight=\'' + foundItem.styleValue + '\' data-coloration=\'' + foundItem.coloration + '\' data-word-spacing=\'' + newSpaceSelected + '\' data-letter-spacing=\'' + newSpaceCharSelected + '\'> </p>';

            console.log(foundItem);

            foundItem.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    counter++;
                    if (counter < ListProfilTag.length) {
                        updateProfilTagToEm(ListProfilTag, counter);
                    } else {
                        console.log('update style Finished');
                    }
                }
            });



        }
    });
}



/*
patch PX vers EM
*/

/*
 ProfilTag.find({}, function(err, ListProfilTag) {
    if (ListProfilTag) {
        if (ListProfilTag.length > 0) {
            updateProfilTagToEm(ListProfilTag, 0);
        }
    }

});*/


/*
changeStyleName
*/

/*
ProfilTag.find({}, function(err, ListProfilTag) {
    if (ListProfilTag) {
        if (ListProfilTag.length > 0) {
            changeStyleName(ListProfilTag, 0);
        }
    }

});*/