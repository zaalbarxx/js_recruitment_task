export class PubSub {
  private events: { [key: string]: ((...args: any[]) => void)[]} = {};

  on<Data = any>(eventName: string, callback: (data: Data) => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  off(eventName: string, callback: (...args: any[]) => void) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].filter(cb => cb !== callback);
  }

  fire(eventName: string, data: any): void {
    this.events[eventName]?.forEach(cb => cb(data));
  }
}
