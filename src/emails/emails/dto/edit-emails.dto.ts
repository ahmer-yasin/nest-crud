import { IsString, IsEmail, IsOptional } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EditEmailsDTO {
  export class Input {
    @IsOptional()
    @IsEmail()
    to: string;

    @IsOptional()
    @IsEmail()
    from: string;

    @IsOptional()
    @IsString()
    subject: string;

    @IsOptional()
    @IsString()
    body: string;
  }
}
