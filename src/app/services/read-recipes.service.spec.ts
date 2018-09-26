import { TestBed, inject } from '@angular/core/testing';

import { ReadRecipesService } from './read-recipes.service';

describe('ReadRecipesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadRecipesService]
    });
  });

  it('should be created', inject([ReadRecipesService], (service: ReadRecipesService) => {
    expect(service).toBeTruthy();
  }));
});
