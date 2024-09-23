//class - forma. para usar function tem que usar o this
export class Router {
  //objeto vazio
  routes = {};
  //objeto - (propriedade: valor) - mapeamento da rota e pág.
  add(routeName, page) {
    this.routes[routeName] = page;
  }

  //onclick executa o route - na class a function não tem a descrição
  route(event) {
    //para não fazer o evento padrão - recarregar a página
    event = event || window.event;
    event.preventDefault();
    //coloque o estado no histórico que está mudando a pág.(href)
    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  //pegando pathname e transformando em uma constante - para manipular
  handle() {
    const { pathname } = window.location;
    //pegando a rota, se não tiver mostra a rota 404
    const route = this.routes[pathname] || this.routes[404];
    //fetch - vai gerar uma promessa, tira da leitura linha a linha
    fetch(route)
      .then((data) => data.text()) //retorna os dados em texto
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      }); //vai adicionar no app o html
  }
}

//objeto - usa a palavra new e o nome da class
//const router = new Router();
