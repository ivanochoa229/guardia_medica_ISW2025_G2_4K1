import { Patient } from "../entities/patient";


export interface PatientRepository {
    savePatient(patient: Patient): void;
    buscarPacientePorCuil(cuil: string): Patient | undefined;
};