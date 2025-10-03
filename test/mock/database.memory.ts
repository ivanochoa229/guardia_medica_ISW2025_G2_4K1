import { Patient } from "src/patient/patient";
import { PatientRepository } from "src/patient/repository/patient.repository";

export class DataBaseInMemory implements PatientRepository {
    
    private patients: Patient[] = [];
    
    buscarPacientePorCuil(cuil: string): Patient | undefined {
        return this.patients.find(p => p.cuil === cuil);
    }
    

    savePatient(patient: Patient): void {
        this.patients.push(patient);
    }
    
}