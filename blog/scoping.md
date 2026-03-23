# Escopos

## Introdução

Já faz alguns meses desde que decidi me aprofundar mais em Javascript e seu funcionamento por debaixo dos panos. Já queria ter feito isso
a algum tempo atrás, mas nunca havia priorizado isso ou acho que simplesmente deixei a procrastinação vencer.

Com o crescimento da IA, estamos colocando mais camadas de abstração do que nunca. Sendo assim, provavelmente a maioria
dos devs não concordaria com a importância de aprender conceitos fundamentais como Escopos (aqui falo especificamente sobre Javascript, mas vale
pra qualquer outra linguagem). Gostaria de escrever um artigo dedicado a esse assunto posteriormente.

Não lembro exatamente quando foi, mas acabei caindo na página do Student Pack do GitHub, no qual eu já utilizava alguns recursos como o Co
pilot e lembrei que, além dele, o GitHub oferece vários outros benefícios gratuitos: Créditos na Amazon; Free Domains, GitHub Actions,
etc. Aproveitei pra verificar os conteúdos novamente, e um deles me chamou atenção. Eu já sabia da existência plataforma e já tinha visto alguns
conteúdos deles no Linkedin e no Youtube, mas não lembrava que eles possuíam uma parceria com o GitHub, falo do **FrontendMasters**.

Sinceramente, eu acho que não existe conteúdo melhor na internet focado em Frontend do que o **FrontendMasters**. É um benefício
oferecido pra qualquer estudante inscrito no GitHub Student Pack, por 6 meses, **GRATUITAMENTE**. Particularmente eu acho que todo estudante
ou desenvolver Frontend deveria estudar o conteúdo oferecido por eles. A plataforma é toda em inglês, mas é perfeitamente compreensível pra quem
não tem um entendimento profunda na língua. Eles possuem transcripts, slides em PDF, exercícios e inúmeros instrutores pra diferentes assuntos.

Fiz essa tangente pois estudei e aprendi Scopes no Javascript com um dos tutores mais incríveis da plataforma, **Kyle Simpson**,
no workshop de **Deep Javascript Foundations**. Pessoalmente, eu acho a didática dele fantástica.

Vou separar esse artigo em dois temas: Escopos Estáticos e Escopos Dinâmicos. Não existe Escopo Dinâmico no Javascript, mas vou separar dessa forma
por que a keyword this do Javascript vale um tópico separado e age como se fosse dinâmico.

## Disclaimer

Esse artigo/estudo é uma maneira pessoal de consolidar o meu conhecimento aprendido de um determinado assunto. Tento explicar de maneira resumida e
simples, pra mim mesmo. Pessoalmente, acho que uma das melhores maneiras de aprender é explicando, pra você mesmo ou pra outras pessoas. Não tenho
a intenção de agir como professor e cometo erros. Se houver qualquer equívoco da minha parte, o feedback é sempre bem-vindo.

Outro ponto é que costumo escrever mantendo algumas terminologias em inglês. Não faço a tradução literal de terminologias que acredito que não
caibam uma tradução.

Na verdade, já faz um tempo que estou tentando escrever alguns artigos sobre o que estou aprendendo, mas a proscrastinação e o perfeccionismo sempre
acabam vencendo. Antes, estava tentando escrever esses artigos/estudos em inglês, mas como não é minha língua nativa, é realmente difícil conseguir
alcançar o mesmo tipo de expressividade do que sua língua nativa.

## Como Escopos funcionam?

Ao contrário do senso comum, Javascript não é uma linguagem interpretada, se fosse, como poderia retornar um Erro antes mesmo da execução
do programa?

Se você tentar executar essa function simples, verá que um erro será retornado e o `"Hello, World"` não será printado.

```javascript
function foo() {
  console.log("Hello, World");

  var bar = ;
}

foo();

SyntaxError: Unexpected token ';'
```

A **Compilation Phase** retorna um SyntaxError e previne o código de alcançar o **Runtime**.

Javascript é uma linguagem **Two-pass**. De maneira simplificada, ela possuí duas fases:

1. **Compilation Phase**
2. **Execution Phase (Runtime)**

## Compilation Phase

A fase de Compilação vai ser responsável por mapear os Escopos e seus respectivos identificadores. Isso é possível por que Escopos e identificadores
são previsíveis e estáticos. Escopos não podem mover "físicamente" pra outro lugar no código e identificadores uma vez declarados terão seu espaço
alocado na memória, mesmo que não sejam utilizados em Runtime e liberados pelo Garbage Collector. Basicamente, estamos nos aproveitando do fato
de sua previsibilidade pra otimizar o código pro Runtime. Se podemos fazer agora, aliviamos o peso pro processo de execução.

Provavelmente estou explicando em cima de diversas abstrações como Abstraction Syntax Tree e outros fundamentos de Compiladores, no qual eu não me
aprofundei. Evito me aprofundar demais com temas que não são prioritários no assunto que estou estudando. É como utilizar o Carl Sagan disse
"If you wish to make an apple pie from scratch you must first invent the universe" ou "Se quer fazer uma torta de maçã do zero, precisa inventar o
Universo". Já cai em muitos problemas desse tipo por que gosto de entender os assuntos em sua profundidade, o problema é que caímos em um buraco sem
fundo e não sabemos quando parar, isso nos desmotiva por que achamos que não somos capazes de entender o assunto em sua maioria, basicamente é dar mais
palco pra Síndrome de Impostor.

No workshop, o Kyle explica usando uma metáfora com **"Buckets and Marbles"**, ou Baldes e Bolinhas de Gude. Vou utilizar a terminologia em inglês por
que acho baldes e bolinhas meio tosco.

Cada escopo é um Bucket, cada identificador é um Marble colocado em seu respectivo Bucket. Escopos aninhados são, metaforicamente falando, Buckets
dentro de Buckets. Nesse exemplo, cada Bucket tem sua cor:

```javascript
// Escopo Global: Bucket vermelho

function foo() {
  // foo: Marble vermelho
  // Escopo de foo: Bucket azul

  var bar; // bar: Marble azul
}
```

1. O Bucket vermelho representa o Escopo Global;
2. A `function foo` é alocada no Bucket vermelho como um Marble vermelho;
3. O Bucket azul representa o escopo da `function foo`;
4. `bar` é alocado no Bucket azul como um Marble azul;

Com outros exemplos no decorrer da explicação vai ficar mais fácil de compreender.

Na própria fase de Compilação, o mapeamento dos Escopos e seus identificadores é realizado pela comunicação entre o Scope Manager e o Compilador.
O Kyle, no workshop, explica essa comunicação como se fosse uma conversa entre pessoas.

Utilizando o exemplo acima:

**Compiler**: "Ei, Scope Manager. Tenho uma declaração formal de **foo** no Bucket vermelho. Já ouviu falar disso?"
**Scope Manager**: "Nunca ouvi falar, mas aqui está o seu Marble vermelho". O Marble vermelho é colocado no Bucket vermelho.
**Copiler**: "Ei, Scope Manager. foo na verdade é uma function, vamos precisar de um novo Bucket". O Bucket azul é criado e alocado dentro
do Bucket vermelho.

Você pode pensar nisso como se fossem Matrioskas ou Boneca Russa. Aquelas bonecas que entram uma dentro das outras. Também você pode fazer um paralelo
com o sistema de boxes do CSS e do DOM. Uma div dentro de um div, etc. Provavelmente em qualquer um desses exemplos a estrutura de dados utilizada é
uma Árvore.

---

#### Shadowing

```javascript
// Bucket vermelho
var foo; // Marble vermelho

function bar() {
  // Bucket azul
  var foo; // Marble azul
}
```

Por mais que sejam dois identificadores com o mesmo label, estamos falando de Buckets completamente diferentes. O Bucket azul não sabe da existência
de foo do Bucket vermelho. Um identificador de mesmo label `foo` é alocado como um Marble azul dentro do Bucket azul. Porém, o foo do Bucket vermelho
não pode mais ser acessado no Bucket azul. Isso é conhecido como **Shadowing**, uma ténica absolutamente válida e comum.

---

#### Duplicação de identifiers

```javascript
// Bucket vermelho

var foo; // Marble vermelho

var foo; // Marble vermelho?
```

No caso de dois identificadores com o mesmo label, somente um deles é mapeado. Na linha 2, o tipo de comunicação segue o mesmo.

Na linha 3:

**Compiler**: "Ei, Scope Manager. Tenho uma declaração formal de **foo** no Bucket vermelho. Já ouviu disso?"
**Scope Manager**: "Sim". O Compilador segue e nada acontece.

Casos com function declarations ou declarações com let e const funcionam de maneira diferente, mas a ideia é a mesma:

- **Function declarations**: a function será sobrescrita.
- **let, const**: O Strict Mode é aplicado e um SyntaxError é lançado.

#### Function Declarations x Function Expressions

Existem duas maneiras de declarar functions:

```javascript
function foo() {} // Marble vermelho

var foo = function bar() {
  // Marble azul
  // Bucket azul
};

foo();
```

A primeira é uma Function Declaration, o método tradicional de escrever functions.

A outra é uma function expression. Por que é atribuída a um identificador foo? Na verdade não. É uma function expression por que function não é
a primeira expressão da linha.

Qualquer function expression tem seu identificador alocado no seu próprio escopo, e só pode ser chamado dentro dele mesmo. Ele também é read-only.

Pelo fato de foo ser evaluated por pela function bar, chamar foo no Escopo global vai funcionar.

```javascript
(function foo() {})();

foo();
```

em um caso como esse, foo não vai ser acessível ao Escopo Global, pois seu identificador pertence ao seu próprio Bucket. Esse pattern é conhecido como
IIFE ou Immediatly Invoked Function Expression. Vou deixar pra falar mais sobre IIFEs em outro artigo.

### Units of Scope

Temos 3 tipos de unidades de escopo pra identificadores:

Block scope: acessível em escopo de bloco.

```javascript
function foo() {
  {
    let bar;
    bar = "bar";
  }

  console.log(bar); // Reference Error
}
```

Function Scope: acessível no escopo da function. Exemplo: varíaveis declaradas com var

```javascript
function foo() {
  {
    var bar = "bar";
  }

  console.log(bar); // prints bar
}
```

Mesmo dentro de um escopo de bloco, a varíavel fica acessível ao escopo da function foo

Function declarations funcionam de maneira híbrida por questões de compatibilidade, então são de bloco, mas de function também


## Hoisting

Hoisting é um termo bastante comum pra explicar o comportamento de inicialização de Escopos e identificadores. É um termo que não existe na
especificação do Javascript.

Um identificador, no processo de Compilação, tem comportamentos diferentes com base no seu tipo de declaração. Há um equívoco comum em achar
que keywords como const e let não são "Hoisteados". Todo identificador é "Hoisteado", o que muda é seu comportamento.

- **Function Declarations**: são inicializadas
- **var**: inicializados com o valor `undefined`.

```javascript
console.log(foo); // undefined

console.log(func); // Hello, World

var foo = "bar";

function func() {
  console.log("Hello, World");
}
```

- **const, let**: não são inicializados e ficam na TDZ (Temporal Dead Zone)

```javascript
console.log(foo);

const foo = "bar";

// ReferenceError: Cannot access 'foo' before initialization
```

Qualquer acesso a let e const antes de sua declaração te retorna um TDZ Error

#### TDZ

O TDZ foi implementado com a vinda das keywords const e let no ECMA 2015 ou ES5. O que explica o fato de const e let permanecerem na TDZ é que não
faria sentido lermos uma constante com o valor de `undefined` antes de sua declaração, assim como acontece com `var`.

**Q:** Mas e a keyword `let`?
**A:** Já que implementaram a regra pra `const`, decidiram implementar pra `let`.

---

A fase de compilação explica um monte de comportamentos considerados "estranhos" no Javascript. Digo estranhos entre aspas porque são comportamentos
lógicos e previsíveis da linguagem. Vejo uma galera na internet criticando o Javascript por diversos motivos, que são válidos muitas vezes,
mas também são equivocados em muitos casos. De fato, a linguagem possui diversos problemas que são justificados por motivos históricos, a fim
de evitar problemas de compatibilidade. Mas não acredito que o funcionamento de Escopo seja uma delas. Hoisting, por sinal, é uma funcionalidade
bem útil, eu particularmente prefiro deixar minhas functions no final do arquivo pra facilitar a legibilidade. Geralmente eu prefiro ler a execução
do código primeiro do que o corpo da function. No caso de var, realmente não vejo muito caso pratico em querer acessar uma variável antes da sua
declaração. De qualquer maneira, acho importante entender primeiro como a linguagem funciona, e utilizar as funcionalidades que fazem sentido pro
seu caso.

---

## Runtime

Depois que os Escopos e seus identificadores são mapeados, o Runtime assume a execução do código. Como o Javascript é Single-Threaded, o código será
executado linha por linha, um após o outro.

A mesma comunicação do Compiler x Scope Manager é feita no Runtime. Nesse caso será o Runtime x Scope Manager.

No Runtime, a comunicação é feita baseada no tipo de referência:

- **Target Reference ou Left-hand Side**: Basicamente, atribuição de um valor
- **Source Reference ou Right-hand Side**: Leitura de um identificador

```javascript
function bar() {
  foo = "bar"; // left-hand side

  console.log(foo); // right-hand side
}

bar(); // right-hand side
```

Metáfora de comunicação:

**Runtime**: "Ei, Scope Manager. Tenho foo em uma posição de Target Reference. Você tem a referência nesse escopo?"
**Scope Manager**: "Sim, aqui está o seu Marble". A string bar é atribuída a foo

**Runtime**: "Ei, Scope Manager. Tenho foo em uma posição de Source Reference. Você tem a referência nesse escopo?"
**Scope Manager**: "Sim, aqui está o seu Marble". O console.log é chamado com o foo como argumento.

**Runtime**: "Ei, Scope Manager. Tenho bar em uma posição de Source Reference. Você tem a referência nesse escopo?"
**Scope Manager**: "Sim, aqui está o seu Marble". A function bar é chamada.

### Lexical Behavior

O comportamento léxico do Javascript funciona com o mesmo tipo de comunicação.

```javascript
var foo = "Hello, World";

function bar() {
  console.log(foo);
}

bar();
```

**Runtime**: "Ei, Scope Manager. Tenho foo em uma posição de Source Reference. Você tem a referência nesse escopo?"
**Scope Manager**: "Não". Sai do Escopo atual e vai pro Outer Scope (Escopo externo). Nesse caso é o escopo global.

Se caso o a reference não fosse encontrada no escopo global (último nível no Call Stack), um ReferenceError seria retornado e um identificador seria
criado automaticamente no escopo global. Se estiver em `strict mode`, o identificador não é criado. Você quer usar strict mode em qualquer caso pra
não criar essas variáveis de escopo global automaticamente. Novamente, o strict mode não é adotado por padrão por questões históricas e de
compatibilidade da linguagem.

O objeto console também é buscado como uma Source reference pelo Runtime x Scope Manager, a não que você o sobrescreva em um escopo aninhado.
O console, assim como outros objetos builtin do Javascript, são globais.
