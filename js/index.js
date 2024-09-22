//objeto - (propriedade: valor) - mapeamento da rota e pág.
const routes = {
  "/": "/pages/home.html",
  "/about": "/pages/about.html",
  "/contact": "/pages/contact.html",
  404: "/pages/404.html",
};
//onclick executa o route
function route(event) {
  //para não fazer o evento padrão - recarregar a página
  event = event || window.event;
  event.preventDefault();
  //coloque o estado no histórico que está mudando a pág.(href)
  window.history.pushState({}, "", event.target.href);

  handle();
}
//pegando pathname e transformando em uma constante - para manipular
function handle() {
  const { pathname } = window.location;
  //pegando a rota, se não tiver mostra a rota 404
  const route = routes[pathname] || routes[404];
  //fetch - vai gerar uma promessa, tira da leitura linha a linha
  fetch(route)
    .then((data) => data.text()) //retorna os dados em texto
    .then((html) => {
      document.querySelector("#app").innerHTML = html;
    }); //vai adicionar no app o html
}

handle();

window.onpopstate = () => handle();
window.route = () => route();
