import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Res, 
  Req, 
  HttpStatus,
  UseGuards,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { randomBytes } from 'crypto';

interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

interface CSRFTokenStore {
  [sessionId: string]: string;
}

@Controller('api/auth')
export class SecureTokenController {
  private csrfTokens: CSRFTokenStore = {};

  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Post('store-tokens')
  async storeTokens(
    @Body() tokenData: TokenData,
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-csrf-token') csrfToken?: string,
  ) {
    try {
      // Validate CSRF token if provided
      if (csrfToken && !this.validateCSRFToken(req.sessionID, csrfToken)) {
        throw new UnauthorizedException('Invalid CSRF token');
      }

      // Validate JWT token format and signature
      if (!this.isValidJWTToken(tokenData.access_token)) {
        return res.status(HttpStatus.BAD_REQUEST).json({ 
          error: 'Invalid token format' 
        });
      }

      // Store access token in httpOnly cookie
      res.cookie('access_token', tokenData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      // Store refresh token if provided
      if (tokenData.refresh_token) {
        res.cookie('refresh_token', tokenData.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }

      // Generate new CSRF token
      const newCSRFToken = this.generateCSRFToken(req.sessionID);
      
      res.setHeader('X-CSRF-Token', newCSRFToken);
      res.status(HttpStatus.OK).json({ success: true });
      
    } catch (error) {
      console.error('Error storing tokens:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        error: 'Failed to store tokens' 
      });
    }
  }

  @Get('get-token')
  async getToken(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-csrf-token') csrfToken?: string,
  ) {
    try {
      // Validate CSRF token
      if (csrfToken && !this.validateCSRFToken(req.sessionID, csrfToken)) {
        throw new UnauthorizedException('Invalid CSRF token');
      }

      const accessToken = req.cookies?.access_token;
      
      if (!accessToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ 
          error: 'No token found' 
        });
      }

      // Validate token is still valid
      try {
        this.jwtService.verify(accessToken);
        res.status(HttpStatus.OK).json({ 
          access_token: accessToken 
        });
      } catch (error) {
        // Token expired or invalid, try refresh
        const refreshed = await this.refreshTokenInternal(req, res);
        if (refreshed) {
          res.status(HttpStatus.OK).json({ 
            access_token: refreshed 
          });
        } else {
          res.status(HttpStatus.UNAUTHORIZED).json({ 
            error: 'Token expired and refresh failed' 
          });
        }
      }
      
    } catch (error) {
      console.error('Error retrieving token:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        error: 'Failed to retrieve token' 
      });
    }
  }

  @Post('refresh')
  async refreshToken(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-csrf-token') csrfToken?: string,
  ) {
    try {
      // Validate CSRF token
      if (csrfToken && !this.validateCSRFToken(req.sessionID, csrfToken)) {
        throw new UnauthorizedException('Invalid CSRF token');
      }

      const newToken = await this.refreshTokenInternal(req, res);
      
      if (newToken) {
        res.status(HttpStatus.OK).json({ 
          access_token: newToken 
        });
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ 
          error: 'Refresh token expired or invalid' 
        });
      }
      
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        error: 'Failed to refresh token' 
      });
    }
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-csrf-token') csrfToken?: string,
  ) {
    try {
      // Validate CSRF token
      if (csrfToken && !this.validateCSRFToken(req.sessionID, csrfToken)) {
        throw new UnauthorizedException('Invalid CSRF token');
      }

      // Clear all auth cookies
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      
      // Clear CSRF token
      delete this.csrfTokens[req.sessionID];
      
      res.status(HttpStatus.OK).json({ success: true });
      
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        error: 'Failed to logout' 
      });
    }
  }

  private async refreshTokenInternal(req: Request, res: Response): Promise<string | null> {
    const refreshToken = req.cookies?.refresh_token;
    
    if (!refreshToken) {
      return null;
    }

    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken);
      
      // Get user and generate new access token
      const user = await this.authService.validateUser(payload.sub);
      if (!user) {
        return null;
      }

      const newAccessToken = this.jwtService.sign({
        email: user.email,
        sub: user.id,
        role: user.role,
      });

      // Update access token cookie
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return newAccessToken;
      
    } catch (error) {
      console.error('Refresh token validation failed:', error);
      return null;
    }
  }

  private isValidJWTToken(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return false;
      }
      
      // Verify the token signature
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  private generateCSRFToken(sessionId: string): string {
    const token = randomBytes(32).toString('hex');
    this.csrfTokens[sessionId] = token;
    return token;
  }

  private validateCSRFToken(sessionId: string, token: string): boolean {
    return this.csrfTokens[sessionId] === token;
  }
}