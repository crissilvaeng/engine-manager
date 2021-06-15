export class EngineCreatedEvent {
  constructor(
    public readonly engineId: string,
    public readonly imageId: string,
  ) {}
}
