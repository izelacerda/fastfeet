<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="logo.png" width="300px" />
</h1>


<h2 align="center">
  FastFeet, Trabalho Final Bootcamp GoStack 
</h2>

<h3 align="start"><strong>1) Instalação BackEnd/FrontEnd/Mobile FastFeet</strong></h3>

<h4> Após fazer o Download da aplicação FastFeet você terá 3 pastas:</h4>
<ul>
  <li>backfastfeet->   Projeto do BackEnd</li>
  <li>webfastfeet->    Projeto do FrontEnd Web</li>
  <li>mobilefastfeet-> Projeto Mobile</li>
</ul>

<h4 align="start"><strong>1.1) Instalação de Containers Docker</strong></h4>

<ul>
  <li>Você deve fazer a instalação do docker conforme este  <a href="https://docs.docker.com/">link</a></li>
  <li>Deverá instalar a imagem do Banco de Dados PostGreSql</li>
  <p>
  docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
   </p>
  <li>Deverá instalar a imagem do Banco Redis</li>
  <p>
  docker run --name redis -p 6379:6379  -d -t redis:alpine
  </p>
   <li>Após a instalação poderá verificar as imagens postgresql/Redis instalados através do comando:</li>
  <p>
  docker ps -a
  </p>
   <li>Deve agora iniciar os containers através do comando que segue abaixo: </li>
  <p>docker start database redis</p>
</ul>
<h4 align="start"><strong>1.2) Passos para instalação do BackEnd</strong></h4>

<ul>
  <li>Acesse pelo terminal a pasta <b>backfastfeet</b> na sua estação</li>
  <li>Execute o comando para Instalação das dependencias do projeto:  <b>yarn install</b>.</li>
  <p>Observação: Você deve ter o yarn instalado em sua estação como pré-requisito, caso contrário poderá utilizar o npm.<p>
  <li>Você deve incluir um banco de dados no ambiente do postgresql. utilizei o aplicativo postbird para esta tarefa conforme o <a href="https://www.electronjs.org/apps/postbird">link.</a></li>
  <p>Coloquei o nome do banco 'fastfeet', porem você pode colocar o nome que desejar.</p>
  <li>No projeto do backend você deve incluir o arquivo .env para setar nome da base de dados e outras configuracoes. Existe um arquivo exemplo <b>.env.example</b>, você deve copiar este arquivo com o nome .env e configurar com os dados corretos.</li>
  </p>
  <li>Deve-se então executar as migrations para inclusão das tabelas na base de dados. No diretorio do backend executar no terminal o comando: <b>yarn sequelize db:migrate</b>.</li>
  <li>Execute agora o comando para incluir automaticamente o usuário administador na tela de usuários. <b>yarn sequelize db:seed:all</b>.</li>
  <li>Agora deve-se iniciar 2 serviços, o primero serviço do backend, através do comando <b>yarn dev</b> e em uma nova sessão do terminal o comand <b>yarn queue</b>, ou seja, teremos 2 terminais um executando o backend e outro o serviço de filas.</li>
  <p>Pronto ja estamos com o backend rodando para servir nossas aplicações frontend e mobile</b>.</p>
</ul>

<h4 align="start"><strong>1.3) Passos para instalação do FrontEnd</strong></h4>
<ul>
  <li>Acesse em outro terminal a pasta <b>webfastfeet</b>.</li>
  <li>Copie o arquivo de configurações .env da pasta backfastfeet para a pasta webfastfeet
  </li>
  <li>No sub-diretório \src\services\ existe o arquivo api.js onde você deve configurar o 'endereço/porta' que o backend esta rodando quando for ambiente de desenvolvimento, pois se for produção ele irá buscar as configurações do arquivo .env.</li>
  <li>Execute o comando <b>'yarn start'</b> para iniciar a aplicação frontend.</li>
  <li>A aplicação irá mostrar a tela de login e você deve informar o usuário: 'admin@fastfeet.com'<b></b> com a senha:'123456'<b></b> para acesso ao sistema.</li>
  <p>Pronto ja estamos com o frontend rodando.</p>
</ul>
<h4 align="start"><strong>1.4) Passos para instalação do aplicativo mobile</strong></h4>
<ul>
  <li>Acesse em outro terminal a pasta <b>mobilefastfeet</b>.</li>
  <li>No sub-diretório \src\services\ existe o arquivo api.js onde você deve configurar o 'endereço/porta' que o backend esta rodando, assim a aplicação mobile poderá se comunicar o backend.</li>
  <li>execute o comando <b>'react-native run-android'</b> para iniciar a aplicação no emulador do android ou execute o comando <b>'react-native run-ios'</b> para o emulador do ios.</li>
  <p>Os emuladores android e ios devem ser previamente instalados.</p>
</ul>