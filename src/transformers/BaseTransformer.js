export default class BaseTransformer {
  static fetchCollection(items) {
    return items.map(item => this.fetch(item))
  }
}
