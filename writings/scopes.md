# Scopes

## Introdução

Já faz alguns meses desde que decidi me aprofundar mais em Javascript. Já queria ter feito isso a algum tempo atrás, mas nunca havia
priorizado isso ou acho que simplesmente deixei a procrastinação vencer.

Com o crescimento da IA, estamos colocando mais camadas de abstração no conhecimento de programação do que nunca. Sendo assim, provavelmente
a maioria dos devs não concordaria com a importância de aprender conceitos fundamentais como Scopes (aqui falo especificamente sobre
Javascript, mas vale pra qualquer outra linguagem).

Estava pesquisando sobre certificações oficiais do GitHub e acabei caindo na página do [Student Pack](https://education.github.com/pack), no
qual eu já utilizava alguns recursos como o Copilot e lembrei que, além dele, eles oferecem vários outros benefícios: Créditos na Amazon,
Free Domains, GitHub Actions, etc. Aproveitei pra verificar os conteúdos novamente, e um deles me chamou atenção. Eu já conhecia a
plataforma e já tinha visto alguns conteúdos deles no Youtube, mas não sabia que eles possuíam parceria com o GitHub, falo do
[FrontendMasters](https://frontendmasters.com/).

Sinceramente, eu acho que não existe conteúdo melhor na internet focado em frontend do que o FrontendMasters. É um benefício oferecido pra
qualquer estudante inscrito no GitHub Student Pack, por 6 meses, **GRATUITAMENTE**. Particularmente eu acho que todo estudante ou
desenvolver frontend deveria estudar o conteúdo oferecido por eles. O único porém é que a plataforma é toda em inglês e não possui legendas
em português. De qualquer forma, eu acho que pra esse caso vale muito a pena o esforço de aprender a língua.

Fiz essa tangente pois estudei e aprendi sobre Scopes no Javascript com um dos tutores mais incríveis da plataforma, **Kyle Simpson**, no
workshop de **Deep Foundations**. Pessoalmente, eu acho a didática dele fantástica. E esse estudo vai ser baseado nos ensinamentos dele com
a minha perspectiva e considerações. Além do Deep Foundations, ele possui outros workshops incríveis como **Rethinking Asynchronous
Javascript** e **Functional Programming**.

A ideia dessa introdução foi dar um pouco mais de contexto a respeito desse artigo. Diante disso, vou separar esse estudo em dois artigos:
**Static Scoping** e **Dynamic Scoping**. Não existe dynamic scoping no Javascript, mas vou fazer dessa forma por que a keyword `this` é um
dinamicismo na linguagem e vale um estudo separado.

Provavelmente vou explicar em cima de diversas abstrações como Abstraction Syntax Tree e outros fundamentos de Compilers, no qual não me
aprofundei. Evito me aprofundar demais com temas que não são prioritários no assunto que estou estudando. É como Carl Sagan disse _"If you
wish to make an apple pie from scratch you must first invent the universe"_ ou _"Se quer fazer uma torta de maçã do zero, precisa inventar o
Universo"_. Já cai em muitos problemas desse tipo por que gosto de entender os assuntos em sua profundidade, o problema é que caímos em um
buraco sem fundo e não sabemos quando parar, isso nos desmotiva por que achamos que não somos capazes de entender o assunto em sua maioria.
Basicamente é dar palco pra Síndrome de Impostor.

## Disclaimer

Esse estudo é uma maneira pessoal de consolidar o meu conhecimento aprendido de um determinado assunto. Particularmente, acho que uma das
melhores maneiras de aprender é explicando, pra você mesmo ou pra outras pessoas. Não tenho a intenção de agir como professor e vou cometer
erros. Se houver qualquer equívoco da minha parte, o feedback sempre será bem-vindo.

Sobre o uso de IA , utilizo como uma forma de complementar meu estudo. A IA é uma ótima ferramenta pra checar a veracidade de uma
informação, mesmo que ela possa errar. Se caso ela erre, o fato de corrigi-la já é uma ótima maneira de consolidar o conhecimento. No mais,
eu não utilizo IA pra escrever meus estudos. Acredito que se o objetivo é estudar o assunto, eu mesmo devo escrevê-lo.

#### Tradução

Como sendo um estudo pessoal, também é baseado em opiniões próprias que provavelmente nem todo mundo concorda, o que eu acho absolutamente
saudável. Eu costumava ser o tipo de pessoa que ficava em cima do muro pra evitar conflitos ou indeferenças, mas é impossível agradar todo
mundo. Não querer agradar todo mundo é sinal de maturidade. Mas isso não quer dizer que não devemos ser humildes em admitir nossos erros.

Costumo escrever mantendo algumas terminologias em inglês. Não faço a tradução literal de terminologias que acredito que não caibam uma
tradução ou que não funcionem muito bem em uma passagem. Por exemplo, não soa muito bem o uso da palavra "escopo" a todo momento, então
transito entre "Scope" e "Escopo".

Já faz um tempo que estou tentando escrever alguns estudos sobre o que estou aprendendo. Antes, estava tentando escrever tudo em inglês e
não deu muito certo. Como não é minha língua nativa, é realmente difícil conseguir alcançar o mesmo tipo de expressividade do que com o
português.

Um dos motivos pelo qual estava tentando escrever integralmente em inglês é pra evitar o uso inadequado de terminologias traduzidas, que
particularmente acho que geram um certo desconforto e confusão nos estudos. Prefiro utilizar a terminologia original do que traduzir ao pé
da letra. Talvez chegue um momento em que eu consiga alcançar o mesmo tipo de expressividade em inglês, mas não é prioridade por agora.

## Static Scoping: Como Scopes funcionam?

Javascript não é uma linguagem interpretada, se fosse, como poderia retornar um Erro antes mesmo da execução do programa?

Se você tentar executar essa function simples, um erro será retornado e o `"Hello, World"` não será printado, mesmo antes do erro de
sintaxe.

```javascript
function foo() {
  console.log("Hello, World");

  var bar = ;
}

foo();

// SyntaxError: Unexpected token ';'
```

Porque isso acontece?

Porque o **Compiler** vai jogar o erro antes mesmo do **Runtime** ser alcançado.

O Javascript é uma linguagem **two-pass**. De maneira simplificada, ela possuí duas fases:

1. Compilation Phase
2. Execution Phase (ou Runtime)

## 1. Compilation Phase

A Compilation Phase vai ser responsável por mapear os escopos e seus respectivos identificadores. Isso é possível por que escopos e
identificadores são previsíveis e estáticos. Escopos não podem mover "físicamente" pra outro lugar no código e identificadores uma vez
declarados terão seu espaço alocado na memória, mesmo que não sejam utilizados em **Runtime** e liberados posteriormente pelo **Garbage
Collector**. Basicamente, estamos nos aproveitando do fato de sua previsibilidade pra otimizar o código pro Runtime. Se podemos fazer agora,
aliviamos o peso pro processo de execução.

### Buckets and Marbles

No workshop, o Kyle explica usando uma metáfora com **Buckets and Marbles**, ou baldes e bolinhas de Gude. Buckets são os escopos, Marbles
são os identificadores. Vou utilizar a terminologia em inglês por que acho baldes e bolinhas meio tosco.

Cada escopo é um Bucket, cada identificador é um Marble colocado em seu respectivo Bucket. Escopos dentro de escopos são, metaforicamente
falando, Buckets dentro de Buckets. Nesse exemplo, cada Bucket tem sua cor:

```javascript
// Escopo Global: Bucket vermelho 🟥

// foo: Marble vermelho 🔴
function foo() {
  // Escopo de foo: Bucket azul 🟦

  var bar; // bar: Marble azul 🔵
}
```

1. O Bucket vermelho 🟥 representa o escopo global;
2. A function `foo` é alocada no Bucket vermelho 🟥 como um Marble vermelho 🔴;
3. O Bucket azul 🟦 representa o escopo da function `foo`;
4. `bar` é alocado no Bucket azul 🟦 como um Marble azul 🔵;

O mapeamento dos identificadores e seus escopos é feito pelo processo de comunicação entre o **Scope Manager** e o **Compiler**. No
workshop, o Kyle explica essa comunicação como se fosse uma conversa entre pessoas.

Utilizando o exemplo acima como referência:

**Compiler**: "Ei, Scope Manager. Tenho uma declaração formal de `foo` no Bucket vermelho. Já ouviu falar disso?"

**Scope Manager**: "Nunca ouvi falar, mas aqui está o seu Marble vermelho".

_O Marble vermelho é colocado no Bucket vermelho_.

**Compiler**: "Ei, Scope Manager. `foo` na verdade é uma function, vamos precisar de um Bucket pra ele".

_O Bucket azul é criado e alocado dentro do Bucket vermelho._

Você pode pensar nisso como se fossem Matrioskas ou Bonecas Russas. Aquelas bonecas que entram uma dentro das outras. Também você pode fazer
um paralelo com o sistema de boxing do CSS e do DOM. Uma div dentro de um div, etc. Não deve ser coincidência porque provavelmente esses
exemplos utilizam a Árvores como estrutura de dados.

#### Duplicação em Scopes diferentes

Em casos de identificadores com o mesmo label, mas em escopos diferentes:

```javascript
// Bucket vermelho
var foo; // Marble vermelho

function bar() {
  // Bucket azul
  var foo; // Marble azul
}
```

Por mais que possuam o mesmo label , estamos falando de escopos diferentes. Um identificador de mesmo label `foo` é alocado como um Marble
azul dentro do Bucket azul. Porém, o `foo` do Bucket vermelho não pode mais ser referenciado no Bucket azul. Isso é conhecido como
**Shadowing**.

#### Duplicação no mesmo Scope

Em de identificadores com o mesmo label, no mesmo escopo:

```javascript
// Bucket vermelho

var foo; // Marble vermelho

var foo; // Marble vermelho?
```

Os dois são lidos. Mas só um permanece, baseado no seu tipo.

Na segunda declaração de `foo`:

**Compiler**: "Ei, Scope Manager. Tenho uma declaração formal de `foo` no Bucket vermelho. Já ouviu falar disso?"

**Scope Manager**: "Sim".

_O Compilador segue e nada acontece._

Casos com function declarations ou declarações com `let` e `const` funcionam de maneira diferente, mas a ideia é a mesma:

- **Function declarations**: a function será sobrescrita.
- **let, const**: não podem ser redeclarados por que tem Strictly Behavior e um `SyntaxError` é lançado. Vou explicar mais sobre
  `strict mode` mais pra frente.

#### Function Declarations x Function Expressions

functions declarations e function expressions são mapeados de maneiras distintas pelo Compiler.

```javascript
// Bucket vermelho

function foo() {} // Marble vermelho

var bar = function apple() {
  // Marble azul
  // Bucket azul
};

bar();
```

A primeira é uma function declaration, o método tradicional de escrever functions. A outra é uma function expression. Uma function é uma
function expression se a keyword `function` não é a primeira expressão da linha. Não vou me aprofundar muito no tema, porque quero escrever
um estudo separado pra functions em geral.

O que importa no nosso caso é que qualquer function expression tem seu Marble alocado no seu próprio Bucket, e só pode ser chamado dentro
dele mesmo. Ele também é read-only.

No exemplo acima, `bar` guarda uma referência de `apple`. Então obviamente chamar `bar` no escopo global é válido.

```javascript
// Bucket vermelho
(function foo() {
  // Marble azul
  // Bucket azul
});

foo(); // ReferenceError
```

Porém, em um caso como esse, `foo` é uma function expression e não vai ser acessível ao Bucket vermelho, pois seu Marble pertence ao seu
próprio Bucket. Esse pattern é utilizado pra criar IIFEs (Immediate Invoked Function Expression), que estão presentes em qualquer lib de
bundling, como Webpack ou Vite. Como falei acima, vou deixar pra falar mais sobre IIFEs em um post dedicado a functions.

---

### Scope Units

Dependendo do tipo de declaração, o identificador se atrela a diferentes unidades de escopo.

#### Block Scope

Só é acessível dentro dos brackets `{ }`. Variáveis declaradas com `let` e `const` são Block Scoped.

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

Particularmente, eu nunca usei esse tipo de estrutura com brackets soltos, mas achei interessante a exemplificação com eles. Qualquer acesso
a bar fora do escopo de bloco retorna um `ReferenceError`.

Block Scoping é útil se você precisa de variáveis temporárias que não precisam fazer parte do escopo inteiro da function. Condicionais,
expressões de try/catch e while são um exemplo disso. Block Scoping também é uma alternativa ao uso de IIFEs.

#### Function Scope

Acessível em todo o escopo da function. Variáveis declaradas com `var` são Function Scoped.

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

#### Hybrid Scope

Functions possuem Hybrid Scope, funcionam tanto em Block Scope quanto em Function Scope. São assim por questões históricas de
compatibilidade.

Exemplo:

```javascript
function foo() {
  // bar();

  {
    // ou bar();

    function bar() {
      console.log("Hello, world");
    }
  }
}

foo();
```

#### let x var

O Kyle faz um paratênses no workshop explicando que `let` não é uma substituição de `var` na linguagem, considerado bastante polêmico, no
qual achei bem interessante. O que você mais vê em posts no Reddit de Javascript é essa discussão sobre qual keyword usar, o que pode pode
parecer inútil, mas o assunto vai além disso.

No meu dia-a-dia, não usava `var` não por que não concordava com o uso, mas simplesmente por que tinha adotado `let` e `const` como hábito.
Já vi gente relevante na internet afirmando que `var` é um anti-pattern e não deveria ser usado sem nenhum embasamento a respeito dessa
afirmação. No geral, dizem que `var` ainda existe por questões históricas de compatibilidade e que era utilizado em aplicações que hoje são
consideradas legado.

De maneira nenhuma `let` pode ser considerado uma substituição de `var`. Se você resolver dar um search and replace na sua aplicação ou em
qualquer projeto legado, a chance de seu programa quebrar é bem alta. Como explicado acima, `var` é Function Scoped. No exemplo, se você
substituir `var` por `let`, ele vai retornar um ReferenceError, por que a variável vai passar a ser Block Scoped, simples assim.

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

`var` e `let` tem aplicações diferentes. É verdade que pra diversos casos eles funcionam de maneira similar. Se `let` está no nível do
escopo da função, então ele funciona como `var`. Mas por que não usar `var` logo? Usar `let` vai indicar um erro semântico da keyword. É
como usar uma faca pra parafusar ao invés de usar uma chave Phillips, vai funcionar, mas não é a ferramenta correta.

Se você precisa de um escopo de bloco, usa o `let` (ou o `const`), se precisa de um escopo de função, usa o `var`, um não é substituto do
outro.

Honestamente, antes eu não sabia de nada disso e só não usava `var`, mas nunca critiquei o não uso sem ter embasamento. Quando aprendi,
passei a aplicar nos meus projetos com mais frequência. O problema é que a grande maioria dos desenvolvedores não o usam por que virou senso
comum. A mesma situação se aplica pro uso de arrow functions. Arrow functions passaram a ser o novo "padrão" pra declaração de functions na
linguagem e perderam seu propósito. Elas foram implementadas pra resolver o `this` lexicamente, não pra substituir qualquer tipo de
function. Eu mesmo utilizava arrow functions por puro hábito.

Kyle bate bastante nesse martelo e reforça que nós desenvolvedores devemos conhecer as ferramentas que estão ao nosso dispor. Não estou
dizendo que você deve adotar `var`, mas sim que deveríamos entender antes de abominar completamente seu uso, e eu concordo com ele nesse
sentido. O que eu não concordo é espalhar desinformação como verdade absoluta. Eu dúvido muito que essas pessoas, se questionadas, saberiam
explicar o real motivo de não usar `var`. O Javascript de fato tem diversos problemas, assim como qualquer outra linguagem muito utilizada,
mas casos como esse parecem ser só desconhecimento ou ignorância.

Existem argumentos relevantes do porque não usar `var`. O uso de `var` é mais suscetível a erros inesperados. Com `var`, você pode fazer
redeclaração da variável, se alguém decidir utilizar o mesmo label, a variável vai ser sobrescrita. Entretando, redeclarar uma varíavel no
mesmo escopo pode ser necessário pro seu caso. Já let e const nem compilam se você tentar redeclarar a variável.

Se você tentar acessar um `var` antes da sua declaração, por causa do **Hoisting** (próximo tópico), ele vai retornar `undefined`. `let` e
`const` vão retornar o **Temporal Dead Zone** Error (também faz parte do próximo tópico).

Além disso, ferramentas como _Typescript_ e _Eslint_ sinalizam esses erros nas IDEs, o que também facilita pra prevenir esses comportamentos
indesejados.

Mesmo assim, ainda tenho ressalvas com o uso de `var`, por que frameworks populares como o próprio _React_ impõem seus próprios padrões, e
usar `var` acaba confundindo ainda mais outros desenvolvedores. O problema também é relacionado ao tipo de cultura que criamos em volta da
linguagem.

Enfim, isso aqui já ficou gigantesco, mas achei que valeria a pena me estender nesse assunto.

---

### Hoisting

Hoisting é um termo bastante comum que é usado pra resumir o que expliquei previamente. É um termo que não existe na especificação do
Javascript.

`var`, `let`, `const` e functions são Hoisteados de maneiras diferentes. Há um equívoco comum em achar que keywords como `const` e `let `
não são "Hoisteados". Pra facilitar, exemplos de caso de Hoisting são mais relacionados ao acesso de identificadores antes da sua
declaração.

- **Function Declarations**: são inicializadas.

```javascript
console.log(func()); // Hello, World

function func() {
  return "Hello, World";
}
```

- **var**: inicializados com o valor `undefined`.

```javascript
console.log(foo); // undefined

var foo = "bar";
```

- **const, let**: não são inicializados e ficam na Temporal Dead Zone (TDZ).

```javascript
console.log(foo);

const foo = "bar";

// ReferenceError: Cannot access 'foo' before initialization
```

Qualquer acesso a `let` ou `const` antes de sua declaração te retorna um `ReferenceError`.

#### Temporal Dead Zone

O TDZ veio com a implementação das keywords `const` e `let`, no Ecma Script 2015 (ES5).

O que explica o fato de variáveis `const` permanecerem na TDZ é que não faria sentido lermos uma constante com o valor de `undefined` antes
de sua declaração, teoricamente ela teria seu valor re-atribuído em Runtime, o que seria ilógico pra uma constante. Já que aplicaram a regra
pra `const`, decidiram aplicar pra `let` também.

## 2. Runtime

Finalmente, depois da etapa de Compilação, quem assume é o Runtime. Como o Javascript é Single-Threaded, o código será executado linha por
linha, um após o outro.

O mesmo tipo de comunicação na feita na etapa de Compilação é feita no Runtime, dessa vez sendo o Runtime e Scope Manager. A comunicação é
feita baseada no tipo de referência:

#### Target Reference (Left-hand side)

Basicamente, atribuição de um valor a um identificador/propriedade

```javascript
function bar() {
  foo = "bar"; // left-hand side

  console.log(foo); // right-hand side
}

bar(); // right-hand side
```

#### Source Reference (Right-hand side)

Leitura de um identificador

```javascript
function bar() {
  foo = "bar"; // left-hand side

  console.log(foo); // right-hand side
}

bar(); // right-hand side
```

Exemplo usando a metáfora:

**Runtime**: "Ei, Scope Manager. Tenho `foo` em uma posição de Target Reference. Você tem a referência nesse escopo?"

**Scope Manager**: "Sim, aqui está o seu Marble".

_A string `bar` é atribuída a `foo`_

---

**Runtime**: "Ei, Scope Manager. Tenho `foo` em uma posição de Source Reference. Você tem a referência nesse escopo?"

**Scope Manager**: "Sim, aqui está o seu Marble".

_O `console.log` é chamado com o `foo` como argumento._

---

**Runtime**: "Ei, Scope Manager. Tenho `foo` em uma posição de Source Reference. Você tem a referência nesse escopo?"

**Scope Manager**: "Sim, aqui está o seu Marble".

_A function `bar` é chamada._

### Lexical Behavior

Agora entender o comportamento Léxico do Javascript fica mais fácil.

```javascript
var foo = "Hello, World";

function bar() {
  console.log(foo);
}

bar();
```

Mesma comunicação:

**Runtime**: "Ei, Scope Manager. Tenho foo em uma posição de Source Reference. Você tem a referência nesse escopo?"

**Scope Manager**:"Não".

_Sai do Escopo atual e vai pro Outer Scope (escopo externo). Nesse caso é o escopo global._

Se caso a referência do identificador não fosse encontrada em nenhum escopo acessível, até o escopo global, um `ReferenceError` seria
retornado e um Marble seria criado automaticamente no escopo global. Se estiver em `strict mode`, o Marble não é criado.

##### strict mode

O strict mode aplica algumas regras pra evitar comportamentos inesperados no Javacript. Nesse caso o que importa é que provavelmente você
vai querer usar strict mode pra não criar essas variáveis de escopo global automaticamente.

##### Auto Globals

Objetos como console, document são globais e também são buscados como uma referência pela comunicação do Runtime x Scope Manager, a não que
você o sobrescreva. Especificamente, esses objetos fazem parte das Web APIs.

## Conclusão

Scopes é um assunto bem extenso e tentei focar mais nos pontos principais do assunto. 

#### Sobre Closures

Estava pensando em escrever sobre Closures nesse estudo pra fazer uma relação entre comportamento léxico e Closures. Mas Closures por si só
e um assunto bastante extenso e vou escrever um estudo só sobre isso.

No geral, Javascript não é Javascript sem Closures. Qualquer funcionalidade que você usa hoje em dia que parece "Mágica", provavelmente é
por que usa Closures. Particularmente um dos temas que mais me fascinou sobre Closures foi seu uso com Asynchronicity, tema também abordado
no workshop de **Rethinking Asynchronous Javascript** do Kyle Simpson, então tem bastante coisa pra comentar a respeito.

#### Dynamic Scoping

Esse estudo já ficou enorme só explicando sobre Scopes em geral, então como mencionei no início do artigo, o próximo estudo é sobre "escopos
dinâmicos" com o `this` no Javascript.
