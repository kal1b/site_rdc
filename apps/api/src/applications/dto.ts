import { IsObject, IsString } from 'class-validator';

export class DraftApplicationDto {
  @IsString()
  shiftId!: string;
  @IsObject()
  childJson!: Record<string, unknown>;
  @IsObject()
  parentJson!: Record<string, unknown>;
  applicationId?: string;
}
