import { PatientService } from './patient.service';
import { Patient, Wound } from './patient.entity';

function createPatient(data: {
  firstName: string;
  lastName: string;
  birthdate: string;
  emergency?: boolean;
  wound?: Wound | null;
}): Patient {
  const p = new Patient();
  p.firstName = data.firstName;
  p.lastName = data.lastName;
  p.birthdate = new Date(data.birthdate);
  p.emergency = data.emergency ?? false;
  p.wound = data.wound ?? null;
  return p;
}

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    service = new PatientService();
  });

  // ── getPatients ─────────────────────────────────────────────────────────────

  describe('getPatients', () => {
    it('should sort patients: emergency first, then oldest first within each group', () => {
      service.addPatient(createPatient({ firstName: 'Youngest', lastName: 'A', birthdate: '1995-06-15', emergency: false }));
      service.addPatient(createPatient({ firstName: 'Oldest', lastName: 'B', birthdate: '1970-03-20', emergency: false }));
      service.addPatient(createPatient({ firstName: 'EmergencyYoungest', lastName: 'C', birthdate: '1988-01-01', emergency: true }));
      service.addPatient(createPatient({ firstName: 'EmergencyOldest', lastName: 'D', birthdate: '1965-11-05', emergency: true }));

      const result = service.getPatients();

      expect(result.map((p) => p.firstName)).toEqual([
        'EmergencyOldest',    // emergency=true, born 1965
        'EmergencyYoungest',  // emergency=true, born 1988
        'Oldest',             // emergency=false, born 1970
        'Youngest',           // emergency=false, born 1995
      ]);
    });

    it('should limit results to MAX_PATIENTS entries', () => {
      for (let i = 0; i < 15; i++) {
        service.addPatient(
          createPatient({ firstName: `Patient${i}`, lastName: 'Test', birthdate: `197${i % 10}-01-01` }),
        );
      }

      expect(service.getPatients().length).toBe(PatientService.MAX_PATIENTS);
    });
  });

  // ── getWoundStats ───────────────────────────────────────────────────────────

  describe('getWoundStats', () => {
    it('should count wounds across the patients returned by getPatients()', () => {
      service.addPatient(createPatient({ firstName: 'A', lastName: 'A', birthdate: '1980-01-01', wound: Wound.HEMATOMA }));
      service.addPatient(createPatient({ firstName: 'B', lastName: 'B', birthdate: '1985-01-01', wound: Wound.LEG_FRACTURE }));
      service.addPatient(createPatient({ firstName: 'C', lastName: 'C', birthdate: '1990-01-01', wound: Wound.HEMATOMA }));
      service.addPatient(createPatient({ firstName: 'D', lastName: 'D', birthdate: '1995-01-01', wound: null }));

      expect(service.getWoundStats()).toEqual({
        [Wound.HEMATOMA]: 2,
        [Wound.LEG_FRACTURE]: 1,
      });
    });

    it('should return an empty object when no patient has a wound', () => {
      service.addPatient(createPatient({ firstName: 'A', lastName: 'A', birthdate: '1990-01-01', wound: null }));

      expect(service.getWoundStats()).toEqual({});
    });
  });
});
