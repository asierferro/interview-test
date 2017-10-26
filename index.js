export default class Emitter {

    constructor() {
        this.events = [];
     }

    subscribe( eventName, fn ) {
        if( !this.events[eventName] ) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
        return this.unsubscribe.bind(this, eventName, fn);
    }
    
    unsubscribe(eventName, fn) {
        const event = this.events[eventName];
        if( event ) {
          event.forEach((item, index, object) => {
             if(item.toString( ) == fn.toString( )){  object.splice(index, 1); }
           });
         }
    }
 
    emit(eventName, data) {
        const event = this.events[eventName];
        if( event ) {
        let args = (arguments.length === 1 ? [arguments[0]] : Array.prototype.slice.call(arguments, 1));
        let result = [];
        event.forEach(fn => {
            let a = fn.apply(null, args);
            result.push(a);
        });
        return result;
        }
    }
}
