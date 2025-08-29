console.log('Hellow Word')

// 1. Variáveis tipadas
let nome: string = "André";
let idade: number = 25;
let ativo: boolean = true;

console.log("Nome:", nome);
console.log("Idade:", idade);
console.log("Ativo:", ativo);

// 2. Array de números e tupla
let numeros: number[] = [10, 20, 30, 40, 50];
let pessoa: [string, number] = ["Maria", 30];  // tupla: nome + idade

console.log("Array de números:", numeros);
console.log("Tupla pessoa:", pessoa);

// 3. Enum para dias da semana
enum DiaSemana {
  Segunda = 1,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado,
  Domingo
}

let hoje: DiaSemana = DiaSemana.Segunda;
console.log("Hoje é:", DiaSemana[hoje]); // mostra "Segunda"

// 4. Função tipada que retorna a soma
function somar(a: number, b: number): number {
  return a + b;
}

let resultado = somar(10, 15);
console.log("Soma:", resultado);