'use strict';

describe('Service: cinemasList', function () {

  // load the service's module
  beforeEach(module('moviesowlApp'));

  // instantiate service
  var cinemasList;
  beforeEach(inject(function (_cinemasList_) {
    cinemasList = _cinemasList_;
  }));

  it('should do something', function () {
    expect(!!cinemasList).toBe(true);
  });

});
