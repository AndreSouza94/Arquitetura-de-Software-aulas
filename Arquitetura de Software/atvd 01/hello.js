console.log('Hellow Word');
// 1. Variáveis tipadas
var nome = "André";
var idade = 25;
var ativo = true;
console.log("Nome:", nome);
console.log("Idade:", idade);
console.log("Ativo:", ativo);
// 2. Array de números e tupla
var numeros = [10, 20, 30, 40, 50];
var pessoa = ["Maria", 30]; // tupla: nome + idade
console.log("Array de números:", numeros);
console.log("Tupla pessoa:", pessoa);
// 3. Enum para dias da semana
var DiaSemana;
(function (DiaSemana) {
    DiaSemana[DiaSemana["Segunda"] = 1] = "Segunda";
    DiaSemana[DiaSemana["Terca"] = 2] = "Terca";
    DiaSemana[DiaSemana["Quarta"] = 3] = "Quarta";
    DiaSemana[DiaSemana["Quinta"] = 4] = "Quinta";
    DiaSemana[DiaSemana["Sexta"] = 5] = "Sexta";
    DiaSemana[DiaSemana["Sabado"] = 6] = "Sabado";
    DiaSemana[DiaSemana["Domingo"] = 7] = "Domingo";
})(DiaSemana || (DiaSemana = {}));
var hoje = DiaSemana.Segunda;
console.log("Hoje é:", DiaSemana[hoje]); // mostra "Segunda"
// 4. Função tipada que retorna a soma
function somar(a, b) {
    return a + b;
}
var resultado = somar(10, 15);
console.log("Soma:", resultado);
