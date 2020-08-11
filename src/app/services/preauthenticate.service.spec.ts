import { TestBed } from '@angular/core/testing';

import { PreauthenticateService } from './preauthenticate.service';

describe('PreauthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreauthenticateService = TestBed.get(PreauthenticateService);
    expect(service).toBeTruthy();
  });
});
