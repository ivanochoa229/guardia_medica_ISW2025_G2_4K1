import { NotAcceptableException } from '@nestjs/common';
import { EmergencyLevel } from '../../nivel-emergencia/enums/nivel-emergencia.enum';

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
    this.positiveNumber(frecuenciaCardiaca, 'frecuencia cardiaca');
    this.positiveNumber(frecuenciaRespiratoria, 'frecuencia respiratoria');
    this.validTension(tensionArterial, 'tension arterial');
  }

  // requerido
  private static required(value: any, field: string) {
    if (value === undefined || value === null || value === '') {
      throw new NotAcceptableException(`falta el campo mandatorio "${field}"`);
    }
  }

  // requerido + numérico + positivo
  private static positiveNumber(value: any, field: string) {
    if (value === undefined || value === null || value === '') {
      throw new NotAcceptableException(`falta el campo mandatorio "${field}"`);
    }
    const n = Number(value);
    if (!Number.isFinite(n)) {
      throw new NotAcceptableException(`${field} inválida: debe ser numérica`);
    }
    if (n <= 0) {
      throw new NotAcceptableException(`${field} tiene que ser un número positivo`);
    }
  }

  // validador de tensión arterial para
  private static validTension(tensionArterial: number[], field: string) {
    if (!Array.isArray(tensionArterial) || tensionArterial.length !== 2) {
      throw new NotAcceptableException(`${field} inválida: se esperan dos valores`);
    }
    const [sistolica, diastolica] = tensionArterial.map(Number);
    if (!Number.isFinite(sistolica) || !Number.isFinite(diastolica)) {
      throw new NotAcceptableException(`${field} inválida: valores no numéricos`);
    }
    if (sistolica == 0 || diastolica == 0) {
      throw new NotAcceptableException(`${field} inválida: se esperan dos valores`);
    }
    if (sistolica < 0 || diastolica < 0) {
      throw new NotAcceptableException(`${field} inválida: valores deben ser positivos`);
    }
    if (sistolica < diastolica) {
      throw new NotAcceptableException(`${field} inválida: sistólica no puede ser menor que diastólica`);
    }
  }
}
