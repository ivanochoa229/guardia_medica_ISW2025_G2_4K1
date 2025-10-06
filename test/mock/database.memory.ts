import { Patient } from "src/paciente/entities/paciente";
import { PatientRepository } from "src/paciente/repository/patient.repository";

export class DataBaseInMemory implements PatientRepository {
    
    private patients: Patient[] = [];
    
    buscarPacientePorCuil(cuil: string): Patient | undefined {
        return this.patients.find(p => p.cuil === cuil);
    }
    

    guardarPaciente(patient: Patient): void {
        this.patients.push(patient);
    }
    
}