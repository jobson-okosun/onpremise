export const environment = {
    production: false,
    developmentIP: "https://onpremise.ngrok.app/examalpha/onpremise",
    NETWORK_CHECK: {
        DOWNLOAD: "https://pub-086a38f5ef8c44ccaf276c5b1a970832.r2.dev/2mb.bin",
        UPLOAD: "https://ml-server-api.ngrok.app/ml_server/upload-speed",
        LATENCY: "https://ml-server-api.ngrok.app/ml_server/ping"
    },
    PROCTORING_WS: "wss://beta.examalpha.com:4080/ws"
};
