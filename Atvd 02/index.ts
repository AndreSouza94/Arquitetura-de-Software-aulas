import * as crypto from 'crypto';
import * as readline from 'readline';

// 1. Interface para definir a estrutura dos dados
interface DadosPessoa {
    cpf: string;
    email: string;
    celular: string;
}

// 2. Função para criar o identificador único (hash)
function criarIdentificador(dados: DadosPessoa): string {
    const dadosParaHash = `${dados.cpf}:${dados.email}:${dados.celular}`;
    // Usamos SHA-256 para criar um hash seguro e consistente
    return crypto.createHash('sha256').update(dadosParaHash).digest('hex');
}

// 3. Interface para o item da fila
interface ItemFila {
    id: string;
    dados: DadosPessoa;
    // Você pode adicionar outros campos, como timestamp
    timestamp: Date;
}

// 4. Classe da Fila
class Fila {
    private items: ItemFila[] = [];

    // Adiciona um novo item à fila
    enqueue(dados: DadosPessoa): string {
        const id = criarIdentificador(dados);
        const novoItem: ItemFila = {
            id: id,
            dados: dados,
            timestamp: new Date()
        };
        this.items.push(novoItem);
        console.log(`✅ Adicionado à fila. ID: ${id}`);
        return id;
    }

    // Remove e retorna o primeiro item da fila (FIFO)
    dequeue(): ItemFila | undefined {
        const itemRemovido = this.items.shift();
        if (itemRemovido) {
            console.log(`➡️ Removido da fila. ID: ${itemRemovido.id}`);
        } else {
            console.log("❌ A fila está vazia.");
        }
        return itemRemovido;
    }

    // Retorna o tamanho atual da fila
    tamanho(): number {
        return this.items.length;
    }

    // Exibe todos os itens na fila
    listar(): void {
        console.log("\n--- Itens na Fila ---");
        if (this.tamanho() === 0) {
            console.log("A fila está vazia.");
        } else {
            this.items.forEach(item => {
                console.log(`ID: ${item.id} | CPF: ${item.dados.cpf} | Email: ${item.dados.email}`);
            });
        }
        console.log("---------------------\n");
    }
}

// 5. Interface Console para interação do usuário
const fila = new Fila();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function menu() {
    console.log("\n--- Sistema de Fila ---");
    console.log("1. Adicionar à fila");
    console.log("2. Processar (remover) da fila");
    console.log("3. Listar todos os itens da fila");
    console.log("4. Sair");

    rl.question('Escolha uma opção: ', async (opcao) => {
        switch (opcao.trim()) {
            case '1':
                await adicionarItem();
                break;
            case '2':
                fila.dequeue();
                break;
            case '3':
                fila.listar();
                break;
            case '4':
                rl.close();
                return;
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
        menu();
    });
}

async function adicionarItem() {
    const pergunta = (q: string): Promise<string> => new Promise((resolve) => rl.question(q, resolve));

    try {
        const cpf = await pergunta('Digite o CPF: ');
        const email = await pergunta('Digite o Email: ');
        const celular = await pergunta('Digite o Celular: ');

        fila.enqueue({ cpf, email, celular });
    } catch (e) {
        console.error('Erro ao adicionar item: ', e);
    }
}

// Inicia o console
menu();