console.log("=== Exemplo Repositório Genérico ===");

// Um tipo simples de Aluno
type Aluno = {
  id: number;
  nome: string;
  idade: number;
};

// 1. Interface genérica Repositorio<T>
interface Repositorio<T> {
  adicionar(item: T): void;
  remover(id: number): void;
  listar(): T[];
}

// 2. Classe genérica RepositorioMemoria<T> que implementa a interface
class RepositorioMemoria<T extends { id: number }> implements Repositorio<T> {
  private itens: T[] = [];

  adicionar(item: T): void {
    this.itens.push(item);
    console.log("Item adicionado:", item);
  }

  remover(id: number): void {
    this.itens = this.itens.filter(item => item.id !== id);
    console.log(`Item com id ${id} removido`);
  }

  listar(): T[] {
    return this.itens;
  }
}

// 3. Usando Repositorio<Aluno>
let repoAlunos: Repositorio<Aluno> = new RepositorioMemoria<Aluno>();

repoAlunos.adicionar({ id: 1, nome: "André", idade: 25 });
repoAlunos.adicionar({ id: 2, nome: "Maria", idade: 22 });
repoAlunos.adicionar({ id: 3, nome: "João", idade: 20 });

console.log("Lista de alunos:", repoAlunos.listar());

repoAlunos.remover(2);

console.log("Após remover Maria:", repoAlunos.listar());
