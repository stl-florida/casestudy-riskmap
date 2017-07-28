import env from 'environment';

export class App {
  configureRouter(config, router) {
    config.title = 'RiskMap';
    config.options.pushState = true;
    config.options.root = env.root;
    config.map([
      {route: 'stormsurge',   name: 'stormsurge',  moduleId: 'routes/storm/storm'},
      {route: 'flood',   name: 'flood',  moduleId: 'routes/flood/flood'},
      {route: 'groundwater',   name: 'groundwater',  moduleId: 'routes/gw/gw'}
    ]);
    config.mapUnknownRoutes({redirect: 'landing'});
    this.router = router;
  }
}
