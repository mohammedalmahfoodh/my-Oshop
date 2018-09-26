import { TestBed, inject } from '@angular/core/testing';

import { ReadRecipeService } from './read-recipe.service';

describe('ReadRecipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadRecipeService]
    });
  });

  it('should be created', inject([ReadRecipeService], (service: ReadRecipeService) => {
    expect(service).toBeTruthy();
  }));
});
