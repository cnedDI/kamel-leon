'use strict';

describe('Controller:ImagesCtrl', function() {
  beforeEach(module('cnedApp'));
  var scope, controller;
  var tag = {
    _id: "52c588a861485ed41c000003",
    libelle: "TP"
  };
  var tags = [{
    _id: "52c588a861485ed41c000001",
    libelle: "Exercice"
  }, {
    _id: "52c588a861485ed41c000002",
    libelle: "Cours"
  }];
  var profils = [{
    nom: "profil 1",
    descriptif: "desc profil 1",
    type: "Dyslexie N1",
    niveauScolaire: "CP",
    photo: "",
    _id: "52d1429458e68dbb0c000004"
  }];

  beforeEach(inject(function($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    controller = $controller('ImagesCtrl', {
      $scope: scope
    });

    scope.currentImage = {
      source: './image.png'
    };

    // mock OCR web service
    $httpBackend.whenPOST(/oceriser/, {
      sourceImage: './image.png'
    }).respond(angular.toJson('text oceriser'));

    // mock redTags web service
    $httpBackend.whenGET('/readTags').respond(tags);

    // mock listerProfil web service
    $httpBackend.whenGET('/listerProfil').respond(profils);

  }));

  it("oceriser le texte d'une image", inject(function($httpBackend) {
    scope.oceriser();
    $httpBackend.flush();
    // console.log(scope.textes);
    expect(scope.textes).toBeDefined();
    expect(scope.currentImage.text).toBe('text oceriser');
    expect(scope.currentImage.source).toBe('./image.png');

  }));

  it("initialisation des variable pour l'espace de travail", inject(function() {

    var image = {
      'source': './image.png',
      'level': 0
    };

    scope.workspace(image);
    expect(scope.currentImage.source).toBe('./image.png');
    // expect(scope.currentImage.level).toBe(0);
    expect(scope.textes).toEqual({});
    expect(scope.showEditor).not.toBeTruthy();
  }));

  // it("test de l'uploadFile ", function() {
  //   scope.xhrObj = jasmine.createSpyObj('xhrObj', ['addEventListener', 'open', 'send']);
  //   spyOn(window, "XMLHttpRequest").andReturn(scope.xhrObj);

  //   scope.uploadFile();

  //   expect(scope.xhrObj.addEventListener).toHaveBeenCalled();
  //   expect(scope.xhrObj.addEventListener.calls.length).toBe(2);
  // });


});