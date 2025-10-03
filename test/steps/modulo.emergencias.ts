import { Given, Then, When } from '@cucumber/cucumber';
import { Enfermera } from 'src/enfermera/enfermera';

    let enfermera: Enfermera;
    

    Given('que la siguiente enfermera está registrada:', function (dataTable) {
        const data = dataTable.hashes();
        const row = data[0];
        enfermera = new Enfermera(
            row['Nombre'],
            row['Apellido']
        );
    });

    Given('estan registrados los siguientes pacientes:', function (dataTable) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
    });

    When('ingresa a urgencias el siguiente paciente:', function (dataTable) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
    });

    Then('La lista de espera esta ordenada por cuil de la siguiente manera:', function (dataTable) {  
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
    });