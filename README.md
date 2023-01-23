# Propel Grafana Data Source Plugin
The Propel Grafana Data Source plugin lets you use Metrics defined in [Propel](https://www.propeldata.com/) to visualize data. Propel Data is an analytics API for software companies to build customer-facing analytics and dashboards.

With Propel, software teams can focus on building product experiences like usage reports, insights dashboards, or analytics APIs without any data infrastructure to maintain and operate.

To learn more about Propel, [read the documentation](https://www.propeldata.com/docs/what-is-propel).

---
## Prequisites in Propel

- You have a [Propel account](https://console.propeldata.com/get-started).
- You will need at least one metric created on top of a [Propel Data Pool](https://www.propeldata.com/docs/data-pools) and [Propel Data Source](https://www.propeldata.com/docs/data-sources) in order to visualize data in Grafana.
- A [Propel Application](https://www.propeldata.com/docs/applications) scoped with `Admin` access in order to list metrics.

## Installation

### Grafana cloud
Browse to the plugin on the plugin marketplace and click on install.

### Local Grafana
1. Run a Grafana docker instance:
   ```shell
   docker run -d -p 3000:3000 -v $PWD:/var/lib/grafana/plugins --name=grafana-dev -e GF_DEFAULT_APP_MODE=development grafana/grafana
   ```

2. Run the Plugin in development mode
   ```bash
   yarn watch
   ```

3. Whenever you do changes, restart the grafana docker container
   so that the plugin is reloaded
   ```shell
   docker restart grafana-dev
   ```

### Setup

1. Inside Grafana, browse to Configuration -> Data Sources.
2. Search for and select the Propel data source.
3. In the application credentials section, add the client ID and client secret from the appropriate [Propel Application](https://console.propeldata.com/applications/).
4. Click the "Save and Test" button.
5. Verify the connection has succeeded and check the success message correctly returns a count of the metrics available in your Propel application.

## Usage

1. Create a new or edit an existing dashboard and add a new panel
2. On the query tab, choose Propel as the data source.
3. Select a metric.
4. Select a query type from one of the following as appropriate for your metric: counter, time series or leaderboard.
5. Optionally, add filters.
6. Specify a granularity for the query.
7. Use Grafana's built-in visualization to verify the setup of your query. Once correct, click "Save" and then "Apply" in the top right of the screen.

## Support and Feedback

[Email Propel](mailto:support@propeldata.com) for support and feedback.
