import { Patient } from "src/patient/patient";
import { PatientRepository } from "src/patient/patient.repository";

export class DataBaseInMemory implements PatientRepository {
    
    private patients: Patient[] = [];

    savePatient(patient: Patient): void {
        this.patients.push(patient);
    }
    
}