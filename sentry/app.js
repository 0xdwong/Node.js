const Sentry = require("@sentry/node");
require("dotenv").config();


function main() {
    Sentry.init({
        dsn: process.env.dsn,
        tracesSampleRate: 1.0,
    });

    const transaction = Sentry.startTransaction({
        op: "test",
        name: "My First Test Transaction",
    });

    setInterval(() => {
        try {
            foo();
        } catch (e) {
            console.log(e);
            Sentry.captureException(e);
        } finally {
            transaction.finish();
        }
    }, 1000);
}

main()