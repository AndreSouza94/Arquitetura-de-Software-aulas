console.log("=== Exercício com Objetos, Interfaces e Types ===");
// 1. Criar um objeto Aluno com nome, idade e curso
var aluno = {
    nome: "João",
    idade: 20,
    curso: "Engenharia"
};
console.log("Aluno:", aluno);
var pessoa1 = {
    nome: "Maria",
    idade: 30
};
console.log("Pessoa:", pessoa1);
// 3. Criar uma função que recebe um objeto do tipo Pessoa e retorna uma saudação
function saudacao(p) {
    return "Ol\u00E1, ".concat(p.nome, "! Voc\u00EA tem ").concat(p.idade, " anos.");
}
console.log(saudacao(pessoa1));
var produto1 = {
    nome: "Notebook",
    preco: 3500,
    emEstoque: true
};
console.log("Produto:", produto1);
// Diferença básica entre type e interface:
// - interface é mais usada para contratos e pode ser extendida.
// - type é mais flexível para combinações (union, intersection).
