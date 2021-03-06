export class App {
  configureRouter(config, router) {
    config.title = 'RiskMap';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: '', name: 'map', moduleId: 'routes/riskmap/riskmap'}
    ]);
    config.mapUnknownRoutes({redirect: ''});
    this.router = router;
  }

  attached() {
    var self = this;

  }
}
