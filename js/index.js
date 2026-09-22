// Dados das instituições cadastradas na planilha instituições.ods
// Conteúdo gerado a partir da planilha mais recente (colunas do formulário de cadastro).
// lat/lng representam a localização (centróide) do município informado no endereço da sede.

const localizacoes = [
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Associação Amigas do bem Curitiba",
    "fundacao": "2023-05-02",
    "email": "amigasdobemcuritiba@gmail.com",
    "endereco": "Rua Manoel Ricardo de Oliveira 32 bairro novo A sítio cercado.",
    "telefone": "41998600978 ou 41997335455",
    "site": "Amigasdobemcuritiba.org",
    "redes_sociais": "https://www.instagram.com/amigasdobemcuritiba/",
    "tipo_entidade": "Associação",
    "areas_atuacao": "Migração e refúgio",
    "publico_principal": "Famílias de migrantes venezolanos e cubanos.",
    "nacionalidades": "Venezuelanos",
    "forma_acesso": "Presencial",
    "horarios": "De segunda feira a sexta-feira das 9:00 as 17:00",
    "categorias": [
      "Migração e Refúgio"
    ],
    "nacionalidades_lista": [
      "Venezuelanos"
    ]
  },
  {
    "city": "Toledo",
    "lat": -24.7246,
    "lng": -53.7413,
    "org": "Cáritas Diocesana de Toledo",
    "fundacao": "1968-10-25",
    "email": "caritasdiocesanadetoledo@gmail.com",
    "endereco": "Rua General Rondon, 2006, Jardim La Salle, Toledo-PR, CEP 85902-090",
    "telefone": "(45) 99830-0493",
    "site": "",
    "redes_sociais": "https://www.instagram.com/caritastoledopr/",
    "tipo_entidade": "OSC | ONG, Igreja",
    "areas_atuacao": "Migração e refúgio",
    "publico_principal": "Migrantes",
    "nacionalidades": "Qualquer nacionalidade",
    "forma_acesso": "Agendamento",
    "horarios": "Segunda-feira a Sexta-feira, das 08h às 12h e das 13h30 às 17h",
    "categorias": [
      "Migração e Refúgio"
    ],
    "nacionalidades_lista": [
      "Qualquer Nacionalidade"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Instituto Semear",
    "fundacao": "2025-09-02",
    "email": "jefersonleal@msn.com",
    "endereco": "RUA ANTÔNIO REBELATTO 1455 - SOB 01",
    "telefone": "53999660740",
    "site": "https://institutosemearsocial.org.br/",
    "redes_sociais": "https://www.instagram.com/institutosemear.socialbr?igsh=MTU0eXJycnZ6NGFybw==",
    "tipo_entidade": "Instituto",
    "areas_atuacao": "Migração e refúgio",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social e econômica acolhidos pelo Instituto Semear.",
    "nacionalidades": "Venezuelanos",
    "forma_acesso": "Presencial",
    "horarios": "De segunda ao domingo das 9hs até 21hs.",
    "categorias": [
      "Migração e Refúgio"
    ],
    "nacionalidades_lista": [
      "Venezuelanos"
    ]
  },
  {
    "city": "Colombo",
    "lat": -25.2925,
    "lng": -49.2263,
    "org": "Veneza Unidos con Alegría",
    "fundacao": "2024-09-20",
    "email": "graphictopdigitalpr@gmail.com",
    "endereco": "Rua Cerro Azul 397 Paloma Colombo",
    "telefone": "41988756544",
    "site": "",
    "redes_sociais": "https://www.instagram.com/venezaunidosconalegria/",
    "tipo_entidade": "Associação",
    "areas_atuacao": "Empreendedorismo",
    "publico_principal": "Público Migrante",
    "nacionalidades": "Venezuelanos",
    "forma_acesso": "Agendamento",
    "horarios": "Horario de oficina",
    "categorias": [
      "Empreendedorismo"
    ],
    "nacionalidades_lista": [
      "Venezuelanos"
    ]
  },
  {
    "city": "Almirante Tamandaré",
    "lat": -25.3247,
    "lng": -49.31,
    "org": "Instituto Boneca Feliz",
    "fundacao": "2026-02-14",
    "email": "instituto.boneca.feliz@gmail.com",
    "endereco": "Av. Rafaela, 23 - Restinga Seca - Almirante Tamandaré/PR CEP: 83512-030",
    "telefone": "(31) 99957-9052",
    "site": "",
    "redes_sociais": "Não Possui",
    "tipo_entidade": "OSC | ONG",
    "areas_atuacao": "Encaminhamento a Organizações e Setores de Assistência a Migrantes",
    "publico_principal": "Pessoas em geral",
    "nacionalidades": "Haitianos, Venezuelanos, Cubanos",
    "forma_acesso": "Agendamento",
    "horarios": "Segunda a sexta-feira",
    "categorias": [
      "Migração e Refúgio"
    ],
    "nacionalidades_lista": [
      "Haitianos",
      "Venezuelanos",
      "Cubanos"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Missão Gênesis",
    "fundacao": "2021-09-14",
    "email": "missaogenesisoficial@gmail.com",
    "endereco": "Rua São Francisco 126",
    "telefone": "+55 (41) 99822-2243",
    "site": "",
    "redes_sociais": "https://www.instagram.com/missaogenesisoficial/",
    "tipo_entidade": "Igreja",
    "areas_atuacao": "Desenvolvimento de projetos sociais",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social",
    "nacionalidades": "Brasileiros, Venezuelanos, Haitianos, Peruanos e Argentinos.",
    "forma_acesso": "Presencial",
    "horarios": "Segunda a Sábado 08:00 às 18:00, Domingo das 09h a 13h",
    "categorias": [
      "Desenvolvimento de Projetos Sociais"
    ],
    "nacionalidades_lista": [
      "Brasileiros",
      "Venezuelanos",
      "Haitianos",
      "Peruanos",
      "Argentinos"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Recanto Esperança",
    "fundacao": "2004-12-09",
    "email": "contato@recantoesperanca.org.br",
    "endereco": "Rua Laércio Nakashima, 110 Uberaba Curitiba PR CEP81550572",
    "telefone": "41 98518-8700",
    "site": "www.recantoesperanca.org.br",
    "redes_sociais": "https://www.instagram.com/esperanca.recanto/ | https://pt-br.facebook.com/recantoesperancaOng | https://br.linkedin.com/company/recantoesperanca | https://youtube.com/@recantoesperanca",
    "tipo_entidade": "OSC | ONG, Associação",
    "areas_atuacao": "Assistência Social",
    "publico_principal": "crianças e adolescentes entre 6 e 17 anos",
    "nacionalidades": "Venezuelanos",
    "forma_acesso": "Lista de espera",
    "horarios": "Segunda a sexta das 8h30 às 11h e das 13h30 às 16h",
    "categorias": [
      "Assistência Social"
    ],
    "nacionalidades_lista": [
      "Venezuelanos"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Associação de Capoeira Navalha de Prata Megê",
    "fundacao": "2025-11-26",
    "email": "gruponavalhadeprata@gmail.com",
    "endereco": "rua da pedreira, 614",
    "telefone": "41985086381",
    "site": "",
    "redes_sociais": "https://www.instagram.com/navalhadeprata1?igsh=bGZ4MW5iN3pjenRo | https://youtube.com/@navalhadepratadino5728?si=NFFPwuQuRSOloWWy | https://www.facebook.com/share/1H4mjuKJwz/ | https://www.facebook.com/share/185j2KjBbn/ | https://www.tiktok.com/@dino131304?_r=1&_t=ZS-94WKuIhmAj9",
    "tipo_entidade": "Associação",
    "areas_atuacao": "Esporte, Cultura, Lazer",
    "publico_principal": "crianças 06 anos a 13 anos",
    "nacionalidades": "Haitianos",
    "forma_acesso": "Presencial",
    "horarios": "a partir das 10h",
    "categorias": [
      "Esporte",
      "Cultura",
      "Lazer"
    ],
    "nacionalidades_lista": [
      "Haitianos"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Associação Beneficente Projeto Nova Terra",
    "fundacao": "2010-02-25",
    "email": "secretariaongnovaterra@hotmail.com",
    "endereco": "Rua Enemézio do Rosário Junior, 350Ponto de referência: ONG NOVA TERRA",
    "telefone": "(41)98455-6490 Adriano Ribas Presidente",
    "site": "www.ongnovaterra.com",
    "redes_sociais": "https://www.instagram.com/novaterra_projeto/",
    "tipo_entidade": "OSC | ONG",
    "areas_atuacao": "Assistência Social",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social",
    "nacionalidades": "Brasileiros e Venezuelanos",
    "forma_acesso": "Presencial",
    "horarios": "Segunda a Sexta 8:00 às 18:00",
    "categorias": [
      "Assistência Social"
    ],
    "nacionalidades_lista": [
      "Brasileiros",
      "Venezuelanos"
    ]
  },
  {
    "city": "Fazenda Rio Grande",
    "lat": -25.6624,
    "lng": -49.3073,
    "org": "INSTITUTO CULTURAL E FOLCLORICO ALMA TRICOLOR",
    "fundacao": "2026-07-17",
    "email": "almatricolorcwb@gmail.com",
    "endereco": "Rua Bigua n° 1337- CEP: 83824-466. Bairro Gralha Azul- Fazenda Rio Grande, PR",
    "telefone": "41-98757 1082",
    "site": "",
    "redes_sociais": "https://www.instagram.com/almatricolorcwb/",
    "tipo_entidade": "Instituto",
    "areas_atuacao": "Migração e refúgio, Assistência social, Direitos humanos, Educação e Empreendedorismo",
    "publico_principal": "Crianças e adolescentes migrantes",
    "nacionalidades": "Venezuelanos",
    "forma_acesso": "Presencial",
    "horarios": "Sábados 14h a 18h",
    "categorias": [
      "Migração e Refúgio",
      "Assistência Social",
      "Direitos Humanos",
      "Educação e Empreendedorismo"
    ],
    "nacionalidades_lista": [
      "Venezuelanos"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "INSTITUTO ABUNA",
    "fundacao": "2017-06-17",
    "email": "CONTATO@ABUNA.ORG.BR",
    "endereco": "AV MAL FLORIANO PEIXOTO, 2590 - PAROLIN, CURITIBA, CEP 80.220-001",
    "telefone": "41-3010-7451",
    "site": "ABUNA.ORG.BR",
    "redes_sociais": "https://www.instagram.com/ABUNABR/",
    "tipo_entidade": "Instituto",
    "areas_atuacao": "Migração e refúgio",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social",
    "nacionalidades": "Árabes",
    "forma_acesso": "Atendimento Remoto",
    "horarios": "Segunda a Sexta 8:00 às 18:00",
    "categorias": [
      "Migração e Refúgio"
    ],
    "nacionalidades_lista": [
      "Árabes"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Associação de Peruanos Residentes No Estado Do Parana- Associação Contigo Perú",
    "fundacao": "2024-05-17",
    "email": "Associacaocontigoperuparana@gmail.com",
    "endereco": "Rua evaristo da veiga 2016,boqueirão Curitiba Parana",
    "telefone": "41996478232",
    "site": "",
    "redes_sociais": "https://www.instagram.com/contigoperu.pr",
    "tipo_entidade": "Associação",
    "areas_atuacao": "Assistência Social",
    "publico_principal": "-",
    "nacionalidades": "Venezolanos, Argentinos, Colombianos e Peruanos",
    "forma_acesso": "Presencial",
    "horarios": "São variadas",
    "categorias": [
      "Assistência Social"
    ],
    "nacionalidades_lista": [
      "Venezuelanos",
      "Argentinos",
      "Colombianos",
      "Peruanos"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Instituto Semear",
    "fundacao": "2025-09-02",
    "email": "jefersonleal@msn.com",
    "endereco": "Antonio Rebelatto1455 Boqueirão - Curitiba PR",
    "telefone": "53999660740",
    "site": "https://institutosemearsocial.org.br",
    "redes_sociais": "https://www.instagram.com/institutosemear.socialbr?igsh=MTU0eXJycnZ6NGFybw==",
    "tipo_entidade": "Instituto",
    "areas_atuacao": "Assistência Social",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social",
    "nacionalidades": "Haitianos, Venezuelanos e Cubanos",
    "forma_acesso": "Presencial",
    "horarios": "Todos os dias.",
    "categorias": [
      "Assistência Social"
    ],
    "nacionalidades_lista": [
      "Haitianos",
      "Venezuelanos",
      "Cubanos"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Associação dos Estudantes Guineenses em Curitiba",
    "fundacao": "2016-06-26",
    "email": "curitibaguineense@gmail.com",
    "endereco": "Cep: 802.300.90 - Centro , Rua Alferes Poli 271",
    "telefone": "41998272054",
    "site": "",
    "redes_sociais": "https://www.instagram.com/associacaoguineense/",
    "tipo_entidade": "Associação",
    "areas_atuacao": "Assistência Social",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social",
    "nacionalidades": "Guineenses",
    "forma_acesso": "Presencial",
    "horarios": "Não temos horário especifico, depende de cada demanda.",
    "categorias": [
      "Assistência Social"
    ],
    "nacionalidades_lista": [
      "Guineenses"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Instituto Espaço Nova Vida",
    "fundacao": "2008-11-28",
    "email": "Institutoespaconv@hotmail.com",
    "endereco": "Rua Diogo Mugiatti,785 - Boqueirão Curitiba. PR",
    "telefone": "41 991519553",
    "site": "",
    "redes_sociais": "https://www.instagram.com/instituto.espaconovavida?stkn=NXB3MXlmN3MwYXdl",
    "tipo_entidade": "OSC | ONG",
    "areas_atuacao": "Educação e esportes",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social",
    "nacionalidades": "Venezuelanos",
    "forma_acesso": "Atendimento Remoto",
    "horarios": "Sábados, 10h",
    "categorias": [
      "Educação e Esportes"
    ],
    "nacionalidades_lista": [
      "Venezuelanos"
    ]
  },
  {
    "city": "Ponta Grossa",
    "lat": -25.095,
    "lng": -50.1619,
    "org": "CÁRITAS DIOCESANA DE PONTA GROSSA",
    "fundacao": "2007-08-05",
    "email": "administrativo@caritaspontagrossa.org.br",
    "endereco": "RUA SALVADOR DE MENDONÇA, 565 NOVA RUSSIA CEP 84053-040 PONTA GROSSA PARANÁ",
    "telefone": "42 32261165 / 42 98873-8266",
    "site": "www.caritasbrasileira.org.br",
    "redes_sociais": "https://www.instagram.com/caritaspontagrossa/",
    "tipo_entidade": "OSC | ONG",
    "areas_atuacao": "Migração e refúgio, Assistência social, Direitos humanos, Educação e Empreendedorismo",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social",
    "nacionalidades": "Qualquer nacionalidade",
    "forma_acesso": "Presencial | Atendimento Remoto",
    "horarios": "Segunda a Quinta 8:00 às 18:00",
    "categorias": [
      "Migração e Refúgio",
      "Assistência Social",
      "Direitos Humanos",
      "Educação e Empreendedorismo"
    ],
    "nacionalidades_lista": [
      "Qualquer Nacionalidade"
    ]
  },
  {
    "city": "Foz do Iguaçu",
    "lat": -25.5469,
    "lng": -54.5882,
    "org": "A Associação des Jeunes Haïtiens en Sciences de la Santé (AJHASS)",
    "fundacao": "2020-07-19",
    "email": "ajhass.org@gmail.com",
    "endereco": "Rua Manoel Bandeira, 318, Vila Brasilia< Foz do Iguaçu, PR",
    "telefone": "45 9820-7532",
    "site": "www.ajhass.org",
    "redes_sociais": "https://www.instagram.com/ajhass_esv/",
    "tipo_entidade": "Associação",
    "areas_atuacao": "Saúde, Apoio psicossocial , Capacitação profissional",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social",
    "nacionalidades": "Qualquer nacionalidade",
    "forma_acesso": "Presencial",
    "horarios": "Segunda a Sexta 8:00 às 18:00",
    "categorias": [
      "Saúde",
      "Apoio Psicossocial",
      "Capacitação Profissional"
    ],
    "nacionalidades_lista": [
      "Qualquer Nacionalidade"
    ]
  },
  {
    "city": "Jacarezinho",
    "lat": -23.1597,
    "lng": -49.9739,
    "org": "CÁRITAS DIOCESANA DE JACAREZINHO",
    "fundacao": "1966-05-13",
    "email": "caritasjacarezinho@gmail.com",
    "endereco": "Avenida Getúlio Vargas, 401, centro",
    "telefone": "4399617-9040",
    "site": "",
    "redes_sociais": "https://www.instagram.com/caritasdiocesanajacarezinho/",
    "tipo_entidade": "OSC | ONG, Igreja",
    "areas_atuacao": "Assistência Social",
    "publico_principal": "Imigrantes em situação de vulnerabilidade social",
    "nacionalidades": "Venezuelanos, Bangladeshis, Sudaneses",
    "forma_acesso": "Atendimento Remoto",
    "horarios": "Terça a Quinta das 9:00 16:30",
    "categorias": [
      "Assistência Social"
    ],
    "nacionalidades_lista": [
      "Venezuelanos",
      "Bangladeshis",
      "Sudaneses"
    ]
  },
  {
    "city": "Curitiba",
    "lat": -25.4284,
    "lng": -49.2733,
    "org": "Atuação Global",
    "fundacao": "2008-04-27",
    "email": "contato@atuacaoglobal.org.br",
    "endereco": "Pedro Foggiatto, 530",
    "telefone": "41 999675416",
    "site": "www.atuacaoglobal.org.br",
    "redes_sociais": "https://www.instagram.com/atuacaoglobal/",
    "tipo_entidade": "OSC | ONG",
    "areas_atuacao": "Educação",
    "publico_principal": "Crianças e adolescentes",
    "nacionalidades": "Brasileiros e Venezuelanos",
    "forma_acesso": "Presencial",
    "horarios": "Segunda a Sexta 9:00 às 17:00",
    "categorias": [
      "Educação"
    ],
    "nacionalidades_lista": [
      "Brasileiros",
      "Venezuelanos"
    ]
  }
];

// Compatibilidade com versões do mapa que usam esses nomes.
const dadosInstituicoes = localizacoes;
