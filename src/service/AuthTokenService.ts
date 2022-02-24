import { Connection, getRepository } from 'typeorm';
import { ErpToolCredsEntity } from '../entity/ErpToolCredsEntity';

export default class AuthTokenService {
  constructor(private dbConn: Connection) {
  }

  getQbTokenForYard(yardId: string): Promise<ErpToolCredsEntity | undefined> {
    const tokenRepo = getRepository(ErpToolCredsEntity);

    return tokenRepo.findOne({
      where: {
        yardId,
      },
    });
  }
}
