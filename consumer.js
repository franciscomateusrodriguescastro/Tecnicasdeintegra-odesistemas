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

    const subscribeHeaders = {
        destination: '/queue/minhaFila',
        ack: 'auto'
    };

    client.subscribe(subscribeHeaders, (error, message) => {
        if (error) {
            console.error('Erro ao subscrever:', error);
            return;
        }

        message.readString('utf-8', (error, body) => {
            if (error) {
                console.error('Erro ao ler mensagem:', error);
                return;
            }

            console.log('Mensagem recebida:', body);
        });
    });
});
