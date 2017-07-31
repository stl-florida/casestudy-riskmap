export class App {
  configureRouter(config, router) {
    config.title = 'RiskMap';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: ':risk',   name: 'map',  moduleId: 'routes/riskmap/riskmap'}/*,
      {route: 'stormsurge',   name: 'stormsurge',  moduleId: 'routes/storm/storm'},
      {route: 'flood',   name: 'flood',  moduleId: 'routes/flood/flood'},
      {route: 'groundwater',   name: 'groundwater',  moduleId: 'routes/gw/gw'}*/
    ]);
    config.mapUnknownRoutes({redirect: 'map'});
    this.router = router;
  }

  attached() {
    var self = this;

  }
}
