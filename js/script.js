const passwordText = document.querySelector('#passwordText');
const btn = document.querySelector('#btn');
const copyText = document.querySelector('.copy');
const refresh = document.querySelector('.refresh');
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");
const textUppEl = document.querySelector('#textUpp');
const numberEl = document.querySelector('#number');
const symbolEl = document.querySelector('#symbol');
const valueScale = document.querySelector('#valueScale');
let passwordLength = 16;
function generationPassword () {
    // Separando os tipos de caractere que a senha pode ter em 4 conjuntos
    // 1 Só letras minusculas;
    // 2 Só letras maisculas;
    // 3 Só numeros;
    // 4 Só simbolos;
    let chars = "abcdefghjklmnopqrstuvwxyz";
    const upperCaseChar = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const numberChar = "123456789";
    const symbolChar = "!@&()[]?%*";

    // Atribuindo os todos os valores em uma só variavel
    //Criando uma estrutura de decisão para quando o usuário selecionar os tipos de caracteres;
    const textUpp = document.querySelector('#textUpp');
    const number = document.querySelector('#number');
    const symbol = document.querySelector('#symbol');

    if (textUpp.checked) {
        chars += upperCaseChar;
    } 
    if(number.checked) {
        chars += numberChar;
    } 
    if(symbol.checked){
        chars += symbolChar;
    }
    let password = "";
    
    for(let i = 0; i < passwordLength; i++){
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    console.log(password);


    passwordText.value = password;
    calculateQuality();
    calculateFontSize();
}


// calculando o valor da barra de segurança da senha
function calculateQuality(){
    // Vamos calcular os valores somando com um peso ou seja segue o exemplo
    // T*P1 + M*P2 + N*P3 + S*P4 = 100 


    // Vamos setar para que o maximo da barra se não for somado a nenhum peso seja de 25%
    const securityPassword = Math.round(
        (passwordLength / 64) * 25  + 
        (textUppEl.checked  ? 15 : 0) +
        (numberEl.checked ? 25 : 0) + 
        (symbolEl.checked ? 35 : 0)
    );

    // Adicionando as classes de acordo com o peso dentro da barra
    if(securityPassword > 69) {
        securityIndicatorBarEl.classList.add('safe');
        securityIndicatorBarEl.classList.remove('critical');
        securityIndicatorBarEl.classList.remove('warning');
    }
    else if (securityPassword > 50) {
        securityIndicatorBarEl.classList.add('warning');
        securityIndicatorBarEl.classList.remove('critical');
        securityIndicatorBarEl.classList.remove('safe');
    }
    else{
        securityIndicatorBarEl.classList.add('critical');
        securityIndicatorBarEl.classList.remove('warning');
        securityIndicatorBarEl.classList.remove('safe');
    }

    // Preenchendo a barra por completo so um toquinho a mais 
    if(securityPassword >= 100){
        securityIndicatorBarEl.classList.add('completed');
    }
    else{
        securityIndicatorBarEl.classList.remove('completed');
    }
    securityIndicatorBarEl.classList.add('critical');
    securityIndicatorBarEl.style.width = `${securityPassword}%`;
    
}


// Diminuindo o tamanho da fonte de acordo com a variação da barra,
function calculateFontSize() {
    if (passwordLength> 45) {
      passwordText.classList.remove("sm");
      passwordText.classList.remove("xs");
      passwordText.classList.add("xxs");
    } else if (passwordLength > 32) {
      passwordText.classList.remove("sm");
      passwordText.classList.add("xs");
      passwordText.classList.remove("xxs");
    } else if (passwordLength > 22) {
      passwordText.classList.add("sm");
      passwordText.classList.remove("xs");
      passwordText.classList.remove("xxs");
    } else {
      passwordText.classList.remove("sm");
      passwordText.classList.remove("xs");
      passwordText.classList.remove("xxs");
    }
}

const passwordLengthEl = document.querySelector('#scalePassword');
passwordLengthEl.addEventListener('input', () => {
    passwordLength = passwordLengthEl.value;
    valueScale.innerHTML= ` ${passwordLength}`;
    generationPassword();
})

// incluindo a função de click quando selecionamos o checkbox
textUpp.addEventListener('click', generationPassword);
number.addEventListener('click', generationPassword);
symbol.addEventListener('click', generationPassword);

function copy() {
    navigator.clipboard.writeText(passwordText.value);
    alert('texto compiado!');
}

btn.addEventListener('click', copy);
copyText.addEventListener('click', copy);
generationPassword();

// adicionando o evento de refresh no código
refresh.addEventListener('click', () => {
    generationPassword();
})




