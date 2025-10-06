import { Before, DataTable, Given, Then, When } from '@cucumber/cucumber';
import { NotAcceptableException } from '@nestjs/common';
import assert from 'assert';
import { EmergencyLevel } from '../../src/nivel-emergencia/enums/nivel-emergencia.enum';
import { Patient } from '../../src/paciente/entities/paciente';
import { UrgencyService } from '../../src/urgencia/urgencia.service';
import { DataBaseInMemory } from '../../test/mock/database.memory';
import { Enfermera } from '../../src/enfermera/entities/enfermera.entity';
import { Ingreso } from 'src/ingreso/ingreso';
import { last } from 'rxjs';

let enfermera: Enfermera;
let mockDb: DataBaseInMemory;
let listaDeEspera: Ingreso[];
let urgencyService: UrgencyService;
let msgLastError: string;

function registrarPacientes(dataTable) {
  const data = dataTable.hashes();
  data.forEach(row => {
    const patient = new Patient(
      row['cuil'],
      row['nombre'],
      row['apellido'],
      row['obra social'],
    );
    mockDb.guardarPaciente(patient);
  });
}
function validarError(lastMsgError:string){
  
}

Before(function () {
  mockDb = new DataBaseInMemory();
  listaDeEspera = [];
  msgLastError;
  urgencyService = new UrgencyService(mockDb, listaDeEspera);
  console.log('=== NUEVO ESCENARIO ===');
});

Given('que la siguiente enfermera está registrada:', (dataTable) => {
  const data = dataTable.hashes();
  const row = data[0];
  enfermera = new Enfermera(row['Nombre'], row['Apellido']);
});

Given('estan registrados los siguientes pacientes:', (dataTable)=>{
  registrarPacientes(dataTable);
});
Given('esta registrado el siguiente paciente:', (dataTable)=>{
  registrarPacientes(dataTable);
});

When('ingresa a urgencias el siguiente paciente:', (dataTable)=> {
  const data = dataTable.hashes();
  data.forEach((row) => {
    try {
      const rawTA = row['tension arterial'];
      const tensionArterial = rawTA ? rawTA.split('/').map(Number) : undefined; // ← no rompe si falta la tension
      const entry = row['nivel de emergencia'];
      const emergencyLevel = Object.values(EmergencyLevel).find(
        (v) => v.toLowerCase() === entry.toLowerCase(),
      );

      if (!emergencyLevel) { //debatir si agregarlo al urgency validator como un metodo estatico,
        throw new NotAcceptableException(
          `Nivel de emergencia no válido: ${entry}`,
        );
      }

      const temperatura = Number(row['temperatura']);
      const frecuenciaCardiaca = Number(row['frecuencia cardiaca']);
      const frecuenciaRespiratoria = Number(row['frecuencia respiratoria']);

      urgencyService.registerUrgency(
        row['cuil'],
        enfermera,
        row['informe'],
        emergencyLevel,
        temperatura,
        frecuenciaCardiaca,
        frecuenciaRespiratoria,
        tensionArterial,
      );
    } catch (err: any) {
      msgLastError = err.message;
    }
  });
});

Then('La lista de espera esta ordenada por cuil de la siguiente manera:', (dataTable) => {
  const esperados = dataTable.rows().map(r => r[0]); // todos los CUIL esperados
  const actuales = urgencyService.obtenerIngresosPendientes().map(i => i.paciente.cuil); // mapeo de cuils p comparar dsp
  assert.deepStrictEqual(
    actuales,
    esperados,
    `El orden real (${actuales.join(', ')}) no coincide con el esperado (${esperados.join(', ')})`
  );
});

Then('el sistema muestra un error indicando que falta el campo {string}', (campo) => {
  assert.ok(msgLastError, 'No se capturó ningún error');
  console.log('Error capturado:', msgLastError);
  assert.ok(
    msgLastError.toLowerCase().includes(campo.toLowerCase()),
    `Se esperaba que el mensaje contenga "${campo}", pero fue: "${msgLastError}"`
  );
});

Then('el ingreso no se registra', () => {
  const pendientes = urgencyService.obtenerIngresosPendientes();
  assert.strictEqual(pendientes.length, 0);
});
Then('el sistema muestra un error indicando que la tension arterial debe ser positiva', () => {
  assert.ok(msgLastError, 'No se capturó ningún error');
  console.log('Error TA capturado:', msgLastError);
  assert.ok(msgLastError.toLowerCase().includes('valores deben ser positivos'));
});


