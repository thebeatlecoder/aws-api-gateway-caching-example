# An AWS API Gateway response caching example

Configuring API Gateway response caching is still a bit of a faff, especially seeing as the [Serverless Framework](https://serverless.com/) doesn't really support beyond what `CloudFormation` does.

I've created this repo because although [Yan's blogpost got me most of the way there](https://hackernoon.com/serverless-1-x-enable-api-gateway-caching-on-request-parameters-894b31762068), I still haven't quite got it working.

When it comes to caching responses in real-world applications, I think it's probable that:

- You'll only want to enable caching on specific endpoints. Typically some endpoints in an API will serve data that is too volatile to cache.
- You'll only want to enable caching in certain environments, to keep your AWS bills down.
- You're cache keys will be based on a combination of the URL and the request headers. For example, you may want to make the `Authorization` header part of the cache key, so that responses are cached on a per user basis.
- You'll probably want to cache responses longer than the default TTL of 5 mimutes (300 seconds).

In this trivial example, I'm trying to cover all of the above:

- The `cat-api` has two endpoints; one endpoint has its responses cached, the other does not.
- Caching can be enabled in some environments but not others, based on an environment variable.
- The cached endpoint is localised so in addition to its URL parameter, the `Accept-Language` header forms part of the cache key. This ensures- for example- that users asking for a cat in French do not get served an English translation of the cat cached previously.
- Responses are cached for 1 hour (3600 seconds), which is the maximum TTL Api Gateway supports.

If you're wondering why I'm using the [serverless-plugin-bind-deployment-id](https://github.com/jacob-meacham/serverless-plugin-bind-deployment-id) plugin, I needed to do this in order to get `Serverless` to deploy the `ApiGatewayStage`. Without it, you get an error.
