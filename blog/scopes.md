# Scopes

## Introdução

Já faz alguns meses desde que decidi me aprofundar mais em Javascript e seu funcionamento por debaixo dos panos. Já queria ter feito isso
a algum tempo atrás, mas nunca havia priorizado isso ou acho que simplesmente deixei a procrastinação vencer.

Com o crescimento da IA, estamos colocando mais camadas de abstração no desenvolvimento do que nunca. Sendo assim, provavelmente a maioria
dos devs não concordaria com a importância de aprender conceitos fundamentais como Scopes (aqui falo especificamente sobre Javascript, mas vale
pra qualquer outra linguagem).

Não lembro exatamente quando foi, mas acabei caindo na página do Student Pack do GitHub, no qual eu já utilizava alguns recursos como o Copilot e
lembrei que, além dele, o GitHub oferece vários outros benefícios gratuitos: Créditos na Amazon, Free Domains, GitHub Actions,
etc. Aproveitei pra verificar os conteúdos novamente, e um deles me chamou atenção. Eu já sabia da existência plataforma e já tinha visto alguns
conteúdos deles no Linkedin e no Youtube, mas não lembrava que eles possuíam uma parceria com o GitHub, falo do **FrontendMasters**.

Sinceramente, eu acho que não existe conteúdo melhor na internet focado em Frontend do que o **FrontendMasters**. É um benefício
oferecido pra qualquer estudante inscrito no GitHub Student Pack, por 6 meses, GRATUITAMENTE. Particularmente eu acho que todo estudante
ou desenvolver Frontend deveria estudar o conteúdo oferecido por eles. O único porém é que a plataforma é toda em inglês e não possui legendas
em português. De qualquer forma, eu acho que pra esse caso vale muito a pena o esforço de aprender a língua.

Fiz essa tangente pois estudei e aprendi sobre Scopes no Javascript com um dos tutores mais incríveis da plataforma, **Kyle Simpson**,
no workshop de **Deep Javascript Foundations**. Pessoalmente, eu acho a didática dele fantástica. E esse estudo vai ser baseado nos ensinamentos
dele com a minha perspectiva e considerações. Mesmo código sendo algo lógico, existe muita opinião diversa a respeito de programação, então tento não tomar tudo
como verdade absoluta e procuro questioná-los o máximo possível. O Kyle tem opiniões consideradas bem polêmicas a respeito de Javascript e
particularmente considero isso como um dos pontos fortes da didática dele.

Tem bastante coisa no qual ainda quero escrever sobre, mas a ideia dessa introdução foi dar um pouco mais de contexto a respeito desse estudo.
Nesse sentido, vou separá-lo em dois temas: **Static Scoping** e **Dynamic Scoping**. Não existe dynamic scoping no Javascript, mas vou fazer dessa
forma por que a keyword `this` é um dinamicismo na linguagem e vale um tópico separado.

## Disclaimer

Esse estudo é uma maneira pessoal de consolidar o meu conhecimento aprendido de um determinado assunto. Tento explicar de maneira resumida e
simples. Pessoalmente, acho que uma das melhores maneiras de aprender é explicando, pra você mesmo ou pra outras pessoas. Não tenho
a intenção de agir como professor e cometo erros. Se houver qualquer equívoco da minha parte, o feedback é sempre bem-vindo.

Sobre IA, utilizo como uma forma de complementar meu estudo. A IA é uma ótima ferramenta pra checar a veracidade de uma informação, mesmo
que ela possa errar. Se caso ela erre, o fato de corrigi-la já é uma ótima maneira de consolidar o conhecimento. No mais, eu não utilizo IA pra
escrever meus estudos. Acredito que se o objetivo é consolidar meu conhecimento, eu mesmo devo escrevê-lo.

Como sendo um estudo pessoal, também é baseado em opiniões próprias que provavelmente nem todo mundo concorda, o que eu acho absolutamente saudável.
Eu costumava ser o tipo de pessoa que ficava em cima do muro pra evitar conflitos ou indeferenças, mas é impossível agradar todo mundo. Não querer
agradar todo mundo é sinal de personalidade e convicção. Mas isso não quer dizer que não devemos ser humildes em admitir nossos erros.

#### Tradução

Costumo escrever mantendo algumas terminologias em inglês. Não faço a tradução literal de terminologias que acredito que não
caibam uma tradução ou que não funcionem muito bem em uma passagem. Por exemplo, não soa muito bem o uso da palavra "escopo" a todo momento, então
trânsito entre "Scope" e "Escopo".

Já faz um tempo que estou tentando escrever alguns estudos sobre o que estou aprendendo. Antes, estava tentando escrever esses estudos
em inglês e não deu muito certo. Como não é minha língua nativa, é realmente difícil conseguir alcançar o mesmo tipo de expressividade do que com o
português.

Um dos motivos pelo qual estava tentando escrever integralmente em inglês é pra evitar o uso inadequado de terminologias traduzidas, que
particularmente acho que geram um certo desconforto e confusão nos estudos. Prefiro utilizar a terminologia original do que traduzir ao pé da letra.
Talvez chegue um momento em que eu consiga alcançar o mesmo tipo de expressividade em inglês, mas não é prioridade por agora.

## Static Scoping: Como Scopes funcionam?

Ao contrário do senso comum, Javascript não é uma linguagem interpretada, se fosse, como poderia retornar um Erro antes mesmo da execução
do programa?

Se você tentar executar essa function simples, verá que um erro será retornado e o `"Hello, World"` não será printado.

```javascript
function foo() {
  console.log("Hello, World");

  var bar = ;
}

foo();

// SyntaxError: Unexpected token ';'
```

Porque isso acontece?

A **Compilation Phase** retorna um `SyntaxError` e previne o código de alcançar o **Runtime**.

O Javascript é uma linguagem **Two-pass**. De maneira simplificada, ela possuí duas fases:

1. **Compilation Phase**
2. **Execution Phase (Runtime)**

### 1. Compilation Phase

A **Compilation Phase** vai ser responsável por mapear os escopos e seus respectivos identificadores. Isso é possível por que escopos e identificadores
são previsíveis e estáticos. Escopos não podem mover "físicamente" pra outro lugar no código e identificadores uma vez declarados terão seu espaço
alocado na memória, mesmo que não sejam utilizados em **Runtime** e liberados posteriormente pelo _Garbage Collector_. Basicamente, estamos nos
aproveitando do fato de sua previsibilidade pra otimizar o código pro **Runtime**. Se podemos fazer agora, aliviamos o peso pro processo de execução.

Provavelmente estou explicando em cima de diversas abstrações como Abstraction Syntax Tree e outros fundamentos de Compilers, no
qual não me aprofundei. Evito me aprofundar demais com temas que não são prioritários no assunto que estou estudando. É como Carl Sagan
disse _"If you wish to make an apple pie from scratch you must first invent the universe"_ ou _"Se quer fazer uma torta de maçã do zero, precisa
inventar o Universo"_. Já cai em muitos problemas desse tipo por que gosto de entender os assuntos em sua profundidade, o problema é que caímos em
um buraco sem fundo e não sabemos quando parar, isso nos desmotiva por que achamos que não somos capazes de entender o assunto em sua maioria.
Basicamente é dar palco pra Síndrome de Impostor.

No workshop, o Kyle explica usando uma metáfora com **Buckets and Marbles**, ou baldes e bolinhas de Gude. Vou utilizar a terminologia em inglês
por que acho baldes e bolinhas meio tosco.

Cada escopo é um Bucket, cada identificador é um Marble colocado em seu respectivo Bucket. Escopos dentro de escopos são, metaforicamente falando, Buckets
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
2. A function `foo` é alocada no Bucket vermelho como um Marble vermelho;
3. O Bucket azul representa o escopo da function `foo`;
4. `bar` é alocado no Bucket azul como um Marble azul;

Na própria **Compilation Phase**, o mapeamento dos escopos e seus identificadores é realizado pela comunicação entre o **Scope Manager** e o
**Compiler**. No workshop, o Kyle explica essa comunicação como se fosse uma conversa entre pessoas.

Utilizando o exemplo acima como referência:

**Compiler**: "Ei, Scope Manager. Tenho uma declaração formal de `foo` no Bucket vermelho. Já ouviu falar disso?"

**Scope Manager**: "Nunca ouvi falar, mas aqui está o seu Marble vermelho".

_O Marble vermelho é colocado no Bucket vermelho_.

**Compiler**: "Ei, Scope Manager. `foo` na verdade é uma function, vamos precisar de um Bucket pra ele".

_O Bucket azul é criado e alocado dentro do Bucket vermelho._

Você pode pensar nisso como se fossem Matrioskas ou Bonecas Russas. Aquelas bonecas que entram uma dentro das outras. Também você pode fazer um
paralelo com o sistema de boxing do CSS e do DOM. Uma div dentro de um div, etc. Não deve ser coincidência porque provavelmente esses exemplos utilizam
a Árvores como estrutura de dados.

#### Duplicação em Buckets diferentes

Em casos de identificadores com o mesmo nome, mas em Buckets diferentes:

```javascript
// Bucket vermelho
var foo; // Marble vermelho

function bar() {
  // Bucket azul
  var foo; // Marble azul
}
```

Por mais que possuam o mesmo label , estamos falando de Buckets completamente diferentes. Um identificador de mesmo label `foo` é alocado como um
Marble azul dentro do Bucket azul. Porém, o `foo` do Bucket vermelho não pode mais ser referenciado no Bucket azul. Isso é conhecido como **Shadowing**.

#### Duplicação no mesmo Bucket

Mas e no caso de identificadores com o mesmo label? Dois Marbles serão criados?

```javascript
// Bucket vermelho

var foo; // Marble vermelho

var foo; // Marble vermelho?
```

Não, os dois são lidos. Mas, só um permanece, baseado no seu tipo de declaração.

Na segunda declaração de `foo`:

**Compiler**: "Ei, Scope Manager. Tenho uma declaração formal de `foo` no Bucket vermelho. Já ouviu falar disso?"

**Scope Manager**: "Sim".

_O Compilador segue e nada acontece._

Casos com function declarations ou declarações com `let` e `const` funcionam de maneira diferente, mas a ideia é a mesma:

- **Function declarations**: a function será sobrescrita.
- **let, const**: não podem ser redeclarados por que tem Strictly Behavior e um `SyntaxError` é lançado. Vou explicar mais sobre `strict mode` mais
  pra frente.

#### Function Declarations x Function Expressions

Bucket e Marbles de functions declarations e function expressions são mapeados de maneiras distintas pelo Compiler.

```javascript
// Bucket vermelho

function foo() {} // Marble vermelho

var bar = function apple() {
  // Marble azul
  // Bucket azul
};

bar();
```

A primeira é uma function declaration, o método tradicional de escrever functions. A outra é uma function expression. Uma function é uma function
expression se a keyword `function` não é a primeira expressão da linha. Não vou me aprofundar muito no tema, porque quero escrever um estudo
separado pra functions em geral.

O principal é que qualquer function expression tem seu Marble alocado no seu próprio Bucket, e só pode ser chamado dentro dele mesmo. Ele
também é read-only.

No exemplo acima, `bar` guarda uma referência de `apple`. Então obviamente chamar `bar` no escopo global é válido.

```javascript
// Bucket vermelho
(function foo() {
  // Marble azul
  // Bucket azul
});

foo(); // ReferenceError
```

Porém, em um caso como esse, `foo` é uma function expression e não vai ser acessível ao escopo global, pois seu identificador pertence ao seu próprio
escopo. Esse pattern é utilizado pra criar IIFEs (Immediate Invoked Function Expression), que estão presentes em qualquer lib de bundling, como Webpack ou Vite. Como falei,
vou deixar pra falar mais sobre IIFEs em um post dedicado a functions.

### Scope Units

Dependendo do tipo de declaração, o identificador se atrela a diferentes unidades de escopo.

#### Block Scope

Só é acessível dentro dos brackets `{ }`. Identificadores declarados com as keywords `let` e `const` são Block Scoped.

Exemplo:

```javascript
function foo() {
  {
    let bar = "bar";
  }

  console.log(bar); // Reference Error
}

foo();
```

Particularmente, eu nunca usei esse tipo de estrutura com brackets soltos, mas achei interessante a exemplificação com eles. Qualquer acesso a
bar fora do escopo de bloco retorna um `ReferenceError`.

#### Function Scope

Acessível em todo o escopo da function. Identificadores declarados com a keyword `var` são Function Scoped.

Exemplo:

```javascript
function foo() {
  {
    var bar = "bar";
  }

  console.log(bar); // prints bar
}

foo();
```

Mesmo em Block Scope, a varíavel fica acessível ao escopo da function `foo`.

##### Functions

Functions funcionam de maneira híbrida (Hybrid Scoped), tanto em Block Scope quanto em Function Scope. São assim por questões históricas de
compatibilidade.

#### let x var

O Kyle faz um paratênses no workshop explicando que let não é uma substituição de var na linguagem, considerado bastante polêmico, no qual
pessoalmente achei bem interessante. O que você mais vê em posts no Reddit de Javascript é essa discussão sobre qual keyword usar, que pode pode parecer
inútil, mas o assunto vai além disso.

No meu dia-a-dia, não usava `var` não por que não concordava com o uso, mas simplesmente por que tinha adotado `let` e `const` como hábito. Já vi
gente relevante na internet afirmando que `var` é um anti-pattern e não deveria ser usado sem embasamento nenhum a respeito dessa afirmação.
No geral, dizem que `var` ainda existe por questões históricas de compatibilidade e que era utilizado em aplicações que hoje são consideradas legado.

De maneira nenhuma `let` pode ser considerado uma substituição de `var`. Se você resolver dar um search and replace na sua aplicação ou em qualquer
projeto legado, a chance de seu programa quebrar é bem alta. Como explicado acima, `var` é Function Scoped. No exemplo, se você substituir `var` por
`let`, ele vai retornar um ReferenceError, por que o identificador vai passar a ser Block Scoped, simples assim.

> Então nesse caso vou subir a declaração de let pro nível da function e atribuir o valor a ela dentro do escopo de bloco.

```javascript
function foo() {
  let bar;

  {
    bar = "bar";
  }

  console.log(bar); // prints bar
}

foo();
```

Não é mais fácil simplesmente deixar a declaração junto com o assignment usando `var`?

`var` e `let` tem aplicações diferentes, é como dizer que uma banana e maçã são a mesma coisa por que os dois são frutas, é ilógico. É verdade
que pra diversos casos eles funcionam de maneira similar. Se `let` está no nível do escopo da função, então ele funciona como `var`. Mas por que
não usar `var` logo? Esse seria o tipo de declaração correta nesse caso. Usar `let` vai indicar um erro semântico da keyword.

Se você precisa de um escopo de bloco, usa o `let` (ou o `const`), se precisa de um escopo de função, usa o `var`, um não é substituto do outro.
Existem outros casos além do que citei com expressões de try/catch, while, condicionais, etc, mas não vou exemplificar todas elas por que daria um
conteúdo enorme só a respeito disso, o que seria bem cansativo.

Honestamente, antes eu não sabia de nada disso e só não usava `var`, mas nunca critiquei o não uso sem ter embasamento. Quando aprendi, passei a
aplicar nos meus projetos com mais frequência. O problema é que a grande maioria dos desenvolvedores não o usam por que virou
senso comum. A mesma situação se aplica pro uso de arrow functions. Arrow functions passaram a ser o novo "padrão" pra declaração
de functions na linguagem e perderam seu propósito. Arrow functions foram implementadas pra resolver o this lexicamente, não pra substituir qualquer
tipo de function. Eu mesmo só utiliza arrow functions por puro hábito.

Kyle bate bastante nesse martelo e reforça que nós desenvolvedores devemos conhecer as ferramentas que estão ao nosso dispor. Não estou dizendo que 
você deve adotar `var`, mas que deveríamos conhecer mais nossas ferramentas, e eu concordo com ele nesse sentido. O que eu acho errado é espalhar 
desinformação como verdade absoluta. Eu dúvido muito que essas pessoas, se questionadas, saberiam explicar o real motivo de não usar `var`. O Javascript 
é uma linguagem criticada por diversos motivos, que eu concordo, mas casos como esse parecem ser só desconhecimento ou ignorância.

Desenvolvedores que de fato sabem as diferenças e as aplicações possuem argumento relevantes do por que não usar var, nos quais eu acho válido.
O uso de var é mais suscetível a erros inesperados. Com `var`, você pode fazer redeclaração da variável, se alguém decidir utilizar o mesmo label,
a variável vai ser sobrescrita. Já let e const tem Strictly behavior, se você tentar redeclarar a variável ele vai dar erro no processo de compilação
,como mencionei mais acima. Particularmente eu nunca tive esse tipo de problema nos projetos que colaborei, mas é um argumento válido.

Passei a adotar o uso do var com algumas ressalvas, justamente por esses tipos de problemas inesperados. Não sou defensor absoluto do uso delas,
também concordo com algumas desvantagens a respeito do uso da keyword. Mas de maneira geral, é imprescindível que nós, como desenvolvedores, saibamos
a diferença das ferramentas que estão ao nosso dispor. Esse é o ponto central de discussão que o Kyle coloca na mesa.

Ferramentas como Typescript e Eslint também sinalizam erros de reatribução e redeclaração pra const e let em tempo de desenvolvimento, no qual
facilita a prevenção desses erros inesperados.

Antes, eu não sabia de nada disso e só não usava var. Mas nunca critiquei o não uso por que não sabia como funcionava por debaixo dos panos. Depois que
estudei a respeito, passei a usar var em todos os casos semânticos e aplicáveis. O Problema é que 99% dos desenvolvedores javascript não utiliza var.

Uma das implicações em cima de var é que ele é muito sucetível a erros. Por exemplo se você vai declarar uma varíável com mesmo nome, substituindo o
valor anterior. Particularmente isso nunca aconteceu comigo, procuro deixar a minhas funções sempre enxutas a ponto de eu conseguir enxergar ela na
minha tela.

Além disso, reassignment de variáveis não é possível com let e com const. o Kyle defende que reassignment poderia ser bom se a função for muito grande,
pra você não subir tanto no bloco de código.

Pelos desenvolvedores não utilizarem var e let da maneira semântica, é bem dificil mudar a cultura de utilização de let pra usar var.

Mesmo com todos esses pontos, eu ainda sim não adotei o uso do var de maneira geral, ainda tenho alguns pé atrás com o mesmo. Vejo que a aplicação
semântica não é tão benéfica pra evitar alguns erros bobos. Ferramentas como typescript sinalizar let e const de serem re-assigned ou re-declared.

É dificil mudar a cultura de uso de let pra var, assim como é difícil falar para um dev não utilizar arrow functions, pois são functions anonimas que
dificultam no Debug (assunto que quero discutir em outro post).

### Hoisting

Hoisting é um termo bastante comum pra explicar o comportamento de inicialização de Escopos e identificadores pelo Compiler. É um termo que não existe na
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

> A fase de compilação explica um monte de comportamentos considerados "estranhos" no Javascript. Digo estranhos entre aspas porque são comportamentos
> lógicos e previsíveis da linguagem. Vejo uma galera na internet criticando o Javascript por diversos motivos, que são válidos muitas vezes,
> mas também são equivocados em muitos casos. De fato, a linguagem possui diversos problemas que são justificados por motivos históricos, a fim
> de evitar problemas de compatibilidade. Mas não acredito que o funcionamento de Escopo seja uma delas. Hoisting, por sinal, é uma funcionalidade
> bem útil, eu particularmente prefiro deixar minhas functions no final do arquivo pra facilitar a legibilidade. Geralmente eu prefiro ler a execução
> do código primeiro do que o corpo da function. No caso de var, realmente não vejo muito caso pratico em querer acessar uma variável antes da sua
> declaração. De qualquer maneira, acho importante entender primeiro como a linguagem funciona, e utilizar as funcionalidades que fazem sentido pro
> seu caso.

## 2. Runtime

Finalmente, depois da Compilation Phase, quem assume é o Runtime. Como o Javascript é Single-Threaded, o código será executado linha por linha, um
após o outro.

O mesmo tipo de comunicação na Compilation Phase é feita no Runtime, dessa vez sendo o Runtime e Scope Manager. A comunicação é feita
baseada no tipo de referência:

- **Target Reference ou Left-hand Side**: Basicamente, atribuição de um valor a um identificador/propriedade
- **Source Reference ou Right-hand Side**: Leitura de um identificador

```javascript
function bar() {
  foo = "bar"; // left-hand side

  console.log(foo); // right-hand side
}

bar(); // right-hand side
```

Exemplo usando a metáfora:

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
**Scope Manager**: "Não". _Sai do Escopo atual e vai pro Outer Scope (Escopo externo). Nesse caso é o escopo global._

Se caso a referência não fosse encontrada no escopo global (último nível no Call Stack), um ReferenceError seria retornado e um identificador seria
criado automaticamente no escopo global. Se estiver em `strict mode`, o identificador não é criado. Provavelmente você quer usar strict mode em
qualquer caso pra não criar essas variáveis de escopo global automaticamente. Novamente, o strict mode não é adotado por padrão por questões
históricas de compatibilidade da linguagem.

O objeto console também é buscado como uma Source Reference pelo Runtime x Scope Manager, a não que você o sobrescreva. O console, assim como outros
objetos builtin do Javascript, são globais.

##### Sobre Closures

Antes, estava pensando em escrever sobre Closures nesse estudo mesmo. Mas por mais que Closures tenha uma relação com Escopos e Runtime, não vou me
aprofundar nesse tema por agora. Closures por si só é um assunto bastante extenso e vou escrever um estudo só sobre ele.

Javascript não é Javascript sem Closures. Qualquer funcionalidade que você usa hoje em dia que parece "Mágica", provavelmente é por que usa Closures. Particularmente
um dos temas que mais me fascinou com o uso de Closures foi Asynchronicity. Então tem bastante coisa pra comentar a respeito.
