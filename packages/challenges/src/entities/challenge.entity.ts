import { Entity } from '../entities/entity';

export type ChallengeProps = {
  title: string;
  description: string;
  createdAt?: Date | null;
};

export class Challenge extends Entity<ChallengeProps> {
  private constructor(props: ChallengeProps, id?: string) {
    super(props, id);
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get createdAt(): Date | null {
    return this.props.createdAt || null;
  }

  public set createdAt(createdAt: Date | null) {
    this.props.createdAt = createdAt;
  }

  static create({ createdAt, ...props }: ChallengeProps, id?: string) {
    const challenge = new Challenge(
      {
        ...props,
        createdAt: createdAt || new Date(),
      },
      id,
    );

    return challenge;
  }
}
