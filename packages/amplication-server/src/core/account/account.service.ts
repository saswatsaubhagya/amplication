import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UpdateAccountInput } from './dto/update-account.input';
import { AccountCreateArgs, Account, FindOneAccountArgs } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  createAccount(args: AccountCreateArgs) {
    return this.prisma.account.create(args);
  }

  findAccount(args: FindOneAccountArgs) {
    return this.prisma.account.findOne(args);
  }

  updateAccount(accountId: string, newAccountData: UpdateAccountInput) {
    return this.prisma.account.update({
      data: newAccountData,
      where: {
        id: accountId
      }
    });
  }

  setCurrentUser(accountId: string, userId: string) {
    return this.prisma.account.update({
      data: {
        currentUser: {
          connect: {
            id: userId
          }
        }
      },
      where: {
        id: accountId
      }
    });
  }

  async setPassword(accountId: string, password: string): Promise<Account> {
    return this.prisma.account.update({
      data: {
        password
      },
      where: { id: accountId }
    });
  }
}