export class CreateUserDto {
  readonly idNumber: string;
  readonly roleValue: string;
  readonly password?: string;
}
