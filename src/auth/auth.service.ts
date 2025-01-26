import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { RoleEnum } from 'src/roles/roles.enum';
import { UserStatusEnum } from 'src/userStatus/userStatus.enum';
import * as crypto from 'crypto';
import { plainToClass } from 'class-transformer';
import { UserStatus } from 'src/userStatus/entities/userStatus.entity';
import { Role } from 'src/roles/entities/role.entity';
import { AuthProvidersEnum } from './auth-providers.enum';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from 'src/users/users.service';
import { ForgotService } from 'src/forgot/forgot.service';
import { MailService } from 'src/mail/mail.service';
import { NullableType } from '../utils/types/nullable.type';
import { LoginResponseType } from '../utils/types/auth/login-response.type';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private forgotService: ForgotService,
    private mailService: MailService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<LoginResponseType> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (
      !user ||
      (user?.role &&
        !(onlyAdmin ? [RoleEnum.admin] : [RoleEnum.user]).includes(
          user.role.id,
        ))
    ) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (user.provider !== AuthProvidersEnum.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: `needLoginViaProvider:${user.provider}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const token = this.jwtService.sign({
      id: user.id,
      name: user.lastName,
      username: user.firstName,
      email: user.email,
      provider: user.provider,
      role: user.role,
      image: user.image,
      about: user.about,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    return { token, user };
  }

  async validateSocialLogin(
    authProvider: string,
    socialData: SocialInterface,
  ): Promise<LoginResponseType> {
    let user: NullableType<User>;
    let userByEmail: NullableType<User>;
    const socialEmail = socialData.email?.toLowerCase();
    if (socialEmail != undefined) {
      userByEmail = await this.usersService.findOne({
        email: socialEmail,
      });
    } else {
      userByEmail = null;
    }

    user = await this.usersService.findOne({
      socialId: socialData.id,
      provider: authProvider,
    });

    if (user) {
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      await this.usersService.update(user.id, user);
    } else if (userByEmail) {
      user = userByEmail;
    } else {
      const role = plainToClass(Role, {
        id: RoleEnum.user,
      });
      const status = plainToClass(UserStatus, {
        id: UserStatusEnum.active,
      });

      user = await this.usersService.create({
        email: socialEmail ?? null,
        firstName: socialData.firstName ?? null,
        lastName: socialData.lastName ?? null,
        socialId: socialData.id,
        provider: authProvider,
        role,
        status,
      });

      user = await this.usersService.findOne({
        id: user.id,
      });
    }

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'userNotFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const jwtToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      provider: user.provider,
      role: user.role,
      name: user.lastName,
      username: user.firstName,
      image: user.image,
      about: user.about,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    return {
      token: jwtToken,
      user,
    };
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    await this.usersService.create({
      ...dto,
      email: dto.email,
      // provider: AuthProvidersEnum.email,
      role: {
        id: RoleEnum.user,
      } as Role,
      status: {
        id: UserStatusEnum.inactive,
      } as UserStatus,
      hash,
    });

    await this.mailService.userSignUp({
      to: dto.email,
      data: {
        hash,
      },
    });
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersService.findOne({
      hash,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user.hash = null;
    user.status = plainToClass(UserStatus, {
      id: UserStatusEnum.active,
    });
    await user.save();
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOne({
      email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    await this.forgotService.create({
      hash,
      user,
    });

    await this.mailService.forgotPassword({
      to: email,
      data: {
        hash,
      },
    });
  }

  async resetPassword(hash: string, password: string): Promise<void> {
    const forgot = await this.forgotService.findOne({
      where: {
        hash,
      },
    });

    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = forgot.user;
    user.password = password;

    await user.save();
    await this.forgotService.softDelete(forgot.id);
  }

  async me(user: User): Promise<NullableType<User>> {
    return this.usersService.findOne({
      id: user.id,
    });
  }

  async update(id: number, userDto: AuthUpdateDto): Promise<LoginResponseType> {
    if (userDto.password) {
      if (userDto.oldPassword) {
        const currentUser = await this.usersService.findOne({
          id: id,
        });

        if (!currentUser) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                user: 'userNotFound',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const isValidOldPassword = await bcrypt.compare(
          userDto.oldPassword,
          currentUser.password,
        );

        if (!isValidOldPassword) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                oldPassword: 'incorrectOldPassword',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'missingOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    if (userDto.email) {
      await this.usersService.update(id, {
        ...userDto,
        email: userDto.email,
        // provider: AuthProvidersEnum.email,
        role: {
          id: RoleEnum.user,
        } as Role,
        status: {
          id: UserStatusEnum.inactive,
        } as UserStatus,
        hash,
      });
      await this.mailService.userSignUp({
        to: userDto.email,
        data: {
          hash,
        },
      });
    } else {
      await this.usersService.update(id, userDto);
    }
    return this.sendToken(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.usersService.softDelete(id);
  }
  async sendToken(id: number): Promise<LoginResponseType> {
    const user = await this.usersService.findOne({
      id: id,
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const token = this.jwtService.sign({
      id: user.id,
      name: user.lastName,
      username: user.firstName,
      email: user.email,
      provider: user.provider,
      role: user.role,
      image: user.image,
      about: user.about,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    return { token, user };
  }

  async uploadImage(
    file: Express.Multer.File | Express.MulterS3.File,
    id: number,
  ): Promise<LoginResponseType> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const oldUser = await this.usersService.findOne({
      id: id,
    });
    if (!oldUser) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    cloudinary.config({
      cloud_name: this.configService.get('app.cloudinaryCloudName', {
        infer: true,
      }),
      api_key: this.configService.get('app.cloudinaryApiKey', {
        infer: true,
      }),
      api_secret: this.configService.get('app.cloudinaryApiSecret', {
        infer: true,
      }),
    });
    // Delete the existing image if it exists
    if (oldUser.image) {
      const publicId = oldUser.image.split('/').pop()?.split('.')[0]; // Extract public ID from URL
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Failed to delete existing image:', error);
        }
      }
    }

    // Upload the new image
    const publicId = `user_images/${id}`; // Use user ID to ensure consistency
    const imageUrl = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { public_id: publicId, overwrite: true }, // Overwrite any existing image
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            reject(
              new HttpException(
                {
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: 'Failed to upload image.',
                  details: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          } else if (result?.url) {
            resolve(result.url);
          } else {
            reject(
              new HttpException(
                {
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: 'Upload succeeded, but no URL was returned.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }
        },
      );
      uploadStream.end(file.buffer); // Pass file buffer to Cloudinary
    });

    await this.usersService.update(id, { image: imageUrl });
    return this.sendToken(id);
  }
}
