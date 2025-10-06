import { Injectable } from '@nestjs/common';
import { Patient } from '../entities/paciente';
import { PatientRepository } from './patient.repository';


@Injectable()
export class PatientRepositoryImpl implements PatientRepository {
  buscarPacientePorCuil(cuil: string): Patient| undefined {
    throw new Error('Method not implemented.');
  }
  guardarPaciente(patient: Patient): void {
    throw new Error('Method not implemented.');
  }
}