import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsUseCaseHistory } from './fetch-user-check-ins-history'

let checkInsRespository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsUseCaseHistory

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRespository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsUseCaseHistory(checkInsRespository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRespository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRespository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRespository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
