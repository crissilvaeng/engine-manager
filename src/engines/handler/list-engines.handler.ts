import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { EnginesRepository } from '../repositories/engines.repository';
import { ListEnginesQuery } from '../queries/list-engines.query';

@QueryHandler(ListEnginesQuery)
export class ListEnginesHandler implements IQueryHandler<ListEnginesQuery> {
  constructor(private readonly repository: EnginesRepository) {}

  async execute(query: ListEnginesQuery) {
    return await this.repository.list();
  }
}
