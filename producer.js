const Stomp = require('stompit');

const connectOptions = {
    host: 'localhost',
    port: 61613,
    connectHeaders: {
        'host': '/',
        'login': 'admin',
        'passcode': 'admin'
    }
};

Stomp.connect(connectOptions, (error, client) => {
    if (error) {
        console.error('Erro ao conectar:', error);
        return;
    }

    const sendHeaders = {
        destination: '/queue/minhaFila',
        'content-type': 'text/plain'
    };

    const frame = client.send(sendHeaders);
    frame.write('Mensagem de teste no ActiveMQ!');
    frame.end();

    console.log('Mensagem enviada com sucesso!');
    client.disconnect();
});
