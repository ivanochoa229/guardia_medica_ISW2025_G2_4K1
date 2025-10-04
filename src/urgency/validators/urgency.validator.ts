// src/urgency/validators/urgency.validator.ts
import { NotAcceptableException } from '@nestjs/common';
import { EmergencyLevel } from '../../emergency-level/enums/emergency-level.enum';

export class UrgencyValidator {
  static validate(
    informe: string,
    emergencyLevel: EmergencyLevel,
    frecuenciaCardiaca: number,
    frecuenciaRespiratoria: number,
    tensionArterial: number[],
  ) {
    this.required(informe, 'informe');
    this.required(emergencyLevel, 'nivel de emergencia');
    this.nonNegative(frecuenciaCardiaca, 'frecuencia cardiaca');
    this.nonNegative(frecuenciaRespiratoria, 'frecuencia respiratoria');
    this.validTension(tensionArterial);
  }
  //requerido
  private static required(value: any, field: string) {
    if (value === undefined || value === null || value === '') {
      throw new NotAcceptableException(`falta el campo mandatorio"${field}"`);
    }
  }
  //requerido y no negativo
  private static nonNegative(value: number, field: string) {
    if (value === undefined || value === null) {
      throw new NotAcceptableException(`falta el campo mandatorio"${field}"`);
    }
    if (value < 0) {
      throw new NotAcceptableException(`${field} no puede ser negativo`);
    }
  }
  //valdiador de tension arterial y cuida el split
  private static validTension(tensionArterial: number[]) {
    if (!tensionArterial || tensionArterial.length !== 2) {
      throw new NotAcceptableException('tensión arterial inválida');
    }
  }
}
