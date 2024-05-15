import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repositories'
import { AuthenticateUseCase } from '../authenticate'

export function makeAutehnticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authencateUseCase = new AuthenticateUseCase(usersRepository)

  return authencateUseCase
}
