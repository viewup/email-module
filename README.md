# Módulo de Email

Este módulo tem a intenção de facilitar o processo de envio de email, usando templates e o uso de anexos

## Instalação

npm i email-module

### Uso

importe o email-module no projeto da seguinte forma :

import SendMail from 'email-module';

Metodos disponiveis na versão 1.0.1 ->

sendMail() 


Este método espera como primeiro parametro uma configuração smtp para o envio autenticado de emails ex:

```javascript
{
    "port": 8888,
    "host": "localhost",
}
```


O segundo parametro espera que você envie os cabeçalhos do email e O html do template em questão  ex:
```javascript

{
    from: 'breno@viewup.com.br',
    to: 'breno@viewup.com.br',
    subject: 'subtitulo',
    attatchments:[{  
            filename: 'text3.txt',
            path: '/path/to/file.txt' // stream this file
        }],
    html: '<html></html>',
}
```

