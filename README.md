    # Playwright enables reliable end-to-end testing for modern web apps.

    ## [Documentation](https://playwright.dev) | [API reference](https://playwright.dev/docs/api/class-playwright)

    Looking for Playwright for [Node.js](https://playwright.dev/docs/intro), [Python](https://playwright.dev/python/docs/intro), [.NET](https://playwright.dev/dotnet/docs/intro), or [Java](https://playwright.dev/java/docs/intro)?

    ## 准备

    准备 playwright.tar

    ## Installation

    ```bash
    # root下
    docker import playwright.tar playwright
    docker run -it --ipc=host --hostname --net=host --name=e2e -v /home/autotest/Project/e2e:/home/e2e playwright /bin/bash
    ```
