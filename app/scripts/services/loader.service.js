/*File: loaderServices.js
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

/*global cnedApp */
cnedApp.service('LoaderService', function ($rootScope) {

    $rootScope.showLoader = false;
    $rootScope.showLoaderProgress = false;
    $rootScope.loaderMessage = '';
    $rootScope.loaderProgressStyle = {
        width: '0'
    };


    var methods = {

        /**
         * Show the loader
         * @param message to display
         * @param isProgressEnable Enable the progress bar or not
         */
        showLoader: function (message, isProgressEnable) {
            $rootScope.showLoaderProgress = isProgressEnable;
            $rootScope.loaderMessage = message;
            $rootScope.loaderProgressStyle = {
                width: '0'
            };
            $rootScope.showLoader = true;
        },

        /**
         * Hide the loader
         */
        hideLoader: function () {
            $rootScope.showLoader = false;
            $rootScope.showLoaderProgress = false;
            $rootScope.loaderMessage = '';
            $rootScope.loaderProgressStyle = {
                width: '0'
            };
        },

        /**
         * Set the loader progress bar
         * @param loaderProgress
         */
        setLoaderProgress: function (loaderProgress) {
            $rootScope.loaderProgressStyle = {
                width: loaderProgress + '%'
            };
        }

    };

    return methods;

});