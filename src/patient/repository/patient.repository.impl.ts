import { Injectable } from '@nestjs/common';
import { Patient } from '../patient';
import { PatientRepository } from './patient.repository';


@Injectable()
export class PatientRepositoryImpl implements PatientRepository {
  buscarPacientePorCuil(cuil: string): Patient| undefined {
    throw new Error('Method not implemented.');
  }
  savePatient(patient: Patient): void {
    throw new Error('Method not implemented.');
  }
}