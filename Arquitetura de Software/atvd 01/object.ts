console.log("=== Exercício com Objetos, Interfaces e Types ===");

// 1. Criar um objeto Aluno com nome, idade e curso
let aluno = {
  nome: "João",
  idade: 20,
  curso: "Engenharia"
};

console.log("Aluno:", aluno);

// 2. Definir uma interface Pessoa e criar um objeto que a implementa
interface Pessoa {
  nome: string;
  idade: number;
}

let pessoa1: Pessoa = {
  nome: "Maria",
  idade: 30
};

console.log("Pessoa:", pessoa1);

// 3. Criar uma função que recebe um objeto do tipo Pessoa e retorna uma saudação
function saudacao(p: Pessoa): string {
  return `Olá, ${p.nome}! Você tem ${p.idade} anos.`;
}

console.log(saudacao(pessoa1));

// 4. Usar type para definir um tipo de Produto e comparar com interface
type Produto = {
  nome: string;
  preco: number;
  emEstoque: boolean;
};

let produto1: Produto = {
  nome: "Notebook",
  preco: 3500,
  emEstoque: true
};

console.log("Produto:", produto1);

