---
title: Deta deployment
icon: deta
---

[Deta](https://deta.space/) is a free-to-use serverless deployment platform. We can quickly deploy Waline to the Deta platform.

<!-- more -->

## How to deploy

[![Deploy with Deta](https://deta.space/buttons/dark.svg)](https://deta.space/discovery/@lizheming/waline)

Click the button above to jump to the Waline page of the Deta application market, click <kbd>Install on Space</kbd> to automatically install the application after logging in.

![Deta homepage](../../../assets/deta.png)

Wait for a while to see the application on the <https://deta.space> homepage, and click it to open the deployed website address. Fill it in the `serverURL` configuration of the front-end script to complete the entire configuration.

Add `/ui` after this URL can enter the admin dashboard.

![Deta dashboard](../../../assets/deta-1.png)

## How to update

When there is an update, you will see a yellow bubble prompt on your application list page, click More to see the <kbd>Update App</kbd> option.

![Update app](../../../assets/deta-2.png)

After clicking, select <kbd>Install App Update</kbd> and wait for a while to update successfully.

![Apply update](../../../assets/deta-3.png)

## How to modify environment variables

Click <kbd>...</kbd> - <kbd>Settings</kbd> - <kbd>Configuration</kbd> under the application list Waline App to configure all environment variables. After the configuration is complete, click <kbd>Save Changes</kbd> at the bottom to save.

![Update env vars](../../../assets/deta-4.png)
