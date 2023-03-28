    # Playwright enables reliable end-to-end testing for modern web apps.

    ## [Documentation](https://playwright.dev) | [API reference](https://playwright.dev/docs/api/class-playwright)

    Looking for Playwright for [Node.js](https://playwright.dev/docs/intro), [Python](https://playwright.dev/python/docs/intro), [.NET](https://playwright.dev/dotnet/docs/intro), or [Java](https://playwright.dev/java/docs/intro)?

    ## 准备

    准备 playwright_v***.tar

    ## Installation

    ```bash
    # 宿主环境
    docker load < playwright.tar playwright
    docker run -itd --rm --name playwright --net bridge playwright:v2 -v /path/to/host:/root/playwright/data -v /path/to/host:/root/playwright/report -v /path/to/env_file:/root/playwright
    ```
