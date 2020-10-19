import { IsString, IsEmail } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RegisterEmailsDTO {
  export class Input {
    @IsEmail()
    to: string;

    @IsEmail()
    from: string;

    @IsString()
    subject: string;

    @IsString()
    body: string;
  }
}
