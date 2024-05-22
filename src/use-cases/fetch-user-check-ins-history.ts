import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../repositories/check-ins-repository'

interface FetchUserCheckInsUseCaseHistoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsUseCaseHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCaseHistory {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsUseCaseHistoryRequest): Promise<FetchUserCheckInsUseCaseHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
