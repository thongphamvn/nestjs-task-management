import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCre: AuthCredentialDto) {
    return this.authService.signUp(authCre);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCre: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCre);
  }
}
