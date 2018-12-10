import { UsersGuard } from '../guards/users.guard';

describe('UsersGuard', () => {
  it('should be defined', () => {
    expect(new UsersGuard()).toBeTruthy();
  });
});
