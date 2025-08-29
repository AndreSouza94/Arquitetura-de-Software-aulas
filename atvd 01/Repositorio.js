console.log("=== Exemplo Repositório Genérico ===");
// 2. Classe genérica RepositorioMemoria<T> que implementa a interface
var RepositorioMemoria = /** @class */ (function () {
    function RepositorioMemoria() {
        this.itens = [];
    }
    RepositorioMemoria.prototype.adicionar = function (item) {
        this.itens.push(item);
        console.log("Item adicionado:", item);
    };
    RepositorioMemoria.prototype.remover = function (id) {
        this.itens = this.itens.filter(function (item) { return item.id !== id; });
        console.log("Item com id ".concat(id, " removido"));
    };
    RepositorioMemoria.prototype.listar = function () {
        return this.itens;
    };
    return RepositorioMemoria;
}());
// 3. Usando Repositorio<Aluno>
var repoAlunos = new RepositorioMemoria();
repoAlunos.adicionar({ id: 1, nome: "André", idade: 25 });
repoAlunos.adicionar({ id: 2, nome: "Maria", idade: 22 });
repoAlunos.adicionar({ id: 3, nome: "João", idade: 20 });
console.log("Lista de alunos:", repoAlunos.listar());
repoAlunos.remover(2);
console.log("Após remover Maria:", repoAlunos.listar());
