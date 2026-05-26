import { Patient, Wound, CANT_WALK_WOUNDS } from './patient.entity';

describe('Patient', () => {
  let patient: Patient;

  beforeEach(() => {
    patient = new Patient();
    patient.firstName = 'jean michel';
    patient.lastName = 'cobaye';
    patient.birthdate = new Date('1950-12-27');
    patient.wound = null;
    patient.emergency = false;
  });

  // ── fullname ────────────────────────────────────────────────────────────────

  describe('fullname', () => {
    it('should return firstName in title case and lastName in uppercase', () => {
      expect(patient.fullname).toBe('Jean Michel COBAYE');
    });
  });

  // ── ageAtDate ───────────────────────────────────────────────────────────────

  describe('ageAtDate', () => {
    it('should calculate age when birthday has already passed in the given year', () => {
      expect(patient.ageAtDate(new Date('2022-12-28'))).toBe(72);
    });

    it('should calculate age when birthday has not yet passed in the given year', () => {
      expect(patient.ageAtDate(new Date('2022-06-15'))).toBe(71);
    });

    it('should calculate age on the exact birthday', () => {
      expect(patient.ageAtDate(new Date('2022-12-27'))).toBe(72);
    });

    it('should return "unborn" when the date is before the birthdate', () => {
      expect(patient.ageAtDate(new Date('1950-06-01'))).toBe('unborn');
    });

    it('should return "unborn" when the date is the same year but before the birthday', () => {
      expect(patient.ageAtDate(new Date('1950-12-26'))).toBe('unborn');
    });
  });

  // ── hasMajority ─────────────────────────────────────────────────────────────

  describe('hasMajority', () => {
    it('should return true for a patient who is 18 or older', () => {
      patient.birthdate = new Date('1990-01-01');
      expect(patient.hasMajority).toBe(true);
    });

    it('should return false for a patient who is under 18', () => {
      patient.birthdate = new Date('2015-01-01');
      expect(patient.hasMajority).toBe(false);
    });
  });

  // ── birthdateFormatted ──────────────────────────────────────────────────────

  describe('birthdateFormatted', () => {
    it('should format the birthdate as DD/MM YYYY', () => {
      expect(patient.birthdateFormatted).toBe('27/12 1950');
    });

    it('should pad single-digit day and month with a leading zero', () => {
      patient.birthdate = new Date('2005-03-09');
      expect(patient.birthdateFormatted).toBe('09/03 2005');
    });
  });

  // ── isWounded ───────────────────────────────────────────────────────────────

  describe('isWounded', () => {
    it('should return false when the patient has no wound', () => {
      expect(patient.isWounded()).toBe(false);
    });

    it('should return true when the patient has a wound', () => {
      patient.wound = Wound.HEMATOMA;
      expect(patient.isWounded()).toBe(true);
    });
  });

  // ── breakHisLeg ─────────────────────────────────────────────────────────────

  describe('breakHisLeg', () => {
    it('should set the wound to LEG_FRACTURE', () => {
      patient.breakHisLeg();
      expect(patient.wound).toBe(Wound.LEG_FRACTURE);
    });

    it('should mark the patient as an emergency', () => {
      patient.breakHisLeg();
      expect(patient.emergency).toBe(true);
    });

    it('should prevent the patient from walking after breaking their leg', () => {
      patient.breakHisLeg();
      expect(patient.canWalk()).toBe(false);
    });
  });

  // ── canWalk ─────────────────────────────────────────────────────────────────

  describe('canWalk', () => {
    it('should return true when the patient has no wound', () => {
      expect(patient.canWalk()).toBe(true);
    });

    it('should return true when the wound is not in CANT_WALK_WOUNDS', () => {
      patient.wound = Wound.HEMATOMA;
      expect(patient.canWalk()).toBe(true);

      patient.wound = Wound.SORE;
      expect(patient.canWalk()).toBe(true);
    });

    it('should return false for every wound listed in CANT_WALK_WOUNDS', () => {
      for (const wound of CANT_WALK_WOUNDS) {
        patient.wound = wound;
        expect(patient.canWalk()).toBe(false);
      }
    });
  });
});
