<p align="center">
   <img height="78" alt="Propel" src="src/img/grafana.png">
   <img height="64" alt="Propel" src="src/img/logo-big.svg">
</p>

# Propel data source grafana plugin

Grafana plugin that allows creating dashboards using your Propel's powered Metrics.

---

## Usage

1. Create an application in Propel's console with `Admin` access, this is needed
for listing the Metrics.
2. Configure a `propel` data source in grafana using your application's client id and secret.
3. Create dashboards using the configured data source.

## Development

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
