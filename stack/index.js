function Stack (items = []) {
    this.items = items;
    // this.top = items.length ? items[items.length - 1] : null;
    this.top = this.getTop();
    return this;
}  


Stack.prototype = {
    /* adds items to the top/back of the items stack
    * @param { any } value
    * @preturn { Stack }
    */
   push: function(value) {
       this.items.push(value)
       this.top = value;
       return this;
   },
   /* removes last added item from the list
    * @preturn { Stack }
    */
   pop: function() {
    if (this.items.length) {
        this.items.pop();
        this.top = this.getTop()
    }
    return this;
   },
   getTop: function() {
    return this.items.length ? this.items[this.items.length - 1] : null;
   },
   size: function () {
       return this.items.length;
   }

}

module.exports = { Stack }