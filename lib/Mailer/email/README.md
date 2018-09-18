#Padrão do objeto de email

Todos os emails: 

    {
		cdn: "Url da CDN, se não informado irá usar a Padrão do projeto",
    	company: "Objeto da empresa, REQUIRED",
    	date: "String da data do email, pode ser outra coisa"
    	title: "Título do email",
    	description: "Descrição simples do email, OPCIONAL",
    	message: "Mensagem do início do email, HTML ou texto.",
		link: {
			url: "Url do link. OPCIONAL (botão do rodapé do email",
			label: "Texto do botão, caso não informado aparecerá 'Clique aqui'",
			description: "Texto antes do botão do email. OPCIONAL",
			note: "nota que fica abaixo do botão , OPCIONAL"
		},
		greeting: "Saudação de rodapé, OPCIONAL.",
    }

Seguir este padrão para criação de todos os emails, extendendo a base `"baseEmail.html"`

Email Pedido

    {
		order: "Objeto de Pedido, com modificações:",
		isShowcase: "Boolean que informa se o modo vitrine está ativado"
    }

**Modificações Pedido:

- Cada item de produto conterá um array de Strings em `.labels`, que serão os labels a serem mostrados abaixo do título do Produto. Recomenda-se inserir propriedades, SKU, etc
- Deve ser inserido o campo subtotal, que é o somatório de todos os produtos
- Caso o pagamento seja por cartão ( existe o campo `instalment` ), o valor de total deve receber subtotal + shipping, pois o total a prazo será mostrado.
- Todos os valores de preço (total, subtotal, shipping, preço dos produtos, preços de installments) devem ser convertidos para Strings formatadas com a moeda (R$)
- O Objeto de link deve ser informado, pois pode conter o link do pedido do cliente ou o do pedido do dono do ecommerce  