import { Patient } from "../entities/patient";


export interface PatientRepository {
    savePatient(patient: Patient): void;
    findByCuil(cuil: string): Patient | undefined;
};