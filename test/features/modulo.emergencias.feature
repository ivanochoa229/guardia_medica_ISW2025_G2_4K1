Feature: Modulo de emergencias
    Como enfermera
    Quiero poder registrar las adminisiones de los pacientes a urgencias
    Para determinar que pacientes tienen mayor prioridad de atencion

    Background: 
        Given que la siguiente enfermera está registrada:
        |Nombre| Apellido |
        |susana | gimenez |

    Scenario: Registar ingreso exitoso del primer paciente
    Given estan registrados los siguientes pacientes:
        |cuil| nombre | apellido | obra social|
        | 20-41383873-9| ivan | ochoa| mora|
        | 20-42188853-9| juan | perez| osde|
    When ingresa a urgencias el siguiente paciente:
        |cuil| informe | nivel de emergencia | temperatura | frecuencia cardiaca | frecuencia respiratoria | tension arterial |
        | 20-41383873-9 | tiene dolor de cabeza | Sin urgencia | 39 | 120 | 100 | 120/80 |
    Then La lista de espera esta ordenada por cuil de la siguiente manera:
        |cuil|
        | 20-41383873-9 | 

    Scenario: Ingreso de un paciente de bajo nivel de emergencia y luego otro de alto nivel de emergencia
    Given estan registrados los siguientes pacientes:
        |cuil| nombre | apellido | obra social|
        | 20-41383873-9| ivan | ochoa| mora|
        | 20-42188853-9| juan | perez| osde|
        | 20-42100053-9| angel | borja| subsidio de salud|
    When ingresa a urgencias el siguiente paciente:
        |cuil| informe | nivel de emergencia | temperatura | frecuencia cardiaca | frecuencia respiratoria | tension arterial |
        | 20-42100053-9 | dolor de ojo | Sin urgencia | 39 | 120 | 100 | 120/80 |
        | 20-42188853-9 | dolor de espalda | Critica | 39 | 120 | 100 | 120/80 |
        | 20-41383873-9 | tiene dolor de cabeza | Emergencia | 39 | 120 | 100 | 120/80 |
    Then La lista de espera esta ordenada por cuil de la siguiente manera:
        |cuil|
        | 20-42188853-9 |
        | 20-41383873-9 | 
        | 20-42100053-9 | 