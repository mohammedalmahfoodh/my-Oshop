import { TestBed, inject } from '@angular/core/testing';

import { IngredieantsService } from './ingredieants.service';

describe('IngredieantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredieantsService]
    });
  });

  it('should be created', inject([IngredieantsService], (service: IngredieantsService) => {
    expect(service).toBeTruthy();
  }));
});
