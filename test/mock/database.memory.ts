import { Patient } from "src/patient/entities/patient";
import { PatientRepository } from "src/patient/repository/patient.repository";

export class DataBaseInMemory implements PatientRepository {
    
    private patients: Patient[] = [];
    
    findByCuil(cuil: string): Patient | undefined {
        return this.patients.find(p => p.cuil === cuil);
    }
    

    savePatient(patient: Patient): void {
        this.patients.push(patient);
    }
    
}