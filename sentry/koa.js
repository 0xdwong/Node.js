// yarn add @sentry/node @sentry/utils

const Sentry = require("@sentry/node");
const {
    stripUrlQueryAndFragment
} = require("@sentry/utils");
const Koa = require("koa");
const app = new Koa();

Sentry.init({
    dsn: "https://a17ec865d6e40824dd7895adbe067160@o4505753108283392.ingest.sentry.io/4505753114640384",
    integrations: [
        // Automatically instrument Node.js libraries and frameworks
        ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

const requestHandler = (ctx, next) => {
    return new Promise((resolve, reject) => {
        Sentry.runWithAsyncContext(async () => {
            const hub = Sentry.getCurrentHub();
            hub.configureScope((scope) =>
                scope.addEventProcessor((event) =>
                    Sentry.addRequestDataToEvent(event, ctx.request, {
                        include: {
                            user: false,
                        },
                    })
                )
            );

            try {
                await next();
            } catch (err) {
                reject(err);
            }
            resolve();
        });
    });
};

// this tracing middleware creates a transaction per request
const tracingMiddleWare = async (ctx, next) => {
    const reqMethod = (ctx.method || "").toUpperCase();
    const reqUrl = ctx.url && stripUrlQueryAndFragment(ctx.url);

    // connect to trace of upstream app
    let traceparentData;
    if (ctx.request.get("sentry-trace")) {
        traceparentData = Sentry.extractTraceparentData(
            ctx.request.get("sentry-trace")
        );
    }

    const transaction = Sentry.startTransaction({
        name: `${reqMethod} ${reqUrl}`,
        op: "http.server",
        ...traceparentData,
    });

    ctx.__sentry_transaction = transaction;

    // We put the transaction on the scope so users can attach children to it
    Sentry.getCurrentHub().configureScope((scope) => {
        scope.setSpan(transaction);
    });

    ctx.res.on("finish", () => {
        // Push `transaction.finish` to the next event loop so open spans have a chance to finish before the transaction closes
        setImmediate(() => {
            // if you're using koa router, set the matched route as transaction name
            if (ctx._matchedRoute) {
                const mountPath = ctx.mountPath || "";
                transaction.setName(`${reqMethod} ${mountPath}${ctx._matchedRoute}`);
            }
            transaction.setHttpStatus(ctx.status);
            transaction.finish();
        });
    });

    await next();
};

app.use(requestHandler);
app.use(tracingMiddleWare);

// usual error handler
app.on("error", (err, ctx) => {
    Sentry.withScope((scope) => {
        scope.addEventProcessor((event) => {
            return Sentry.addRequestDataToEvent(event, ctx.request);
        });
        Sentry.captureException(err);
    });
});

app.listen(3000);

app.use(async function () {
    throw new Error("My first Sentry error!");
});