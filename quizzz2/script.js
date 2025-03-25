document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todas as seções
  const secoes = document.querySelectorAll('main section');
  let secaoAtual = 0;

  // Função para validar respostas na seção atual
  function validarSecao(secao) {
    // Obtém todos os inputs de radio da seção
    const radios = secao.querySelectorAll('input[type="radio"]');
    // Cria um objeto para armazenar nomes dos grupos de perguntas
    const grupos = {};
    radios.forEach(radio => grupos[radio.name] = false);
    // Marca true se uma pergunta tiver sido respondida
    radios.forEach(radio => {
      if (radio.checked) grupos[radio.name] = true;
    });
    // Se algum grupo não foi respondido, retorna false
    for (let nome in grupos) {
      if (!grupos[nome]) return false;
    }
    return true;
  }

  // Função para exibir a próxima seção
  function proximaSecao() {
    const secaoCorrente = secoes[secaoAtual];
    if (!validarSecao(secaoCorrente)) {
      alert('Por favor, responda todas as perguntas desta seção!');
      return;
    }
    // Esconde a seção atual
    secaoCorrente.style.display = 'none';
    secaoAtual++;
    if (secaoAtual < secoes.length) {
      // Exibe a próxima seção
      secoes[secaoAtual].style.display = 'block';
    }
  }

  // Atribui eventos aos botões "Próximo"
  const botoesProximo = document.querySelectorAll('.next-btn');
  botoesProximo.forEach(botao => {
    botao.addEventListener('click', proximaSecao);
  });

  // Lógica para o botão final que calcula o resultado
  const botaoResultado = document.getElementById('result-btn');
  if (botaoResultado) {
    botaoResultado.addEventListener('click', () => {
      // Valida a última seção
      const ultimaSecao = secoes[secoes.length - 1];
      if (!validarSecao(ultimaSecao)) {
        alert('Por favor, responda todas as perguntas desta seção!');
        return;
      }
      // Coleta todas as respostas de todas as seções
      const respostas = document.querySelectorAll('input[type="radio"]:checked');
      let countA = 0;
      let countB = 0;
      respostas.forEach(resposta => {
        if (resposta.value === 'A') countA++;
        else if (resposta.value === 'B') countB++;
      });
      // Define a mensagem de acordo com a maioria
      let mensagem = '';
      if (countA > countB) {
        mensagem = 'Você prefere receitas práticas e rápidas!';
      } else if (countB > countA) {
        mensagem = 'Você adora explorar novos sabores e experiências!';
      } else {
        mensagem = 'Você tem um perfil equilibrado, misturando praticidade com criatividade!';
      }
      alert(mensagem);
    });
  }
});
