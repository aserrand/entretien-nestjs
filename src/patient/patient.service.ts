import { Injectable } from '@nestjs/common';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService {
  static readonly MAX_PATIENTS = 10;

  private readonly patients: Patient[] = [];

  getPatients(): Patient[] {
    throw new Error('Not implemented');
  }

  getWoundStats(): Record<string, number> {
    throw new Error('Not implemented');
  }

  addPatient(patient: Patient): void {
    this.patients.push(patient);
  }
}
