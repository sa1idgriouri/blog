import { TestBed } from '@angular/core/testing';

import { UserFakeBackendInterceptor } from './user-fake-backend.interceptor';

describe('UserFakeBackendInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserFakeBackendInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UserFakeBackendInterceptor = TestBed.inject(UserFakeBackendInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
