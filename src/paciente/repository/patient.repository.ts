import { Patient } from "../entities/paciente";


export interface PatientRepository {
    guardarPaciente(patient: Patient): void;
    buscarPacientePorCuil(cuil: string): Patient | undefined;
};