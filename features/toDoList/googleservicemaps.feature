Feature: Consultar paises

Scenario Outline: Traer nombre de paises por codigo
 Given Yo quiero obtener los nombres de los paises
  When ingrese el codio <codigo>
  Then muestra el <nombrePais> y tipo de moneda: <tipomoneda>
 Examples: 
 |  codigo  | nombrePais     | tipomoneda |
 |  US      | Estados Unidos | USD        |
 |  PE      | Peru           | PEN        |
 