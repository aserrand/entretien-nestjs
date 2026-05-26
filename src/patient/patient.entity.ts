export enum Wound {
  LEG_FRACTURE = 'LEG_FRACTURE',
  HEMATOMA = 'HEMATOMA',
  KNEE_SPRAIN = 'KNEE_SPRAIN',
  SORE = 'SORE',
  ANKLE_SPRAIN = 'ANKLE_SPRAIN',
}

export const CANT_WALK_WOUNDS: Wound[] = [
  Wound.LEG_FRACTURE,
  Wound.KNEE_SPRAIN,
  Wound.ANKLE_SPRAIN,
];

export class Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  wound: Wound | null = null;
  emergency: boolean = false;

  get fullname(): string {
    throw new Error('Not implemented');
  }

  get birthdateFormatted(): string {
    throw new Error('Not implemented');
  }


  isWounded(): boolean {
    throw new Error('Not implemented');
  }


  breakHisLeg(): void {
    throw new Error('Not implemented');
  }

}
