import { TestBed } from '@angular/core/testing';

import { GroupFakeBackendInterceptor } from './group-fake-backend.interceptor';

describe('GroupFakeBackendInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GroupFakeBackendInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GroupFakeBackendInterceptor = TestBed.inject(GroupFakeBackendInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
